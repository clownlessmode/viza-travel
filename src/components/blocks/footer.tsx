import React, { FC } from "react";
import Logotype from "../logotype";
import NavigationText from "../ui/texts/navigation-text";
import Link from "next/link";
import { useTranslations } from "next-intl";

const Footer: FC = () => {
  const t = useTranslations("footer");
  const h = useTranslations("header");

  return (
    <footer className="flex flex-col rounded-t-[24px] p-[20px] gap-[48px] bg-white">
      <Logotype />
      <div className="flex flex-row flex-wrap gap-[40px] md:justify-between">
        <nav className="flex flex-col gap-[12px]">
          <NavigationText>
            <Link href={"/#process"}>{h("process")}</Link>
          </NavigationText>
          <NavigationText>
            <Link href={"/#about"}>{h("okompanii")}</Link>
          </NavigationText>
          <NavigationText>
            <Link href={"/#advantages"}>{h("preimushestva")}</Link>
          </NavigationText>
          <NavigationText>
            <Link href={"/#faq"}>{h("faq")}</Link>
          </NavigationText>
          <NavigationText>
            <Link href={"jotting"}>{t("pamyatka")}</Link>
          </NavigationText>
        </nav>
        <nav className="flex flex-col gap-[12px]">
          <NavigationText>
            <Link href={"#"}>
              {t("ws")} <br />
              +7 (968) 01 000-24
            </Link>
          </NavigationText>
          <NavigationText>
            <Link href={"mailto:support@visarussia24.ru"}>
              support@visarussia24.ru
            </Link>
          </NavigationText>
        </nav>
        <nav className="flex flex-col gap-[12px] max-w-[400px]">
          <NavigationText>
            <Link href={"#"}>{t("adres")}</Link>
          </NavigationText>
          <NavigationText>
            <Link href={"#"}>
              {t("ogrn")}: 1255200003145 <br /> {t("inn")}: 5254498269
              <br /> {t("reestr")}: <br />
              B031-00161-77/01942487
            </Link>
          </NavigationText>
        </nav>
      </div>
      <nav className="flex flex-col md:flex-row gap-[12px] opacity-50 md:justify-between md: max-w-[600px]">
        <NavigationText>
          <Link href={"agreement"}>{t("privacy")}</Link>
        </NavigationText>
        <NavigationText>
          <Link href={"policy"}>{t("policy")}</Link>
        </NavigationText>
        <NavigationText>
          <Link href={"offer"}>{t("oferta")}</Link>
        </NavigationText>
      </nav>
    </footer>
  );
};

export default Footer;
