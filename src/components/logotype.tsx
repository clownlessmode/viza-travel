import Image from "next/image";
import type { FC } from "react";

const Logotype: FC = () => {
  return (
    <Image
      alt="ВИЗА24"
      className="w-[139px] h-[30px]"
      src={"/branding/logotype.svg"}
      width={139}
      height={30}
    />
  );
};

export default Logotype;
