/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/robokassa/result/route.ts
import { robokassa } from "@/lib/robokassa";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData.entries());

    if (!robokassa.checkPayment(data as any)) {
      console.error("Invalid signature received:", {
        received: data.SignatureValue,
        data: data,
      });
      return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
    }

    const invId = data.InvId as string;
    const amount = parseFloat(data.OutSum as string);

    // Находим и обновляем заказ
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

    console.log("Payment successful:", {
      invId,
      amount,
      order: updatedOrder,
    });

    // Здесь можно добавить отправку уведомлений
    // await sendNotification(updatedOrder);
    // console.log()

    return new Response(`OK${invId}`, {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  } catch (error) {
    console.error("Robokassa callback error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
