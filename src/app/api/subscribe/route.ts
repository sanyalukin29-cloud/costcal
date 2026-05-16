import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { email?: string; source?: string };
    const email = body.email?.trim().toLowerCase();
    const source = body.source ?? "unknown";

    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json(
        { ok: false, error: "อีเมลไม่ถูกต้อง" },
        { status: 400 },
      );
    }

    // If Supabase isn't configured yet, accept the email but don't persist.
    // This keeps the form working during initial deploy.
    const hasSupabase =
      Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
      Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

    if (!hasSupabase) {
      console.log("[subscribe] (no supabase) email captured:", email, source);
      return NextResponse.json({ ok: true, persisted: false });
    }

    const supabase = await createClient();
    const { error } = await supabase
      .from("subscribers")
      .insert({ email, source });

    if (error) {
      // Duplicate is fine — treat as success.
      if (error.code === "23505") {
        return NextResponse.json({ ok: true, duplicate: true });
      }
      console.error("[subscribe] supabase error:", error);
      return NextResponse.json(
        { ok: false, error: "บันทึกไม่สำเร็จ ลองใหม่อีกครั้ง" },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[subscribe] unexpected error:", err);
    return NextResponse.json(
      { ok: false, error: "เกิดข้อผิดพลาด" },
      { status: 500 },
    );
  }
}
