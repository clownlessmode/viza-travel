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
  FormMessage,
} from "@/components/ui/form";

import { cn } from "@/lib/utils";
import React, { FC } from "react";

import useIndexForm from "../indexStore";

import H2FORM from "../h2";

import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import useFirstStepStore, { FirstStepData } from "../firstStepStore";

import useThirdStepStore from "../thirdStepStore";
import { useForm } from "react-hook-form";
import useSecondStepStore, { SecondStepData } from "../secondStepStore";
import { FormValues } from "../three-step/types";
import RadioCards from "@/components/ui/radio-cards";
import { useTranslatedTours, useUniqueCountries } from "../first-step/ui";
import PolCards from "@/components/ui/pol-cards";
import { Checkbox } from "@/components/ui/checkbox";
import LinkText from "@/components/ui/texts/link-text";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { DATAVIZA } from "@/app/data";
import { useVisitTypes } from "../second-step/ui";
import { VisaApplicationEmailProps } from "@/components/blocks/templates";

export interface VisaDataItem {
  id: number;
  country: string;
  type: string;
  time: string;
  cost: string;
}
interface YGUYB extends FirstStepData, SecondStepData, FormValues {
  checkbox1: boolean;
  checkbox2: boolean;
}
type VisitTypeItem = {
  value: string;
};
export function getVisitTypesByLocale(
  locale: string,
  visitTypes: VisitTypeItem[]
): { value: string; label: string }[] {
  return visitTypes.map(({ value }) => {
    const translatedLabel = visitTypeTranslations[value]?.[locale] ?? value;

    return {
      value,
      label: translatedLabel,
    };
  });
}
// utils/translateVisitType.ts

export function translateVisitType(value: string): string {
  // Получаем язык из браузера
  const locale =
    typeof navigator !== "undefined"
      ? navigator.language.split("-")[0] // 'en-US' → 'en'
      : "ru"; // fallback для SSR или node

  const translations: Record<string, Record<string, string>> = {
    "Отдых, экскурсии и знакомство с культурой России": {
      ru: "Отдых, экскурсии и знакомство с культурой России",
      en: "Leisure, excursions, and exploring Russian culture",
      zh: "休闲、观光和了解俄罗斯文化",
      ar: "الترفيه والجولات والتعرف على الثقافة الروسية",
    },
    "Участие в конференциях, выставках, посещение официальных мероприятий": {
      ru: "Участие в конференциях, выставках, посещение официальных мероприятий",
      en: "Attending conferences, exhibitions, and official events",
      zh: "参加会议、展览和官方活动",
      ar: "المشاركة في المؤتمرات والمعارض والفعاليات الرسمية",
    },
  };

  return translations[value]?.[locale] ?? value;
}
// translations/visitTypeTranslations.ts
export const visitTypeTranslations: Record<string, Record<string, string>> = {
  "Отдых, экскурсии и знакомство с культурой России": {
    ru: "Отдых, экскурсии и знакомство с культурой России",
    en: "Leisure, excursions, and exploring Russian culture",
    zh: "休闲、观光和了解俄罗斯文化",
    ar: "الترفيه والجولات والتعرف على الثقافة الروسية",
  },
  "- Участие в конференциях, выставках, посещение официальных мероприятий": {
    ru: "Участие в конференциях, выставках, посещение официальных мероприятий",
    en: "Attending conferences, exhibitions, and official events",
    zh: "参加会议、展览和官方活动",
    ar: "المشاركة في المؤتمرات والمعارض والفعاليات الرسمية",
  },
};
const SVODKA: FC<{ onClose: () => void }> = ({ onClose }) => {
  const t = useTranslations("summaryForm");
  const x = useTranslations("visa");
  const g = useTranslations("touristForm");
  const k = useTranslations("contactForm");

  const visitTypes = useVisitTypes();

  const tours = useTranslatedTours();
  const { index: currentIndex, setIndex } = useIndexForm();
  const { setThirdStepData, resetThirdStepData, ...thirdStepData } =
    useThirdStepStore();
  const {
    setFirstStepData,
    resetFirstStepData,
    firstStepPrice,

    ...firstStepData
  } = useFirstStepStore();
  const { addSecondStepData, resetSecondStepData, ...secondStepData } =
    useSecondStepStore();
  const getLabelByValue = (value: string) => {
    return tours.find((tour) => tour.value === value);
  };
  async function onSubmit(data: YGUYB) {
    // setThirdStepData({ ...values });
    const datasss: VisaApplicationEmailProps = {
      citizenship: firstStepData.citizenship,
      vizaType: firstStepData.vizaType,
      peoples: firstStepData.peoples,

      firstStepPrice: firstStepPrice, // 👈 обязательно указать
      vizaTypeTwo: firstStepData.vizaTypeTwo,
      data: secondStepData.data, // 👈 массив людей
      phone: thirdStepData.phone,
      email: thirdStepData.email,
      preferredContact: thirdStepData.preferredContact,
    };
    toast.success(k("success"));

    try {
      const response = await fetch("/api/send-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datasss),
      });

      if (response.ok) {
      } else {
        const errorData = await response.json();
        console.error("Ошибка при отправке письма:", errorData);
      }
    } catch (error) {
      console.error("Ошибка сети:", error);
    }
    onClose();
    form.reset();
    setIndex(0);
  }

  const form = useForm<YGUYB>({
    defaultValues: {
      ...firstStepData,
      ...secondStepData,
      ...thirdStepData,
      checkbox1: false,
      checkbox2: false,
    },
  });

  const { data } = useSecondStepStore();

  const sum = data.reduce((acc, num) => acc + num.price, 0);

  return (
    <DialogContent className="max-w-[650px]! sm:px-[60px] sm:py-[44px] px-[28px]! py-[20px]! rounded-[24px] lg:rounded-[48px]">
      <DialogHeader>
        <DialogDescription>
          <button
            className={cn(
              "sm:text-[24px] text-primary underline underline-offset-4 text-[18px]"
            )}
            onClick={() => setIndex(currentIndex - 1)}
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
        <DialogTitle>{t("title")}</DialogTitle>
        <Separator className="mt-[12px]" />
      </DialogHeader>

      <Form {...form}>
        <form
          className="space-y-2 mt-[12px] px-1"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {/* Citizenship */}

          {/* SECOND */}
          {/* Last Name */}
          {secondStepData.data.map((traveler, index) => (
            <React.Fragment key={index}>
              <DialogTitle className="justify-between mb-6">
                {g("trs")} {index + 1}
              </DialogTitle>
              <FormItem>
                <FormLabel>{t("lastName")}</FormLabel>
                <FormControl>
                  <Input value={traveler.lastName} disabled />
                </FormControl>
              </FormItem>

              <FormItem>
                <FormLabel>{t("firstName")}</FormLabel>
                <FormControl>
                  <Input value={traveler.firstName} disabled />
                </FormControl>
              </FormItem>

              <FormItem>
                <FormLabel>{t("middleName")}</FormLabel>
                <FormControl>
                  <Input value={traveler.middleName || ""} disabled />
                </FormControl>
              </FormItem>

              <div className="flex flex-row gap-2 w-full justify-between items-start">
                <FormItem className="w-full">
                  <FormLabel>{t("birthDate")}</FormLabel>
                  <FormControl>
                    <Input type="date" value={traveler.birthDate} disabled />
                  </FormControl>
                </FormItem>

                <FormItem className="w-full">
                  <FormLabel>{t("gender")}</FormLabel>
                  <FormControl>
                    <Input
                      value={
                        traveler.gender === "male" ? t("male") : t("female")
                      }
                      disabled
                    />
                  </FormControl>
                </FormItem>
              </div>

              <FormItem>
                <FormLabel>{t("passportNumber")}</FormLabel>
                <FormControl>
                  <Input value={traveler.passportNumber} disabled type="text" />
                </FormControl>
              </FormItem>

              <FormItem>
                <FormLabel>{t("passportExpiryDate")}</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    value={traveler.passportExpiryDate}
                    disabled
                  />
                </FormControl>
              </FormItem>

              <FormItem>
                <FormLabel>{t("entryDate")}</FormLabel>
                <FormControl>
                  <Input type="date" value={traveler.entryDate} disabled />
                </FormControl>
              </FormItem>

              <FormItem>
                <FormLabel>{t("exitDate")}</FormLabel>
                <FormControl>
                  <Input type="date" value={traveler.exitDate} disabled />
                </FormControl>
              </FormItem>

              <FormItem>
                <FormLabel>{t("tripPurpose")}</FormLabel>
                <FormControl>
                  <Input
                    value={translateVisitType(
                      visitTypes.find((v) => v.value === traveler.tripPurpose)
                        ?.label || traveler.tripPurpose
                    )}
                    disabled
                  />
                </FormControl>
              </FormItem>

              <FormItem>
                <FormLabel>{t("itinerary")}</FormLabel>
                <FormControl>
                  <Input value={traveler.itinerary} disabled />
                </FormControl>
              </FormItem>

              <FormItem>
                <FormLabel>{t("additionalInfo")}</FormLabel>
                <FormControl>
                  <Input value={traveler.additionalInfo || ""} disabled />
                </FormControl>
              </FormItem>
              {/* <Separator className="my-10 bg-blue-300" /> */}
            </React.Fragment>
          ))}
          {/* SECOND END */}
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("phone")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="tel"
                    disabled
                    placeholder="+7 (___) ___-__-__"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("email")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    disabled
                    placeholder="example@mail.com"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <DialogTitle>{k("preferredTitle")}</DialogTitle>
            <Separator className="mt-[12px]" />
          </div>
          <FormField
            control={form.control}
            name="preferredContact"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <PolCards
                    disabled
                    {...field}
                    onValueChange={field.onChange}
                    options={[
                      { label: "What’s App", value: "whatsapp" },
                      { label: "Telegram", value: "telegram" },
                      { label: "E-mail", value: "email" },
                    ]}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {firstStepPrice !== null && (
            <div className="flex justify-between items-center gap-4 mt-[24px]">
              <H2FORM className="text-foreground text-nowrap">
                {t("total")}
              </H2FORM>
              <div className="flex flex-row gap-1">
                <Button className="rounded-[8px]!">{sum}₽</Button>
              </div>
            </div>
          )}
          <div className="flex flex-col gap-[12px] mt-[24px]">
            {/* Checkbox 1 */}
            <div className="flex flex-row gap-[12px] items-center">
              <Checkbox
                checked={form.watch("checkbox1")}
                onCheckedChange={(checked) =>
                  form.setValue("checkbox1", Boolean(checked), {
                    shouldValidate: true,
                  })
                }
              />
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                <>
                  {t("checkbox.text1.left")}
                  <LinkText href="agreement" target="_blank">
                    {t("checkbox.text1.agree")}
                  </LinkText>
                  {t("checkbox.text1.center")}
                  <LinkText href="policy" target="_blank">
                    {t("checkbox.text1.pers")}
                  </LinkText>
                  {t("checkbox.text1.right")}
                </>
              </label>
            </div>
            {form.formState.errors.checkbox1 && (
              <p className="text-sm text-red-500 pl-8">
                {form.formState.errors.checkbox1.message}
              </p>
            )}

            {/* Static Policy Text */}
            <div className="flex flex-row gap-[12px] items-center pl-[calc(24px+12px)]">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                <LinkText href="policy">{t("checkbox.text3")}</LinkText>
              </label>
            </div>
          </div>
          <Button
            type="submit"
            className="mt-[48px] w-full"
            disabled={!form.formState.isValid || !form.watch("checkbox1")}
          >
            {t("button")}
          </Button>
        </form>
      </Form>
    </DialogContent>
  );
};

export default SVODKA;
