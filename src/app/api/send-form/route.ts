// src/app/api/send/route.ts

import { Resend } from "resend";
import { NextResponse } from "next/server";
import {
  FormTemplate,
  VisaApplicationEmailProps,
} from "@/components/blocks/templates";

const resend = new Resend(process.env.MAIL_KEY);

export async function POST(req: Request) {
  try {
    const body: VisaApplicationEmailProps = await req.json();

    const { error } = await resend.emails.send({
      from: "applicans@visarussia24.ru",
      to: "applicans@visarussia24.ru",
      subject: `Новая заявка`,
      react: FormTemplate({ ...body }) as React.ReactElement,
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
