import type { Metadata } from "next";

import { OnlineSellerCalc } from "@/components/calculator/OnlineSellerCalc";

export const metadata: Metadata = {
  title: "คำนวณกำไร Online Seller — Shopee, Lazada, TikTok | CostCal",
  description:
    "เช็กกำไรจริงก่อนขาย Shopee, Lazada, TikTok, Facebook — รวม fee ปัจจุบัน Q1 2026 — ใช้งานฟรี ไม่ต้องสมัคร",
};

export default function OnlineSellerCalcPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-8 md:py-12">
      <header className="mb-8">
        <div className="text-xs font-medium uppercase tracking-wider text-primary">
          Online Seller
        </div>
        <h1 className="mt-1 text-3xl font-bold tracking-tight md:text-4xl">
          คำนวณกำไรขายออนไลน์
        </h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          กรอกราคา → เห็นกำไรสุทธิหลังหัก fee, voucher, VAT, ค่าโฆษณา ทันที — ค่าธรรมเนียมอ้างอิงข้อมูลทางการ Q1 2026
        </p>
      </header>

      <OnlineSellerCalc />

      <footer className="mt-12 border-t pt-6 text-center text-xs text-muted-foreground">
        Fee rates อัปเดตล่าสุด: Q1 2026 ·{" "}
        <a
          href="https://seller.shopee.co.th/edu/learning-center/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-foreground"
        >
          ตรวจสอบจาก Shopee
        </a>{" "}
        ·{" "}
        <a
          href="https://university.lazada.co.th/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-foreground"
        >
          Lazada
        </a>{" "}
        ·{" "}
        <a
          href="https://seller-th.tiktok.com/university"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-foreground"
        >
          TikTok
        </a>
      </footer>
    </div>
  );
}
