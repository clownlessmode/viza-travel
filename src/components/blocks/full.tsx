import React from "react";
import { H1Blue } from "../ui/texts/H1";
import { Button } from "../ui/button";

const Full = () => {
  return (
    <div
      className="rounded-[48px] flex flex-col justify-between gap-[24px] bg-cover bg-righ w-full h-[300px] px-[24px] py-[48px]"
      style={{
        backgroundImage: "url('/blocks/full/background.png')",
      }}
    >
      <H1Blue>
        Полный пакет услуг: <br /> <span>подберем тур</span> под ключ
      </H1Blue>
      <Button className="w-full">Написать нам</Button>
    </div>
  );
};

export default Full;
