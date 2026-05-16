// Calculator verification — hand-calculated expected values vs runtime output.
// Run with:  node scripts/verify-calculator.mjs
//
// This script duplicates the math from src/lib/calculator.ts in plain JS so it
// can run without a TypeScript build step. Both files must stay in sync.

const SHOPEE_FEES = {
  mall: { commissionPercent: 5.5, transactionFeePercent: 3.21, technicalSupportFee: 5, vatPercent: 7 },
  "non-mall": { commissionPercent: 3, transactionFeePercent: 3.21, technicalSupportFee: 5, vatPercent: 7 },
};
const LAZADA_FEES = { commissionPercent: 4, transactionFeePercent: 0, paymentFeePercent: 2.14, vatPercent: 7 };
const TIKTOK_FEES = {
  commissionPercent: 5,
  transactionFeePercent: 3.21,
  commerceGrowthFee: 5.88,
  commerceGrowthCap: 199,
  infrastructureFee: 1.07,
  vatPercent: 7,
};
const FACEBOOK_FEES = { commissionPercent: 0, transactionFeePercent: 0, vatPercent: 0 };
const DELIVERY = {
  grab: { commissionPercent: 30, vatPercent: 7 },
  lineman: { commissionPercent: 30, vatPercent: 7 },
  foodpanda: { commissionPercent: 32, vatPercent: 7 },
  shopeefood: { commissionPercent: 30, vatPercent: 7 },
  robinhood: { commissionPercent: 0, vatPercent: 0 },
};

function round2(n) { return Math.round(n * 100) / 100; }

function getOnlineFees(platform, shopType = "non-mall") {
  if (platform === "shopee") return SHOPEE_FEES[shopType];
  if (platform === "lazada") return LAZADA_FEES;
  if (platform === "tiktok") return TIKTOK_FEES;
  return FACEBOOK_FEES;
}

function calcOnline({ platform, shopType = "non-mall", sellingPrice, costPrice, shippingCost, voucherAmount = 0, voucherType = "fixed", adsCost = 0 }) {
  const fees = getOnlineFees(platform, shopType);
  const voucherDiscount = voucherType === "percent" ? sellingPrice * (voucherAmount / 100) : voucherAmount;
  const effectivePrice = Math.max(0, sellingPrice - voucherDiscount);

  const commission = effectivePrice * (fees.commissionPercent / 100);
  const transactionFee = effectivePrice * (fees.transactionFeePercent / 100);
  const technicalSupport = fees.technicalSupportFee ? effectivePrice * (fees.technicalSupportFee / 100) : 0;
  const cgRaw = fees.commerceGrowthFee ? effectivePrice * (fees.commerceGrowthFee / 100) : 0;
  const commerceGrowth = fees.commerceGrowthCap ? Math.min(cgRaw, fees.commerceGrowthCap) : cgRaw;
  const infrastructure = fees.infrastructureFee ?? 0;
  const paymentFee = fees.paymentFeePercent ? effectivePrice * (fees.paymentFeePercent / 100) : 0;

  const vatBase = commission + technicalSupport + commerceGrowth;
  const vat = vatBase * (fees.vatPercent / 100);
  const otherFees = technicalSupport + commerceGrowth + infrastructure;
  const totalFees = commission + transactionFee + paymentFee + vat + otherFees;

  const netRevenue = effectivePrice - totalFees;
  const totalCost = costPrice + shippingCost + adsCost;
  const profit = netRevenue - totalCost;
  return { totalFees: round2(totalFees), netRevenue: round2(netRevenue), profit: round2(profit) };
}

function calcDelivery({ platform, menuPrice, foodCost, paymentMethod = "cash" }) {
  const fees = DELIVERY[platform];
  const commission = menuPrice * (fees.commissionPercent / 100);
  const vat = commission * (fees.vatPercent / 100);
  const paymentFee = platform === "foodpanda" && paymentMethod === "credit_card" ? menuPrice * 0.03 : 0;
  const totalFees = commission + vat + paymentFee;
  const netRevenue = menuPrice - totalFees;
  const profit = netRevenue - foodCost;
  return { totalFees: round2(totalFees), netRevenue: round2(netRevenue), profit: round2(profit) };
}

// ─────────────────────────────────────────────────────────────────────────────
// Hand-calculated expected values
// ─────────────────────────────────────────────────────────────────────────────

const cases = [
  {
    name: "Shopee Mall — 1000 THB, cost 500, ship 50",
    actual: calcOnline({ platform: "shopee", shopType: "mall", sellingPrice: 1000, costPrice: 500, shippingCost: 50 }),
    // commission 55, txn 32.10, tech 50, vat (55+50)*0.07=7.35, total=144.45
    expected: { totalFees: 144.45, netRevenue: 855.55, profit: 305.55 },
  },
  {
    name: "Shopee Non-Mall — 1000 THB, cost 500, ship 50",
    actual: calcOnline({ platform: "shopee", sellingPrice: 1000, costPrice: 500, shippingCost: 50 }),
    // commission 30, txn 32.10, tech 50, vat (30+50)*0.07=5.60, total=117.70
    expected: { totalFees: 117.70, netRevenue: 882.30, profit: 332.30 },
  },
  {
    name: "Lazada — 1000 THB, cost 500, ship 50",
    actual: calcOnline({ platform: "lazada", sellingPrice: 1000, costPrice: 500, shippingCost: 50 }),
    // commission 40, payment 21.40, vat 40*0.07=2.80, total=64.20
    expected: { totalFees: 64.20, netRevenue: 935.80, profit: 385.80 },
  },
  {
    name: "TikTok — 5000 THB (commerce-growth cap kicks in at 199)",
    actual: calcOnline({ platform: "tiktok", sellingPrice: 5000, costPrice: 1000, shippingCost: 50 }),
    // commission 250, txn 160.50, cg_raw=294 → cap 199, infra 1.07
    // vatBase 250+199=449, vat 31.43, total=250+160.50+0+31.43+(199+1.07)=642.00
    expected: { totalFees: 642.00, netRevenue: 4358.00, profit: 3308.00 },
  },
  {
    name: "Facebook — 1000 THB, no platform fee",
    actual: calcOnline({ platform: "facebook", sellingPrice: 1000, costPrice: 500, shippingCost: 50 }),
    expected: { totalFees: 0, netRevenue: 1000, profit: 450 },
  },
  {
    name: "Shopee voucher 10% — 1000 → effective 900",
    actual: calcOnline({ platform: "shopee", sellingPrice: 1000, costPrice: 500, shippingCost: 50, voucherAmount: 10, voucherType: "percent" }),
    // effective 900 · commission 27 · txn 28.89 · tech 45 · vat (27+45)*0.07=5.04 · total=105.93
    expected: { totalFees: 105.93, netRevenue: 794.07, profit: 244.07 },
  },
  {
    name: "Grab delivery — 200 THB menu, 80 cost",
    actual: calcDelivery({ platform: "grab", menuPrice: 200, foodCost: 80 }),
    // commission 60, vat 4.20, total 64.20
    expected: { totalFees: 64.20, netRevenue: 135.80, profit: 55.80 },
  },
  {
    name: "Foodpanda credit card — 200 menu, 80 cost",
    actual: calcDelivery({ platform: "foodpanda", menuPrice: 200, foodCost: 80, paymentMethod: "credit_card" }),
    // commission 64, vat 4.48, payment 6, total 74.48
    expected: { totalFees: 74.48, netRevenue: 125.52, profit: 45.52 },
  },
  {
    name: "Robinhood — 200 menu, 80 cost (no GP)",
    actual: calcDelivery({ platform: "robinhood", menuPrice: 200, foodCost: 80 }),
    expected: { totalFees: 0, netRevenue: 200, profit: 120 },
  },
  {
    name: "Grab loss — 100 menu, 90 cost (margin too thin)",
    actual: calcDelivery({ platform: "grab", menuPrice: 100, foodCost: 90 }),
    // commission 30, vat 2.10, total 32.10, net 67.90, profit -22.10
    expected: { totalFees: 32.10, netRevenue: 67.90, profit: -22.10 },
  },
];

let passed = 0;
let failed = 0;
for (const c of cases) {
  const a = c.actual;
  const e = c.expected;
  const ok =
    Math.abs(a.totalFees - e.totalFees) < 0.02 &&
    Math.abs(a.netRevenue - e.netRevenue) < 0.02 &&
    Math.abs(a.profit - e.profit) < 0.02;
  if (ok) {
    passed++;
    console.log(`  PASS  ${c.name}`);
  } else {
    failed++;
    console.log(`  FAIL  ${c.name}`);
    console.log(`        expected: ${JSON.stringify(e)}`);
    console.log(`        actual:   ${JSON.stringify(a)}`);
  }
}

console.log(`\n${passed}/${cases.length} passed${failed > 0 ? `, ${failed} failed` : ""}`);
process.exit(failed === 0 ? 0 : 1);
