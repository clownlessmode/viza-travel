/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/robokassa/result/route.ts
import { robokassa } from "@/lib/robokassa";
import { NextResponse } from "next/server";

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

    console.log("Payment successful:", {
      invId: data.InvId,
      amount: data.OutSum,
      userId: data.shp_user_id,
    });

    return new Response(`OK${data.InvId}`, {
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
