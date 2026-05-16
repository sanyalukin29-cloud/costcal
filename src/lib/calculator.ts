/**
 * Core profit calculator — pure functions, no I/O.
 *
 * Math contract (per MASTER_DOCUMENT cal.md §7.3):
 *
 *   1. Apply voucher to selling price → effective price.
 *   2. Compute platform fees from effective price.
 *   3. Compute VAT on the fee base (commission + tech support + commerce growth).
 *      • Note: Shopee 3.21% transaction fee is "VAT-included" so it's NOT in vatBase.
 *      • Lazada/TikTok payment + transaction fees follow the same rule.
 *   4. Total fees = sum of all fee components.
 *   5. Net revenue = effective price − total fees.
 *   6. Profit = net revenue − (cost + shipping + ads).
 *   7. Margin % = profit / effective price × 100.
 */

import {
  DELIVERY_FEES,
  getOnlineFees,
} from "./fees";
import type {
  CalcStatus,
  CalculationOutput,
  FoodDeliveryInput,
  OnlinePlatform,
  OnlineSellerInput,
  ShopType,
} from "./types";

// ─────────────────────────────────────────────────────────────────────────────
// Online seller
// ─────────────────────────────────────────────────────────────────────────────

export function calculateOnlineSeller(
  input: OnlineSellerInput,
): CalculationOutput {
  const {
    platform,
    shopType = "non-mall",
    sellingPrice,
    costPrice,
    shippingCost,
    voucherAmount = 0,
    voucherType = "fixed",
    adsCost = 0,
  } = input;

  const fees = getOnlineFees(platform, shopType);

  // 1. Apply voucher
  const voucherDiscount =
    voucherType === "percent"
      ? sellingPrice * (voucherAmount / 100)
      : voucherAmount;
  const effectivePrice = Math.max(0, sellingPrice - voucherDiscount);

  // 2. Compute fee components
  const commission = effectivePrice * (fees.commissionPercent / 100);
  const transactionFee = effectivePrice * (fees.transactionFeePercent / 100);
  const technicalSupport = fees.technicalSupportFee
    ? effectivePrice * (fees.technicalSupportFee / 100)
    : 0;

  // TikTok-specific
  const commerceGrowthRaw = fees.commerceGrowthFee
    ? effectivePrice * (fees.commerceGrowthFee / 100)
    : 0;
  const commerceGrowth = fees.commerceGrowthCap
    ? Math.min(commerceGrowthRaw, fees.commerceGrowthCap)
    : commerceGrowthRaw;
  const infrastructure = fees.infrastructureFee ?? 0;

  // Lazada payment fee
  const paymentFee = fees.paymentFeePercent
    ? effectivePrice * (fees.paymentFeePercent / 100)
    : 0;

  // 3. VAT on commission + tech support + commerce growth
  // (transaction & payment fees are already "VAT-included" by platforms)
  const vatBase = commission + technicalSupport + commerceGrowth;
  const vat = vatBase * (fees.vatPercent / 100);

  // 4. Sum
  const otherFees = technicalSupport + commerceGrowth + infrastructure;
  const totalFees =
    commission + transactionFee + paymentFee + vat + otherFees;

  // 5-7. Final
  const netRevenue = effectivePrice - totalFees;
  const totalCost = costPrice + shippingCost + adsCost;
  const profit = netRevenue - totalCost;
  const marginPercent =
    effectivePrice > 0 ? (profit / effectivePrice) * 100 : 0;

  return {
    grossRevenue: round2(sellingPrice),
    effectivePrice: round2(effectivePrice),
    fees: {
      commission: round2(commission),
      transactionFee: round2(transactionFee),
      paymentFee: round2(paymentFee),
      vat: round2(vat),
      other: round2(otherFees),
    },
    totalFees: round2(totalFees),
    netRevenue: round2(netRevenue),
    totalCost: round2(totalCost),
    profit: round2(profit),
    marginPercent: round2(marginPercent),
    status: classify(profit),
    warning: buildWarning(profit, effectivePrice, marginPercent),
    suggestions: buildSuggestions(profit, marginPercent, platform),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Food delivery
// ─────────────────────────────────────────────────────────────────────────────

export function calculateFoodDelivery(
  input: FoodDeliveryInput,
): CalculationOutput {
  const { platform, menuPrice, foodCost, paymentMethod = "cash" } = input;
  const fees = DELIVERY_FEES[platform];

  // Commission (GP)
  const commission = menuPrice * (fees.commissionPercent / 100);
  const vat = commission * (fees.vatPercent / 100);

  // Foodpanda credit-card surcharge
  const paymentFee =
    platform === "foodpanda" && paymentMethod === "credit_card"
      ? menuPrice * 0.03
      : 0;

  const totalFees = commission + vat + paymentFee;
  const netRevenue = menuPrice - totalFees;
  const profit = netRevenue - foodCost;
  const marginPercent = menuPrice > 0 ? (profit / menuPrice) * 100 : 0;

  return {
    grossRevenue: round2(menuPrice),
    effectivePrice: round2(menuPrice),
    fees: {
      commission: round2(commission),
      transactionFee: 0,
      paymentFee: round2(paymentFee),
      vat: round2(vat),
      other: 0,
    },
    totalFees: round2(totalFees),
    netRevenue: round2(netRevenue),
    totalCost: round2(foodCost),
    profit: round2(profit),
    marginPercent: round2(marginPercent),
    status: classify(profit),
    warning:
      profit < 0
        ? `ขาดทุน ${Math.abs(profit).toFixed(2)} บาท/ออเดอร์`
        : undefined,
    suggestions: buildDeliverySuggestions(profit, menuPrice, foodCost, platform),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Suggest a selling price to hit a target profit (iterative)
// ─────────────────────────────────────────────────────────────────────────────

export function suggestPrice(
  platform: OnlinePlatform,
  costPrice: number,
  shippingCost: number,
  targetProfit: number,
  shopType: ShopType = "non-mall",
): number {
  let price = costPrice + shippingCost + targetProfit;
  for (let i = 0; i < 12; i++) {
    const result = calculateOnlineSeller({
      platform,
      shopType,
      sellingPrice: price,
      costPrice,
      shippingCost,
    });
    const diff = targetProfit - result.profit;
    if (Math.abs(diff) < 0.5) break;
    price += diff;
  }
  return Math.ceil(price);
}

/**
 * Suggest in-app menu price to match a desired in-store profit.
 * "ที่ร้าน 100 บ. ควรขายในแอปเท่าไหร่ถึงเท่ากัน?"
 */
export function suggestDeliveryMarkup(
  platform: FoodDeliveryInput["platform"],
  inStorePrice: number,
  foodCost: number,
): number {
  const targetProfit = inStorePrice - foodCost;
  let menuPrice = inStorePrice;
  for (let i = 0; i < 12; i++) {
    const result = calculateFoodDelivery({ platform, menuPrice, foodCost });
    const diff = targetProfit - result.profit;
    if (Math.abs(diff) < 0.5) break;
    menuPrice += diff;
  }
  return Math.ceil(menuPrice);
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

function classify(profit: number): CalculationOutput["status"] {
  if (profit > 0.005) return "profit";
  if (profit < -0.005) return "loss";
  return "breakeven";
}

function buildWarning(
  profit: number,
  effectivePrice: number,
  margin: number,
): string | undefined {
  if (profit < 0) {
    return `คุณกำลังขาดทุน ${Math.abs(profit).toFixed(2)} บาท/ชิ้น!`;
  }
  if (effectivePrice > 0 && margin < 5) {
    return `กำไรน้อยมาก (${margin.toFixed(1)}%) — เสี่ยงขาดทุนถ้ามีคืนสินค้า`;
  }
  return undefined;
}

function buildSuggestions(
  profit: number,
  margin: number,
  platform: OnlinePlatform,
): string[] | undefined {
  const tips: string[] = [];
  if (profit < 0) {
    tips.push("ลองเพิ่มราคาขาย หรือหาต้นทุนที่ถูกกว่า");
  }
  if (margin < 15 && margin > 0) {
    tips.push("Margin ต่ำกว่า 15% — เผื่อ buffer สำหรับ voucher/campaign");
  }
  if (platform === "tiktok" && profit > 0) {
    tips.push("TikTok มี Commerce Growth Fee — เช็กก่อนเข้าแคมเปญใหญ่");
  }
  return tips.length > 0 ? tips : undefined;
}

function buildDeliverySuggestions(
  profit: number,
  menuPrice: number,
  foodCost: number,
  platform: FoodDeliveryInput["platform"],
): string[] | undefined {
  const tips: string[] = [];
  if (profit < 0) {
    const suggested = suggestDeliveryMarkup(platform, menuPrice, foodCost);
    tips.push(`ลองตั้งราคา ${suggested} บาท เพื่อให้กำไรเท่าหน้าร้าน`);
  }
  if (platform === "robinhood" && profit > 0) {
    tips.push("Robinhood ไม่มี GP — กำไรเท่าหน้าร้านเลย ✅");
  }
  return tips.length > 0 ? tips : undefined;
}

// Re-export for convenient single-import usage.
export type { CalcStatus, CalculationOutput };
