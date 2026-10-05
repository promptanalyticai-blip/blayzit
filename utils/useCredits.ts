//utils/useCredits.ts
"use client";

import { useEffect, useState } from "react";
import { getCredits } from "./getCredits";

export function useCredits(userId: string) {
  const [credits, setCredits] = useState<number>(0);

  useEffect(() => {
    async function load() {
      const c = await getCredits(userId);
      setCredits(c);
    }
    load();
  }, [userId]);

  return credits;
}
