import React, { FC } from "react";
import { H1, H2 } from "../ui/texts";
import Text from "../ui/texts/Text";

import Image from "next/image";
import H3 from "../ui/texts/H3";
import { useTranslations } from "next-intl";

interface CardProps {
  image: string;
  title: string;
  description: string;
}

const Card: FC<CardProps> = ({ image, title, description }) => {
  return (
    <div className=" bg-white p-[24px] flex flex-col justify-between h-[345px] rounded-[24px] w-full">
      <Image
        alt={title}
        src={`/blocks/advantages/${image}`}
        width={1000}
        height={1000}
        className="aspect-auto w-full max-w-[200px] self-center"
      />
      <div className="flex flex-col gap-[12px] text-center">
        <H2 className="block sm:hidden">{title}</H2>
        <H3 className="hidden sm:block">{title}</H3>
        <Text>{description}</Text>
      </div>
    </div>
  );
};

const Advantages: FC = () => {
  const t = useTranslations("advantages");
  const cards: CardProps[] = [
    {
      image: "speed.webp",
      title: t("skorost.title"),
      description: t("skorost.description"),
    },
    {
      image: "official.webp",
      title: t("official.title"),
      description: t("skorost.description"),
    },
    {
      image: "accessable.webp",
      title: t("dost.title"),
      description: t("dost.description"),
    },
    {
      image: "online.webp",
      title: t("online.title"),
      description: t("online.description"),
    },
  ];
  return (
    <div className="flex flex-col gap-[24px] w-full" id="advantages">
      <H1 className="block sm:hidden text-center">{t("heading")}</H1>
      <H2 className="hidden sm:block text-center">{t("heading")}</H2>
      <div className="grid gap-[20px] grid-cols-[repeat(auto-fit,minmax(300px,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(449px,1fr))] 2xl:grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
        {cards.map((item, index) => (
          <Card {...item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Advantages;
