// ui/blayzit/use-blayzit-client.ts
"use client";

import { useState } from "react";
import { BLZClient } from "@/lib/blayzit-client";

export function useBlayzitClient() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  async function ejecutar(prompt: string) {
    setLoading(true);
    const res = await BLZClient.ejecutar(prompt);
    setLoading(false);

    if (!res.ok) {
      setError(res.error);
      return res;
    }

    setError(null);
    setData(res);
    return res;
  }

  async function analisis() {
    setLoading(true);
    const res = await BLZClient.analisis();
    setLoading(false);

    if (!res.ok) {
      setError(res.error);
      return res;
    }

    setError(null);
    setData(res);
    return res;
  }

  async function last() {
    setLoading(true);
    const res = await BLZClient.last();
    setLoading(false);

    if (!res.ok) {
      setError(res.error);
      return res;
    }

    setError(null);
    setData(res);
    return res;
  }

  async function total() {
    setLoading(true);
    const res = await BLZClient.total();
    setLoading(false);

    if (!res.ok) {
      setError(res.error);
      return res;
    }

    setError(null);
    setData(res);
    return res;
  }

  async function items() {
    setLoading(true);
    const res = await BLZClient.items();
    setLoading(false);

    if (!res.ok) {
      setError(res.error);
      return res;
    }

    setError(null);
    setData(res);
    return res;
  }

  async function clear() {
    setLoading(true);
    const res = await BLZClient.clear();
    setLoading(false);

    if (!res.ok) {
      setError(res.error);
      return res;
    }

    setError(null);
    setData(res);
    return res;
  }

  return {
    ejecutar,
    analisis,
    last,
    total,
    items,
    clear,
    loading,
    data,
    error,
  };
}
