// app/[locale]/payment/success/page.tsx
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Header from "@/components/blocks/header";
import Footer from "@/components/blocks/footer";

export default function SuccessPage() {
  const t = useTranslations("paymentPage");

  return (
    <div className="flex flex-col gap-[100px] md:gap-[150px] px-[10px] sm:px-[80px] pt-[14px] w-full h-full min-h-screen">
      <Header />
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 mx-auto">
        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center text-green-600 mb-4">
          {t("success.title")}
        </h1>

        {/* <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">{t("success.orderNumber")}</span>
            <span className="font-medium">
              {searchParams.InvId || t("success.notAvailable")}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">{t("success.amount")}</span>
            <span className="font-medium">
              {searchParams.OutSum || "0"} {t("success.currency")}
            </span>
          </div>
        </div> */}

        <p className="text-gray-700 mb-6 text-center">
          {t("success.thankYou")}
        </p>

        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <h3 className="font-medium text-blue-700 mb-2">
            {t("common.questions")}
          </h3>
          <p className="text-sm mb-2">{t("common.contactUs")}</p>
          <Link href={"https://wa.me/9680100024"} className="text-sm mb-2">
            <span className="font-medium">{t("common.whatsapp")}</span> +7 (968)
            01 000-24
          </Link>
          <Link href={"mailto:support@visarussia24.ru"} className="text-sm">
            <br /> <span className="font-medium">{t("common.email")}</span>{" "}
            support@visarussia24.ru
          </Link>
        </div>

        <div className="flex gap-4 flex-col sm:flex-row w-full items-center justify-center">
          <Link href={`/`}>
            <Button className="w-full!">{t("common.mainPage")}</Button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
