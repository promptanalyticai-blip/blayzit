// app/api/blayzit/analysis/route.ts

import { NextResponse } from "next/server";
import { Blayzit } from "@/services/blayzit";

export async function GET() {
  try {
    const analysis = await Blayzit.analisis();

    return NextResponse.json({
      ok: true,
      analysis,
    });
  } catch (error) {
    console.error("BLAYZIT ANALYSIS ERROR:", error);
    return NextResponse.json(
      { error: "Error interno en BLAYZIT ANALYSIS." },
      { status: 500 }
    );
  }
}
