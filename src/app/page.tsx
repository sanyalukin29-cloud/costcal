import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles, TrendingUp, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EmailCapture } from "@/components/landing/EmailCapture";

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      {/* Background gradient */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-background to-background"
      />

      {/* Hero */}
      <section className="container mx-auto max-w-5xl px-4 py-16 md:py-24">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <Sparkles className="h-3 w-3" />
            กำลังเปิดตัวเร็ว ๆ นี้
          </span>

          <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight md:text-6xl">
            เช็กก่อนขาย
            <br />
            <span className="text-primary">ว่ากำไรเหลือจริงกี่บาท</span>
          </h1>

          <p className="mt-6 max-w-2xl text-balance text-base text-muted-foreground md:text-lg">
            All-in-One Profit Calculator สำหรับผู้ประกอบการไทย
            <br />
            รวมทุก calculator ที่จำเป็นไว้ที่เดียว — ใช้งานฟรี ไม่ต้องสมัคร
          </p>

          {/* Primary CTA — calculator is live */}
          <div className="mt-8 flex flex-col items-center gap-3">
            <Link href="/calc/online-seller">
              <Button size="xl" className="text-base">
                คำนวณกำไรเลย — ฟรี
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <p className="text-xs text-muted-foreground">
              ไม่ต้องสมัคร · ใช้งานได้ทันที
            </p>
          </div>

          {/* Email capture (secondary) */}
          <div className="mt-8 w-full max-w-md">
            <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              หรือรับแจ้งเตือนเมื่อ feature ใหม่ออก
            </p>
            <EmailCapture />
          </div>
        </div>

        {/* Feature preview cards */}
        <div className="mt-16 grid gap-4 md:grid-cols-3">
          <FeatureCard
            icon={<TrendingUp className="h-5 w-5" />}
            title="ขายของออนไลน์"
            description="Shopee, Lazada, TikTok, Facebook — เปรียบเทียบ fee ทุกแพลตฟอร์มในที่เดียว"
          />
          <FeatureCard
            icon={<Zap className="h-5 w-5" />}
            title="ร้านอาหาร Delivery"
            description="Grab, LINE MAN, Foodpanda, ShopeeFood, Robinhood — รู้กำไรสุทธิหลังหัก GP"
          />
          <FeatureCard
            icon={<CheckCircle2 className="h-5 w-5" />}
            title="คำนวณต้นทุนเมนู"
            description="Recipe builder + yield calculation — ไม่พลาดต้นทุนแฝงอีกต่อไป"
          />
        </div>

        {/* Stats placeholder */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-center">
          <Stat label="ผู้ประกอบการเป้าหมาย" value="1.45M" />
          <Stat label="แพลตฟอร์มที่รองรับ" value="9+" />
          <Stat label="ราคาเริ่มต้น" value="ฟรี" />
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
        <h3 className="font-semibold">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-2xl font-bold text-primary md:text-3xl">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}
