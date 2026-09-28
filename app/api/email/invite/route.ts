//app/api/email/invite/route.ts

import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { email, company, workspace, link } = await req.json();

    const html = `
      <h2>Invitación a ${company}</h2>
      <p>Has sido invitado a unirte al workspace <strong>${workspace}</strong>.</p>
      <p>Haz clic aquí para aceptar la invitación:</p>
      <a href="${link}">${link}</a>
    `;

    const data = await resend.emails.send({
      from: "invitations@resend.dev",
      to: email,
      subject: `Invitación a ${company}`,
      html,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
