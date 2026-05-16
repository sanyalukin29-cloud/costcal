import { z } from "zod";

/**
 * Form schema for the Online Seller calculator.
 * Strings are coerced to numbers because <Input type="number"> still emits strings.
 */
export const onlineSellerSchema = z.object({
  platform: z.enum(["shopee", "lazada", "tiktok", "facebook"]),
  shopType: z.enum(["mall", "non-mall"]).optional(),

  sellingPrice: z.coerce
    .number({ invalid_type_error: "ใส่ตัวเลข" })
    .nonnegative("ห้ามติดลบ")
    .max(10_000_000, "ตัวเลขเกินขอบเขต"),
  costPrice: z.coerce
    .number({ invalid_type_error: "ใส่ตัวเลข" })
    .nonnegative("ห้ามติดลบ")
    .max(10_000_000, "ตัวเลขเกินขอบเขต"),
  shippingCost: z.coerce
    .number({ invalid_type_error: "ใส่ตัวเลข" })
    .nonnegative("ห้ามติดลบ")
    .max(100_000, "ค่าส่งเกินขอบเขต"),

  // Optional advanced fields
  voucherAmount: z.coerce
    .number({ invalid_type_error: "ใส่ตัวเลข" })
    .nonnegative("ห้ามติดลบ")
    .optional(),
  voucherType: z.enum(["fixed", "percent"]).optional(),
  adsCost: z.coerce
    .number({ invalid_type_error: "ใส่ตัวเลข" })
    .nonnegative("ห้ามติดลบ")
    .optional(),
});

export type OnlineSellerFormValues = z.infer<typeof onlineSellerSchema>;
