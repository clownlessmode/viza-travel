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
import React, { FC, useMemo } from "react";
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
import useFirstStepStore from "../firstStepStore";

export interface VisaDataItem {
  id: number;
  country: string;
  type: string;
  time: string;
  cost: string;
}

export const tours = [
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

// const selectedTour = useMemo(() => {
//   return tours.find((tour) => tour.value === tourType);
// }, [tourType]);
// const minVisaCost = useMemo(() => {
//   if (!selectedCountryId) return null;

//   // Находим выбранную страну по ID
//   const selectedCountry = countries.find(
//     (country) => country.value === selectedCountryId
//   );

//   if (!selectedCountry) return null;

//   // Фильтруем визы по названию страны

//   if (visasForCountry.length === 0) return null;

//   // Парсим цену
//   const parseCost = (cost: string) =>
//     parseFloat(cost.replace("$", "").replace("₽", "").trim());

//   // Находим минимальную визу
//   const minVisa = visasForCountry.reduce((min, current) => {
//     return parseCost(current.cost) < parseCost(min.cost) ? current : min;
//   });

//   return parseCost(minVisa.cost); // Возвращаем число, а не строку
// }, [selectedCountryId, countries]);

// const totalCost = useMemo(() => {
//   const tourists = parseInt(peoples || "0", 10);
//   if (!minVisaCost || !tourists || isNaN(tourists)) return null;

//   let tourCost = 0;

//   if (selectedTour && selectedTour.price !== "individually") {
//     const parsedTourCost = parseFloat(
//       selectedTour.price.replace("₽", "").replace(/\s/g, "").trim()
//     );
//     if (!isNaN(parsedTourCost)) {
//       tourCost = parsedTourCost;
//     }
//   }

//   const total = minVisaCost * tourists + tourCost / 85;

//   return {
//     amount: total.toFixed(),
//     isVip: selectedTour?.price === "individually",
//   };
// }, [minVisaCost, peoples, selectedTour]);
export const useUniqueCountries = (data: VisaDataItem[]): ComboboxOption[] => {
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
export const useVisaTypesByCountryId = (
  data: VisaDataItem[],
  countryId: string | undefined
): ComboboxOption[] => {
  return useMemo(() => {
    if (!countryId) return [];

    const seen = new Set<string>();

    return data
      .filter((item) => item.id.toString() === countryId)
      .filter((item) => {
        if (seen.has(item.type)) return false;
        seen.add(item.type);
        return true;
      })
      .map((item) => ({
        label: item.type,
        value: item.type,
      }));
  }, [data, countryId]);
};

export const useVisaTimesByType = (
  data: VisaDataItem[],
  visaType: string | undefined
): ComboboxOption[] => {
  return useMemo(() => {
    if (!visaType) return [];

    const seen = new Set<string>();

    return data
      .filter((item) => item.type === visaType)
      .filter((item) => {
        if (seen.has(item.time)) return false;
        seen.add(item.time);
        return true;
      })
      .map((item) => ({
        label: item.time,
        value: item.time,
      }));
  }, [data, visaType]);
};

export interface VisaDataItem {
  id: number;
  country: string;
  type: string;
  time: string;
  cost: string; // "$" string
}

export interface TourItem {
  value: string;
  price: string; // "24 000 ₽" or "individually"
}

interface UseTotalVisaCostRubResult {
  total: number | null;
  isVip: boolean;
}

export const useTotalVisaCostInRub = (
  data: VisaDataItem[],
  countryId: string | undefined,
  visaType: string | undefined,
  visaTime: string | undefined,
  peoples: string | undefined,
  selectedTourValue: string | undefined,
  tours: TourItem[],
  currencyRate: number = 85 // можно передавать другой курс, если надо
): UseTotalVisaCostRubResult => {
  return useMemo(() => {
    if (!countryId || !visaType || !visaTime) {
      return { total: null, isVip: false };
    }

    const visa = data.find(
      (item) =>
        item.id.toString() === countryId &&
        item.type === visaType &&
        item.time === visaTime
    );

    if (!visa) return { total: null, isVip: false };

    const numPeople = Number(peoples || 1);
    const visaCostUsd = parseFloat(visa.cost.replace("$", "").trim());
    if (isNaN(numPeople) || isNaN(visaCostUsd))
      return { total: null, isVip: false };

    const visaCostRubTotal = visaCostUsd * currencyRate * numPeople;

    let tourCostRub = 0;
    let isVip = false;

    const selectedTour = tours.find((t) => t.value === selectedTourValue);

    if (selectedTour?.price === "individually") {
      isVip = true;

      // Выбираем самый дорогой тур (по цене в рублях)
      const maxTour = tours
        .filter((t) => t.price !== "individually")
        .map((t) => ({
          ...t,
          numPrice: parseFloat(t.price.replace("₽", "").replace(/\s/g, "")),
        }))
        .sort((a, b) => b.numPrice - a.numPrice)[0];

      if (maxTour) {
        tourCostRub = 0; //maxTour.numPrice;
      }
    } else if (selectedTour && selectedTour.price !== "individually") {
      tourCostRub = parseFloat(
        selectedTour.price.replace("₽", "").replace(/\s/g, "")
      );
    }

    const totalRub = visaCostRubTotal + tourCostRub;

    // Округление вверх до ближайших 1000₽
    const roundedTotal = Math.ceil(totalRub / 1000) * 1000;

    return {
      total: roundedTotal,
      isVip,
    };
  }, [
    data,
    countryId,
    visaType,
    visaTime,
    peoples,
    selectedTourValue,
    tours,
    currencyRate,
  ]);
};

const FirstStep: FC<{ onClose: () => void }> = ({ onClose }) => {
  const form = useForm();
  const { index: currentIndex, setIndex } = useIndexForm();
  const countries = useUniqueCountries(DATAVIZA);
  const { setFirstStepData } = useFirstStepStore();

  const selectedCountryId = form.watch("citizenship");
  const visaTypes = useVisaTypesByCountryId(DATAVIZA, selectedCountryId);
  const selectedVisaType = form.watch("vizaType");
  const visaTimes = useVisaTimesByType(DATAVIZA, selectedVisaType);
  const selectedVisaTime = form.watch("vizaTypeTwo");
  const peoples = form.watch("peoples"); // Кол-во туристов (string or number)
  const selectedTourValue = form.watch("tourType"); // Кол-во туристов (string or number)

  const { total, isVip } = useTotalVisaCostInRub(
    DATAVIZA,
    selectedCountryId,
    selectedVisaType,
    selectedVisaTime,
    peoples,
    selectedTourValue,
    tours
  );

  function onSubmit(values: FormValues) {
    setFirstStepData({
      firstStepPrice: `${total}${isVip ? "₽ VIP" : "₽"}`,
      ...values,
    });
    console.log({
      firstStepPrice: `${total}${isVip ? "₽ VIP" : "₽"}`,
      ...values,
    });
    setIndex(1);
  }
  return (
    <DialogContent className="px-0! py-0! overflow-y-hidden">
      <ScrollArea className="max-h-[95vh] h-full lg:max-h-[80vh] sm:px-[60px] sm:py-[44px] px-[28px] py-[20px]">
        <DialogHeader>
          <DialogDescription>
            <button
              className={cn(
                "sm:text-[24px] text-primary underline underline-offset-4 text-[18px]"
              )}
              onClick={onClose}
            >
              Назад
            </button>
            <div className="flex flex-row sm:gap-[48px] gap-[24px] items-center">
              {[1, 2, 3, 4].map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "size-3 sm:size-4 rounded-full",
                    currentIndex === index ? "bg-primary" : "bg-black/10"
                  )}
                />
              ))}
            </div>
          </DialogDescription>
          <DialogTitle>Приглашение в Россию</DialogTitle>
          {total !== null && (
            <div className="flex justify-between items-center gap-4 mt-[24px]">
              <H2FORM className="text-foreground text-nowrap">
                Сумма заказа:
              </H2FORM>
              <Button className="rounded-[8px]! sm:w-[300px]">
                {total}
                {isVip ? "₽ VIP" : "₽"}
              </Button>
            </div>
          )}
          <Separator className="mt-[12px]" />
        </DialogHeader>
        <Form {...form}>
          <form
            className="space-y-2 mt-[12px] px-1"
            onSubmit={form.handleSubmit(onSubmit)}
          >
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
                      disabled={!form.watch("citizenship")}
                      {...field}
                      options={visaTypes}
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
              name="vizaTypeTwo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Тип и время визы</FormLabel>
                  <FormControl>
                    <Combobox
                      disabled={!form.watch("vizaType")}
                      {...field}
                      options={visaTimes}
                      placeholder="Выберите тип и время визы"
                      searchPlaceholder="Поиск типа и времени визы..."
                      emptyText="Тип и время визы не найдена"
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
                      disabled={!form.watch("vizaTypeTwo")}
                      placeholder="Выберите количество туристов"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                      disabled={!form.watch("peoples")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="mt-[48px] w-full"
              disabled={!form.formState.isValid}
            >
              Далее
            </Button>
          </form>
        </Form>
      </ScrollArea>
    </DialogContent>
  );
};

export default FirstStep;
