// ui/blayzit/terminal-bridge.ts
"use client";

import { BlayzitRouter } from "@/core/blayzit/router";

export async function ejecutarComandoTerminal(input: string) {
  try {
    const res = await BlayzitRouter.handle(input);

    return {
      ok: true,
      data: res,
    };
  } catch (error) {
    return {
      ok: false,
      error: "Error ejecutando comando en BLAYZIT",
    };
  }
}
