import React, { FC } from "react";
import { H1, H2 } from "../ui/texts";
import Text from "../ui/texts/Text";
import Image from "next/image";
import { useTranslations } from "next-intl";

const About: FC = () => {
  const t = useTranslations("about");
  return (
    <>
      <div className="flex flex-col gap-[24px] lg:hidden" id="about">
        <H1>{t("heading")}</H1>
        <div className="flex flex-row gap-[24px] flex-wrap ">
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
              className="aspect-square lg:aspect-video w-full rounded-[24px] h-auto object-cover"
            />
            <Image
              alt="russian cities"
              src={"/blocks/about/city2.webp"}
              width={1740}
              height={1600}
              className="aspect-square  lg:aspect-video w-full rounded-[24px] h-auto object-cover"
            />
          </div>
        </div>
      </div>
      {/* 2 */}
      <div
        className="flex-col gap-[24px] hidden lg:flex xl:flex-row 2xl:hidden"
        id="about"
      >
        <div className="flex flex-row gap-[24px] flex-wrap xl:max-w-1/2  xl:flex-col">
          <div className="flex flex-row gap-[24px] items-start xl:h-fit">
            <H1>{t("heading")}</H1>
            <div className="flex flex-col gap-[24px]">
              <Text>{t("text1")}</Text>
              <Text>{t("text2")}</Text>
            </div>
          </div>
          <div className="xl:h-fit xl:mt-auto xl:grid xl:grid-cols-2  xl:w-full xl:flex-row xl:items-center grid gap-[20px] grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
            <Image
              alt="russian cities"
              src={"/blocks/about/city3.webp"}
              width={1740}
              height={1600}
              className="aspect-square xl:max-w-full xl:aspect-square lg:aspect-video  w-full xl:w-fill rounded-[24px] h-auto object-cover"
            />
            <Image
              alt="russian cities"
              src={"/blocks/about/city2.webp"}
              width={1740}
              height={1600}
              className="aspect-square xl:max-w-full xl:aspect-square  lg:aspect-video w-full xl:w-fill rounded-[24px] h-auto  object-cover"
            />
          </div>
        </div>
        <Image
          alt="russian cities"
          src={"/blocks/about/city1.webp"}
          width={1740}
          height={1600}
          className="xl:block hidden max-w-1/2 w-full rounded-[24px] h-fill object-cover"
        />
      </div>

      {/* 3 */}
      <div
        className="flex-col gap-[24px] hidden xl:flex-row 2xl:grid grid-cols-2"
        id="about"
      >
        <div className="flex flex-col h-full items-start gap-[40px]">
          <div className="flex flex-row gap-[100px]">
            <H2 className="text-nowrap">{t("heading")}</H2>
            <div className="flex flex-col gap-[24px]">
              <Text>{t("text1")}</Text>
              <Text>{t("text2")}</Text>
            </div>
          </div>
          <Image
            alt="russian cities"
            src={"/blocks/about/city2.webp"}
            width={1740}
            height={1600}
            className="aspect-square max-w-[280px] rounded-[24px]"
          />
        </div>
        <div className="flex flex-row justify-between">
          <Image
            alt="russian cities"
            src={"/blocks/about/city1.webp"}
            width={1740}
            height={1600}
            className="xl:block hidden max-w-1/2 w-full rounded-[24px] h-fill object-cover"
          />
          <Image
            alt="russian cities"
            src={"/blocks/about/city3.webp"}
            width={1740}
            height={1600}
            className="aspect-square max-w-[280px]  h-fit rounded-[24px]"
          />
        </div>
      </div>
    </>
  );
};

export default About;
