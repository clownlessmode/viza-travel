"use client";

import * as React from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTranslations } from "next-intl";

// Тип одной опции
export type ComboboxOption = {
  value: string;
  label: string;
};

// Пропсы компонента
interface ComboboxProps {
  options: ComboboxOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  className?: string;
  disabled?: boolean;
  visaType?: boolean;
  issss?: boolean;
}

export function Combobox({
  options,
  value,
  onChange,
  placeholder = "Выберите значение...",
  searchPlaceholder = "Поиск...",
  emptyText = "Ничего не найдено",
  className,
  disabled = false,
  issss = false,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const t = useTranslations("visa.types");
  const x = useTranslations("visa.times");
  const selectedLabel = options.find((option) => option.value === value)?.label;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="w-full" disabled={disabled}>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "file:text-foreground border-none shadow-none text-left justify-between placeholder:text-black/30 text-[14px] selection:bg-primary selection:text-primary-foreground  border-input flex w-full min-w-0 rounded-[8px] bg-[rgba(0,0,0,0.03)] px-[24px] py-[16px] sm:text-[18px] leading-[130%] text-base transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "focus-visible:border-ring focus-visible:ring-primary/50 focus-visible:ring-[3px]",
            "aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
            className
          )}
        >
          {selectedLabel ? (
            selectedLabel
          ) : (
            <p className="text-black/30">{placeholder}</p>
          )}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="p-0 popover-content-width-full" align="start">
        <Command className="w-full">
          <CommandInput className="w-full" placeholder={searchPlaceholder} />
          <CommandList className="w-full">
            <ScrollArea className="h-[300px]" type="auto">
              <CommandEmpty className="w-full">{emptyText}</CommandEmpty>
              <CommandGroup className="w-full">
                {options.map((option) => (
                  <CommandItem
                    className={cn(
                      "w-full",
                      option.label === t("Бизнес виза") &&
                        "opacity-50 cursor-not-allowed",
                      !issss
                        ? ""
                        : option.label === x("15 дней - Однократная") ||
                            option.label === x("30 дней - Однократная")
                          ? ""
                          : "opacity-50 cursor-not-allowed"
                    )}
                    key={
                      option.value +
                      option.label +
                      String(new Date() + String(Math.random))
                    }
                    value={option.label}
                    onSelect={() => {
                      if (option.label === t("Бизнес виза")) {
                        return; // ничего не делаем
                      }

                      if (
                        issss && // если режим включён
                        !(
                          // и label НЕ входит в разрешённые
                          (
                            option.label === x("15 дней - Однократная") ||
                            option.label === x("30 дней - Однократная")
                          )
                        )
                      ) {
                        return;
                      }

                      // Всё ок — можно выбрать
                      if (option.value !== value) {
                        onChange?.(option.value);
                      }
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === option.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
