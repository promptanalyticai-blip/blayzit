// services/blayzit.ts
export const Blayzit = {
  async ejecutar(prompt) {
    return BlayzitCore.ejecutar(prompt);
  },
  async analisis() {
    return BlayzitCore.analisis();
  },
};
