// pages/api/send-email.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_PUBLIC_MAIL_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { name, email, tel, checkbox1, checkbox2 } = req.body;

    const { error } = await resend.emails.send({
      from: "support@vizarussia24.ru",
      to: "eclipselucky@gmail.com",
      subject: `Новая заявка от ${name}`,
      text: `Имя: ${name}\nEmail: ${email}\nТелефон: ${tel}\nЧекбокс 1: ${checkbox1}\nЧекбокс 2: ${checkbox2}`,
    });

    if (error) {
      return res.status(400).json({ error });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Ошибка при отправке письма:", err);
    res.status(500).json({ message: "Server Error" });
  }
}
