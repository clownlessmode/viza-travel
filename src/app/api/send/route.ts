// src/app/api/send/route.ts

import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.MAIL_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, tel } = body;

    const { error } = await resend.emails.send({
      from: "support@visarussia24.ru",
      to: "eclipselucky@gmail.com",
      subject: `Новая заявка от ${name}`,
      html: ` <div
    style={{
      fontFamily: "Arial, sans-serif",
      maxWidth: "600px",
      margin: "0 auto",
      padding: "24px",
      border: "1px solid #eaeaea",
      borderRadius: "8px",
      backgroundColor: "#f9f9f9",
    }}
  >
    <h2 style={{ color: "#333", textAlign: "center" }}>
      📬 Новая заявка на связь
    </h2>
    <p style={{ fontSize: "16px", color: "#555" }}>
      Вы получили новую заявку с сайта. Ниже приведены данные пользователя:
    </p>

    <table
      style={{
        width: "100%",
        marginTop: "20px",
        fontSize: "16px",
        color: "#333",
      }}
    >
      <tbody>
        <tr>
          <td style={{ padding: "8px", fontWeight: "bold", width: "120px" }}>
            Имя:
          </td>
          <td style={{ padding: "8px" }}>${name}</td>
        </tr>
        <tr style={{ backgroundColor: "#f0f0f0" }}>
          <td style={{ padding: "8px", fontWeight: "bold" }}>Телефон:</td>
          <td style={{ padding: "8px" }}>${tel}</td>
        </tr>
        <tr>
          <td style={{ padding: "8px", fontWeight: "bold" }}>Email:</td>
          <td style={{ padding: "8px" }}>${email}</td>
        </tr>
      </tbody>
    </table>

    <p style={{ marginTop: "30px", fontSize: "14px", color: "#999" }}>
      Письмо сгенерировано автоматически. Пожалуйста, не отвечайте на него.
    </p>
  </div>`,
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
