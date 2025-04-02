import React, { FC } from "react";
import { H1, H2 } from "../ui/texts";
import Text from "../ui/texts/Text";

import Image from "next/image";

const cards: CardProps[] = [
  {
    image: "speed.webp",
    title: "Скорость",
    description: "оформление от 5 минут",
  },
  {
    image: "official.webp",
    title: "Официальность",
    description: "документы проходят все проверки",
  },
  {
    image: "accessable.webp",
    title: "Доступность",
    description: "без посредников и переплат",
  },
  {
    image: "online.webp",
    title: "Онлайн-сервис",
    description: "всё в цифровом формате, без визита в офис",
  },
];

interface CardProps {
  image: string;
  title: string;
  description: string;
}

const Card: FC<CardProps> = ({ image, title, description }) => {
  return (
    <div className="bg-white p-[24px] flex flex-col justify-between h-[345px] rounded-[24px] w-full">
      <Image
        alt={title}
        src={`/blocks/advantages/${image}`}
        width={1000}
        height={1000}
        className="aspect-auto w-full max-w-[200px] self-center"
      />
      <div className="flex flex-col gap-[12px] text-center">
        <H2>{title}</H2>
        <Text>{description}</Text>
      </div>
    </div>
  );
};

const Advantages: FC = () => {
  return (
    <div className="flex flex-col gap-[24px]">
      <H1 className="text-center">Наши преимущества</H1>
      <div className="grid gap-[20px] grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
        {cards.map((item, index) => (
          <Card {...item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Advantages;
