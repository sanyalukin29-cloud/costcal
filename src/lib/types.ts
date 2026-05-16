/**
 * Core types for CostCal calculator engine.
 * Mirrors MASTER_DOCUMENT cal.md §7.1 with stricter generics.
 */

// ─────────────────────────────────────────────────────────────────────────────
// Platforms
// ─────────────────────────────────────────────────────────────────────────────

export type OnlinePlatform = "shopee" | "lazada" | "tiktok" | "facebook";

export type DeliveryPlatform =
  | "grab"
  | "lineman"
  | "foodpanda"
  | "shopeefood"
  | "robinhood";

export type ShopType = "mall" | "non-mall";

export type VoucherType = "fixed" | "percent";

export type DeliveryPaymentMethod = "cash" | "credit_card";

export type CalcStatus = "profit" | "breakeven" | "loss";

// ─────────────────────────────────────────────────────────────────────────────
// Inputs
// ─────────────────────────────────────────────────────────────────────────────

export interface OnlineSellerInput {
  platform: OnlinePlatform;
  /** Required for Shopee — defaults to 'non-mall' if omitted. */
  shopType?: ShopType;
  /** ราคาขาย (THB) before any voucher discount. */
  sellingPrice: number;
  /** ต้นทุนสินค้า (THB). */
  costPrice: number;
  /** ค่าส่ง (THB) — paid by seller. */
  shippingCost: number;
  /** ส่วนลด voucher (optional). */
  voucherAmount?: number;
  voucherType?: VoucherType;
  /** ค่าโฆษณาเฉลี่ยต่อชิ้น (optional). */
  adsCost?: number;
}

export interface FoodDeliveryInput {
  platform: DeliveryPlatform;
  /** ราคาเมนูในแอป (THB). */
  menuPrice: number;
  /** ต้นทุนอาหาร (THB) — recipe cost. */
  foodCost: number;
  /** เฉพาะ Foodpanda: cash หรือ credit_card (มี surcharge 3% สำหรับบัตร). */
  paymentMethod?: DeliveryPaymentMethod;
}

// ─────────────────────────────────────────────────────────────────────────────
// Output
// ─────────────────────────────────────────────────────────────────────────────

export interface FeesBreakdown {
  /** ค่าธรรมเนียมหลัก (commission / GP). */
  commission: number;
  /** ค่าธรรมเนียมการทำธุรกรรม. */
  transactionFee: number;
  /** ค่าธรรมเนียมการชำระเงิน (เช่น Foodpanda credit card 3%). */
  paymentFee: number;
  /** VAT บนค่าธรรมเนียม. */
  vat: number;
  /** ค่าธรรมเนียมอื่น ๆ (Tech Support, Commerce Growth, Infrastructure, ฯลฯ). */
  other: number;
}

export interface CalculationOutput {
  /** ราคาขายดิบก่อนหัก voucher (input). */
  grossRevenue: number;
  /** ราคาหลังหัก voucher (เงินที่ลูกค้าจ่ายจริง). */
  effectivePrice: number;
  /** Breakdown ของค่าธรรมเนียมทั้งหมด. */
  fees: FeesBreakdown;
  /** Sum ของ fees ทั้งหมด. */
  totalFees: number;
  /** เงินที่ผู้ขายได้รับสุทธิหลังหัก fee (ก่อนหักต้นทุน). */
  netRevenue: number;
  /** ต้นทุนรวม (cost + shipping + ads). */
  totalCost: number;
  /** กำไรสุทธิ = netRevenue - totalCost. */
  profit: number;
  /** Margin % คำนวณจาก profit / effectivePrice. */
  marginPercent: number;
  status: CalcStatus;
  /** ข้อความเตือนที่ควร surface ให้ user (ขาดทุน, fee สูง, ฯลฯ). */
  warning?: string;
  /** คำแนะนำเพิ่มเติม. */
  suggestions?: string[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Fee rules
// ─────────────────────────────────────────────────────────────────────────────

export interface FeeRules {
  platform: OnlinePlatform | DeliveryPlatform;
  shopType?: ShopType;

  /** Commission % (online: marketplace fee · delivery: GP). */
  commissionPercent: number;
  /** Transaction fee % — Shopee 3.21% (รวม VAT แล้ว). */
  transactionFeePercent: number;
  /** Payment processor fee % (Lazada 2.14%, etc.). */
  paymentFeePercent?: number;
  /** VAT % applied on top of commission + tech support + commerce growth. */
  vatPercent: number;

  // Online-only optional fees
  technicalSupportFee?: number; // Shopee Feb 2026 — % of effective price
  commerceGrowthFee?: number; // TikTok — % capped at 199 THB
  commerceGrowthCap?: number; // THB cap for commerceGrowthFee
  infrastructureFee?: number; // TikTok — flat THB per order

  // Delivery-only optional fees
  monthlyFee?: number; // Foodpanda 99 THB/month (informational)
  entryFee?: number; // Foodpanda 399 THB one-time (informational)

  /** ISO date — last verified against official source. */
  lastUpdated: string;
}
