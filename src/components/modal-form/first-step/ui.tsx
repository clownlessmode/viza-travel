// ui.tsx
"use client";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { cn } from "@/lib/utils";
import React, { FC, useMemo, useState } from "react";
import useForm from "./hook";
import { FormValues } from "./types";
import useIndexForm from "../indexStore";

import { Combobox, ComboboxOption } from "@/components/ui/combobox";
import H2FORM from "../h2";
import { DATAVIZA } from "@/app/data";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import RadioCards from "@/components/ui/radio-cards";
import { ScrollArea } from "@/components/ui/scroll-area";

interface VisaDataItem {
  id: number;
  country: string;
  type: string;
  time: string;
  cost: string;
}

const tours = [
  {
    value: "Economy",
    label: "Economy",
    price: "24 000 ₽",
    description: "4 day / 3 night",
    table: [
      "3 night in a 3★ hotel",
      "1 day of city tour with a guide and car",
      "Sights: Red Square, St. Basil's Cathedral, Arbat, Moscow Metro",
      "Invitation support",
    ],
  },
  {
    value: "Standard",
    label: "Standard",
    price: "34 000 ₽",
    description: "5 days / 4 nights",
    table: [
      "4 nights in a 3★ hotel with breakfasts",
      "2 days of excursions with a guide and transportation",
      "Main places: Red Square, Kremlin (outside), Victory Park, Moscow City, Gorky Park, Izmailovo Market.",
      "Meeting at the airport",
      "Support by invitation",
    ],
  },
  {
    value: "Premium",
    label: "Premium",
    price: "59 000 ₽",
    description: "6 days / 5 nights",
    table: [
      "5  nights in a 3★ hotel with breakfasts",
      "3 days of guided tours, 2 free days",
      "Full excursion program: Red Square, Kremlin (inside), GUM, Arbat, Vorobyovy Gory, Moskva River embankment, etc.",
      "Airport transfer",
      "Support by invitation",
    ],
  },
  {
    value: "VIP",
    label: "VIP",
    price: "individually",
    description: "7 days/ 6 nights",
  },
];

const types: ComboboxOption[] = [
  {
    label: "Туристическая виза",
    value: "Туристическая виза",
  },
  {
    label: "Бизнес виза",
    value: "Бизнес виза",
  },
  {
    label: "Электронная виза",
    value: "Электронная виза",
  },
];
const useUniqueCountries = (data: VisaDataItem[]): ComboboxOption[] => {
  return useMemo(() => {
    const seen = new Set<string>();

    return data.reduce<ComboboxOption[]>((acc, item) => {
      const key = `${item["id"]}-${item["country"]}`;
      if (!seen.has(key)) {
        seen.add(key);
        acc.push({
          value: item["id"].toString(),
          label: item["country"],
        });
      }
      return acc;
    }, []);
  }, [data]);
};

const FirstStep: FC = () => {
  const [stepIndex, setStepIndex] = useState(0);
  const form = useForm();
  const { index: currentIndex, setIndex } = useIndexForm();
  const countries = useUniqueCountries(DATAVIZA);

  function onSubmit(values: FormValues) {
    console.log(values);
    setStepIndex(1);
    if (stepIndex === 1) {
      setIndex(1);
    }
  }

  const selectedCountryId = form.watch("citizenship"); // ID страны (string)
  const peoples = form.watch("peoples"); // Кол-во туристов (string or number)

  const minVisaCost = useMemo(() => {
    if (!selectedCountryId) return null;

    // Находим выбранную страну по ID
    const selectedCountry = countries.find(
      (country) => country.value === selectedCountryId
    );

    if (!selectedCountry) return null;

    // Фильтруем визы по названию страны
    const visasForCountry = DATAVIZA.filter(
      (item) => item.country === selectedCountry.label
    );

    if (visasForCountry.length === 0) return null;

    // Парсим цену
    const parseCost = (cost: string) =>
      parseFloat(cost.replace("$", "").replace("₽", "").trim());

    // Находим минимальную визу
    const minVisa = visasForCountry.reduce((min, current) => {
      return parseCost(current.cost) < parseCost(min.cost) ? current : min;
    });

    return parseCost(minVisa.cost); // Возвращаем число, а не строку
  }, [selectedCountryId, countries]);

  const totalCost = useMemo(() => {
    const tourists = parseInt(peoples || "0", 10);
    if (!minVisaCost || !tourists || isNaN(tourists)) return null;

    return minVisaCost * tourists;
  }, [minVisaCost, peoples]);
  const vizaTime = false;
  return (
    <DialogContent className="px-1! py-1! ">
      <ScrollArea className="max-h-[90vh] h-full lg:max-h-[80vh] sm:mx-[60px] sm:my-[44px] mx-[28px] my-[20px]">
        <DialogHeader>
          <DialogDescription>
            <button
              className={cn(
                "text-[24px] text-primary underline underline-offset-4"
              )}
            >
              Назад
            </button>
            <div className="flex flex-row gap-[48px] items-center">
              {[1, 2, 3, 4].map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "size-4 rounded-full",
                    currentIndex === index ? "bg-primary" : "bg-black/10"
                  )}
                />
              ))}
            </div>
          </DialogDescription>
          <DialogTitle>Приглашение в Россию</DialogTitle>
          {totalCost !== null && (
            <div className="flex justify-between items-center gap-4 mt-[24px]">
              <H2FORM className="text-foreground text-nowrap">
                Сумма заказа:
              </H2FORM>
              <Button className="rounded-[8px]! w-[300px]">
                {vizaTime != false && "От "}
                {totalCost}$
              </Button>
            </div>
          )}
          <Separator className="mt-[12px]" />
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="citizenship"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Гражданство</FormLabel>
                  <FormControl>
                    <Combobox
                      {...field}
                      options={countries}
                      placeholder="Выберите страну"
                      searchPlaceholder="Поиск страны..."
                      emptyText="Страна не найдена"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="vizaType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Тип визы</FormLabel>
                  <FormControl>
                    <Combobox
                      {...field}
                      options={types}
                      placeholder="Выберите тип визы"
                      searchPlaceholder="Поиск типа визы..."
                      emptyText="Тип визы не найдена"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="peoples"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Количество туристов</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      min={1}
                      max={1000}
                      type="number"
                      placeholder="Выберите количество туристов"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {stepIndex > 0 && (
              <>
                <div>
                  <DialogTitle>Туры</DialogTitle>
                  <Separator className="mt-[12px]" />
                </div>
                <FormField
                  control={form.control}
                  name="tourType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Количество туристов</FormLabel>
                      <FormControl>
                        <RadioCards
                          {...field}
                          onValueChange={field.onChange}
                          options={tours}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
            <Button type="submit" className="mt-[48px] w-full">
              Далее
            </Button>
          </form>
        </Form>
      </ScrollArea>
    </DialogContent>
  );
};

export default FirstStep;
