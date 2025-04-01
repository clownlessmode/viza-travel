import Header from "@/components/blocks/header";
import Hero from "@/components/blocks/hero";
import HowToGetInvitation from "@/components/blocks/how-to-get-invitation";

export default function Home() {
  return (
    <div className="flex flex-col gap-[100px] px-[10px] pt-[14px] w-full h-full min-h-screen ">
      <div className="flex flex-col gap-[14px]">
        <Header />
        <Hero />
      </div>
      <HowToGetInvitation />
    </div>
  );
}
