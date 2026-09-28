// app/api/blayzit/run/route.ts

import { NextResponse } from "next/server";
import { Blayzit } from "@/services/blayzit";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Prompt inválido." },
        { status: 400 }
      );
    }

    const resultado = await Blayzit.ejecutar(prompt);

    return NextResponse.json({
      ok: true,
      resultado,
    });
  } catch (error) {
    console.error("BLAYZIT RUN ERROR:", error);
    return NextResponse.json(
      { error: "Error interno en BLAYZIT RUN." },
      { status: 500 }
    );
  }
}
