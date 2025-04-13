/* eslint-disable @typescript-eslint/no-explicit-any */
import { robokassa } from "@/lib/robokassa";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

interface RobokassaCallbackData {
  InvId: string;
  OutSum: string;
  SignatureValue?: string;
  [key: string]: any;
}

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
