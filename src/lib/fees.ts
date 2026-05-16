/**
 * Fee rates Q1 2026 — sourced from MASTER_DOCUMENT cal.md §21.
 *
 * IMPORTANT: These are *averaged* rates. Actual seller commission can vary
 * by category (e.g., Shopee Mall fashion vs. electronics). Use as
 * defaults; `/admin/fees` will let admins override per-platform later.
 *
 * Verify weekly against:
 *   • https://seller.shopee.co.th/edu/learning-center/
 *   • https://university.lazada.co.th/
 *   • https://seller-th.tiktok.com/university
 *   • https://www.grab.com/th/merchant/food/
 *   • https://lmwn.com/business
 *   • https://shops.foodpanda.com
 */

import type {
  DeliveryPlatform,
  FeeRules,
  OnlinePlatform,
  ShopType,
} from "./types";

// ─────────────────────────────────────────────────────────────────────────────
// Online sellers
// ─────────────────────────────────────────────────────────────────────────────

export const SHOPEE_FEES: Record<ShopType, FeeRules> = {
  mall: {
    platform: "shopee",
    shopType: "mall",
    commissionPercent: 5.5, // 3-8% varies by category, avg ~5.5%
    transactionFeePercent: 3.21, // already includes VAT per Shopee help center
    technicalSupportFee: 5, // NEW Feb 2026
    vatPercent: 7,
    lastUpdated: "2026-02-01",
  },
  "non-mall": {
    platform: "shopee",
    shopType: "non-mall",
    commissionPercent: 3, // 1-5%, avg ~3%
    transactionFeePercent: 3.21,
    technicalSupportFee: 5,
    vatPercent: 7,
    lastUpdated: "2026-02-01",
  },
} as const;

export const LAZADA_FEES: FeeRules = {
  platform: "lazada",
  commissionPercent: 4, // 2-7%, avg ~4%
  transactionFeePercent: 0,
  paymentFeePercent: 2.14,
  vatPercent: 7,
  lastUpdated: "2026-01-01",
} as const;

export const TIKTOK_FEES: FeeRules = {
  platform: "tiktok",
  commissionPercent: 5, // 1-8%, avg ~5%
  transactionFeePercent: 3.21,
  commerceGrowthFee: 5.88, // 5.35-6.42%, midpoint 5.88
  commerceGrowthCap: 199, // THB per item
  infrastructureFee: 1.07, // flat THB per order
  vatPercent: 7,
  lastUpdated: "2026-03-21",
} as const;

export const FACEBOOK_FEES: FeeRules = {
  platform: "facebook",
  commissionPercent: 0, // no platform fee
  transactionFeePercent: 0,
  vatPercent: 0,
  lastUpdated: "2026-01-01",
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Food delivery
// ─────────────────────────────────────────────────────────────────────────────

export const DELIVERY_FEES: Record<DeliveryPlatform, FeeRules> = {
  grab: {
    platform: "grab",
    commissionPercent: 30, // 15-30% varies by tier, default to 30%
    transactionFeePercent: 0,
    vatPercent: 7,
    lastUpdated: "2026-01-01",
  },
  lineman: {
    platform: "lineman",
    commissionPercent: 30, // = 32.1% รวม VAT
    transactionFeePercent: 0,
    vatPercent: 7,
    lastUpdated: "2026-01-01",
  },
  foodpanda: {
    platform: "foodpanda",
    commissionPercent: 32,
    transactionFeePercent: 0,
    vatPercent: 7,
    monthlyFee: 99,
    entryFee: 399,
    lastUpdated: "2026-01-01",
  },
  shopeefood: {
    platform: "shopeefood",
    commissionPercent: 30,
    transactionFeePercent: 0,
    vatPercent: 7,
    lastUpdated: "2026-01-01",
  },
  robinhood: {
    platform: "robinhood",
    commissionPercent: 0, // no GP — flat-fee model
    transactionFeePercent: 0,
    vatPercent: 0,
    lastUpdated: "2026-01-01",
  },
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Lookup helpers
// ─────────────────────────────────────────────────────────────────────────────

export function getOnlineFees(
  platform: OnlinePlatform,
  shopType: ShopType = "non-mall",
): FeeRules {
  switch (platform) {
    case "shopee":
      return SHOPEE_FEES[shopType];
    case "lazada":
      return LAZADA_FEES;
    case "tiktok":
      return TIKTOK_FEES;
    case "facebook":
      return FACEBOOK_FEES;
  }
}

export function getDeliveryFees(platform: DeliveryPlatform): FeeRules {
  return DELIVERY_FEES[platform];
}
