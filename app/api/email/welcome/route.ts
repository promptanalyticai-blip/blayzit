//app/api/email/welcome/route.ts

import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email, name } = await req.json();

    const html = `
      <h2>Bienvenido a PromptAnalyticAI</h2>
      <p>Hola ${name}, tu cuenta ha sido creada exitosamente.</p>
      <p>Tu empresa y workspace inicial ya están listos.</p>
    `;

    const data = await resend.emails.send({
      from: "welcome@resend.dev",
      to: email,
      subject: "¡Bienvenido!",
      html,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
