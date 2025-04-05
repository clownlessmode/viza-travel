import type { FC } from "react";
import { H1, H2 } from "../ui/texts";
import Text from "../ui/texts/Text";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import ModalForm from "../modal-form/form";

const Faq: FC = () => {
  const t = useTranslations("faq");
  const faqs = [
    {
      title: t("text1.title"),
      description: t("text1.description"),
    },
    {
      title: t("text2.title"),
      description: t("text2.description"),
    },
    {
      title: t("text3.title"),
      description: t("text3.description"),
    },
    {
      title: t("text4.title"),
      description: t("text4.description"),
    },
    {
      title: t("text5.title"),
      description: t("text5.description"),
    },
    {
      title: t("text6.title"),
      description: t("text6.description"),
    },
    {
      title: t("text7.title"),
      description: t("text7.description"),
    },
    {
      title: t("text8.title"),
      description: t("text8.description"),
    },
    {
      title: t("text9.title"),
      description: t("text9.description"),
    },
  ];
  return (
    <div id="faq" className="flex flex-col gap-x-[24px] gap-y-[40px] w-full">
      <div className="flex flex-col xl:flex-row w-full">
        <div className="flex flex-col gap-[12px] xl:sticky xl:top-[40px] xl:h-fit">
          <H1 className="block sm:hidden">
            {t("heading.text")} <br />
            {t("heading.br")}
          </H1>
          <H2 className="hidden sm:block">
            {t("heading.text")} <br />
            {t("heading.br")}
          </H2>
          <Text className="max-w-[540px] md:max-w-[600px] lg:max-w-[700px] xl:max-w-[800px]">
            {t("text")}
          </Text>
        </div>
        <div className="w-full ">
          <Accordion
            type="single"
            collapsible
            className="w-full mt-[24px] xl:mt-0"
          >
            {faqs.map((item, index) => (
              <AccordionItem
                value={index.toString()}
                key={index}
                className="mb-[12px]"
              >
                <AccordionTrigger>{item.title}</AccordionTrigger>
                <AccordionContent>{item.description}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
      <ModalForm>
        <Button className="w-full">{t("button")}</Button>
      </ModalForm>
    </div>
  );
};

export default Faq;
