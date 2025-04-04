import React from "react";
import { H1Blue } from "../ui/texts/H1";
import { Button } from "../ui/button";
import { H2 } from "../ui/texts";
import { useTranslations } from "next-intl";

const Full = () => {
  const t = useTranslations("full");

  return (
    <div
      className="rounded-[48px] flex flex-col justify-between gap-[24px] bg-cover bg-righ w-full h-[300px] px-[24px] py-[48px] sm:py-[64px] lg:h-[510px] lg:py-[128px] xl:h-[655px] xl:px-[48px] xl:py-[200px]"
      style={{
        backgroundImage: "url('/blocks/full/background.webp')",
      }}
    >
      <H1Blue className="block sm:hidden">
        {t("left")}
        <br /> <span>{t("span")}</span> {t("right")}
      </H1Blue>
      <H2 className="hidden sm:block">
        {t("left")}
        <br /> <span>{t("span")}</span> {t("right")}
      </H2>
      <Button className="w-full max-w-[300px] md:max-w-[400px] lg:max-w-[600px]">
        {t("button")}
      </Button>
    </div>
  );
};

export default Full;
