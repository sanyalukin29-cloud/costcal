# 🚀 PROFIT CALCULATOR — MASTER PROJECT DOCUMENT

> **All-in-One Cost & Profit Calculator Platform for Thai SMEs**
> 
> รวมทุกอย่างในไฟล์เดียว — Tech, Features, Monetization, Build Plan
> 
> **เอกสารนี้สร้างขึ้นเพื่อนำไปใช้ใน Claude Cowork สำหรับ build จริง**
> 
> **Last updated:** 16 พฤษภาคม 2026

---

## 📑 สารบัญหลัก

```
PART A: VISION & STRATEGY
  1. Executive Summary
  2. Vision, Positioning, Target
  3. Features ทั้งหมด (4 Phases)

PART B: TECHNICAL FOUNDATION  
  4. Tech Stack
  5. Project Structure
  6. Setup คำสั่งทีละขั้น
  7. Code ที่พร้อมใช้ (Types, Fees, Calculator)
  8. Hooks
  9. Database Schema (Supabase)

PART C: BUILD & LAUNCH
  10. Prompts สำหรับ Claude Cowork
  11. 14-Day Build Order
  12. Deploy + Launch
  13. Fee Rates Strategy
  14. สิ่งที่ห้ามทำใน MVP

PART D: BUSINESS & REVENUE
  15. Monetization Plan
  16. Payment Infrastructure
  17. Conversion Funnel
  18. Pricing Psychology
  19. Retention Strategy
  20. Revenue Roadmap

PART E: REFERENCE
  21. Fee Rates ปัจจุบัน Q1 2026
  22. Legal & Compliance
  23. KPIs & Metrics
  24. Quick Start Day 1
```

---

# 📌 PART A: VISION & STRATEGY


## 1. Executive Summary

### What
**All-in-One Cost & Profit Calculator Platform** สำหรับผู้ประกอบการไทย ครอบคลุม:
- ขายของออนไลน์ (Shopee, Lazada, TikTok, Facebook)
- ร้านอาหาร delivery (Grab, LINE MAN, Foodpanda, ShopeeFood, Robinhood)
- คำนวณต้นทุนเมนู (Recipe with yield)
- สั่งผลิตจากโรงงาน (OEM)

### Why Now
- ตลาด online seller ~500K คน + ร้านอาหาร 700K + OEM 50K = TAM 1.45M users
- ไม่มีคู่แข่งที่ครบทุก module + UX ดี + mobile-first
- Pain ชัด: 60% ของร้านอาหารปิดใน 5 ปีเพราะคำนวณต้นทุนผิด
- AOV ลูกค้าสูง = willing to pay 149-499 บ./เดือน

### How (Differentiation)
- Modular architecture — เริ่ม 1 module ขยายได้
- Mobile-first
- Local platform integration (Thai fees จริง Q1 2026)
- ราคาถูกกว่า FlowAccount 5-10 เท่า
- Solo + AI dev = ship เร็ว

### Target Metrics
```
Month 1:    0-500 บ. (test transactions)
Month 3:    5,000-15,000 บ./เดือน  
Month 6:    20,000-50,000 บ./เดือน
Month 12:   80,000-200,000 บ./เดือน
Year 2:     200,000-500,000 บ./เดือน
```

### Budget Reality
- เริ่มต้น: 5,000 บาท (พอ)
- Break-even: เดือนที่ 4-6
- Profitable: เดือนที่ 6+

---

## 2. Vision, Positioning, Target

### Positioning Statement
> "เว็บเช็กกำไรก่อนขาย สำหรับคนค้าขายและร้านอาหารในไทย — รวมทุก calculator ที่จำเป็นไว้ที่เดียว"

### Tagline (เลือก 1)
- "เช็กก่อนขาย ว่ากำไรเหลือจริงกี่บาท"
- "คำนวณกำไรครบ ทุกแพลตฟอร์ม ใน 30 วินาที"
- "All-in-One Profit Calculator for Thai SMEs"

### Brand Names (ตัวเลือก)
```
1. ChamCalc (จำคำนวณ)        ✅ จำง่าย
2. ChumCalc                  
3. ProfitFirst (.co.th)      ✅ มี meaning
4. PaiKamri (ไป-กำไร)        ✅ Local feel
5. KamriCalc                 ✅ ตรงประเด็น
```

### กลุ่มเป้าหมาย

**Primary (Phase 1):**
- พ่อค้าแม่ค้า Shopee/Lazada/TikTok (~500K คน)
- ร้านอาหาร small-medium ที่ใช้ delivery (~200K คน)

**Secondary (Phase 2-3):**
- เจ้าของแบรนด์ OEM (~50K คน)
- คนทำสตรีทฟู้ด/ขนม
- Freelancer/บริการ

### Pain Points ที่แก้
1. ขายได้แต่ไม่รู้กำไรจริง
2. เข้าร่วมแคมเปญแล้วขาดทุน
3. ไม่รู้ค่าธรรมเนียมแต่ละแพลตฟอร์ม
4. ไม่รู้ว่าควรตั้งราคาขายเท่าไหร่
5. คำนวณต้นทุนเมนูผิด → ปิดร้าน
6. ตั้งราคา OEM ผิด → ขายไม่ออก

### หลักการสำคัญ
- ไม่ทำ ERP ใหญ่
- ไม่ทำระบบบัญชีซับซ้อน
- Lean, เร็ว, ใช้ง่าย, Mobile-first
- หน้าเดียวจบ ตัวเลขใหญ่ ปุ่มใหญ่ สีชัด
- ไม่ใช้ศัพท์บัญชีเยอะ
- คำนวณ realtime
- ไม่ต้องสมัครก็ลองได้

### คำที่ควรใช้ / ห้ามใช้
**✅ ใช้:** กำไรจริง, เหลือกี่บาท, ห้ามขายต่ำกว่า, เสี่ยงขาดทุน, ควรเข้าแคมเปญไหม

**❌ เลี่ยง:** Contribution margin, Gross margin, Net operating profit, Variable cost

### MVP Goal (30 วัน)
มีลูกค้าจ่ายเงินจริงคนแรก (paying customer #1)


---

## 3. Features ทั้งหมด (4 Phases)

### 🟢 Phase 1: MVP (Day 1-14) — สิ่งที่ต้องมีเมื่อ Launch

#### Module 1: Online Seller Calculator
- **Quick Calc** — Shopee/Lazada/TikTok/Facebook คำนวณกำไรต่อชิ้น
- **Compare 4 platforms** — ราคาเดียวเห็นทุก platform
- **Safe Price** — "อยากกำไร X บาท ตั้งราคาเท่าไหร่?"
- **Voucher Impact** — simulate ก่อน join campaign

#### Module 2: Food Delivery Calculator
- **GP Calculator** — Grab/LINE MAN/Foodpanda/ShopeeFood/Robinhood
- **Compare platforms** — เปรียบเทียบทุก delivery app
- **Markup Suggest** — "ขายในแอปเท่าไหร่ถึงเท่าหน้าร้าน"

#### Core Infrastructure
- User System (sign up, login, verify)
- Save & History (3/วัน free, ∞ Pro)
- Payment (GBPrimePay + PromptPay)
- Email System (transactional + marketing)
- Mobile-First UI
- Admin Panel
- User Analytics Dashboard

**รวม Phase 1 = 10 features หลัก**

### 🟡 Phase 2: Growth (Month 2-3)

- **Module 3: Food Cost / Recipe Builder**
  - Ingredient database
  - Yield calculation
  - Batch cooking
  - Menu profitability
- **Templates Marketplace** (BOQ, Quote, Recipes — 99-299 บ.)
- **Affiliate Program** (FlowAccount, ธนาคาร, ประกัน)
- **Referral Program** (ชวนเพื่อนได้ฟรี 1 เดือน)

### 🟠 Phase 3: Scale (Month 4-6)

- **Module 4: Manufacturing/OEM Calculator**
- **Module 5: Live Commerce Calculator**
- **Advanced Analytics** (Cohort, Trend, Forecasting)
- **Integrations** (Shopee/Lazada API)

### 🔴 Phase 4: Advanced (Month 7-12)

- B2B Features (Team, SSO, white-label)
- API Access (B2B revenue)
- Native Mobile App
- AI Features (Pricing recommendation)
- International Expansion

---

### ⚠️ สิ่งที่ห้ามทำใน Phase 1

```
❌ AI features
❌ Mobile app (React Native)
❌ Live commerce calc
❌ Manufacturing module
❌ Team features
❌ API access
❌ Multi-currency
❌ Inventory management
❌ Accounting integration
❌ POS integration
```

**Why?** ทุก feature เพิ่ม = launch ช้า = ไม่ได้เริ่มทำเงิน

---

### Free vs Paid Comparison

| Feature | Free | Pro (149/เดือน) | Business (499/เดือน) |
|---------|------|----------------|---------------------|
| Online Seller Calc | ✓ | ✓ | ✓ |
| Food Delivery Calc | ✓ | ✓ | ✓ |
| Recipe Builder | ✗ | ✓ | ✓ |
| Manufacturing | ✗ | ✗ | ✓ |
| Save | 3/day | ∞ | ∞ |
| History | 7 วัน | ∞ | ∞ |
| Export PDF/Excel | ✗ | ✓ | ✓ |
| Multi-device sync | ✗ | ✓ | ✓ |
| Team members | 1 | 1 | 5 |
| API Access | ✗ | ✗ | ✓ |
| Ad-free | ✗ | ✓ | ✓ |


---

# 📌 PART B: TECHNICAL FOUNDATION

## 4. Tech Stack

```
Framework:    Next.js 15 (App Router) + TypeScript
Styling:      Tailwind CSS v4
UI Library:   shadcn/ui
State:        React useState + localStorage
Forms:        React Hook Form + Zod
Database:     Supabase (Postgres + Auth) — ฟรี 500MB
Email:        Resend — ฟรี 3,000/เดือน
Payment:      GBPrimePay + PromptPay (Phase 1)
              Omise (Phase 2)
Deploy:       Vercel — ฟรี
Analytics:    Plausible หรือ Umami (self-hosted)
Icons:        lucide-react
Font:         Noto Sans Thai (Google Fonts)
Charts:       Recharts (ถ้าจำเป็น)
```

**ทุกตัวฟรี + scale ได้ถึงหลักพันคน + ทำงานกับ Claude Cowork ดี**

### Cost ต่อเดือน (Phase 1)
```
Domain (yearly):       40 บ./เดือน (avg)
Vercel:                ฟรี
Supabase:              ฟรี (500MB)
Resend:                ฟรี (3K emails)
GBPrimePay setup:      ฟรี
Cloudflare:            ฟรี
GitHub:                ฟรี
Claude API:            500-1,500 บ.
─────────────────────────────────
รวม:                  ~600-1,600 บ./เดือน
```

อยู่ในงบ 5,000 บาทสบาย ๆ ในเดือนแรก

---

## 5. Project Structure

```
profit-calc/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout + Noto Sans Thai
│   │   ├── page.tsx                # Landing page
│   │   ├── calc/                   # Calculator pages
│   │   │   ├── online-seller/
│   │   │   │   └── page.tsx
│   │   │   ├── food-delivery/
│   │   │   │   └── page.tsx
│   │   │   └── recipe/             # Phase 2
│   │   │       └── page.tsx
│   │   ├── dashboard/
│   │   │   └── page.tsx            # User dashboard
│   │   ├── pricing/
│   │   │   └── page.tsx
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   ├── signup/
│   │   │   └── verify/
│   │   ├── admin/
│   │   │   └── page.tsx            # Admin panel (whitelisted)
│   │   └── api/
│   │       ├── calculate/
│   │       ├── checkout/
│   │       ├── webhook/
│   │       └── email/
│   ├── components/
│   │   ├── ui/                     # shadcn components
│   │   ├── calculator/
│   │   │   ├── OnlineSellerCalc.tsx
│   │   │   ├── FoodDeliveryCalc.tsx
│   │   │   ├── CompareResults.tsx
│   │   │   └── SavePrompt.tsx
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── MobileNav.tsx
│   │   └── pricing/
│   │       └── PricingCards.tsx
│   ├── lib/
│   │   ├── types.ts                # All TypeScript types
│   │   ├── fees.ts                 # Fee rules per platform
│   │   ├── calculator.ts           # Core calculation logic
│   │   ├── supabase/
│   │   │   ├── client.ts
│   │   │   └── server.ts
│   │   ├── payment.ts              # GBPrimePay integration
│   │   └── utils.ts
│   ├── hooks/
│   │   ├── useCalculator.ts
│   │   ├── useAuth.ts
│   │   └── useSubscription.ts
│   └── types/
│       └── database.ts             # Generated from Supabase
├── public/
│   ├── og-image.png
│   └── favicon.ico
├── .env.local
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

---

## 6. Setup คำสั่งทีละขั้น

### Day 1 — Project Setup

```bash
# 1. Create Next.js project
npx create-next-app@latest profit-calc --typescript --tailwind --app

cd profit-calc

# 2. Install dependencies
npm install @supabase/supabase-js @supabase/ssr
npm install react-hook-form zod @hookform/resolvers
npm install lucide-react
npm install resend
npm install date-fns

# 3. Install shadcn/ui
npx shadcn@latest init
# เลือก: New York, Slate, CSS Variables

# 4. Add components ที่ต้องใช้
npx shadcn@latest add button input label card form select
npx shadcn@latest add dialog toast badge tabs

# 5. Initialize Git
git init
git add .
git commit -m "Initial commit"

# 6. Push to GitHub
gh repo create profit-calc --public --source=. --push
```

### ENV Variables ที่ต้องตั้ง (.env.local)

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Resend (Email)
RESEND_API_KEY=re_xxxxx
RESEND_FROM_EMAIL=noreply@yourdomain.com

# GBPrimePay
GBPRIMEPAY_API_KEY=your-key
GBPRIMEPAY_SECRET=your-secret
GBPRIMEPAY_WEBHOOK_SECRET=your-webhook-secret

# Admin
ADMIN_EMAILS=your@email.com,partner@email.com

# Site
NEXT_PUBLIC_SITE_URL=https://chamcalc.com
```


---

## 7. Code ที่พร้อมใช้

### 7.1 `src/lib/types.ts`

```typescript
// Platform types
export type OnlinePlatform = 'shopee' | 'lazada' | 'tiktok' | 'facebook';
export type DeliveryPlatform = 'grab' | 'lineman' | 'foodpanda' | 'shopeefood' | 'robinhood';

// Shop type for Shopee
export type ShopType = 'mall' | 'non-mall';

// Online Seller Input
export interface OnlineSellerInput {
  platform: OnlinePlatform;
  shopType?: ShopType;
  sellingPrice: number;
  costPrice: number;
  shippingCost: number;
  voucherAmount?: number;
  voucherType?: 'fixed' | 'percent';
  adsCost?: number;
}

// Food Delivery Input
export interface FoodDeliveryInput {
  platform: DeliveryPlatform;
  menuPrice: number;
  foodCost: number;
  paymentMethod?: 'cash' | 'credit_card';
}

// Calculation Output
export interface CalculationOutput {
  grossRevenue: number;
  fees: {
    commission: number;
    transactionFee: number;
    paymentFee: number;
    vat: number;
    other: number;
  };
  totalFees: number;
  netRevenue: number;
  profit: number;
  marginPercent: number;
  status: 'profit' | 'breakeven' | 'loss';
  warning?: string;
  suggestions?: string[];
}

// Fee Rules
export interface FeeRules {
  platform: OnlinePlatform | DeliveryPlatform;
  shopType?: ShopType;
  commissionPercent: number;
  transactionFeePercent: number;
  paymentFeePercent?: number;
  vatPercent: number;
  minCommission?: number;
  maxCommission?: number;
  technicalSupportFee?: number;  // Shopee Feb 2026
  commerceGrowthFee?: number;    // TikTok
  infrastructureFee?: number;     // TikTok
  monthlyFee?: number;            // Foodpanda
  entryFee?: number;              // Foodpanda
  lastUpdated: string;
}
```

### 7.2 `src/lib/fees.ts` (Fee rates Q1 2026)

```typescript
import type { FeeRules } from './types';

export const SHOPEE_FEES: Record<ShopType, FeeRules> = {
  'mall': {
    platform: 'shopee',
    shopType: 'mall',
    commissionPercent: 5.5,        // 3-8% average ~5.5%
    transactionFeePercent: 3.21,
    technicalSupportFee: 5,        // NEW Feb 2026
    vatPercent: 7,
    lastUpdated: '2026-02-01',
  },
  'non-mall': {
    platform: 'shopee',
    shopType: 'non-mall',
    commissionPercent: 3,          // 1-5% average ~3%
    transactionFeePercent: 3.21,
    technicalSupportFee: 5,
    vatPercent: 7,
    lastUpdated: '2026-02-01',
  },
};

export const LAZADA_FEES: FeeRules = {
  platform: 'lazada',
  commissionPercent: 4,            // 2-7% average
  transactionFeePercent: 0,
  paymentFeePercent: 2.14,
  vatPercent: 7,
  lastUpdated: '2026-01-01',
};

export const TIKTOK_FEES: FeeRules = {
  platform: 'tiktok',
  commissionPercent: 5,            // 1-8%
  transactionFeePercent: 3.21,
  commerceGrowthFee: 5.88,        // 5.35-6.42%, cap 199฿
  infrastructureFee: 1.07,        // ต่อออเดอร์
  vatPercent: 7,
  lastUpdated: '2026-03-21',
};

export const FACEBOOK_FEES: FeeRules = {
  platform: 'facebook',
  commissionPercent: 0,
  transactionFeePercent: 0,
  vatPercent: 0,
  lastUpdated: '2026-01-01',
};

// Food Delivery Fees
export const DELIVERY_FEES: Record<DeliveryPlatform, FeeRules> = {
  grab: {
    platform: 'grab',
    commissionPercent: 30,         // 15-30%
    transactionFeePercent: 0,
    vatPercent: 7,
    lastUpdated: '2026-01-01',
  },
  lineman: {
    platform: 'lineman',
    commissionPercent: 30,         // 32.1% รวม VAT
    transactionFeePercent: 0,
    vatPercent: 7,
    lastUpdated: '2026-01-01',
  },
  foodpanda: {
    platform: 'foodpanda',
    commissionPercent: 32,
    transactionFeePercent: 0,
    vatPercent: 7,
    monthlyFee: 99,
    entryFee: 399,
    lastUpdated: '2026-01-01',
  },
  shopeefood: {
    platform: 'shopeefood',
    commissionPercent: 30,
    transactionFeePercent: 0,
    vatPercent: 7,
    lastUpdated: '2026-01-01',
  },
  robinhood: {
    platform: 'robinhood',
    commissionPercent: 0,          // ไม่มี GP
    transactionFeePercent: 0,
    vatPercent: 0,
    lastUpdated: '2026-01-01',
  },
};
```

### 7.3 `src/lib/calculator.ts` (Core Logic)

```typescript
import type {
  OnlineSellerInput,
  FoodDeliveryInput,
  CalculationOutput,
} from './types';
import { SHOPEE_FEES, LAZADA_FEES, TIKTOK_FEES, FACEBOOK_FEES, DELIVERY_FEES } from './fees';

export function calculateOnlineSeller(input: OnlineSellerInput): CalculationOutput {
  const {
    platform,
    shopType = 'non-mall',
    sellingPrice,
    costPrice,
    shippingCost,
    voucherAmount = 0,
    voucherType = 'fixed',
    adsCost = 0,
  } = input;

  // Get fee rules
  let fees;
  if (platform === 'shopee') fees = SHOPEE_FEES[shopType];
  else if (platform === 'lazada') fees = LAZADA_FEES;
  else if (platform === 'tiktok') fees = TIKTOK_FEES;
  else fees = FACEBOOK_FEES;

  // Apply voucher
  const voucherDiscount = voucherType === 'percent' 
    ? sellingPrice * (voucherAmount / 100)
    : voucherAmount;
  const effectivePrice = sellingPrice - voucherDiscount;

  // Calculate fees
  const commission = effectivePrice * (fees.commissionPercent / 100);
  const transactionFee = effectivePrice * (fees.transactionFeePercent / 100);
  const technicalSupportFee = fees.technicalSupportFee 
    ? effectivePrice * (fees.technicalSupportFee / 100) 
    : 0;
  
  // TikTok specific
  const commerceGrowthFee = fees.commerceGrowthFee
    ? Math.min(effectivePrice * (fees.commerceGrowthFee / 100), 199)
    : 0;
  const infrastructureFee = fees.infrastructureFee || 0;

  // VAT on fees
  const vatBase = commission + transactionFee + technicalSupportFee + commerceGrowthFee;
  const vat = vatBase * (fees.vatPercent / 100);

  const totalFees = commission + transactionFee + technicalSupportFee + 
                    commerceGrowthFee + infrastructureFee + vat;

  // Final calculation
  const netRevenue = effectivePrice - totalFees;
  const totalCost = costPrice + shippingCost + adsCost;
  const profit = netRevenue - totalCost;
  const marginPercent = (profit / effectivePrice) * 100;

  return {
    grossRevenue: sellingPrice,
    fees: {
      commission,
      transactionFee,
      paymentFee: 0,
      vat,
      other: technicalSupportFee + commerceGrowthFee + infrastructureFee,
    },
    totalFees,
    netRevenue,
    profit,
    marginPercent,
    status: profit > 0 ? 'profit' : profit === 0 ? 'breakeven' : 'loss',
    warning: profit < 0 ? 'คุณกำลังขาดทุน!' : undefined,
  };
}

export function calculateFoodDelivery(input: FoodDeliveryInput): CalculationOutput {
  const { platform, menuPrice, foodCost, paymentMethod = 'cash' } = input;
  const fees = DELIVERY_FEES[platform];

  // Calculate GP
  const commission = menuPrice * (fees.commissionPercent / 100);
  const vat = commission * (fees.vatPercent / 100);

  // Foodpanda credit card surcharge
  const paymentFee = (platform === 'foodpanda' && paymentMethod === 'credit_card')
    ? menuPrice * 0.03
    : 0;

  const totalFees = commission + vat + paymentFee;
  const netRevenue = menuPrice - totalFees;
  const profit = netRevenue - foodCost;
  const marginPercent = (profit / menuPrice) * 100;

  return {
    grossRevenue: menuPrice,
    fees: {
      commission,
      transactionFee: 0,
      paymentFee,
      vat,
      other: 0,
    },
    totalFees,
    netRevenue,
    profit,
    marginPercent,
    status: profit > 0 ? 'profit' : profit === 0 ? 'breakeven' : 'loss',
    warning: profit < 0 ? `ขาดทุน ${Math.abs(profit).toFixed(2)} บ./ออเดอร์` : undefined,
  };
}

// Suggest selling price for target profit
export function suggestPrice(
  platform: OnlinePlatform,
  costPrice: number,
  shippingCost: number,
  targetProfit: number,
  shopType: ShopType = 'non-mall'
): number {
  // Iterative approach (more accurate)
  let price = costPrice + shippingCost + targetProfit;
  for (let i = 0; i < 10; i++) {
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
```


---

## 8. Hooks

### `src/hooks/useCalculator.ts`

```typescript
'use client';

import { useState, useCallback } from 'react';
import type { 
  OnlineSellerInput, 
  FoodDeliveryInput, 
  CalculationOutput 
} from '@/lib/types';
import { calculateOnlineSeller, calculateFoodDelivery } from '@/lib/calculator';

export function useOnlineSellerCalc() {
  const [result, setResult] = useState<CalculationOutput | null>(null);
  const [history, setHistory] = useState<Array<{
    input: OnlineSellerInput;
    output: CalculationOutput;
    timestamp: string;
  }>>([]);

  const calculate = useCallback((input: OnlineSellerInput) => {
    const output = calculateOnlineSeller(input);
    setResult(output);
    
    // Save to history
    setHistory(prev => [
      { input, output, timestamp: new Date().toISOString() },
      ...prev.slice(0, 9), // Keep last 10
    ]);
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('calc_history_online_seller', JSON.stringify(history));
    }
    
    return output;
  }, [history]);

  const reset = useCallback(() => setResult(null), []);
  
  return { result, history, calculate, reset };
}

export function useFoodDeliveryCalc() {
  const [result, setResult] = useState<CalculationOutput | null>(null);

  const calculate = useCallback((input: FoodDeliveryInput) => {
    const output = calculateFoodDelivery(input);
    setResult(output);
    return output;
  }, []);

  const reset = useCallback(() => setResult(null), []);

  return { result, calculate, reset };
}

// Compare all platforms at once
export function useComparePlatforms() {
  const [results, setResults] = useState<Record<string, CalculationOutput>>({});

  const compare = useCallback((input: Omit<OnlineSellerInput, 'platform'>) => {
    const platforms: OnlinePlatform[] = ['shopee', 'lazada', 'tiktok', 'facebook'];
    const newResults: Record<string, CalculationOutput> = {};
    
    platforms.forEach(platform => {
      newResults[platform] = calculateOnlineSeller({ ...input, platform });
    });
    
    setResults(newResults);
    return newResults;
  }, []);

  return { results, compare };
}
```

---

## 9. Database Schema (Supabase)

```sql
-- ============================================
-- PHASE 1 TABLES
-- ============================================

-- Subscribers (Email list — เริ่มจาก MVP)
CREATE TABLE subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  source TEXT,                    -- 'landing', 'aha_moment', 'pricing'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Users (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT UNIQUE NOT NULL,
  display_name TEXT,
  avatar_url TEXT,
  
  -- Subscription
  subscription_tier TEXT DEFAULT 'free' 
    CHECK (subscription_tier IN ('free', 'pro', 'business', 'lifetime')),
  subscription_status TEXT DEFAULT 'active'
    CHECK (subscription_status IN ('active', 'paused', 'cancelled', 'past_due')),
  subscription_started_at TIMESTAMPTZ,
  subscription_expires_at TIMESTAMPTZ,
  trial_ends_at TIMESTAMPTZ,
  
  -- Stats
  total_calculations INT DEFAULT 0,
  last_active_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Calculations history
CREATE TABLE calculations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  
  module TEXT NOT NULL,          -- 'online-seller', 'food-delivery', 'recipe'
  platform TEXT,                  -- 'shopee', 'grab', etc.
  
  inputs JSONB NOT NULL,
  outputs JSONB NOT NULL,
  
  notes TEXT,
  is_saved BOOLEAN DEFAULT FALSE,  -- บันทึกถาวร
  tags TEXT[],
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_calculations_user ON calculations(user_id, created_at DESC);
CREATE INDEX idx_calculations_saved ON calculations(user_id, is_saved) WHERE is_saved = TRUE;

-- Products (Phase 2 — saved products)
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  
  name TEXT NOT NULL,
  sku TEXT,
  category TEXT,
  
  cost_price NUMERIC,
  shipping_cost NUMERIC,
  
  prices JSONB,                  -- { shopee: 199, lazada: 199, ... }
  
  notes TEXT,
  is_archived BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Fee Rules (for admin to update)
CREATE TABLE fee_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform TEXT NOT NULL,
  shop_type TEXT,
  
  rules JSONB NOT NULL,           -- Full fee config
  
  effective_from DATE NOT NULL,
  effective_to DATE,
  
  notes TEXT,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_fee_rules_active ON fee_rules(platform, shop_type, effective_from DESC);

-- Subscriptions (payment records)
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id),
  
  plan TEXT NOT NULL,             -- 'pro_monthly', 'pro_annual', 'business_monthly', 'lifetime'
  amount NUMERIC NOT NULL,
  currency TEXT DEFAULT 'THB',
  
  payment_provider TEXT,          -- 'gbprimepay', 'omise'
  payment_method TEXT,            -- 'promptpay', 'credit_card', 'truemoney'
  payment_id TEXT,                -- External payment ID
  
  status TEXT DEFAULT 'pending'
    CHECK (status IN ('pending', 'active', 'expired', 'cancelled', 'refunded')),
  
  started_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Webhook logs (for debugging payment)
CREATE TABLE webhook_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider TEXT NOT NULL,
  event_type TEXT,
  payload JSONB,
  processed BOOLEAN DEFAULT FALSE,
  error TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- RLS POLICIES
-- ============================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE calculations ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Profiles: see own + public read for display_name
CREATE POLICY "Users see own profile" ON profiles 
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users update own profile" ON profiles 
  FOR UPDATE USING (auth.uid() = id);

-- Calculations: only own
CREATE POLICY "Users see own calculations" ON calculations 
  FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users create calculations" ON calculations 
  FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users update own calculations" ON calculations 
  FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "Users delete own calculations" ON calculations 
  FOR DELETE USING (user_id = auth.uid());

-- Products: only own
CREATE POLICY "Users manage own products" ON products 
  FOR ALL USING (user_id = auth.uid());

-- Subscriptions: only own
CREATE POLICY "Users see own subscriptions" ON subscriptions 
  FOR SELECT USING (user_id = auth.uid());

-- ============================================
-- FUNCTIONS
-- ============================================

-- Update profile stats trigger
CREATE OR REPLACE FUNCTION update_calculation_stats()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE profiles 
  SET 
    total_calculations = total_calculations + 1,
    last_active_at = NOW()
  WHERE id = NEW.user_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_calculation_created
  AFTER INSERT ON calculations
  FOR EACH ROW
  EXECUTE FUNCTION update_calculation_stats();

-- Check daily save limit for free users
CREATE OR REPLACE FUNCTION check_save_limit(p_user_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  user_tier TEXT;
  daily_count INT;
BEGIN
  SELECT subscription_tier INTO user_tier FROM profiles WHERE id = p_user_id;
  
  IF user_tier != 'free' THEN
    RETURN TRUE; -- Pro/Business: no limit
  END IF;
  
  SELECT COUNT(*) INTO daily_count 
  FROM calculations 
  WHERE user_id = p_user_id 
    AND is_saved = TRUE 
    AND created_at >= CURRENT_DATE;
  
  RETURN daily_count < 3;
END;
$$ LANGUAGE plpgsql;
```


---

# 📌 PART C: BUILD & LAUNCH

## 10. Prompts สำหรับ Claude Cowork

ใช้ prompts เหล่านี้กับ Claude Cowork เพื่อ generate code ทีละส่วน

### Prompt 1: Initial Setup

```
สร้าง Next.js 15 project "profit-calc" ที่:
- TypeScript strict mode
- Tailwind CSS v4
- App Router  
- Mobile-first responsive
- Noto Sans Thai font
- Dark/Light mode toggle
- Setup Supabase client (server + browser)
- Setup shadcn/ui

โครงสร้าง folder ตามที่ระบุใน section 5

อย่าใช้ pages/, ใช้ app/ router
ใช้ Server Components เป็นหลัก
```

### Prompt 2: Database Setup

```
สร้าง Supabase migration files ตาม schema ใน section 9

Requirements:
- All tables with RLS policies
- Indexes สำหรับ performance
- Functions: update_calculation_stats, check_save_limit
- Triggers
- Generate TypeScript types: npx supabase gen types

ใส่ comments อธิบายแต่ละ section
```

### Prompt 3: Calculator Page (หน้าสำคัญที่สุด)

```
สร้าง /calc/online-seller page ที่:

Layout (mobile-first):
- Hero section บนสุด
- Platform selector (Shopee/Lazada/TikTok/Facebook) — chips
- Input form ใหญ่ ๆ:
  * ราคาขาย (THB)
  * ต้นทุน (THB)
  * ค่าส่ง (THB)
  * Voucher (optional, expandable)
  * Ads cost (optional, expandable)

Result card (sticky bottom on mobile):
- "กำไรเหลือ ฿XX" — ตัวเลขใหญ่
- สีเขียวถ้ากำไร, สีแดงถ้าขาดทุน
- "ขายไม่ต่ำกว่า ฿XX" warning
- Tap to expand breakdown

Behavior:
- คำนวณ realtime (debounce 200ms)
- ไม่ต้องสมัครก็ใช้ได้
- บันทึก localStorage 3 รายการ
- หลังคำนวณ 1 ครั้ง → show "บันทึกผลฟรี" CTA
- ขอ email ตรงนี้ → newsletter funnel

ใช้:
- React Hook Form + Zod
- useOnlineSellerCalc hook
- shadcn/ui components
- numeric keyboard hint
- Currency formatter
```

### Prompt 4: Food Delivery Calculator

```
สร้าง /calc/food-delivery page

Similar layout กับ Online Seller แต่:

Input:
- Platform selector (Grab/LINE MAN/Foodpanda/ShopeeFood/Robinhood)
- ราคาเมนูในแอป
- ต้นทุนอาหาร (ถ้ามี recipe จาก Phase 2 → import)
- Payment method (cash/credit card) — สำหรับ Foodpanda

Output:
- เงินที่ได้รับจริง
- กำไรสุทธิ
- Suggested markup: "ที่ร้าน 100 บ. ควรขายในแอป XX บ."

Special: 
- Foodpanda show monthly fee 99 บ. + entry 399 บ.
- Robinhood show "ฟรี GP" badge
- เปรียบเทียบทุก platform ในตารางเดียว
```

### Prompt 5: Compare Platforms Component

```
สร้าง <CompareResults /> component

แสดงผลการคำนวณของทุก platform พร้อมกัน:

Layout:
- Sort by profit (สูงสุดข้างบน)
- ใส่ "⭐ดีที่สุด" badge
- ใส่ "❌ขาดทุน" badge ถ้า loss
- แสดง breakdown ของแต่ละ platform
- Difference จาก best option
- Visual chart (bar chart)

Trigger:
- ใส่ราคา + ต้นทุนใน Online Seller
- กดปุ่ม "เปรียบเทียบทุกแพลตฟอร์ม"

Pro feature: limit 3 compares/day for free
```

### Prompt 6: User System

```
สร้างระบบ Auth ที่:

Pages:
- /signup — Email + password
- /login — Email + password
- /verify — Email verification
- /forgot-password
- /reset-password

Features:
- Supabase Auth integration
- Email verification ผ่าน Resend
- Welcome email หลัง verify
- Auto-create profile row หลัง signup
- Middleware ป้องกัน routes
- Session management

Pages ที่ต้อง auth:
- /dashboard
- /admin (เพิ่ม email whitelist check)
- /settings
- /history (Pro feature)
```

### Prompt 7: Payment Integration (GBPrimePay)

```
สร้าง payment flow ด้วย GBPrimePay:

1. /pricing page:
   - 3 plan cards (Free/Pro/Business)
   - + Lifetime Deal banner
   - Annual discount toggle
   - Trust signals

2. /checkout/[plan] page:
   - Email input (auto-fill if logged in)
   - Payment method picker:
     * PromptPay QR
     * บัตรเครดิต/เดบิต
     * Mobile Banking
     * TrueMoney
   - Apply discount code
   - Total breakdown
   - Submit button

3. API routes:
   - POST /api/checkout/create — สร้าง payment session
   - POST /api/webhook/gbprimepay — รับ webhook
   - POST /api/subscription/cancel
   - POST /api/subscription/pause

4. Webhook handler:
   - Verify signature
   - Update subscription status
   - Send receipt email
   - Update user tier in profiles
   - Log to webhook_logs

5. Success page:
   - "ขอบคุณที่สมัคร!"
   - Quick start guide
   - Link to dashboard

ใช้:
- GBPrimePay official SDK
- Test mode first
- Send receipt via Resend
- Update profiles.subscription_tier
```

### Prompt 8: Admin Panel

```
สร้าง /admin dashboard:

Auth:
- Check user.email against env ADMIN_EMAILS
- Redirect non-admin to /

Pages:
1. /admin (overview)
   - Stats: total users, paid users, MRR, conversions
   - Recent signups
   - Recent payments
   - Charts (users over time, revenue over time)

2. /admin/users
   - List all users
   - Search/filter
   - View user details
   - Manually upgrade/downgrade
   - Issue refunds
   - Send email

3. /admin/fees
   - Manage fee rules per platform
   - Add new fee rule (with effective_from)
   - Mark as effective/expired
   - Audit log

4. /admin/payments
   - All transactions
   - Filter by status
   - Issue refund
   - Resend receipt

5. /admin/emails
   - Email templates
   - Send broadcast
   - View open rates
```

### Prompt 9: Landing Page

```
สร้าง / (landing page) ที่:

Sections:
1. Hero
   - "เช็กก่อนขาย ว่ากำไรเหลือจริงกี่บาท"
   - CTA: [คำนวณเลย — ไม่ต้องสมัคร]
   - Visual: phone mockup
   - Trust: "ใช้แล้ว XXX คน"

2. Problem
   - "คุณกำลังขาดทุน 12 บาท/ออเดอร์ — และไม่รู้?"
   - 3 pain points

3. Solution
   - 3 calculators preview
   - Screenshots

4. Features
   - Grid of features
   - Free vs Paid comparison

5. Social Proof
   - Testimonials (เริ่มจาก beta users)
   - "ใช้ใน X จังหวัด"

6. Pricing
   - Free / Pro / Business cards
   - Annual toggle
   - Lifetime Deal banner

7. FAQ
   - 8-10 common questions

8. CTA
   - "ลองฟรี ไม่ต้องสมัคร"
   - Email capture for newsletter

Performance:
- LCP < 2.5s
- Optimize images (next/image)
- Lazy load below-fold
```

### Prompt 10: Email Templates

```
สร้าง email templates ด้วย Resend:

1. Welcome email
2. Email verification
3. Payment confirmation + receipt
4. Trial ending (D-2, D-1)
5. Renewal reminder (D-7, D-1)
6. Subscription cancelled
7. Win-back (after 30 days churn)
8. Weekly digest (Pro users)
9. Monthly recap

ใช้:
- React Email components
- Resend SDK
- Inline CSS
- Mobile responsive
- Plain text fallback
```


---

## 11. 14-Day Build Order

### Day 1: Project Setup ⚡
```
Morning (4 hrs):
□ เลือก brand name + ซื้อ domain
□ Setup GitHub repo
□ Create Next.js project (Prompt 1)
□ Setup Supabase project (create + get keys)
□ Setup Vercel deployment

Afternoon (4 hrs):
□ Install shadcn/ui + components
□ Setup base layout (Header/Footer)
□ Create landing page skeleton
□ Connect domain to Vercel
□ First deploy

✅ End of Day 1: Live website at custom domain
```

### Day 2: Database & Types
```
Morning:
□ Run all schemas (Prompt 2)
□ Setup RLS policies
□ Generate TypeScript types

Afternoon:
□ Create types.ts, fees.ts, calculator.ts
□ Write unit tests สำหรับ calculator logic
□ Verify ผลตรงกับ manual calculation

✅ End of Day 2: Database + core logic ready
```

### Day 3-4: Online Seller Calculator
```
Day 3:
□ Create /calc/online-seller page (Prompt 3)
□ Form with React Hook Form + Zod
□ Realtime calculation
□ Result card

Day 4:
□ Voucher logic
□ Save to localStorage
□ Compare platforms component (Prompt 5)
□ Mobile testing

✅ End of Day 4: Online Seller calc works end-to-end
```

### Day 5: Food Delivery Calculator
```
□ Create /calc/food-delivery page (Prompt 4)
□ GP calculation for 5 platforms
□ Markup suggestion
□ Mobile optimization

✅ End of Day 5: Both calculators work
```

### Day 6-7: User System
```
Day 6:
□ Setup Supabase Auth (Prompt 6)
□ Signup/Login pages
□ Email verification flow
□ Welcome email

Day 7:
□ Protected routes middleware
□ User dashboard skeleton
□ Profile page
□ Logout

✅ End of Day 7: Users can sign up & login
```

### Day 8-9: Payment Integration
```
Day 8:
□ Apply for GBPrimePay account (start now — approve takes days)
□ Setup pricing page
□ Plan selection logic
□ Checkout flow (Prompt 7)

Day 9:
□ Webhook handler
□ Subscription status updates
□ Receipt email
□ Success page

✅ End of Day 9: Can collect money!
```

### Day 10: Save & History
```
□ Save to database (with limit check)
□ History page (Pro feature)
□ Edit/Delete saved calculations
□ Tag/Category system
```

### Day 11: Admin Panel
```
□ Admin dashboard (Prompt 8)
□ User management
□ Payment management
□ Fee rules management
□ Basic stats
```

### Day 12: Landing Page + SEO
```
□ Complete landing page (Prompt 9)
□ FAQ section
□ Testimonials placeholder
□ next-sitemap setup
□ robots.txt
□ Schema.org markup
□ Open Graph images
□ Google Search Console
```

### Day 13: Email System
```
□ All email templates (Prompt 10)
□ Resend integration
□ Email automation
□ Test all flows
```

### Day 14: Polish & Launch
```
Morning:
□ Test all user flows (real device)
□ Fix critical bugs
□ Cross-browser testing
□ Performance audit (Lighthouse)
□ Setup Plausible/Umami analytics

Afternoon:
□ Soft launch — share with 5-10 close friends
□ Get feedback
□ Fix issues
□ Prepare launch posts

Evening:
□ Public launch! 🚀
□ Post on Pantip
□ Post on Facebook Groups
□ Email waitlist
```

---

## 12. Deploy + Launch

### Vercel Setup

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel --prod

# 4. Connect to GitHub for auto-deploy
# Via Vercel dashboard

# 5. Add ENV variables
# Via Vercel dashboard > Settings > Environment Variables
```

### Custom Domain

```
Option 1: .com (.com)
- Recommended: chamcalc.com / paikamri.com / kamricalc.com
- Cost: $10-15/year (~400 บ./ปี)
- Buy: Namecheap, Cloudflare

Option 2: .co.th
- More local feel
- Need company registration
- Cost: ~500 บ./ปี

Option 3: .th (premium)
- Cost: ~1,500 บ./ปี
```

### Launch Checklist

```
Technical:
□ Custom domain connected
□ SSL certificate active (Vercel auto)
□ Environment variables set
□ Database migrations applied
□ Webhook endpoints live
□ Email DNS records (SPF, DKIM, DMARC)
□ Analytics tracking
□ Error monitoring (Sentry free tier)

Content:
□ Landing page complete
□ Pricing page
□ FAQ page
□ About page
□ Privacy Policy
□ Terms of Service
□ Refund Policy

Marketing:
□ Logo + favicon
□ Open Graph images
□ Social media accounts setup
□ Email signature
□ LINE OA account
□ Launch post drafts ready

Operations:
□ Customer support email ready
□ Refund process documented
□ Tax/accounting plan
□ Backup strategy
```

---

## 13. Fee Rates Strategy

### หลักการ 3 ชั้น

#### ชั้น 1: Manual Master Database
```
- เก็บ fee rules ใน database
- Admin update ผ่าน /admin/fees
- ตรวจทุกสัปดาห์ที่:
  * help.shopee.co.th
  * helpcenter.lazada.co.th
  * seller-th.tiktok.com
- Mark version + effective date
```

#### ชั้น 2: Change Detection
```
- Setup bot ดู page change ของ official help
- Alert ผ่าน LINE OA เมื่อมีการเปลี่ยน
- ใช้ Distill.io หรือ scrapers ง่าย ๆ
```

#### ชั้น 3: User Reports
```
- User flag fee ที่ไม่ตรง
- "Fees ดูแล้วน่าจะเปลี่ยน?" button
- รวบรวม → admin verify
```

### Weekly Routine (2-3 ชม./สัปดาห์)

```
จันทร์: เช็ค Shopee + Lazada
อังคาร: เช็ค TikTok
พุธ: เช็ค Grab + LINE MAN
พฤหัส: เช็ค Foodpanda + ShopeeFood
ศุกร์: Update database + announce changes
```

### แหล่งข้อมูลทางการ

```
Shopee:    https://seller.shopee.co.th/edu/learning-center/
Lazada:    https://university.lazada.co.th/
TikTok:    https://seller-th.tiktok.com/university
Grab:      https://www.grab.com/th/merchant/food/
LINE MAN:  https://lmwn.com/business
Foodpanda: https://shops.foodpanda.com
```

### UI Trust Signals

```
แสดงในผลการคำนวณ:
- "อัปเดต: 15 พ.ค. 2026"
- "ตรวจสอบล่าสุดจาก Shopee ลิงก์"
- "ถ้า fee ไม่ตรง — แจ้งเราเลย"
```

---

## 14. สิ่งที่ห้ามทำใน MVP

```
❌ ระบบบัญชีครบ
❌ Multi-language
❌ Native mobile app
❌ AI features
❌ Team collaboration
❌ Inventory management
❌ Customer database / CRM
❌ Marketing automation
❌ Live commerce calc (Phase 3)
❌ Manufacturing module (Phase 3)
❌ Recipe builder (Phase 2!)
❌ POS integration
❌ Accounting integration
❌ API access
❌ White-label
```

**Why?** Every feature delayed = $0 revenue longer. Ship MVP first, iterate based on real users.


---

# 📌 PART D: BUSINESS & REVENUE

## 15. Monetization Plan

### Revenue Streams

```
1. Subscription (60% ของรายได้):
   Free → Pro → Business → Lifetime
   
2. One-time Templates (20%):
   BOQ, Quote templates 99-299 บ.
   
3. Affiliate (10%):
   FlowAccount, ธนาคาร, ประกัน
   
4. Ads (5%):
   Google AdSense บน free tier
   
5. B2B API (5% Year 1 → 20% Year 2):
   ขาย API ให้ accounting software
```

### Pricing Tiers

```
🟢 FREE (Hook):
- Online Seller calc (full)
- Food Delivery calc (full)
- 3 บันทึก/วัน
- 7 วันประวัติ
- มี ads
- Watermark on exports

🟡 PRO: 149 บ./เดือน หรือ 1,490 บ./ปี ⭐
- ทุก calculators
- Unlimited บันทึก
- Unlimited history
- Export PDF/Excel
- Multi-device sync
- Ad-free
- Email reports

🔴 BUSINESS: 499 บ./เดือน หรือ 4,990 บ./ปี
- ทุกอย่างใน Pro
- Recipe builder (Phase 2)
- Manufacturing calc (Phase 3)
- 5 team members
- API access (Phase 4)
- Priority support
- Custom branding

💎 LIFETIME (Early bird): 1,990 บ./ครั้งเดียว
- Pro features forever
- จำกัด 100 คนแรก
- ใช้เป็น launch hype
```

### Launch Promotion (3 เดือนแรก)

```
Month 1:  Lifetime Deal at 990 บ. (50% off, 50 คน)
Month 2:  Annual 40% off (1,490 → 894 บ.)
Month 3:  Pro 1 บาทเดือนแรก, then 149/เดือน
```

### Unit Economics Target

```
Per Pro user:
  ARPU:   149 บ./เดือน
  CAC:    150-200 บ.
  LTV (8 months): 1,192 บ.
  LTV/CAC: 6-8x ✅

Per Business user:
  ARPU:   499 บ./เดือน
  CAC:    300-500 บ.
  LTV (18 months): 8,982 บ.
  LTV/CAC: 18-30x ✅✅
```

### Upgrade Triggers (Free → Paid)

```
Trigger 1: Save limit
"คุณบันทึกครบ 3 รายการวันนี้
 Upgrade Pro = unlimited"

Trigger 2: Export
"Export PDF เฉพาะ Pro
 ลอง 7 วันฟรี"

Trigger 3: Compare platforms
"Compare มากกว่า 1 ครั้ง/วัน = Pro"

Trigger 4: History
"ดูประวัติย้อนหลังเกิน 7 วัน = Pro"

Trigger 5: Multi-device
"Sync มือถือ+คอม = Pro"
```

---

## 16. Payment Infrastructure

### Recommended: GBPrimePay + PromptPay

```
✅ Setup ฟรี (ไม่มีค่าแรกเข้า)
✅ ค่าธรรมเนียมต่ำ:
   - PromptPay: 0.65%
   - บัตรเครดิต: 2.85%
   - Mobile Banking: 1-2%
✅ Subscription billing
✅ Mobile-friendly checkout
✅ ไม่ต้องมีบริษัทตอนแรก
✅ Approve 3-5 วัน
```

### Payment Methods (Priority)

```
Day 1 (ต้องมี):
✅ PromptPay QR (0.65%)
✅ บัตรเครดิต/เดบิต (2.85%)
✅ Mobile Banking (1-2%)

Month 2:
✅ TrueMoney Wallet (1.5%)
✅ Rabbit LINE Pay (1.5%)

Month 6:
✅ Bank transfer manual (ยอดใหญ่)
✅ ผ่อน 0% (Lifetime Deal)
```

### Payment Flow Architecture

```
User clicks "Subscribe Pro"
    ↓
/checkout page (1 หน้าจอ)
    ↓
POST /api/checkout/create
    ↓
GBPrimePay session created
    ↓
User chooses payment method
    ↓
GBPrimePay handles payment
    ↓
Webhook → /api/webhook/gbprimepay
    ↓
Update subscription in DB
    ↓
Send receipt email
    ↓
Redirect to /success
```

### Fees Example (Month 6, 100 paid users)

```
Pro monthly (60 × 149):           8,940 บ.
Pro annual (30 × 1,490/12):       3,725 บ.
Business (10 × 499):              4,990 บ.
Templates (50 × 99):              4,950 บ.
─────────────────────────────────────────
Revenue total:                   22,605 บ.
Gateway fee (2.85% avg):           -644 บ.
─────────────────────────────────────────
Net:                             21,961 บ.
```

---

## 17. Conversion Funnel

### Funnel Stages

```
Visitor (100%)
    ↓ Optimize: Landing page
Try Calc (60%)
    ↓ Optimize: No signup wall
Aha Moment (40%)
    ↓ Optimize: "ขาดทุน 12 บาท!"
Email Captured (25%)
    ↓ Optimize: Save prompt
Sign Up (15%)
    ↓ Optimize: Onboarding
Activated (10%)
    ↓ Optimize: Daily use habit
Start Trial (5%)
    ↓ Optimize: 7-day no card
Paid Customer (2%)
    ↓ Optimize: Retention
Renewed (1.7%)
```

### Aha Moment Design

```
หลังคำนวณครั้งแรก:
┌────────────────────────────────────┐
│ ผลลัพธ์:                            │
│ ╔════════════════════════════════╗ │
│ ║ คุณกำลังขาดทุน 12 บาท/ออเดอร์! ║ │
│ ╚════════════════════════════════╝ │
│                                    │
│ ราคาขาย:        100 บาท             │
│ ต้นทุนแฝง:     112 บาท              │
│                                    │
│ คุณคิดว่ากำไร แต่จริงๆ ขาดทุน  │
│                                    │
│ [💾 บันทึกผลลัพธ์ฟรี]                │
└────────────────────────────────────┘
```

### Friction Points (ที่จะขอเงิน)

```
Hook → Save Limit → Export → Compare → Sync → Premium Features
   ↓        ↓          ↓         ↓        ↓          ↓
 ฟรี    3/วัน      Pro      3/วัน    Pro       Pro/Biz
```

---

## 18. Pricing Psychology

### Trick 1: Anchor Pricing
```
3 tiers แสดง:
- Free
- Pro 149 บ.     ⭐ POPULAR
- Business 499 บ.

→ คน anchor ที่ Pro (กลาง = ปกติ)
```

### Trick 2: Annual Discount
```
Monthly: 149 × 12 = 1,788 บ./ปี
Annual:  1,490 บ./ปี
Save:    298 บ. (17%)

Show: "Save 298 บ.ต่อปี"
Result: 30-40% เลือก annual
```

### Trick 3: Free Trial ไม่ต้องบัตรเครดิต
```
"ลอง 7 วันฟรี — ไม่ต้องใส่บัตร"

vs ตามขนบ:
- with card: 5-10% trial → paid
- without card: 15-25% sign up → 20-30% paid
```

### Trick 4: Scarcity (Lifetime Deal)
```
"💎 จำกัด 100 คนแรก
   ราคา 1,990 บ. (ปกติ 4,470 บ./3 ปี)
   เหลือ: 73 ที่นั่ง"
```

### Trick 5: Social Proof
```
"⭐⭐⭐⭐⭐ จากผู้ใช้ 2,847 คน"
"กำลังใช้อยู่ตอนนี้: 23 คน"
"คุณ A จากภูเก็ต สมัครเมื่อ 5 นาทีที่แล้ว"
```

### Trick 6: Money-back Guarantee
```
"ไม่พอใจ คืนเงิน 30 วัน"

Limit: 1 refund/email lifetime
```

---

## 19. Retention Strategy

### Day 1: Welcome Sequence

```
Email 1 (immediate):
"เริ่มต้นกับ [BrandName] — 3 ขั้นตอนแรก"

Email 2 (Day 2):
"คุณยังไม่ได้ลอง [feature X]"

Email 3 (Day 5):
"คนอื่นใช้ยังไง — case study"
```

### Day 7: Trial Ending

```
Email Day 5: "ทดลองเหลือ 2 วัน"
Email Day 6: "พรุ่งนี้ trial หมด + testimonials + 5% off"
```

### Day 30: First Month Recap

```
"30 วันแรกของคุณ:
 - คำนวณ 47 ครั้ง
 - ประหยัดเวลา 23 ชั่วโมง
 - พบสินค้าที่ขาดทุน 12 รายการ"
```

### Monthly: Value Recap

```
"เดือนนี้คุณใช้ ChamCalc 47 ครั้ง
 ราคา 149 บ. = 6 บ./วัน
              = ไม่ถึงค่ากาแฟ ☕"
```

### Cancellation Flow

```
Step 1: ถามเหตุผล
  [ ] แพงเกินไป
  [ ] ไม่ได้ใช้
  [ ] Feature ขาด
  [ ] คู่แข่ง
  [ ] อื่นๆ

Step 2: Counter offer
  แพง   → 50% off 2 เดือน
  ไม่ใช้ → Pause 1-3 เดือน
  ขาด   → Roadmap + email when ready
  คู่แข่ง → Extended trial

Step 3: ถ้ายัง cancel
  Win-back email 30 วันหลัง
```

---

## 20. Revenue Roadmap

### Month 1: Foundation
```
Target: 0-500 บ./เดือน
Lifetime Deals: 10 × 1,990 = 19,900 บ. (one-time)
```

### Month 2-3: Soft Launch
```
Target: 5,000-15,000 บ./เดือน
- Pro × 5-15 × 149
- Lifetime × 5-10
- Templates × 20-50 × 99
```

### Month 4-6: Growth
```
Target: 20,000-50,000 บ./เดือน
- Pro × 50-100
- Business × 5-10
- Annual subscribers
- Affiliate revenue starts
```

### Month 7-12: Scale
```
Target: 80,000-200,000 บ./เดือน
- Pro × 200-500
- Business × 30-50
- B2B starts
- Multi-module live
```

### Year 2: Maturity
```
Target: 200,000-500,000 บ./เดือน
= 2.4M-6M บาท/ปี
```


---

# 📌 PART E: REFERENCE

## 21. Fee Rates ปัจจุบัน Q1 2026

### Shopee Thailand

```
Commission:
- Mall:      3-8% (avg 5-6%)
- Non-Mall:  1-5% (avg 3%)

Transaction Fee:    3.21% (รวม VAT)
Technical Support:  5% (NEW Feb 2026)
VAT:                7% on fees

แหล่ง: seller.shopee.co.th
```

### Lazada Thailand

```
Commission:         2-7% (varies by category)
Payment Fee:        2.14%
COD Surcharge:      2%
VAT:                7%

แหล่ง: university.lazada.co.th
```

### TikTok Shop Thailand

```
Commission:           1-8% (avg 3-5%)
Transaction Fee:      3.21%
Commerce Growth:      5.35-6.42% (cap 199 บ./รายการ)
Infrastructure Fee:   1.07 บ./ออเดอร์
VAT:                  7%

⚠️ NEW: 21 มี.ค. 2026 — Transaction fee formula changed
       Now includes platform subsidy

แหล่ง: seller-th.tiktok.com
```

### Facebook / LINE OA

```
No platform fees!

ระวัง:
- COD reject rate ~15%
- ค่าส่งคืน
- ค่าจ้าง admin ตอบลูกค้า
```

### Food Delivery (Q1 2026)

```
GrabFood:    30% (15-30% varies) + VAT 7%
LINE MAN:    30% = 32.1% รวม VAT
Foodpanda:   32% + ค่าแรกเข้า 399 + รายเดือน 99
             - 3% บัตรเครดิต
ShopeeFood:  ~30% + VAT 7%
Robinhood:   0% (ไม่มี GP)
```

### ภาษีไทย

```
WHT (หักภาษี ณ ที่จ่าย):  0.5% (e-commerce)
VAT:                       7%
PND.94:                    บุคคลธรรมดา (ปลายปี)
PND.50:                    บริษัท
```

---

## 22. Legal & Compliance

### Phase 1 (ก่อน launch — บังคับ)

```
✅ Terms of Service
   - Tool, not accounting advice
   - Liability disclaimer
   - Refund policy
   - Dispute resolution

✅ Privacy Policy (PDPA)
   - ข้อมูลที่เก็บ
   - วัตถุประสงค์
   - Legal basis (Legitimate Interest + Consent)
   - User rights

✅ Refund Policy
   - 7 หรือ 30 วัน
   - Conditions
   - Process

✅ Receipt/Invoice template
   - VAT 7% (ถ้าจดทะเบียน VAT)
   - WHT info
   - Tax invoice format
```

### Phase 2 (เดือน 2-3)

```
✅ จดทะเบียนพาณิชย์
   - บุคคลธรรมดาก่อน OK
   - รายได้ > 1.8M/ปี → บริษัท
   
✅ ภาษี
   - PND.94 (บุคคล)
   - VAT 7% ถ้ารายได้ > 1.8M/ปี
   - WHT 3% (ลูกค้า B2B หัก)

✅ Accounting
   - FlowAccount หรือ PEAK
   - แยก business vs personal
```

### Phase 3 (Year 1 end)

```
✅ จดทะเบียนบริษัท
   - Limited Company
   - ค่าใช้จ่ายแรก ~15,000 บ.
   - รายปี ~10,000 บ. (บัญชี)

✅ Trademark
   - ชื่อแบรนด์ + Logo
   - Cost: 5,000-15,000 บ.

✅ Professional Liability Insurance
   - 10,000-30,000 บ./ปี
```

### Legal Templates (ใช้ได้)

```
Privacy Policy:    https://pdpa.pro/
Terms of Service:  termly.io
Refund Policy:     write yourself based on:
                   - 7 days (digital)
                   - 30 days (annual)
                   - Process: email support
```

---

## 23. KPIs & Metrics

### Track ตั้งแต่ Day 1

#### Acquisition
```
- DAU/MAU
- Traffic sources
- CAC (Cost per acquisition)
- Conversion: visitor → signup
```

#### Activation
```
- Time to first calculation
- % users complete first calc
- Aha moment trigger rate
- Email capture rate
```

#### Revenue
```
- MRR (Monthly Recurring Revenue)
- ARR (Annual Recurring Revenue)
- ARPU (Average Revenue Per User)
- LTV (Lifetime Value)
- LTV/CAC ratio (target: 3+)
```

#### Retention
```
- Monthly churn rate
- Net Revenue Retention
- Free → Paid conversion %
- Annual renewal rate
```

### Tracking Tools

```
✅ Plausible / Umami (analytics)
✅ GBPrimePay dashboard
✅ Google Search Console
✅ Microsoft Clarity (UX heatmaps)
✅ Custom Supabase queries

Example SQL:
SELECT 
  date_trunc('month', created_at) as month,
  COUNT(*) FILTER (WHERE event = 'visit') as visits,
  COUNT(*) FILTER (WHERE event = 'signup') as signups,
  COUNT(*) FILTER (WHERE event = 'paid') as paid_customers
FROM events
GROUP BY 1;
```

### Dashboard Targets

```
Week 1 post-launch:
- 100 visitors
- 20 calculations
- 5 emails captured
- 0-2 paid

Month 1:
- 1,000 visitors
- 300 calculations
- 100 emails
- 5-15 paid users

Month 3:
- 5,000 visitors
- 2,000 calculations
- 500 emails
- 30-50 paid users
- MRR: 5,000-15,000 บ.

Month 6:
- 20,000 visitors
- 10,000 calculations
- 2,000 emails
- 100-200 paid users
- MRR: 20,000-50,000 บ.

Month 12:
- 50,000 visitors
- 30,000 calculations
- 5,000 emails
- 300-500 paid users
- MRR: 80,000-200,000 บ.
```

---

## 24. Quick Start Day 1

### Morning (3-4 ชม.)

```
□ เลือก brand name (1 ชม.)
  ตัวเลือก: ChamCalc / PaiKamri / ProfitFirst / KamriCalc

□ Check + ซื้อ domain (30 นาที)
  - Namecheap หรือ Cloudflare Registrar
  - .com preferred (400-500 บ./ปี)

□ Sign up บัญชี (30 นาที):
  - GitHub (ฟรี)
  - Vercel (ฟรี)
  - Supabase (ฟรี)
  - Resend (ฟรี 3K emails)
  - Cloudflare (ฟรี)
  - GBPrimePay (จะ approve 3-5 วัน)

□ Setup development environment (1 ชม.)
  - Install Node.js (ถ้ายังไม่มี)
  - Install Claude Cowork
  - Setup VS Code / Cursor
```

### Afternoon (3-4 ชม.)

```
□ Create Next.js project (Prompt 1) — 30 นาที
□ Setup Tailwind + shadcn/ui — 30 นาที
□ Create base layout (Header/Footer) — 1 ชม.
□ Deploy "Coming Soon" page to Vercel — 30 นาที
□ Connect custom domain — 30 นาที
□ Test deployment — 30 นาที
```

### Evening Optional

```
□ Setup Supabase schema (Prompt 2)
□ Create types.ts + fees.ts
□ Write first calculator function
□ Test with manual data
```

### End of Day 1 Goals

```
✅ Domain ซื้อแล้ว
✅ Web live ที่ url จริง
✅ "Coming Soon" page + email capture
✅ GitHub repo ตั้งขึ้นแล้ว
✅ Supabase schema ready
✅ Posted commitment (Twitter/Facebook)
```

---

# 🎯 SUMMARY — สิ่งที่ต้องจำ

## 3 Truths ที่ต้องยึด

```
1. Done > Perfect
   Launch ที่ 70% ดีกว่าค้างที่ 100% นาน 6 เดือน

2. SEO เป็น oxygen
   เขียน 1 article/วัน ขั้นต่ำ ตั้งแต่วันแรก

3. Survive first, scale later
   Boring + profitable > Exciting + bankrupt
```

## Anti-Pivot Pledge

```
□ ไม่ research idea ใหม่จนกว่าจะ launch
□ ไม่ pivot ระหว่างทาง
□ ติด → ถาม "วิธีแก้" ไม่ใช่ "ทางอื่น"
□ Track progress ทุกสัปดาห์
□ Launch ใน 14 วัน
```

## เลขที่ต้องจำ

```
Budget Day 1:           5,000 บ. (พอ)
Domain:                 400 บ./ปี
Cost/month Phase 1:     600-1,600 บ.
Time to launch:         14 วัน
Time to first paid:     30 วัน
Time to break-even:     4-6 เดือน
Year 1 target:          1.2-2.4M บาท
Year 2 target:          2.4-6M บาท
```

## Pricing สรุปสุดท้าย

```
Free:        0 บ.
Pro:         149 บ./เดือน  หรือ 1,490 บ./ปี
Business:    499 บ./เดือน  หรือ 4,990 บ./ปี
Lifetime:    1,990 บ. (จำกัด 100 คน)
```

---

# 📞 CONTACT & RESOURCES

## หากติด → ถาม Claude
```
✅ "Supabase RLS policy เขียนยังไง"
✅ "ส่งอีเมลผ่าน Resend ทำยังไง"
✅ "ปวดหัวเรื่อง fee calculation ของ TikTok"
✅ "Webhook handler debug ยังไง"

❌ "ลอง pivot เป็น... ดีไหม"
❌ "ไอเดียอื่นน่าทำกว่าไหม"
❌ "ขอ research เพิ่ม..."
```

## Communities ที่ดี

```
Pantip:    ห้องค้าขายออนไลน์, ร้านอาหาร
Facebook:  กลุ่มแม่ค้าออนไลน์
Indie Hackers: indiehackers.com (English)
Reddit:    r/SaaS, r/Entrepreneur
Twitter:   #buildinpublic
```

---

**สร้างเมื่อ: 16 พฤษภาคม 2026**
**สำหรับ: Claude Cowork**
**Status: Ready to Build 🚀**

---

# 🎬 NOW — GO BUILD!

