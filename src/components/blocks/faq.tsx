import type { FC } from "react";
import { H1 } from "../ui/texts";
import Text from "../ui/texts/Text";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "../ui/button";
const faqs = [
  {
    title:
      "Обязательно указывать гостиницу и ее адрес, если турист останавливается на частном адресе?",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus, nesciunt vero! Ipsum consequatur totam cumque non quidem ab atque dolorem tenetur ut, nesciunt harum vel? Veritatis accusantium dolores rem veniam?",
  },
  {
    title: "В чем различие между туристическим и бизнес приглашениями?",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus, nesciunt vero! Ipsum consequatur totam cumque non quidem ab atque dolorem tenetur ut, nesciunt harum vel? Veritatis accusantium dolores rem veniam?",
  },
  {
    title:
      "В каких случаях необходимо оформлять регистрацию иностранных граждан?",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus, nesciunt vero! Ipsum consequatur totam cumque non quidem ab atque dolorem tenetur ut, nesciunt harum vel? Veritatis accusantium dolores rem veniam?",
  },
  {
    title: "Какие документы требуются для оформления регистрации?",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus, nesciunt vero! Ipsum consequatur totam cumque non quidem ab atque dolorem tenetur ut, nesciunt harum vel? Veritatis accusantium dolores rem veniam?",
  },
  {
    title: "Как оформить туристическое приглашение онлайн?",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus, nesciunt vero! Ipsum consequatur totam cumque non quidem ab atque dolorem tenetur ut, nesciunt harum vel? Veritatis accusantium dolores rem veniam?",
  },
  {
    title:
      "Возможно ли внести изменения в приглашение, если информация о сроках поездки, имени и др. была введена неправильно?",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus, nesciunt vero! Ipsum consequatur totam cumque non quidem ab atque dolorem tenetur ut, nesciunt harum vel? Veritatis accusantium dolores rem veniam?",
  },
  {
    title:
      "Понадобится ли мне бумажная копия приглашения, или скана будет достаточно?",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus, nesciunt vero! Ipsum consequatur totam cumque non quidem ab atque dolorem tenetur ut, nesciunt harum vel? Veritatis accusantium dolores rem veniam?",
  },
  {
    title: "Какой максимальный срок действия туристической визы?",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus, nesciunt vero! Ipsum consequatur totam cumque non quidem ab atque dolorem tenetur ut, nesciunt harum vel? Veritatis accusantium dolores rem veniam?",
  },
  {
    title: "Правила пребывания иностранного гражданина в Российской Федерации",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus, nesciunt vero! Ipsum consequatur totam cumque non quidem ab atque dolorem tenetur ut, nesciunt harum vel? Veritatis accusantium dolores rem veniam?",
  },
];
const Faq: FC = () => {
  return (
    <div className="flex flex-row gap-x-[24px] gap-y-[40px] flex-wrap">
      <div className="flex flex-col gap-[12px]">
        <H1>Ответы на все ваши вопросы — просто и понятно!</H1>
        <Text>
          Мы собрали самые популярные вопросы о приглашениях в Россию. Узнайте,
          как оформить документы, сколько это стоит и как быстро вы получите
          приглашение. Если остались вопросы — напишите нам!
        </Text>
      </div>
      <Accordion type="single" collapsible className="w-full">
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
      <Button className="w-full">Написать нам</Button>
    </div>
  );
};

export default Faq;
