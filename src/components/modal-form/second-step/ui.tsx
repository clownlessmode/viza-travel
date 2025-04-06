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
import React, { FC, useState } from "react";

import { FormValues } from "./types";
import useIndexForm from "../indexStore";

// import { Combobox } from "@/components/ui/combobox";
import H2FORM from "../h2";
// import { DATAVIZA } from "@/app/data";

import { Separator } from "@/components/ui/separator";

import useForm from "./hook";
import useFirstStepStore from "../firstStepStore";
import { Input } from "@/components/ui/input";
import PolCards from "@/components/ui/pol-cards";
import { Combobox } from "@/components/ui/combobox";
// import { useUniqueCountries } from "../first-step/ui";
import { DATAVIZA } from "@/app/data";
import { useUniqueCountries } from "../first-step/ui";
import useSecondStepStore from "../secondStepStore";
import { useTranslations } from "next-intl";

export const useVisitTypes = () => {
  const t = useTranslations("visitTypes");

  const rawVisitTypes = [
    "Отдых, экскурсии и знакомство с культурой России",
    "- Участие в конференциях, выставках, посещение официальных мероприятий",
  ];

  return rawVisitTypes.map((value) => ({
    value,
    label: t(value) || value,
  }));
};
const SecondStep: FC = () => {
  const visitTypes = useVisitTypes();

  // const [peopleIndex, setPeopleIndex] = useState(0);
  const form = useForm();
  const { index: currentIndex, setIndex } = useIndexForm();
  const countries = useUniqueCountries(DATAVIZA);

  const { firstStepPrice } = useFirstStepStore();
  // citizenship; // Страна из которой отправляемся например Andorra, Australia
  // vizaType; // Тип визы например бизнес виза
  const [datas, setDatas] = useState<FormValues[]>([]);
  const { setSecondStepData } = useSecondStepStore();
  function onSubmit(values: FormValues) {
    const updatedDatas = [...datas, values];
    setDatas(updatedDatas);

    // const isFinal = peopleIndex + 1 === Number(peoples);

    // if (isFinal) {
    // Сохраняем данные, переходим к следующему шагу
    // setTouristData(updatedDatas); // если используешь store
    //   console.log("Все туристы:", updatedDatas);
    // } else {
    // Следующий турист
    setSecondStepData(values);
    setIndex(currentIndex + 1);

    // setPeopleIndex((prev) => prev + 1);
    // }
  }
  const t = useTranslations("touristForm");

  return (
    <DialogContent className="max-w-[650px]! sm:px-[60px] sm:py-[44px] px-[28px]! py-[20px]! rounded-[24px] lg:rounded-[48px]">
      <DialogHeader>
        <DialogDescription>
          <button
            className={cn(
              "sm:text-[24px] text-primary underline underline-offset-4 text-[18px]"
            )}
            onClick={() => setIndex(0)}
          >
            {t("back")}
          </button>
          <div className="flex flex-row gap-[48px] items-center">
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
        {firstStepPrice !== null && (
          <div className="flex justify-between items-center gap-4 mt-[24px]">
            <H2FORM className="text-foreground text-nowrap">
              {t("total")}
            </H2FORM>
            <Button className="rounded-[8px]! sm:w-[300px]">
              {firstStepPrice}
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
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("lastName")}</FormLabel>
                <FormControl>
                  <Input {...field} placeholder={t("lastNamePlaceholder")} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("firstName")}</FormLabel>
                <FormControl>
                  <Input {...field} placeholder={t("firstNamePlaceholder")} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="middleName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("middleName")}</FormLabel>
                <FormControl>
                  <Input {...field} placeholder={t("middleNamePlaceholder")} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-row gap-2 w-full justify-between items-start">
            <FormField
              control={form.control}
              name="birthDate"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>{t("birthDate")}</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>{t("gender")}</FormLabel>
                  <FormControl>
                    <PolCards
                      {...field}
                      onValueChange={field.onChange}
                      options={[
                        { label: t("male"), value: "male" },
                        { label: t("female"), value: "female" },
                      ]}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="passportNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("passportNumber")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    maxLength={30}
                    placeholder={t("passportNumberPlaceholder")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="passportExpiryDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("passportExpiryDate")}</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
                {form.formState.errors.passportExpiryDate && (
                  <div className="sm:border-2 border flex flex-col gap-2.5 border-destructive bg-[rgba(244, 246, 251, 1)] rounded-[24px] p-[12px] sm:p-[24px] mt-2">
                    <p>{t("passportExpiryWarning1")}</p>
                    <p>{t("passportExpiryWarning2")}</p>
                    <p>{t("passportExpiryWarning3")}</p>
                  </div>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="entryDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("entryDate")}</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="exitDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("exitDate")}</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="citizenship"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("citizenship")}</FormLabel>
                <FormControl>
                  <Combobox
                    {...field}
                    options={countries}
                    placeholder={t("citizenshipPlaceholder")}
                    searchPlaceholder={t("citizenshipSearch")}
                    emptyText={t("citizenshipEmpty")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tripPurpose"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("tripPurpose")}</FormLabel>
                <FormControl>
                  <Combobox
                    {...field}
                    options={visitTypes}
                    placeholder={t("tripPurposePlaceholder")}
                    searchPlaceholder={t("tripPurposeSearch")}
                    emptyText={t("tripPurposeEmpty")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="itinerary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("itinerary")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    multiple
                    placeholder={t("itineraryPlaceholder")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="additionalInfo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("additionalInfo")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    multiple
                    placeholder={t("additionalInfoPlaceholder")}
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
            {t("next")}
          </Button>
        </form>
      </Form>
    </DialogContent>
  );
};

export default SecondStep;
