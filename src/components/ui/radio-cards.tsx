// components/ui/radio-cards.tsx
import React, { FC, useState } from "react";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export interface Option {
  value: string;
  label: string;
  price: string;
  description?: string;
  table?: string[];
}

export interface RadioCardsProps extends RadioGroup.RadioGroupProps {
  options: Option[];
  className?: string;
  columns?: number;
}

const RadioCards: FC<RadioCardsProps> = ({
  options,
  value,
  onValueChange,
  defaultValue,
  className,
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
      value={value}
      onValueChange={handleToggle}
      defaultValue={defaultValue ?? options[0]?.value}
      className={cn(`flex flex-col gap-[32px] w-full`, className)}
      {...props}
    >
      {options.map((option) => {
        const isOpen = openCard === option.value;

        return (
          <RadioGroup.Item
            key={option.value}
            value={option.value}
            className={cn(
              "relative group ring-[1px] bg-[rgba(0,0,0,0.03)] rounded-[8px] ring-border py-[16px] px-[24px] text-left transition-colors",
              "data-[state=checked]:ring-2 data-[state=checked]:ring-primary",
              "hover:bg-muted cursor-pointer",
              "flex flex-col gap-[12px]"
            )}
          >
            {/* Верхняя часть */}
            <div className="flex flex-row gap-2 justify-between items-center">
              <div className="size-5 border border-black group-data-[state=checked]:border-primary rounded-full flex items-center justify-center">
                <RadioGroup.Indicator className="size-3 bg-primary rounded-full" />
              </div>
              <div className="flex-1 flex flex-row pl-2 gap-[36px] text-[18px] ">
                <p className="w-[90px]">{option.label}</p>
                <p>{option.description}</p>
                <p className="font-bold">{option.price}</p>
              </div>
              {option.table && (
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown strokeWidth={1} />
                </motion.div>
              )}
            </div>

            {/* Раскрывающаяся часть */}
            {option.table && (
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden text-[18px]"
                  >
                    <div className="mt-[12px]">
                      <p className="font-bold">Moscow</p>
                      <p className="mt-[8px]">Included:</p>
                      <ul className="list-disc list-outside pl-4 mt-2">
                        {option.table?.map((item: string, index: number) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </RadioGroup.Item>
        );
      })}
    </RadioGroup.Root>
  );
};

export default RadioCards;
