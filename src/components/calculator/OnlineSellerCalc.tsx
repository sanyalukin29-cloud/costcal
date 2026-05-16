"use client";

import { useEffect, useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type UseFormRegisterReturn } from "react-hook-form";
import {
  ChevronDown,
  ChevronUp,
  History,
  Save,
  Trash2,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCalcHistory } from "@/hooks/useCalcHistory";
import { useDebounce } from "@/hooks/useDebounce";
import { calculateOnlineSeller } from "@/lib/calculator";
import {
  onlineSellerSchema,
  type OnlineSellerFormValues,
} from "@/lib/schemas/onlineSeller";
import type { OnlinePlatform } from "@/lib/types";
import { cn, formatTHB } from "@/lib/utils";

const PLATFORMS: { id: OnlinePlatform; label: string; emoji: string }[] = [
  { id: "shopee", label: "Shopee", emoji: "🛍️" },
  { id: "lazada", label: "Lazada", emoji: "🛒" },
  { id: "tiktok", label: "TikTok", emoji: "🎵" },
  { id: "facebook", label: "Facebook", emoji: "📘" },
];

const DEFAULT_VALUES: OnlineSellerFormValues = {
  platform: "shopee",
  shopType: "non-mall",
  sellingPrice: 0,
  costPrice: 0,
  shippingCost: 0,
};

export function OnlineSellerCalc() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<OnlineSellerFormValues>({
    resolver: zodResolver(onlineSellerSchema),
    defaultValues: DEFAULT_VALUES,
    mode: "onChange",
  });

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [savedToast, setSavedToast] = useState<string | null>(null);

  const values = watch();
  const debouncedValues = useDebounce(values, 200);
  const platform = values.platform;

  // Realtime calculation. Only run when fields parse OK.
  const result = useMemo(() => {
    const parsed = onlineSellerSchema.safeParse(debouncedValues);
    if (!parsed.success) return null;
    if (parsed.data.sellingPrice <= 0) return null;
    return calculateOnlineSeller(parsed.data);
  }, [debouncedValues]);

  const { history, save, remove, isFull, limit, loaded } = useCalcHistory();

  function handleSave() {
    const parsed = onlineSellerSchema.safeParse(values);
    if (!parsed.success || !result) return;
    const res = save(parsed.data, result);
    setSavedToast(
      res.ok ? "บันทึกแล้ว ✓" : (res.reason ?? "บันทึกไม่ได้"),
    );
    setTimeout(() => setSavedToast(null), 3000);
  }

  // Auto-clear toast on input change
  useEffect(() => {
    if (savedToast) setSavedToast(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValues]);

  return (
    <div className="grid gap-6 md:grid-cols-[1fr,360px]">
      {/* ─── Form ─── */}
      <div className="space-y-6">
        {/* Platform selector */}
        <div>
          <Label className="mb-2 block">เลือกแพลตฟอร์ม</Label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {PLATFORMS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setValue("platform", p.id, { shouldValidate: true })}
                className={cn(
                  "rounded-lg border-2 p-3 text-sm font-medium transition-colors",
                  platform === p.id
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-background hover:border-primary/40",
                )}
              >
                <span className="mr-1 text-base">{p.emoji}</span>
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Shopee shop type */}
        {platform === "shopee" && (
          <div>
            <Label className="mb-2 block">ประเภทร้าน</Label>
            <div className="grid grid-cols-2 gap-2">
              {(["non-mall", "mall"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setValue("shopType", t, { shouldValidate: true })}
                  className={cn(
                    "rounded-lg border p-2 text-sm transition-colors",
                    values.shopType === t
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-background hover:border-primary/40",
                  )}
                >
                  {t === "mall" ? "Mall (3-8%)" : "Non-Mall (1-5%)"}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Required fields */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Field
            id="sellingPrice"
            label="ราคาขาย (฿)"
            register={register("sellingPrice")}
            error={errors.sellingPrice?.message}
            placeholder="0"
            autoFocus
          />
          <Field
            id="costPrice"
            label="ต้นทุน (฿)"
            register={register("costPrice")}
            error={errors.costPrice?.message}
            placeholder="0"
          />
          <Field
            id="shippingCost"
            label="ค่าส่ง (฿)"
            register={register("shippingCost")}
            error={errors.shippingCost?.message}
            placeholder="0"
          />
        </div>

        {/* Advanced toggle */}
        <button
          type="button"
          onClick={() => setShowAdvanced((s) => !s)}
          className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          {showAdvanced ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          ตัวเลือกเพิ่มเติม (Voucher / โฆษณา)
        </button>

        {showAdvanced && (
          <div className="grid gap-4 rounded-lg border bg-muted/30 p-4 sm:grid-cols-2">
            <div className="sm:col-span-2 grid grid-cols-[1fr,140px] gap-2">
              <Field
                id="voucherAmount"
                label="ส่วนลด Voucher"
                register={register("voucherAmount")}
                error={errors.voucherAmount?.message}
                placeholder="0"
              />
              <div>
                <Label className="mb-2 block">หน่วย</Label>
                <select
                  {...register("voucherType")}
                  className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                >
                  <option value="fixed">บาท (฿)</option>
                  <option value="percent">เปอร์เซ็นต์ (%)</option>
                </select>
              </div>
            </div>
            <Field
              id="adsCost"
              label="ค่าโฆษณาต่อชิ้น (฿)"
              register={register("adsCost")}
              error={errors.adsCost?.message}
              placeholder="0"
            />
          </div>
        )}

        {/* History */}
        {loaded && history.length > 0 && (
          <div className="rounded-lg border bg-card p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-medium">
                <History className="h-4 w-4" />
                บันทึกล่าสุด ({history.length}/{limit})
              </div>
              {isFull && (
                <span className="text-xs text-muted-foreground">เต็มแล้ว — Upgrade Pro</span>
              )}
            </div>
            <ul className="space-y-2">
              {history.map((h) => (
                <li
                  key={h.id}
                  className="flex items-center justify-between gap-2 rounded-md bg-muted/40 px-3 py-2 text-sm"
                >
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-medium">
                      {h.input.platform.toUpperCase()} · ขาย {formatTHB(h.input.sellingPrice)}
                    </div>
                    <div
                      className={cn(
                        "text-xs",
                        h.output.profit > 0 ? "text-primary" : "text-destructive",
                      )}
                    >
                      กำไร {formatTHB(h.output.profit)} ({h.output.marginPercent.toFixed(1)}%)
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(h.id)}
                    className="text-muted-foreground transition-colors hover:text-destructive"
                    aria-label="ลบ"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* ─── Result card (sticky on desktop, bottom on mobile) ─── */}
      <ResultPanel
        result={result}
        onSave={handleSave}
        canSave={!isFull && result !== null}
        savedToast={savedToast}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

interface FieldProps {
  id: string;
  label: string;
  register: UseFormRegisterReturn;
  error?: string;
  placeholder?: string;
  autoFocus?: boolean;
}

function Field({ id, label, register, error, placeholder, autoFocus }: FieldProps) {
  return (
    <div>
      <Label htmlFor={id} className="mb-2 block">
        {label}
      </Label>
      <Input
        id={id}
        type="number"
        inputMode="decimal"
        step="0.01"
        min="0"
        placeholder={placeholder}
        autoFocus={autoFocus}
        className={cn(error && "border-destructive")}
        {...register}
      />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}

interface ResultPanelProps {
  result: ReturnType<typeof calculateOnlineSeller> | null;
  onSave: () => void;
  canSave: boolean;
  savedToast: string | null;
}

function ResultPanel({ result, onSave, canSave, savedToast }: ResultPanelProps) {
  return (
    <div className="md:sticky md:top-20 md:self-start">
      <Card
        className={cn(
          "overflow-hidden",
          result?.status === "loss" && "border-destructive/40",
          result?.status === "profit" && "border-primary/40",
        )}
      >
        <CardContent className="p-6">
          {!result ? (
            <div className="py-12 text-center text-sm text-muted-foreground">
              กรอกราคาขาย → เห็นกำไรทันที
            </div>
          ) : (
            <>
              <div className="text-xs font-medium text-muted-foreground">
                กำไรเหลือ
              </div>
              <div
                className={cn(
                  "mt-1 flex items-baseline gap-2 text-4xl font-bold tracking-tight",
                  result.status === "profit" && "text-primary",
                  result.status === "loss" && "text-destructive",
                )}
              >
                {result.status === "profit" && <TrendingUp className="h-6 w-6" />}
                {result.status === "loss" && <TrendingDown className="h-6 w-6" />}
                {formatTHB(result.profit)}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                Margin {result.marginPercent.toFixed(1)}%
              </div>

              {result.warning && (
                <div
                  className={cn(
                    "mt-3 rounded-md px-3 py-2 text-sm",
                    result.status === "loss"
                      ? "bg-destructive/10 text-destructive"
                      : "bg-amber-500/10 text-amber-700 dark:text-amber-400",
                  )}
                >
                  ⚠️ {result.warning}
                </div>
              )}

              {/* Breakdown */}
              <details className="group mt-4 border-t pt-4">
                <summary className="cursor-pointer list-none text-sm font-medium">
                  <span className="inline-flex items-center gap-1">
                    <ChevronDown className="h-3 w-3 transition-transform group-open:rotate-180" />
                    ดู breakdown
                  </span>
                </summary>
                <dl className="mt-3 space-y-1 text-sm">
                  <Row k="ราคาขาย" v={formatTHB(result.grossRevenue)} />
                  {result.effectivePrice !== result.grossRevenue && (
                    <Row k="หลังหัก Voucher" v={formatTHB(result.effectivePrice)} />
                  )}
                  <Row k="ค่าธรรมเนียม Commission" v={`-${formatTHB(result.fees.commission)}`} />
                  {result.fees.transactionFee > 0 && (
                    <Row k="Transaction Fee" v={`-${formatTHB(result.fees.transactionFee)}`} />
                  )}
                  {result.fees.paymentFee > 0 && (
                    <Row k="Payment Fee" v={`-${formatTHB(result.fees.paymentFee)}`} />
                  )}
                  {result.fees.other > 0 && (
                    <Row k="ค่าธรรมเนียมอื่น" v={`-${formatTHB(result.fees.other)}`} />
                  )}
                  <Row k="VAT" v={`-${formatTHB(result.fees.vat)}`} />
                  <div className="my-2 h-px bg-border" />
                  <Row k="เงินที่ได้รับสุทธิ" v={formatTHB(result.netRevenue)} bold />
                  <Row k="ต้นทุน + ค่าส่ง" v={`-${formatTHB(result.totalCost)}`} />
                  <Row
                    k="กำไร"
                    v={formatTHB(result.profit)}
                    bold
                    color={result.status === "loss" ? "text-destructive" : "text-primary"}
                  />
                </dl>
              </details>

              {result.suggestions && result.suggestions.length > 0 && (
                <div className="mt-3 space-y-1 rounded-md bg-muted/40 p-3 text-xs text-muted-foreground">
                  {result.suggestions.map((s, i) => (
                    <div key={i}>💡 {s}</div>
                  ))}
                </div>
              )}

              <Button
                type="button"
                onClick={onSave}
                disabled={!canSave}
                className="mt-4 w-full"
                size="lg"
              >
                <Save className="h-4 w-4" />
                {canSave ? "บันทึกผลลัพธ์ฟรี" : "บันทึกครบแล้ว"}
              </Button>

              {savedToast && (
                <div className="mt-2 text-center text-xs text-muted-foreground">
                  {savedToast}
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function Row({
  k,
  v,
  bold,
  color,
}: {
  k: string;
  v: string;
  bold?: boolean;
  color?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4",
        bold && "font-semibold",
        color,
      )}
    >
      <dt className="text-muted-foreground">{k}</dt>
      <dd>{v}</dd>
    </div>
  );
}
