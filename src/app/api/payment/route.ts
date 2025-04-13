// app/api/payment/route.ts
import { robokassa } from "@/lib/robokassa";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const amount = Number(searchParams.get("amount"));

  const description = searchParams.get("description") || "Payment";
  const email = searchParams.get("email") as string | undefined;
  // const userId = searchParams.get("userId") || "guest";
  const invId = Math.floor(Date.now() / 1000);

  if (!amount || isNaN(amount)) {
    return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
  }

  const paymentUrl = robokassa.generatePaymentUrl({
    outSum: 2, //amount,
    invId,
    description,
    email,
    isTest: true,
  });

  return NextResponse.json({ paymentUrl });
}
