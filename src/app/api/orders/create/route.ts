/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/orders/create/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Helper function to validate and parse date
function parseDate(dateValue: any): Date | null {
  if (!dateValue) return null;

  const date = new Date(dateValue);
  // Check if date is valid
  if (isNaN(date.getTime())) {
    return null;
  }

  return date;
}

// Helper function to validate required dates
function validateRequiredDate(dateValue: any, fieldName: string): Date {
  const date = parseDate(dateValue);
  if (!date) {
    throw new Error(`Invalid or missing ${fieldName}`);
  }
  return date;
}

export async function POST(request: Request) {
  try {
    const orderData = await request.json();

    // Validate applicants data before creating order
    const validatedApplicants = orderData.data.map(
      (applicant: any, index: number) => {
        try {
          return {
            lastName: applicant.lastName || "",
            firstName: applicant.firstName || "",
            middleName: applicant.middleName || "",
            birthDate: validateRequiredDate(
              applicant.birthDate,
              `birthDate for applicant ${index + 1}`
            ),
            gender: applicant.gender || "",
            tourType: applicant.tourType || "",
            visaType: applicant.visaType || "",
            visaTypeTwo: applicant.visaTypeTwo || "",
            passportNumber: applicant.passportNumber || "",
            passportExpiryDate: validateRequiredDate(
              applicant.passportExpiryDate,
              `passportExpiryDate for applicant ${index + 1}`
            ),
            entryDate: validateRequiredDate(
              applicant.entryDate,
              `entryDate for applicant ${index + 1}`
            ),
            exitDate: validateRequiredDate(
              applicant.exitDate,
              `exitDate for applicant ${index + 1}`
            ),
            citizenship: applicant.citizenship || "",
            tripPurpose: applicant.tripPurpose || "",
            itinerary: applicant.itinerary || "",
            additionalInfo: applicant.additionalInfo || "",
            visaTime: applicant.visaTime || "",
            price: applicant.price || 0,
          };
        } catch (error) {
          throw new Error(
            `Validation error for applicant ${index + 1}: ${error instanceof Error ? error.message : "Unknown error"}`
          );
        }
      }
    );

    const newOrder = await prisma.order.create({
      data: {
        invId: orderData.invId, // Используем переданный invId вместо генерации нового
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
          create: validatedApplicants,
        },
      },
      include: {
        applicants: true,
      },
    });

    return NextResponse.json(newOrder);
  } catch (error) {
    console.error("Error creating order:", error);

    // Return more specific error message
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
