/* eslint-disable @typescript-eslint/no-explicit-any */
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

  private calculateSignature(...args: string[]): string {
    const joined = args.join(":");
    return createHash("md5").update(joined).digest("hex");
  }

  generatePaymentUrl(params: {
    outSum: number;
    invId: number;
    description: string;
    email?: string;
    receipt?: any;
    isTest?: boolean;
  }): string {
    const { outSum, invId, description, email, receipt, isTest } = params;
    const outSumFormatted = outSum.toFixed(2);
    const invIdStr = invId.toString();

    // Формируем части подписи
    const signatureParts = [this.merchantLogin, outSumFormatted, invIdStr];

    // Если передается параметр Receipt, добавляем его в URL-кодированном виде
    let encodedReceipt;
    if (receipt) {
      encodedReceipt = encodeURIComponent(JSON.stringify(receipt));
      signatureParts.push(encodedReceipt);
    }

    signatureParts.push(this.password1);

    const signature = this.calculateSignature(...signatureParts);

    // Создаем параметры для URL
    const urlParams = new URLSearchParams({
      MerchantLogin: this.merchantLogin,
      OutSum: outSumFormatted,
      InvId: invIdStr,
      Description: description,
      SignatureValue: signature,
      IsTest: isTest || this.isTest ? "1" : "0",
    });

    if (email) {
      urlParams.append("Email", email);
    }

    if (receipt && encodedReceipt) {
      urlParams.append("Receipt", encodedReceipt);
    }

    return `https://auth.robokassa.ru/Merchant/Index.aspx?${urlParams.toString()}`;
  }

  checkPayment(params: Record<string, string>): boolean {
    const requiredFields = ["OutSum", "InvId", "SignatureValue"];
    for (const field of requiredFields) {
      if (!params[field]) return false;
    }

    // Собираем SHP-параметры
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

    // Формируем части подписи для проверки
    const signatureParts = [params["OutSum"], params["InvId"], this.password2];

    // Добавляем SHP-параметры в порядке "ключ:значение"
    Object.keys(shpParams)
      .sort()
      .forEach((key) => {
        signatureParts.push(`${key}=${shpParams[key]}`);
      });

    const expectedSignature = this.calculateSignature(...signatureParts);
    return (
      params["SignatureValue"].toLowerCase() === expectedSignature.toLowerCase()
    );
  }
}

export const robokassa = new RobokassaService({
  merchantLogin: process.env.ROBOKASSA_MERCHANT_LOGIN!,
  password1: process.env.ROBOKASSA_PASSWORD1!,
  password2: process.env.ROBOKASSA_PASSWORD2!,
  // isTest: false,
});
