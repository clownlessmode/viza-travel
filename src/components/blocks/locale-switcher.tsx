"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

// Define available languages
const languages = [
  { code: "en", name: "English" },
  { code: "ar", name: "أرابيكا" },
  { code: "ch", name: "中国人" },
  { code: "ru", name: "Русский" },
];

export default function LanguageSwitcher() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  //   // Get the current language name
  //   const currentLanguage =
  //     languages.find((lang) => lang.code === locale) || languages[0];

  // Function to switch language
  const switchLanguage = (newLocale: string) => {
    // Get the path without the locale prefix
    const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/";

    // Navigate to the same path but with the new locale
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-1">
          <span className="font-medium">{locale.toUpperCase()}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel className="font-medium">
          {t("selectlang")}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            disabled={language.code === locale}
          >
            <button
              className="flex w-full items-center justify-between"
              onClick={() => switchLanguage(language.code)}
            >
              <span>{language.name}</span>
              <span className="text-muted-foreground">
                {language.code.toUpperCase()}
              </span>
            </button>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
