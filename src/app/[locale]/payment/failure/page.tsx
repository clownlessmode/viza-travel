// app/payment/error/page.tsx
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Header from "@/components/blocks/header";
import Footer from "@/components/blocks/footer";

export default function ErrorPage() {
  const t = useTranslations("paymentPage");

  return (
    <div className="flex flex-col gap-[100px] md:gap-[150px] px-[10px] sm:px-[80px] pt-[14px] w-full h-full min-h-screen">
      <Header />

      <div className="mx-auto flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
          <div className="flex justify-center mb-6">
            <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-center text-red-600 mb-4">
            {t("failure.title")}
          </h1>

          <p className="text-gray-700 mb-6 text-center">
            {t("failure.message")}
          </p>

          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-blue-700 mb-2">
              {t("common.needHelp")}
            </h3>
            <p className="text-sm mb-2">{t("common.helpText")}</p>
            <Link href={"https://wa.me/9680100024"} className="text-sm mb-2">
              <span className="font-medium">{t("common.whatsapp")}</span> +7
              (968) 01 000-24
            </Link>
            <Link href={"mailto:visarussia24@mail.ru"} className="text-sm">
              <br /> <span className="font-medium">{t("common.email")}</span>{" "}
              visarussia24@mail.ru
            </Link>
          </div>

          <div className="flex gap-4 flex-col sm:flex-row w-full items-center justify-center">
            <Link href="/">
              <Button className="w-full!">{t("common.mainPage")}</Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
