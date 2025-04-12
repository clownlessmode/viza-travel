"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export type SelectOption = {
  value: string;
  label: string;
};

interface NativeSelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  issss?: boolean;
  className?: string;
}

export function NativeSelect({
  options,
  value,
  onChange,
  placeholder = "Выберите значение...",
  disabled = false,
  issss = false,
  className,
}: NativeSelectProps) {
  const t = useTranslations("visa.types");
  const x = useTranslations("visa.times");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    const selectedOption = options.find(
      (option) => option.value === selectedValue
    );

    if (!selectedOption) return;

    // Проверка на "Бизнес виза"
    if (selectedOption.label === t("Бизнес виза")) {
      return;
    }

    // Проверка для issss режима
    if (
      issss &&
      !(
        selectedOption.label === x("15 дней - Однократная") ||
        selectedOption.label === x("30 дней - Однократная")
      )
    ) {
      return;
    }

    onChange?.(selectedValue);
  };

  return (
    <select
      value={value}
      onChange={handleChange}
      disabled={disabled}
      className={cn(
        "text-xs sm:text-[14px] truncate max-w-full",
        "border-none shadow-none text-left justify-between placeholder:text-black/30",
        "selection:bg-primary selection:text-primary-foreground",
        "flex w-full min-w-0 rounded-[8px] bg-[rgba(0,0,0,0.03)]",
        "px-[24px] py-[16px] sm:text-[18px] leading-[130%] text-base",
        "transition-[color,box-shadow] outline-none",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-primary/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
        className
      )}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((option) => {
        const isDisabled =
          option.label === t("Бизнес виза") ||
          (issss &&
            !(
              option.label === x("15 дней - Однократная") ||
              option.label === x("30 дней - Однократная")
            ));

        return (
          <option
            key={option.value + option.label}
            value={option.value}
            disabled={isDisabled}
            className={cn(isDisabled && "opacity-50 cursor-not-allowed")}
          >
            {option.label}
          </option>
        );
      })}
    </select>
  );
}
