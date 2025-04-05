import React, { FC } from "react";
import { H1, H2 } from "../ui/texts";
import Text from "../ui/texts/Text";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import LinkText from "../ui/texts/link-text";
import { useTranslations } from "next-intl";

const Ready: FC = () => {
  const t = useTranslations("form");
  return (
    <div className="flex flex-col bg-white rounded-[48px] xl:flex-row">
      <div
        className="rounded-[48px] bg-cover bg-center w-full h-[557px] xl:w-1/2 xl:h-[850px]"
        style={{
          backgroundImage: "url('/blocks/ready/girl.webp')",
        }}
      ></div>

      <div className="flex flex-col p-[24px] gap-[48px]">
        <H1></H1>
        <H1 className="block sm:hidden">
          {t("heading.text")} <br /> {t("heading.br")}
        </H1>
        <H2 className="hidden sm:block">
          {t("heading.text")} <br /> {t("heading.br")}
        </H2>
        <form className="flex flex-col gap-[32px]">
          <Text>
            {t("desk.text")} <br /> {t("desk.br")}
          </Text>
          <div className="flex flex-col gap-[40px]">
            <div className="flex flex-col gap-[24px]">
              <Input placeholder={t("inp.name")} />
              <Input placeholder={t("inp.tel")} />
              <Input placeholder={t("inp.mail")} />
            </div>
            <div className="flex flex-col gap-[12px]">
              <div className="flex flex-row gap-[12px] items-center">
                <Checkbox />
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  <LinkText href={"policy"}>{t("checkbox.text1")}</LinkText>
                </label>
              </div>
              <div className="flex flex-row gap-[12px] items-center">
                <Checkbox />
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  <LinkText href={"policy"}>{t("checkbox.text2")}</LinkText>
                </label>
              </div>
              <div className="flex flex-row gap-[12px] items-center pl-[calc(24px+12px)]">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  <LinkText href={"policy"}>{t("checkbox.text3")}</LinkText>
                </label>
              </div>
            </div>
            <Button className="w-full"> {t("button")}</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Ready;
