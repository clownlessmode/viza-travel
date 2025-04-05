// components/ui/radio-cards.tsx
import React, { FC, useState } from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { cn } from "@/lib/utils";

export interface Option {
  value: string;
  label: string;
}

export interface RadioCardsProps extends RadioGroup.RadioGroupProps {
  options: Option[];
  className?: string;
  columns?: number;
  disabled?: boolean;
}

const PolCards: FC<RadioCardsProps> = ({
  options,
  value,
  onValueChange,
  defaultValue,
  className,
  disabled = false,
  ...props
}) => {
  const [openCard, setOpenCard] = useState<string | null>(value ?? null);

  const handleToggle = (val: string) => {
    if (val === openCard) {
      setOpenCard(null); // закрыть, если уже выбрано
    } else {
      setOpenCard(val); // открыть новую
    }
    onValueChange?.(val); // вызвать родительскую смену значения
  };

  return (
    <RadioGroup.Root
      disabled={disabled}
      value={value}
      onValueChange={handleToggle}
      defaultValue={defaultValue ?? options[0]?.value}
      className={cn(`flex flex-col gap-[32px] w-full`, className)}
      {...props}
    >
      {options.map((option) => {
        return (
          <RadioGroup.Item
            key={option.value}
            value={option.value}
            className={cn(
              "relative group ring-[1px] bg-[rgba(0,0,0,0.03)] rounded-[8px] ring-border py-[16px] px-[24px] text-left transition-colors",
              "data-[state=checked]:ring-2 data-[state=checked]:ring-primary",
              "hover:bg-muted cursor-pointer",
              "flex flex-row gap-[12px]"
            )}
          >
            <div className="size-5 border border-black group-data-[state=checked]:border-primary rounded-full flex items-center justify-center">
              <RadioGroup.Indicator className="size-3 bg-primary rounded-full" />
            </div>
            <p>{option.label}</p>
          </RadioGroup.Item>
        );
      })}
    </RadioGroup.Root>
  );
};

export default PolCards;
