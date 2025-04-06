"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import NavigationText from "../ui/texts/navigation-text";

// Define available languages
const languages = [
  { code: "en", name: "EN" },
  { code: "ar", name: "عرب" },
  { code: "ch", name: "中文" },
  { code: "ru", name: "РУ" },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (newLocale: string) => {
    const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/";
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex bg-transparent items-center gap-1 shadow-none! w-[92px]"
        >
          <span className="font-medium">{locale.toUpperCase()}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        className="w-[92px] border-none bg-[rgb(240,240,240)] p-0  gap-[12px] py-[12px] min-w-none rounded-[25px] justify-center items-center flex flex-col"
      >
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            asChild
            disabled={language.code === locale}
          >
            <button
              className="hover:scale-[1.1] cursor-pointer bg-transparent! hover:bg-transparent transition-all"
              onClick={() => switchLanguage(language.code)}
            >
              <NavigationText>{language.name}</NavigationText>
            </button>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
