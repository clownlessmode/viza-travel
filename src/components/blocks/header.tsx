import React, { FC } from "react";
import Logotype from "../logotype";
import Image from "next/image";
import NavigationText from "../ui/texts/navigation-text";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "./locale-switcher";
import Link from "next/link";
import ModalForm from "../modal-form/form";
import * as SheetPrimitive from "@radix-ui/react-dialog";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { XIcon } from "lucide-react";
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
        <Sheet>
          <SheetTrigger asChild>
            <Image
              alt="menu"
              src={"/blocks/header/burger.svg"}
              width={40}
              height={40}
            />
          </SheetTrigger>
          <SheetContent
            side="top"
            className="w-screen max-w-none p-3 sm:p-4 md:p-5 lg:p-6 justify-between flex-col gap-[32px] h-fit rounded-b-[32px]!"
          >
            <SheetTitle className="sr-only">navigation</SheetTitle>
            <SheetHeader className="items-center flex justify-between flex-row ">
              <Logotype />
              <SheetPrimitive.Close className="text-primary ring-offset-background focus:ring-ring data-[state=open]:bg-secondary  rounded-xs transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none">
                <XIcon className="size-[40px]" />
              </SheetPrimitive.Close>
            </SheetHeader>
            <nav className="flex gap-[32px] flex-col items-center text-center mb-[10%] ">
              <Link href={"/#process"}>
                <NavigationText className="text-[18px]! sm:text-[24px]!">
                  {t("process")}
                </NavigationText>
              </Link>
              <Link href={"/#about"}>
                <NavigationText className="text-[18px]! sm:text-[24px]!">
                  {t("okompanii")}
                </NavigationText>
              </Link>
              <Link href={"/#advantages"}>
                <NavigationText className="text-[18px]! sm:text-[24px]!">
                  {t("preimushestva")}
                </NavigationText>
              </Link>
              <Link href={"/#faq"}>
                <NavigationText className="text-[18px]! sm:text-[24px]!">
                  {t("faq")}
                </NavigationText>
              </Link>
              <LanguageSwitcher />
            </nav>
            <SheetClose asChild>
              <ModalForm>
                <Button>{t("button")}</Button>
              </ModalForm>
            </SheetClose>
          </SheetContent>
        </Sheet>
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
