import type { Metadata, Viewport } from "next";
import { Noto_Sans_Thai } from "next/font/google";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

import "./globals.css";

const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-noto-sans-thai",
});

export const metadata: Metadata = {
  title: "CostCal — เช็กก่อนขาย ว่ากำไรเหลือจริงกี่บาท",
  description:
    "All-in-One Profit Calculator สำหรับผู้ประกอบการไทย — Shopee, Lazada, TikTok, Grab, LINE MAN, Foodpanda. คำนวณกำไร เปรียบเทียบทุกแพลตฟอร์มใน 30 วินาที",
  keywords: [
    "คำนวณกำไร",
    "Shopee fee",
    "Lazada fee",
    "TikTok shop",
    "GP food delivery",
    "ค่าธรรมเนียม Grab",
    "profit calculator",
  ],
  openGraph: {
    title: "CostCal — เช็กก่อนขาย ว่ากำไรเหลือจริงกี่บาท",
    description:
      "All-in-One Profit Calculator สำหรับผู้ประกอบการไทย — รวมทุกคำนวณที่จำเป็นไว้ที่เดียว",
    locale: "th_TH",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#16a34a",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="th" className={notoSansThai.variable} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
