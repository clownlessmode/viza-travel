import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";

const Logotype: FC = () => {
  return (
    <Link href={"/"}>
      <Image
        alt="ВИЗА24"
        className="w-[139px] h-[30px]"
        src={"/branding/logotype.svg"}
        width={139}
        height={30}
      />
    </Link>
  );
};

export default Logotype;
