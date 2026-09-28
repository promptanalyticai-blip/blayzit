// core/blayzit/registry.ts

import { Blayzit } from "@/services/blayzit";

export const BlayzitRegistry = {
  engine: Blayzit.ejecutar,
  analysis: Blayzit.analisis,
  config: Blayzit.config,
  utils: Blayzit.utils,
};
