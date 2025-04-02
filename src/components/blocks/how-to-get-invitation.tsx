import React, { FC } from "react";
import { H1Blue } from "../ui/texts/H1";
import { Button } from "../ui/button";
import { H2 } from "../ui/texts";
import Text from "../ui/texts/Text";
import ButtonText from "../ui/texts/ButtonText";
import Image from "next/image";
import H3 from "../ui/texts/H3";

const cards = [
  {
    title: "Оставьте заявку",
    description:
      "Выберите тип визы, укажите страну, загрузите паспортные данные и контактную информацию.",
  },
  {
    title: "Подготовка приглашения",
    description:
      "Оформляем документ в соответствии с требованиями МВД РФ и консульств.",
  },
  {
    title: "Получение приглашения",
    description:
      "Готовое приглашение придет вам на email. Подайте его в консульство и получите визу.",
  },
  {
    title: "Добро пожаловать в Россию!",
    description:
      "Путешествуйте, работайте, встречайтесь с партнёрами — без лишних преград.",
  },
];

interface CardProps {
  index: number;
  title: string;
  description: string;
}

const Card: FC<CardProps> = ({ index, title, description }) => {
  return (
    <div className="bg-white p-[24px] flex flex-col justify-between h-[300px] sm:h-[310px] rounded-[24px] w-full">
      <div className="rounded-full aspect-square size-[48px] bg-primary flex items-center justify-center text-white ">
        <ButtonText>{index}</ButtonText>
      </div>
      <div className="flex flex-col gap-[12px]">
        <H2 className="block sm:hidden">{title}</H2>
        <H3 className="hidden sm:block">{title}</H3>
        <Text>{description}</Text>
      </div>
    </div>
  );
};

const HowToGetInvitation: FC = () => {
  return (
    <div className="flex flex-col xl:flex-row gap-[64px] justify-center items-center xl:justify-between xl:w-full">
      <div className="flex flex-col gap-[24px] sm:gap-[40px]">
        <H1Blue className="block sm:hidden">
          Как <span>получить</span> приглашение? <br /> Всё просто:
        </H1Blue>
        <H2 className="hidden sm:block">
          Как <span>получить</span> приглашение? <br /> Всё просто:
        </H2>
        <div className="flex flex-col gap-[24px]">
          <div className="grid gap-[20px] grid-cols-[repeat(auto-fit,minmax(300px,1fr))] xl:max-w-[939px]">
            {cards.map((item, index) => (
              <Card index={index + 1} {...item} key={index} />
            ))}
          </div>
          <Button>Начать оформление</Button>
        </div>
      </div>
      <Image
        alt="russian cities"
        src={"/blocks/invitation/cities.webp"}
        width={1740}
        height={1600}
        className="aspect-auto w-[320px] sm:w-full xl:max-w-[500px] 2xl:max-w-[600px] xl:w-full xl:h-fit"
      />
    </div>
  );
};

export default HowToGetInvitation;
