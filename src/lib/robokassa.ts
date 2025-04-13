// lib/robokassa.ts
import { createHash } from "crypto";
import { URLSearchParams } from "url";

export class RobokassaService {
  private merchantLogin: string;
  private password1: string;
  private password2: string;
  private isTest: boolean;

  constructor(config: {
    merchantLogin: string;
    password1: string;
    password2: string;
    isTest?: boolean;
  }) {
    this.merchantLogin = config.merchantLogin;
    this.password1 = config.password1;
    this.password2 = config.password2;
    this.isTest = config.isTest || false;
  }

  private calculateSignature(...args: (string | number)[]): string {
    const joined = args.map(String).join(":");
    return createHash("md5").update(joined).digest("hex");
  }

  private formatReceipt(receipt: {
    items: Array<{
      sum: number;
      name: string;
      quantity: number;
      payment_method: string;
      payment_object: string;
      tax: string;
    }>;
    email?: string;
  }): Record<string, string> {
    const receiptParams: Record<string, string> = {};

    if (receipt.email) {
      receiptParams["Receipt.Email"] = receipt.email;
    }

    receipt.items.forEach((item, index) => {
      const prefix = `Receipt.Items[${index}]`;
      receiptParams[`${prefix}.Name`] = item.name;
      receiptParams[`${prefix}.Quantity`] = item.quantity.toString();
      receiptParams[`${prefix}.Sum`] = item.sum.toString();
      receiptParams[`${prefix}.PaymentMethod`] = item.payment_method;
      receiptParams[`${prefix}.PaymentObject`] = item.payment_object;
      receiptParams[`${prefix}.Tax`] = "none";
    });

    return receiptParams;
  }

  generatePaymentUrl(params: {
    outSum: number;
    invId: number;
    description: string;
    userParameters?: Record<string, string>;
    email?: string;
    receipt?: {
      items: Array<{
        sum: number;
        name: string;
        quantity: number;
        payment_method: string;
        payment_object: string;
        tax: string;
      }>;
      email?: string;
    };
    isTest?: boolean;
  }): string {
    const {
      outSum,
      invId,
      description,
      userParameters = {},
      receipt,
      email,
      isTest,
    } = params;

    // Сортируем userParameters по алфавиту
    const sortedUserParams = Object.keys(userParameters)
      .sort()
      .reduce(
        (acc, key) => {
          acc[key] = userParameters[key];
          return acc;
        },
        {} as Record<string, string>
      );

    // Формируем параметры чека
    const receiptParams = receipt ? this.formatReceipt(receipt) : {};

    // Формируем подпись
    const signatureBase = [
      this.merchantLogin,
      outSum,
      invId,
      ...Object.entries(sortedUserParams).flat(),
      ...Object.entries(receiptParams).flat(),
      this.password1,
    ];

    const signature = this.calculateSignature(...signatureBase);

    // Формируем URL
    const urlParams = new URLSearchParams({
      MerchantLogin: this.merchantLogin,
      OutSum: outSum.toString(),
      InvId: invId.toString(),
      Description: description,
      SignatureValue: signature,
      IsTest: isTest || this.isTest ? "1" : "0",
      ...(email && { Email: email }),
      ...sortedUserParams,
      ...receiptParams,
    });

    return `https://auth.robokassa.ru/Merchant/Index.aspx?${urlParams.toString()}`;
  }

  checkPayment(params: Record<string, string>): boolean {
    const requiredFields = ["OutSum", "InvId", "SignatureValue"];
    for (const field of requiredFields) {
      if (!params[field]) return false;
    }

    // Выделяем shp_ параметры и сортируем их
    const shpParams = Object.keys(params)
      .filter((key) => key.toLowerCase().startsWith("shp_"))
      .sort()
      .reduce(
        (acc, key) => {
          acc[key] = params[key];
          return acc;
        },
        {} as Record<string, string>
      );

    const signatureBase = [
      params["OutSum"],
      params["InvId"],
      ...Object.entries(shpParams).flat(),
      this.password2,
    ];

    const expectedSignature = this.calculateSignature(...signatureBase);
    return (
      params["SignatureValue"].toLowerCase() === expectedSignature.toLowerCase()
    );
  }
}

export const robokassa = new RobokassaService({
  merchantLogin: process.env.ROBOKASSA_MERCHANT_LOGIN!,
  password1: process.env.ROBOKASSA_PASSWORD1!,
  password2: process.env.ROBOKASSA_PASSWORD2!,
  isTest: true, // process.env.NODE_ENV === "development",
});
