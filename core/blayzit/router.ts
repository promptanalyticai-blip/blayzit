// core/blayzit/router.ts

import { EngineCommands } from "./commands";

const ALIAS: Record<string, string> = {
  h: "help",
  a: "analysis",
  l: "last",
  t: "total",
  i: "items",
  r: "run",
};

export const BlayzitRouter = {
  resolve(cmd: string) {
    return ALIAS[cmd] ?? cmd;
  },

  async handle(input: string) {
    if (!input || typeof input !== "string") {
      return { error: "Comando inválido." };
    }

    const parts = input.trim().split(" ");
    const rawCmd = parts[0].toLowerCase();
    const cmd = this.resolve(rawCmd);
    const args = parts.slice(1);

    if (cmd === "help") {
      return {
        ok: true,
        type: "help",
        comandos: EngineCommands.list().comandos,
      };
    }

    const result = await EngineCommands.execute(cmd, args);

    return {
      ok: !result?.error,
      ...result,
    };
  },
};
