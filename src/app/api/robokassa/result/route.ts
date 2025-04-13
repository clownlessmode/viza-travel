/* eslint-disable @typescript-eslint/no-explicit-any */
import { robokassa } from "@/lib/robokassa";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Resend } from "resend";
import { DATAVIZA } from "@/app/data";

export const dynamic = "force-dynamic";

interface RobokassaCallbackData {
  InvId: string;
  OutSum: string;
  SignatureValue?: string;
  [key: string]: any;
}
const resend = new Resend(process.env.MAIL_KEY);

export async function POST(request: Request) {
  let callbackData: RobokassaCallbackData | null = null;

  try {
    const formData = await request.formData();
    callbackData = Object.fromEntries(
      formData.entries()
    ) as RobokassaCallbackData;

    // Валидация подписи
    if (!robokassa.checkPayment(callbackData)) {
      console.error("Invalid signature received:", {
        received: callbackData.SignatureValue,
        data: callbackData,
      });
      return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
    }

    const invId = callbackData.InvId;
    const amount = parseFloat(callbackData.OutSum);

    // 1. Сначала проверяем существование заказа
    const existingOrder = await prisma.order.findUnique({
      where: { invId },
    });

    if (!existingOrder) {
      console.error("Order not found for invId:", invId);
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // 2. Обновляем заказ
    const updatedOrder = await prisma.order.update({
      where: { invId },
      data: {
        status: "Оплачено",
        amount,
        updatedAt: new Date(),
      },
      include: {
        applicants: true,
      },
    });

    console.log("Payment successfully processed:", {
      invId,
      amount,
      orderId: updatedOrder.id,
    });
    const getLabelByValues = (value: string) => {
      return DATAVIZA.find(
        (citizenship) => citizenship.id.toString() === value
      );
    };
    // Форматируем текст письма
    const emailText = `
Оплата заявки #${updatedOrder.id}

Данные платежа:
- ID платежа: ${invId}
- Сумма: ${amount} руб.
- Статус: ${updatedOrder.status}
- Дата оплаты: ${new Date().toLocaleString("ru-RU")}

Информация о заказе:
- Тип визы: ${updatedOrder.vizaType}
- Доп. тип визы: ${updatedOrder.vizaTypeTwo || "Не указано"}
- Количество человек: ${updatedOrder.peoples}
- Гражданство: ${updatedOrder.citizenship}
- Цена первого этапа: ${updatedOrder.firstStepPrice} руб.
- Контактный телефон: ${updatedOrder.phone}
- Email: ${updatedOrder.email}
- Предпочтительный способ связи: ${updatedOrder.preferredContact}

Список заявителей:
${updatedOrder.applicants
  .map(
    (applicant, index) => `
Заявитель ${index + 1}:
- ФИО: ${applicant.lastName} ${applicant.firstName} ${applicant.middleName || ""}
- Дата рождения: ${applicant.birthDate.toLocaleDateString("ru-RU")}
- Пол: ${applicant.gender === "male" ? "Мужской" : "Женский"}
- Тип тура: ${applicant.tourType}
- Тип визы: ${applicant.visaType}
- Доп. тип визы: ${applicant.visaTypeTwo || "Не указано"}
- Номер паспорта: ${applicant.passportNumber}
- Срок действия паспорта: ${applicant.passportExpiryDate.toLocaleDateString("ru-RU")}
- Дата въезда: ${applicant.entryDate.toLocaleDateString("ru-RU")}
- Дата выезда: ${applicant.exitDate.toLocaleDateString("ru-RU")}
- Гражданство: ${getLabelByValues(applicant.citizenship)?.country}
- Цель поездки: ${applicant.tripPurpose}
- Маршрут: ${applicant.itinerary}
- Срок визы: ${applicant.visaTime}
- Стоимость: ${applicant.price} руб.
${applicant.additionalInfo ? `- Доп. информация: ${applicant.additionalInfo}\n` : ""}
`
  )
  .join("\n")}

Дата создания заявки: ${updatedOrder.createdAt.toLocaleString("ru-RU")}
Дата обновления: ${updatedOrder.updatedAt.toLocaleString("ru-RU")}
`;

    // Отправляем текстовое письмо
    const { error } = await resend.emails.send({
      from: "applicans@visarussia24.ru",
      to: "visarussia24@mail.ru",
      subject: `Оплата заявки #${updatedOrder.id}`,
      text: emailText,
    });

    if (error) {
      console.error("Failed to send payment notification:", error);
    } else {
      console.log("Payment notification sent successfully");
    }

    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    // Здесь можно добавить отправку уведомлений
    // await sendPaymentNotification(updatedOrder);

    return new Response(`OK${invId}`, {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  } catch (error) {
    console.error("Robokassa callback processing failed:", {
      error,
      data: callbackData || {},
    });
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
