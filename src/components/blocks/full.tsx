import React from "react";
import { H1Blue } from "../ui/texts/H1";
import { Button } from "../ui/button";
import { H2 } from "../ui/texts";

const Full = () => {
  return (
    <div
      className="rounded-[48px] flex flex-col justify-between gap-[24px] bg-cover bg-righ w-full h-[300px] px-[24px] py-[48px] sm:py-[64px] lg:h-[510px] lg:py-[128px] xl:h-[655px] xl:px-[48px] xl:py-[200px]"
      style={{
        backgroundImage: "url('/blocks/full/background.webp')",
      }}
    >
      <H1Blue className="block sm:hidden">
        Полный пакет услуг: <br /> <span>подберем тур</span> под ключ
      </H1Blue>
      <H2 className="hidden sm:block">
        Полный пакет услуг: <br /> <span>подберем тур</span> под ключ
      </H2>
      <Button className="w-full max-w-[300px] md:max-w-[400px] lg:max-w-[600px]">
        Подобрать тур
      </Button>
    </div>
  );
};

export default Full;
