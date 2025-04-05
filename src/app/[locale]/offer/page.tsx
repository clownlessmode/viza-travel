import Footer from "@/components/blocks/footer";
import Header from "@/components/blocks/header";
import Image from "next/image";
import React from "react";

const Page = () => {
  return (
    <div className="flex flex-col gap-[100px] md:gap-[150px] px-[10px] sm:px-[80px] pt-[14px] w-full h-full min-h-screen ">
      <div className="flex flex-col gap-[14px]">
        <Header />
        <div className="bg-white rounded-[48px] xl:p-[48px] sm:p-[24px] p-[20px]">
          <Image
            className="hidden xl:block"
            src={"/blocks/docs/offer-1920-1280.svg"}
            alt="doc"
            width={1920}
            height={4000}
          />
          <Image
            className="hidden sm:block xl:hidden"
            src={"/blocks/docs/offer-1280-640.svg"}
            alt="doc"
            width={1920}
            height={4000}
          />
          <Image
            className="block sm:hidden"
            src={"/blocks/docs/offer-320.svg"}
            alt="doc"
            width={1920}
            height={4000}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Page;
