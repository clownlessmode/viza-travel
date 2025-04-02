import React, { FC } from "react";
import { H1 } from "../ui/texts";
import Text from "../ui/texts/Text";
import Image from "next/image";

const About: FC = () => {
  return (
    <div className="flex flex-col gap-[24px]">
      <H1>О компании</H1>
      <div className="flex flex-row gap-[24px] flex-wrap">
        <div className="flex flex-col gap-[24px]">
          <Text>
            Мы — профессиональный российский туроператор, специализирующийся на
            визовой поддержке для иностранных граждан. Наша миссия — упростить
            процесс въезда в Россию для туристов, предпринимателей и деловых
            партнёров.
          </Text>
          <Text>
            Работаем с клиентами из Европы, Азии, Ближнего Востока, Африки и
            других регионов. Наши документы соответствуют всем требованиям,
            проходят официальные проверки и принимаются во всех консульствах РФ.
            Кроме визовой поддержки, мы также предлагаем организацию
            индивидуальных и групповых туров по России.
          </Text>
        </div>
        <div className="grid gap-[20px] grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
          <Image
            alt="russian cities"
            src={"/blocks/about/city1.webp"}
            width={1740}
            height={1600}
            className="aspect-auto w-full rounded-[24px]"
          />
          <Image
            alt="russian cities"
            src={"/blocks/about/city2.webp"}
            width={1740}
            height={1600}
            className="aspect-auto w-full rounded-[24px]"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
