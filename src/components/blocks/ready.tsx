import React, { FC } from "react";
import { H1 } from "../ui/texts";
import Text from "../ui/texts/Text";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import LinkText from "../ui/texts/link-text";

const Ready: FC = () => {
  return (
    <div className="flex flex-col bg-white rounded-[48px]">
      <div
        className="rounded-[48px] bg-cover bg-center w-full h-[557px]"
        style={{
          backgroundImage: "url('/blocks/ready/girl.webp')",
        }}
      ></div>

      <div className="flex flex-col p-[24px] gap-[48px]">
        <H1>Готовы получить визу в Россию? Начните с приглашения.</H1>
        <form className="flex flex-col gap-[32px]">
          <Text>
            Заполните короткую форму — и получите официальный документ уже
            сегодня.
          </Text>
          <div className="flex flex-col gap-[40px]">
            <div className="flex flex-col gap-[24px]">
              <Input placeholder="Имя" />
              <Input placeholder="Телефон" />
              <Input placeholder="Почта" />
            </div>
            <div className="flex flex-col gap-[12px]">
              <div className="flex flex-row gap-[12px] items-center">
                <Checkbox />
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  <LinkText href={"privacy-policy"}>
                    Нажимая на кнопку, вы соглашаетесь с политикой в отношении
                    обработки персональных данных
                  </LinkText>
                </label>
              </div>
              <div className="flex flex-row gap-[12px] items-center">
                <Checkbox />
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  <LinkText href={"privacy-policy"}>
                    Нажимая на кнопку, вы даёте согласие на обработку
                    персональных данных
                  </LinkText>
                </label>
              </div>
              <div className="flex flex-row gap-[12px] items-center pl-[calc(24px+12px)]">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  <LinkText href={"privacy-policy"}>
                    Памятка пребывания иностранных граждан, лиц без гражданства
                    в Российской Федерации
                  </LinkText>
                </label>
              </div>
            </div>
            <Button className="w-full">Написать нам</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Ready;
