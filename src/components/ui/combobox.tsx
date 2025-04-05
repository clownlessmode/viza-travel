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
}

export function Combobox({
  options,
  value,
  onChange,
  placeholder = "Выберите значение...",
  searchPlaceholder = "Поиск...",
  emptyText = "Ничего не найдено",
  className,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);

  const selectedLabel = options.find((option) => option.value === value)?.label;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="w-full">
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

      <PopoverContent className="w-full p-0">
        <Command className="w-full">
          <CommandInput className="w-full" placeholder={searchPlaceholder} />
          <CommandList className="w-full">
            <CommandEmpty className="w-full">{emptyText}</CommandEmpty>
            <CommandGroup className="w-full">
              {options.map((option) => (
                <CommandItem
                  className="w-full"
                  key={option.value + option.label + String(new Date())}
                  value={option.value}
                  onSelect={(currentValue) => {
                    if (currentValue !== value) {
                      onChange?.(currentValue);
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
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
