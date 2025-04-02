import type { FC } from "react";
import { H1 } from "../ui/texts";
import Text from "../ui/texts/Text";
import { Button } from "../ui/button";

const Hero: FC = () => {
  return (
    <div
      className="rounded-[48px] px-[20px] pt-[64px] pb-[20px] bg-cover bg-center w-full h-fit flex flex-col items-center"
      style={{
        backgroundImage: "url('/blocks/hero/background.webp')",
      }}
    >
      <H1 className="text-white text-center">
        Оформите <span>приглашение</span> <br /> в Россию онлайн за 5 минут
      </H1>
      <Text className="mt-[12px] text-center text-white max-w-[800px]">
        Туристические, деловые и бизнес-приглашения для получения визы — без
        посредников, без бумажной волокиты. Простой процесс, официальные
        документы, 100% соответствие требованиям консульств.
      </Text>
      <Button className="mt-[200px] w-full max-w-[440px] sm:max-w-none md:max-w-[800px] 2xl:max-w-[870px]">
        Получить приглашение
      </Button>
    </div>
  );
};

export default Hero;
