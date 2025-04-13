// app/api/payment/route.ts
import { robokassa } from "@/lib/robokassa";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const amount = Number(searchParams.get("amount"));

  const description = searchParams.get("description") || "Payment";
  const email = searchParams.get("email") as string | undefined;
  const invId = Number(searchParams.get("orderId"));
  console.log(invId);

  if (!amount || isNaN(amount)) {
    return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
  }

  const paymentUrl = robokassa.generatePaymentUrl({
    outSum: amount, //amount,
    invId,
    description,
    email,
    receipt: {
      items: [
        {
          sum: amount,
          name: "Туристическая услуга",
          quantity: 1,
          payment_method: "full_payment",
          payment_object: "service",
          tax: "none",
        },
      ],
      email,
    },
  });
  console.log(paymentUrl, "PAYMENT URLS");
  return NextResponse.json({ paymentUrl });
}
