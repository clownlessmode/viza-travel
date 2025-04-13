/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/orders/create/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const orderData = await request.json();

    const newOrder = await prisma.order.create({
      data: {
        invId: generateInvId(), // Генерация уникального ID
        status: "Не оплачено",
        amount: orderData.amount, // Будет обновлено после оплаты
        citizenship: orderData.citizenship,
        vizaType: orderData.vizaType,
        peoples: orderData.peoples,
        firstStepPrice: orderData.firstStepPrice,
        vizaTypeTwo: orderData.vizaTypeTwo,
        phone: orderData.phone,
        email: orderData.email,
        preferredContact: orderData.preferredContact,
        applicants: {
          create: orderData.data.map((applicant: any) => ({
            lastName: applicant.lastName,
            firstName: applicant.firstName,
            middleName: applicant.middleName,
            birthDate: new Date(applicant.birthDate),
            gender: applicant.gender,
            tourType: applicant.tourType,
            visaType: applicant.visaType,
            visaTypeTwo: applicant.visaTypeTwo,
            passportNumber: applicant.passportNumber,
            passportExpiryDate: new Date(applicant.passportExpiryDate),
            entryDate: new Date(applicant.entryDate),
            exitDate: new Date(applicant.exitDate),
            citizenship: applicant.citizenship,
            tripPurpose: applicant.tripPurpose,
            itinerary: applicant.itinerary,
            additionalInfo: applicant.additionalInfo,
            visaTime: applicant.visaTime,
            price: applicant.price,
          })),
        },
      },
      include: {
        applicants: true,
      },
    });

    return NextResponse.json(newOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

function generateInvId() {
  return Math.floor(100000000 + Math.random() * 900000000).toString();
}
