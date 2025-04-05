// app/api/send-email/route.ts

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  const body = await request.json();

  const { name, email, message } = body;

  // ⚠️ Настрой SMTP-транспорт (пример ниже для Gmail)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NEXT_PUBLIC_SMTP_USER, // ваш email
      pass: process.env.NEXT_PUBLIC_SMTP_PASS, // пароль или app password
    },
  });

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: process.env.SMTP_TO || process.env.SMTP_USER, // кому отправить
    subject: `Новое сообщение с формы от ${name}`,
    text: `
Имя: ${name}
Email: ${email}
Сообщение: ${message}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Ошибка при отправке email:", error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
