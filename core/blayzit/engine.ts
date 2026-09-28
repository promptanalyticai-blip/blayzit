// core/blayzit/engine.ts

type RegistroBLZ = {
  id: string;
  prompt: string;
  resultado: any;
  fecha: string;
};

class BlayzitEngine {
  private historial: RegistroBLZ[] = [];

  private generarId() {
    return crypto.randomUUID();
  }

  async ejecutar(prompt: string) {
    const resultado = {
      output: `Resultado generado para: ${prompt}`,
      timestamp: Date.now(),
    };

    const registro: RegistroBLZ = {
      id: this.generarId(),
      prompt,
      resultado,
      fecha: new Date().toISOString(),
    };

    this.historial.push(registro);

    return resultado;
  }

  async analisis() {
    const total = this.historial.length;
    const ultimo = total > 0 ? this.historial[total - 1] : null;

    return {
      total,
      ultimoPrompt: ultimo?.prompt ?? null,
      ultimoResultado: ultimo?.resultado ?? null,
      items: this.historial,
    };
  }

  getHistorial() {
    return [...this.historial];
  }

  clear() {
    this.historial = [];
    return { ok: true };
  }
}

export const BlayzitCore = new BlayzitEngine();
