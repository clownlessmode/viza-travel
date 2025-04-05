import React, { FC } from "react";
import Logotype from "../logotype";
import Image from "next/image";
import NavigationText from "../ui/texts/navigation-text";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./locale-switcher";
import Link from "next/link";
import ModalForm from "../modal-form/form";

const Header: FC = () => {
  const t = useTranslations("header");

  return (
    <div className="flex flex-row w-full justify-between items-center">
      <Logotype />
      <nav className="hidden xl:flex flex-row gap-[32px]">
        <Link href={"/#process"}>
          <NavigationText>{t("process")}</NavigationText>
        </Link>
        <Link href={"/#about"}>
          <NavigationText>{t("okompanii")}</NavigationText>
        </Link>
        <Link href={"/#advantages"}>
          <NavigationText>{t("preimushestva")}</NavigationText>
        </Link>
        <Link href={"/#faq"}>
          <NavigationText>{t("faq")}</NavigationText>
        </Link>
      </nav>
      <nav className="block xl:hidden">
        <Image
          alt="menu"
          src={"/blocks/header/burger.svg"}
          width={40}
          height={40}
        />
      </nav>
      <nav className="hidden xl:flex gap-2">
        <LanguageSwitcher />
        <ModalForm>
          <Button>{t("button")}</Button>
        </ModalForm>
      </nav>
    </div>
  );
};

export default Header;
