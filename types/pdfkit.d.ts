//types/pdfkit.d.ts
declare module "pdfkit" {
  export default class PDFDocument {
    constructor(options?: any);
    text(text: string, x?: number, y?: number): this;
    pipe(stream: any): this;
    end(): void;
  }
}
