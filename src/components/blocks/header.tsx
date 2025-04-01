import React, { FC } from "react";
import Logotype from "../logotype";
import Image from "next/image";

const Header: FC = () => {
  return (
    <div className="flex flex-row w-full justify-between ">
      <Logotype />
      <nav className="hidden xl:flex"></nav>
      <nav className="block xl:hidden">
        <Image
          alt="menu"
          src={"/blocks/header/burger.svg"}
          width={40}
          height={40}
        />
      </nav>
    </div>
  );
};

export default Header;
