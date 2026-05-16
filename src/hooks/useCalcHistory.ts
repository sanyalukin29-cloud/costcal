"use client";

import { useCallback, useEffect, useState } from "react";

import type {
  CalculationOutput,
  OnlineSellerInput,
} from "@/lib/types";

export interface HistoryEntry {
  id: string;
  input: OnlineSellerInput;
  output: CalculationOutput;
  savedAt: string; // ISO timestamp
  label?: string;
}

const STORAGE_KEY = "costcal:history:online-seller";
const FREE_LIMIT = 3;

/**
 * Persistent calculation history kept in localStorage.
 * Free tier is capped at FREE_LIMIT entries; older items are evicted FIFO.
 */
export function useCalcHistory(limit: number = FREE_LIMIT) {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as HistoryEntry[];
        if (Array.isArray(parsed)) setHistory(parsed);
      }
    } catch {
      // Corrupt entry — ignore and start fresh.
    } finally {
      setLoaded(true);
    }
  }, []);

  // Persist on change
  useEffect(() => {
    if (!loaded || typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch {
      // Quota exceeded or disabled — silently swallow.
    }
  }, [history, loaded]);

  const isFull = history.length >= limit;

  const save = useCallback(
    (
      input: OnlineSellerInput,
      output: CalculationOutput,
      label?: string,
    ): { ok: boolean; reason?: string } => {
      if (history.length >= limit) {
        return {
          ok: false,
          reason: `บันทึกครบ ${limit} รายการ — Upgrade Pro = unlimited`,
        };
      }
      const entry: HistoryEntry = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        input,
        output,
        savedAt: new Date().toISOString(),
        label,
      };
      setHistory((prev) => [entry, ...prev]);
      return { ok: true };
    },
    [history.length, limit],
  );

  const remove = useCallback((id: string) => {
    setHistory((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const clear = useCallback(() => setHistory([]), []);

  return { history, save, remove, clear, isFull, loaded, limit };
}
