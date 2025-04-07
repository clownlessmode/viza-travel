// src/app/api/send/route.ts

import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.MAIL_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, tel, checkbox1, checkbox2 } = body;

    const { error } = await resend.emails.send({
      from: "support@visarussia24.ru",
      to: "eclipselucky@gmail.com",
      subject: `Новая заявка от ${name}`,
      text: `Имя: ${name}\nEmail: ${email}\nТелефон: ${tel}\nЧекбокс 1: ${checkbox1}\nЧекбокс 2: ${checkbox2}`,
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
