// core/blayzit/commands.ts

import { BlayzitCore } from "./engine";

export const EngineCommands = {
  list() {
    return {
      comandos: [
        "run <prompt>",
        "analysis",
        "last",
        "total",
        "items",
        "help",
        "clear",
      ],
    };
  },

  async execute(cmd: string, args: string[]) {
    switch (cmd) {
      case "run": {
        const prompt = args.join(" ").trim();
        if (!prompt) return { error: "Debes ingresar un prompt." };

        const resultado = await BlayzitCore.ejecutar(prompt);

        return {
          ok: true,
          type: "run",
          prompt,
          resultado,
        };
      }

      case "analysis": {
        const analysis = await BlayzitCore.analisis();
        return {
          ok: true,
          type: "analysis",
          ...analysis,
        };
      }

      case "last": {
        const hist = BlayzitCore.getHistorial();
        const last = hist[hist.length - 1] ?? null;

        return {
          ok: true,
          type: "last",
          last,
        };
      }

      case "total": {
        const total = BlayzitCore.getHistorial().length;
        return {
          ok: true,
          type: "total",
          total,
        };
      }

      case "items": {
        const items = BlayzitCore.getHistorial();
        return {
          ok: true,
          type: "items",
          items,
        };
      }

      case "clear": {
        BlayzitCore.clear();
        return {
          ok: true,
          type: "clear",
          message: "Historial limpiado.",
        };
      }

      case "help": {
        return {
          ok: true,
          type: "help",
          comandos: this.list().comandos,
        };
      }

      default:
        return {
          ok: false,
          error: `Comando desconocido: ${cmd}`,
        };
    }
  },
};
