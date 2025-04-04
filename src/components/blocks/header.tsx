import React, { FC } from "react";
import Logotype from "../logotype";
import Image from "next/image";
import NavigationText from "../ui/texts/navigation-text";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";

const Header: FC = () => {
  const t = useTranslations("header");

  return (
    <div className="flex flex-row w-full justify-between items-center">
      <Logotype />
      <nav className="hidden xl:flex flex-row gap-[32px]">
        <NavigationText>{t("process")}</NavigationText>
        <NavigationText>{t("okompanii")}</NavigationText>
        <NavigationText>{t("preimushestva")}</NavigationText>
        <NavigationText>{t("faq")}</NavigationText>
      </nav>
      <nav className="block xl:hidden">
        <Image
          alt="menu"
          src={"/blocks/header/burger.svg"}
          width={40}
          height={40}
        />
      </nav>
      <nav className="hidden xl:flex">
        <Button>{t("button")}</Button>
      </nav>
    </div>
  );
};

export default Header;
