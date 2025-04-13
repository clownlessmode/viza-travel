/* eslint-disable @typescript-eslint/no-unused-vars */
// ui.tsx

"use client";
import { v4 as uuidv4 } from "uuid";
import * as RadioGroup from "@radix-ui/react-radio-group";
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

  const g = useTranslations("touristForm");
  const k = useTranslations("contactForm");
  const z = useTranslations("extraform");

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
  const getLabelByValues = (value: string) => {
    return DATAVIZA.find((citizenship) => citizenship.id.toString() === value);
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
    console.log(datasss);
    // try {
    //   const response = await fetch("/api/send-form", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(datasss),
    //   });

    //   if (response.ok) {
    //   } else {
    //     const errorData = await response.json();
    //     console.error("Ошибка при отправке письма:", errorData);
    //   }
    // } catch (error) {
    //   console.error("Ошибка сети:", error);
    // }

    try {
      const amount = String(sum);
      const invId = Math.floor(
        100000000 + Math.random() * 900000000
      ).toString();

      // 1. Сначала создаем заказ в БД
      const orderResponse = await fetch("/api/orders/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...datasss,
          invId,
          status: "Не оплачено",
          amount: sum,
        }),
      });

      if (!orderResponse.ok) {
        throw new Error("Failed to create order");
      }

      const order = await orderResponse.json();
      console.log(order, "invId");

      // 2. Только после успешного создания заказа инициируем платеж
      const params = new URLSearchParams({
        amount,
        description: "Оплата туристических услуг",
        email: order.email,
        userId: order.invId, // Используем invId как идентификатор пользователя
        orderId: order.invId, // ID заказа в БД
      });

      const paymentResponse = await fetch(`/api/payment?${params}`);
      const paymentData = await paymentResponse.json();
      console.log(paymentData);
      if (paymentData.paymentUrl) {
        window.location.href = paymentData.paymentUrl;
      } else {
        throw new Error("Payment URL not received");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Ошибка при создании платежа");
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
  const email = form.watch("email");

  const { data } = useSecondStepStore();
  console.log(form);

  const sum = data.reduce((acc, num) => acc + num.price, 0);
  console.log(secondStepData.data);
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
          className="space-y-4  px-1"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {/* Citizenship */}

          {/* SECOND */}
          {/* Last Name */}
          {secondStepData.data.map((traveler, index) => (
            <React.Fragment key={index}>
              <DialogTitle className="justify-between mb-6 mt-0">
                {g("trs")} {index + 1}
              </DialogTitle>
              <FormItem>
                <FormLabel>*{t("lastName")}</FormLabel>
                <FormControl>
                  <Input value={traveler.lastName} disabled />
                </FormControl>
              </FormItem>

              <FormItem>
                <FormLabel>*{t("firstName")}</FormLabel>
                <FormControl>
                  <Input value={traveler.firstName} disabled />
                </FormControl>
              </FormItem>

              <FormItem>
                <FormLabel>*{t("middleName")}</FormLabel>
                <FormControl>
                  <Input value={traveler.middleName || ""} disabled />
                </FormControl>
              </FormItem>
              <FormItem>
                <FormLabel>*{z("firststep.form.citizenship")}</FormLabel>
                <FormControl>
                  <Input
                    value={
                      getLabelByValues(traveler.citizenship)?.country || ""
                    }
                    disabled
                  />
                </FormControl>
              </FormItem>
              <FormItem>
                <FormLabel>*{z("firststep.form.visaType")}</FormLabel>
                <FormControl>
                  <Input value={traveler.visaType || ""} disabled />
                </FormControl>
              </FormItem>
              <FormItem>
                <FormLabel>*{z("firststep.form.visaTime")}</FormLabel>
                <FormControl>
                  <Input value={traveler.visaTime || ""} disabled />
                </FormControl>
              </FormItem>
              <div
                className={cn(
                  "relative group ring-[1px] bg-[rgba(0,0,0,0.03)] rounded-[8px] ring-border py-[16px] px-[24px] text-left transition-colors",
                  "data-[state=checked]:ring-2 data-[state=checked]:ring-primary",
                  "hover:bg-muted cursor-pointer",
                  "flex flex-col gap-[12px]"
                )}
              >
                {/* Верхняя часть */}
                <div className="flex flex-row gap-2 justify-between items-center">
                  <div className="flex-1 flex flex-row pl-2 gap-x-[36px] gap-y-0 text-[18px] flex-wrap">
                    <p className="w-[90px]">
                      {getLabelByValue(traveler.tourType)?.label}
                    </p>
                    <p className="w-[140px]">
                      {getLabelByValue(traveler.tourType)?.description}
                    </p>
                    <p className="font-bold">
                      {getLabelByValue(traveler.tourType)?.price}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:justify-between sm:items-start">
                <FormItem className="w-full">
                  <FormLabel>*{t("birthDate")}</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      placeholder={"----"}
                      value={traveler.birthDate}
                      disabled
                    />
                  </FormControl>
                </FormItem>

                <FormItem className="w-full">
                  <FormLabel>*{t("gender")}</FormLabel>
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
                <FormLabel>*{t("passportNumber")}</FormLabel>
                <FormControl>
                  <Input value={traveler.passportNumber} disabled type="text" />
                </FormControl>
              </FormItem>

              <FormItem>
                <FormLabel>*{t("passportExpiryDate")}</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    value={traveler.passportExpiryDate}
                    disabled
                  />
                </FormControl>
              </FormItem>

              <FormItem>
                <FormLabel>*{t("entryDate")}</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    placeholder={"----"}
                    value={traveler.entryDate}
                    disabled
                  />
                </FormControl>
              </FormItem>

              <FormItem>
                <FormLabel>*{t("exitDate")}</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    placeholder={"----"}
                    value={traveler.exitDate}
                    disabled
                  />
                </FormControl>
              </FormItem>

              <FormItem>
                <FormLabel>*{t("tripPurpose")}</FormLabel>
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
                <FormLabel>*{t("itinerary")}</FormLabel>
                <FormControl>
                  <Input value={traveler.itinerary} disabled />
                </FormControl>
              </FormItem>

              <FormItem>
                <FormLabel>*{t("additionalInfo")}</FormLabel>
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
                <FormLabel>*{t("phone")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="tel"
                    disabled
                    placeholder="+7 (___) ___-__-__"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>*{t("email")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    disabled
                    placeholder="example@mail.com"
                  />
                </FormControl>
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
              </FormItem>
            )}
          />
          {firstStepPrice !== null && (
            <div className="flex justify-between items-center gap-4 mt-[24px]">
              <H2FORM className="text-foreground text-nowrap text-sm! sm:text-lg!">
                {t("total")}
              </H2FORM>
              <div className="flex flex-row gap-1">
                <Button className="rounded-[8px]!" size={"sm"}>
                  {sum}₽
                </Button>
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
