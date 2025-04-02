import React, { FC } from "react";
import Logotype from "../logotype";
import Image from "next/image";
import NavigationText from "../ui/texts/navigation-text";
import { Button } from "../ui/button";

const Header: FC = () => {
  return (
    <div className="flex flex-row w-full justify-between items-center">
      <Logotype />
      <nav className="hidden xl:flex flex-row gap-[32px]">
        <NavigationText>Процесс</NavigationText>
        <NavigationText>О компании</NavigationText>
        <NavigationText>Преимущества</NavigationText>
        <NavigationText>FAQ</NavigationText>
      </nav>
      <nav className="block xl:hidden">
        <Image
          alt="menu"
          src={"/blocks/header/burger.svg"}
          width={40}
          height={40}
        />
      </nav>
      <nav className="hidden xl:flex">
        <Button>Оставить заявку</Button>
      </nav>
    </div>
  );
};

export default Header;
