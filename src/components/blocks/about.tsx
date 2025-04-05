import React, { FC } from "react";
import { H1 } from "../ui/texts";
import Text from "../ui/texts/Text";
import Image from "next/image";
import { useTranslations } from "next-intl";

const About: FC = () => {
  const t = useTranslations("about");
  return (
    <div className="flex flex-col gap-[24px]" id="about">
      <H1>{t("heading")}</H1>
      <div className="flex flex-row gap-[24px] flex-wrap">
        <div className="flex flex-col gap-[24px]">
          <Text>{t("text1")}</Text>
          <Text>{t("text2")}</Text>
        </div>
        <div className="grid gap-[20px] grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
          <Image
            alt="russian cities"
            src={"/blocks/about/city1.webp"}
            width={1740}
            height={1600}
            className="aspect-square w-full rounded-[24px] "
          />
          <Image
            alt="russian cities"
            src={"/blocks/about/city2.webp"}
            width={1740}
            height={1600}
            className="aspect-square w-full rounded-[24px]"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
