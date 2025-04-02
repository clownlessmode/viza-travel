import About from "@/components/blocks/about";
import Advantages from "@/components/blocks/advantages";
import Header from "@/components/blocks/header";
import Hero from "@/components/blocks/hero";
import HowToGetInvitation from "@/components/blocks/how-to-get-invitation";
import Ready from "@/components/blocks/ready";
import Faq from "@/components/blocks/faq";
import Full from "@/components/blocks/full";
import Footer from "@/components/blocks/footer";

export default function Home() {
  return (
    <div className="flex flex-col gap-[100px] px-[10px] pt-[14px] w-full h-full min-h-screen ">
      <div className="flex flex-col gap-[14px]">
        <Header />
        <Hero />
      </div>
      <HowToGetInvitation />
      <About />
      <Advantages />
      <Ready />
      <Faq />
      <Full />
      <Footer />
    </div>
  );
}
