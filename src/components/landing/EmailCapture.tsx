"use client";

import { useState } from "react";
import { Loader2, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Status = "idle" | "loading" | "success" | "error";

export function EmailCapture() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "landing-coming-soon" }),
      });

      const data = (await res.json()) as { ok?: boolean; error?: string };

      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? "เกิดข้อผิดพลาด ลองใหม่อีกครั้ง");
      }

      setStatus("success");
      setMessage("ขอบคุณ! เราจะแจ้งเมื่อพร้อมใช้งาน 🎉");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "เกิดข้อผิดพลาด");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-primary/30 bg-primary/5 p-4 text-sm text-primary">
        {message}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
      <div className="relative flex-1">
        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email@example.com"
          className="h-12 pl-9"
          disabled={status === "loading"}
        />
      </div>
      <Button
        type="submit"
        size="xl"
        disabled={status === "loading"}
        className="h-12"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            กำลังส่ง...
          </>
        ) : (
          "แจ้งเตือนฉัน"
        )}
      </Button>
      {status === "error" && (
        <p className="absolute mt-14 text-xs text-destructive">{message}</p>
      )}
    </form>
  );
}
