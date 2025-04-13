// src/app/api/send/route.ts

import { Resend } from "resend";
import { NextResponse } from "next/server";
import { ReadyTemplate } from "@/components/blocks/templates";

const resend = new Resend(process.env.MAIL_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, tel } = body;

    const { error } = await resend.emails.send({
      from: "applicans@visarussia24.ru",
      to: "visarussia24@mail.ru",
      subject: `Новая заявка на связь от ${name}`,
      react: ReadyTemplate({
        email,
        name,
        tel,
      }) as React.ReactElement,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Ошибка сервера:", err);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
