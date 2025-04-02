import React, { FC } from "react";
import Logotype from "../logotype";
import NavigationText from "../ui/texts/navigation-text";
import Link from "next/link";

const Footer: FC = () => {
  return (
    <footer className="flex flex-col rounded-t-[24px] p-[20px] gap-[48px] bg-white">
      <Logotype />
      <div className="flex flex-row flex-wrap gap-[40px] md:justify-between">
        <nav className="flex flex-col gap-[12px]">
          <NavigationText>
            <Link href={"#"}>Процесс</Link>
          </NavigationText>
          <NavigationText>
            <Link href={"#"}>О компании</Link>
          </NavigationText>
          <NavigationText>
            <Link href={"#"}>Преимущества</Link>
          </NavigationText>
          <NavigationText>
            <Link href={"#"}>FAQ</Link>
          </NavigationText>
          <NavigationText>
            <Link href={"#"}>Памятка пребывания иностранных граждан</Link>
          </NavigationText>
        </nav>
        <nav className="flex flex-col gap-[12px]">
          <NavigationText>
            <Link href={"#"}>
              Написать в WhatsApp <br />
              +7 (968) 01 000-24
            </Link>
          </NavigationText>
          <NavigationText>
            <Link href={"mailto:support@visarussia24.ru"}>
              support@visarussia24.ru
            </Link>
          </NavigationText>
        </nav>
        <nav className="flex flex-col gap-[12px] max-w-[400px]">
          <NavigationText>
            <Link href={"#"}>
              Юр.адрес : Нижегородская область, М.О. Дивеевский, д. Маевка, ул
              Родниковая, д. 14
            </Link>
          </NavigationText>
          <NavigationText>
            <Link href={"#"}>
              ОГРН : 1255200003145 <br /> ИНН : 5254498269
              <br /> Реестровый номер туроператора: <br />
              B031-00161-77/01942487
            </Link>
          </NavigationText>
        </nav>
      </div>
      <nav className="flex flex-col md:flex-row gap-[12px] opacity-50 md:justify-between md: max-w-[600px]">
        <NavigationText>
          <Link href={"#"}>Пользовательское соглашение</Link>
        </NavigationText>
        <NavigationText>
          <Link href={"#"}>Политика о конфиденциальности</Link>
        </NavigationText>
        <NavigationText>
          <Link href={"#"}>Оферта </Link>
        </NavigationText>
      </nav>
    </footer>
  );
};

export default Footer;
