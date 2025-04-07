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

import useFirstStepStore from "../firstStepStore";
import { useTranslations } from "next-intl";

export interface VisaDataItem {
  id: number;
  country: string;
  type: string;
  time: string;
  cost: string;
}

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
  const t = useTranslations("visa.types");

  return useMemo(() => {
    if (!countryId) return [];

    const seen = new Set<string>();

    return (
      data
        .filter((item) => item.id.toString() === countryId)
        // 👉 Убираем "бизнес-визу"
        .filter((item) => item.type !== t("Бизнес виза")) // или "Business", в зависимости от данных
        .filter((item) => {
          if (seen.has(item.type)) return false;
          seen.add(item.type);
          return true;
        })
        .map((item) => ({
          label: t(item.type) ?? item.type,
          value: item.type,
        }))
    );
  }, [data, countryId, t]);
};

export const useVisaTimesByType = (
  data: VisaDataItem[],
  visaType: string | undefined
): ComboboxOption[] => {
  const t = useTranslations("visa.times");

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
        label: t(item.time) ?? item.time,
        value: item.time,
      }));
  }, [data, visaType, t]);
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

    if (selectedTour?.value === "VIP") {
      isVip = true;

      // Выбираем самый дорогой тур (по цене в рублях)
      const maxTour = tours
        .filter((t) => t.value !== "VIP")
        .map((t) => ({
          ...t,
          numPrice: parseFloat(t.price.replace("₽", "").replace(/\s/g, "")),
        }))
        .sort((a, b) => b.numPrice - a.numPrice)[0];

      if (maxTour) {
        tourCostRub = 0; //maxTour.numPrice;
      }
    } else if (selectedTour && selectedTour.value !== "VIP") {
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

export const useTranslatedTours = () => {
  const t = useTranslations("tours");

  return [
    {
      value: "Economy",
      label: t("Economy.label"),
      price: "24 000 ₽",
      description: t("Economy.description"),
      table: [
        t("Economy.table.0"),
        t("Economy.table.1"),
        t("Economy.table.2"),
        t("Economy.table.3"),
      ],
    },
    {
      value: "Standard",
      label: t("Standard.label"),
      price: "34 000 ₽",
      description: t("Standard.description"),
      table: [
        t("Standard.table.0"),
        t("Standard.table.1"),
        t("Standard.table.2"),
        t("Standard.table.3"),
        t("Standard.table.4"),
      ],
    },
    {
      value: "Premium",
      label: t("Premium.label"),
      price: "59 000 ₽",
      description: t("Premium.description"),
      table: [
        t("Premium.table.0"),
        t("Premium.table.1"),
        t("Premium.table.2"),
        t("Premium.table.3"),
        t("Premium.table.4"),
      ],
    },
    {
      value: "VIP",
      label: t("VIP.label"),
      price: t("VIP.price"),
      description: t("VIP.description"),
    },
  ];
};
const FirstStep: FC<{ onClose: () => void }> = ({ onClose }) => {
  const form = useForm();
  const tours = useTranslatedTours();
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
  const t = useTranslations("extraform");

  return (
    <DialogContent className="max-w-[650px]! sm:px-[60px] sm:py-[44px] px-[28px]! py-[20px]! rounded-[24px] lg:rounded-[48px]">
      <DialogHeader>
        <DialogDescription>
          <button
            className="sm:text-[24px] text-primary underline underline-offset-4 text-[18px]"
            onClick={onClose}
          >
            {t("back")}
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

        <DialogTitle>{t("firststep.heading")}</DialogTitle>

        {total !== null && (
          <div className="flex justify-between items-center gap-4 mt-[24px]">
            <H2FORM className="text-foreground text-nowrap">
              {t("firststep.form.totalLabel")}
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
                <FormLabel>{t("firststep.form.citizenship")}</FormLabel>
                <FormControl>
                  <Combobox
                    {...field}
                    options={countries}
                    placeholder={t("firststep.form.citizenshipPlaceholder")}
                    searchPlaceholder={t("firststep.form.citizenshipSearch")}
                    emptyText={t("firststep.form.citizenshipEmpty")}
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
                <FormLabel>{t("firststep.form.visaType")}</FormLabel>
                <FormControl>
                  <Combobox
                    disabled={!form.watch("citizenship")}
                    {...field}
                    options={visaTypes}
                    placeholder={t("firststep.form.visaTypePlaceholder")}
                    searchPlaceholder={t("firststep.form.visaTypeSearch")}
                    emptyText={t("firststep.form.visaTypeEmpty")}
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
                <FormLabel>{t("firststep.form.visaTime")}</FormLabel>
                <FormControl>
                  <Combobox
                    disabled={!form.watch("vizaType")}
                    {...field}
                    options={visaTimes}
                    placeholder={t("firststep.form.visaTimePlaceholder")}
                    searchPlaceholder={t("firststep.form.visaTimeSearch")}
                    emptyText={t("firststep.form.visaTimeEmpty")}
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
                <FormLabel>{t("firststep.form.peoples")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    min={1}
                    max={1000}
                    type="number"
                    disabled={!form.watch("vizaTypeTwo")}
                    placeholder={t("firststep.form.peoplesPlaceholder")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <DialogTitle>{t("firststep.form.tourHeading")}</DialogTitle>
            <Separator className="mt-[12px]" />
          </div>

          <FormField
            control={form.control}
            name="tourType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("firststep.form.tourType")}</FormLabel>
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
            {t("firststep.form.next")}
          </Button>
        </form>
      </Form>
    </DialogContent>
  );
};

export default FirstStep;
