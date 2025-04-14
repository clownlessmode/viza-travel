/* eslint-disable @typescript-eslint/no-unused-vars */
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
} from "@/components/ui/form";

import { cn } from "@/lib/utils";
import React, { FC, useMemo } from "react";

import { FormValues } from "./types";
import useIndexForm from "../indexStore";

import { Combobox, ComboboxOption } from "@/components/ui/combobox";
import H2FORM from "../h2";
import { DATAVIZA } from "@/app/data";

import { Separator } from "@/components/ui/separator";

import useFirstStepStore from "../firstStepStore";
import { useTranslations } from "next-intl";
import { NumberInputWithButtons } from "./Numeric";
import { useForm } from "react-hook-form";

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
        // .filter((item) => item.type !== t("Бизнес виза"))
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
    if (!visaType) {
      return [];
    }

    const seen = new Set<string>();

    const filteredByType = data.filter((item) => {
      const match = item.type === visaType;

      return match;
    });

    const uniqueByTime = filteredByType.filter((item) => {
      if (seen.has(item.time)) {
        return false;
      }
      seen.add(item.time);
      return true;
    });

    const result = uniqueByTime.map((item) => {
      const translated = t(item.time);
      return {
        label: t(item.time) ?? item.time,
        value: item.time,
      };
    });

    return result;
  }, [data, visaType, t]);
};

export interface VisaDataItem {
  id: number;
  country: string;
  type: string;
  time: string;
  cost: string;
}

export interface TourItem {
  value: string;
  price: string;
}

interface UseTotalVisaCostRubResult {
  total: number | null;
  isVip: boolean;
}

// export const useTotalVisaCostInRub = (
//   data: VisaDataItem[],
//   countryId: string | undefined,
//   visaType: string | undefined,
//   visaTime: string | undefined,
//   peoples: string | undefined,
//   selectedTourValue: string | undefined,
//   tours: TourItem[],
//   currencyRate: number = 1
// ): UseTotalVisaCostRubResult => {
//   return useMemo(() => {
//     if (!countryId || !visaType || !visaTime) {
//       return { total: null, isVip: false };
//     }

//     const visa = data.find(
//       (item) =>
//         item.id.toString() === countryId &&
//         item.type === visaType &&
//         item.time === visaTime
//     );

//     if (!visa) return { total: null, isVip: false };

//     const numPeople = Number(peoples || 1);
//     const visaCostUsd = parseFloat(visa.cost.replace("$", "").trim());
//     if (isNaN(numPeople) || isNaN(visaCostUsd))
//       return { total: null, isVip: false };

//     const visaCostRubTotal = visaCostUsd * currencyRate * numPeople;

//     let tourCostRub = 0;
//     let isVip = false;

//     const selectedTour = tours.find((t) => t.value === selectedTourValue);

//     if (selectedTour?.value === "VIP") {
//       isVip = true;
//       const maxTour = tours
//         .filter((t) => t.value !== "VIP")
//         .map((t) => ({
//           ...t,
//           numPrice: parseFloat(t.price.replace("₽", "").replace(/\s/g, "")),
//         }))
//         .sort((a, b) => b.numPrice - a.numPrice)[0];

//       if (maxTour) {
//         tourCostRub = 0;
//       }
//     } else if (selectedTour && selectedTour.value !== "VIP") {
//       tourCostRub = parseFloat(
//         selectedTour.price.replace("₽", "").replace(/\s/g, "")
//       );
//     }

//     const totalRub = visaCostRubTotal + tourCostRub * numPeople;

//     const roundedTotal = totalRub; //Math.ceil(totalRub / 1000) * 1000;

//     return {
//       total: roundedTotal,
//       isVip,
//     };
//   }, [
//     data,
//     countryId,
//     visaType,
//     visaTime,
//     peoples,
//     selectedTourValue,
//     tours,
//     currencyRate,
//   ]);
// };
export const useTotalVisaCostInRub = (
  data: VisaDataItem[],
  countryId: string | undefined,
  visaType: string | undefined,
  visaTime: string | undefined,
  peoples: string | undefined,
  selectedTourValue: string | undefined,
  tours: TourItem[],
  currencyRate: number = 1
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

    if (selectedTour) {
      if (selectedTour.value === "VIP") {
        isVip = true;
      }

      tourCostRub = parseFloat(
        selectedTour.price.replace("₽", "").replace(/\s/g, "")
      );
    }

    const totalRub = visaCostRubTotal + tourCostRub * numPeople;

    const roundedTotal = totalRub; //Math.ceil(totalRub / 1000) * 1000;

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
      price: "100 000 ₽",
      description: t("VIP.description"),
    },
  ];
};
const FirstStep: FC<{ onClose: () => void }> = ({ onClose }) => {
  const { setFirstStepData, ...firstStepDataaa } = useFirstStepStore();

  const form = useForm({
    defaultValues: {
      citizenship: firstStepDataaa.citizenship || "",
      vizaType: firstStepDataaa.vizaType || "",
      vizaTypeTwo: firstStepDataaa.vizaTypeTwo || "",
      peoples: firstStepDataaa.peoples || "1",
      // tourType: "Standard",
    },
  });
  const tours = useTranslatedTours();
  const { index: currentIndex, setIndex } = useIndexForm();
  const countries = useUniqueCountries(DATAVIZA);

  const selectedCountryId = form.watch("citizenship");
  const visaTypes = useVisaTypesByCountryId(DATAVIZA, selectedCountryId);
  const selectedVisaType = form.watch("vizaType");
  const visaTimes = useVisaTimesByType(DATAVIZA, selectedVisaType);
  const selectedVisaTime = form.watch("vizaTypeTwo");
  const peoples = form.watch("peoples");
  // const selectedTourValue = form.watch("tourType");

  const { total, isVip } = useTotalVisaCostInRub(
    DATAVIZA,
    selectedCountryId,
    selectedVisaType,
    selectedVisaTime,
    peoples,
    undefined,
    tours
  );
  const getLabelByValue = (value: string) => {
    return tours.find((tour) => tour.value === value);
  };
  function onSubmit(values: FormValues) {
    setFirstStepData({
      firstStepPrice: `${total}${isVip ? "₽ VIP" : "₽"}`,
      ...values,
    });

    setIndex(1);
  }
  const t = useTranslations("extraform");
  const x = useTranslations("visa.times");
  const s = useTranslations("visa.types");

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
            <H2FORM className="text-foreground text-nowrap text-sm! sm:text-lg!">
              {t("firststep.form.totalLabel")}
            </H2FORM>
            <div className="flex flex-row gap-1">
              <Button className="rounded-[8px]!" size={"sm"}>
                {Number(total) - 0}
              </Button>
            </div>
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
                <FormLabel>*{t("firststep.form.citizenship")}</FormLabel>
                <FormControl>
                  <Combobox
                    {...field}
                    options={countries}
                    placeholder={t("firststep.form.citizenshipPlaceholder")}
                    searchPlaceholder={t("firststep.form.citizenshipSearch")}
                    emptyText={t("firststep.form.citizenshipEmpty")}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="vizaType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>*{t("firststep.form.visaType")}</FormLabel>
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
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="vizaTypeTwo"
            render={({ field }) => (
              // &&
              //           selectedVisaType === x("15 дней - Однократная")) ||
              //         selectedVisaType === x("30 дней - Однократная")
              <FormItem>
                <FormLabel>*{t("firststep.form.visaTime")}</FormLabel>
                <FormControl>
                  <Combobox
                    disabled={!form.watch("vizaType")}
                    {...field}
                    issss
                    // visaType={
                    //   selectedVisaTime === x("15 дней - Однократная") ||
                    //   selectedVisaTime === x("30 дней - Однократная")
                    //     ? true
                    //     : false
                    // }
                    options={visaTimes}
                    placeholder={t("firststep.form.visaTimePlaceholder")}
                    searchPlaceholder={t("firststep.form.visaTimeSearch")}
                    emptyText={t("firststep.form.visaTimeEmpty")}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="peoples"
            render={({ field }) => (
              <FormItem>
                <FormLabel>*{t("firststep.form.peoples")}</FormLabel>
                <FormControl>
                  <NumberInputWithButtons
                    {...field}
                    min={1}
                    max={1000}
                    disabled={!form.watch("vizaTypeTwo")}
                    placeholder={t("firststep.form.peoplesPlaceholder")}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* <div>
            <DialogTitle>{t("firststep.form.tourHeading")}</DialogTitle>
            <Separator className="mt-[12px]" />
          </div>
          <FormField
            control={form.control}
            name="tourType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>*{t("firststep.form.tourType")}</FormLabel>
                <FormControl>
                  <RadioCards
                    {...field}
                    onValueChange={field.onChange}
                    options={tours}
                    required={[
                      "110",
                      "112",
                      "143",
                      "145",
                      "146",
                      "187",
                      "194",
                      "53",
                      "55",
                      "57",
                      "255",
                      "191",
                      "162",
                      "75",
                      "225",
                      "158",
                      "160",
                      "236",
                    ].includes(selectedCountryId)}
                    disabled={!form.watch("peoples")}
                  />
                </FormControl>
                
              </FormItem>
            )}
          /> */}
          {/* )} */}

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
