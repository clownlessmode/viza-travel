import type { FC } from "react";
import { H1 } from "../ui/texts";
import Text from "../ui/texts/Text";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import ModalForm from "../modal-form/form";

const Hero: FC = () => {
  const t = useTranslations("hero");

  return (
    <div
      className="rounded-[48px] px-[20px] pt-[64px] pb-[20px] bg-cover bg-center w-full h-fit flex flex-col items-center"
      style={{
        backgroundImage: "url('/blocks/hero/background.webp')",
      }}
    >
      <H1 className="text-white text-center">
        {t("heading.left")} <span> {t("heading.span")}</span> <br />{" "}
        {t("heading.right")}
      </H1>
      <Text className="mt-[12px] text-center text-white max-w-[800px]">
        {t("desc")}
      </Text>
      <ModalForm>
        <Button className="mt-[200px] w-full max-w-[440px] sm:max-w-none md:max-w-[800px] 2xl:max-w-[870px]">
          {t("button")}
        </Button>
      </ModalForm>
    </div>
  );
};

export default Hero;
