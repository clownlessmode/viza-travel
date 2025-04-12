/* eslint-disable react-hooks/exhaustive-deps */
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
import React, { FC, useEffect, useRef, useState } from "react";

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
import {
  useTotalVisaCostInRub,
  useTranslatedTours,
  useUniqueCountries,
  useVisaTimesByType,
  useVisaTypesByCountryId,
} from "../first-step/ui";
import useSecondStepStore from "../secondStepStore";
import { useTranslations } from "next-intl";
import RadioCards from "@/components/ui/radio-cards";

export const useVisitTypes = () => {
  const t = useTranslations("visitTypes");

  const rawVisitTypes = [
    "Отдых, экскурсии и знакомство с культурой России",
    "Участие в конференциях, выставках, посещение официальных мероприятий",
  ];

  return rawVisitTypes.map((value) => ({
    value,
    label: t(value) || value,
  }));
};
const SecondStep: FC = () => {
  const visitTypes = useVisitTypes();

  const [peopleIndex, setPeopleIndex] = useState(0);
  const form = useForm();
  const { index: currentIndex, setIndex } = useIndexForm();
  const countries = useUniqueCountries(DATAVIZA);
  useEffect(() => {
    form.setValue("citizenship", citizenship);
    form.setValue("visaType", vizaType);
    form.setValue("visaTypeTwo", vizaTypeTwo);
  }, []);

  const { peoples, citizenship, vizaTypeTwo, vizaType } = useFirstStepStore();
  const { addSecondStepData, data } = useSecondStepStore();
  const dialogRef = useRef<HTMLDivElement | null>(null);

  function onSubmit(values: FormValues) {
    const isFinal = peopleIndex + 1 === Number(peoples);

    if (!isFinal) {
      addSecondStepData({
        ...values,

        visaType: selectedVisaType,
        visaTime: selectedVisaTime,
        price: Number(total),
      });
      form.reset();
      setPeopleIndex((prev) => prev + 1);
      form.setValue("citizenship", citizenship);
      form.setValue("visaType", vizaType);
      form.setValue("visaTypeTwo", vizaTypeTwo);
      scrollToTop();
    } else {
      addSecondStepData({
        ...values,
        visaType: selectedVisaType,
        visaTime: selectedVisaTime,
        price: Number(total),
        // (getLabelByValue(selectedTour as string)?.price
        //   ? Number(
        //       getLabelByValue(selectedTour as string)?.price.replace(
        //         /\D/g,
        //         ""
        //       )
        //     )
        //   : 0),
      });
      setIndex(currentIndex + 1);

      scrollToTop();
    }
  }
  const y = useTranslations("extraform");

  const tours = useTranslatedTours();
  const selectedCountryId = form.watch("citizenship");

  const visaTypes = useVisaTypesByCountryId(DATAVIZA, selectedCountryId);
  const selectedVisaType = form.watch("visaType");
  const visaTimes = useVisaTimesByType(DATAVIZA, selectedVisaType);
  const selectedVisaTime = form.watch("visaTypeTwo");
  const selectedTour = form.watch("tourType");

  const getLabelByValue = (value: string) => {
    return tours.find((tour) => tour.value === value);
  };
  const t = useTranslations("touristForm");
  const scrollToTop = () => {
    const overlay = document.querySelector('[data-slot="dialog-overlay"]');
    overlay?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const { total, isVip } = useTotalVisaCostInRub(
    DATAVIZA,
    selectedCountryId,
    selectedVisaType,
    selectedVisaTime,
    "1",
    selectedTour,
    tours
  );

  const { total: pricePerPerson } = useTotalVisaCostInRub(
    DATAVIZA,
    citizenship,
    vizaType,
    vizaTypeTwo,
    "1", // один человек
    undefined,
    tours
  );

  // Теперь создаём массив цен:
  const visaPricesPerPerson = Array.from(
    { length: Number(peoples) },
    () => pricePerPerson
  );
  const totalVisaPrice = Number(peoples) * (pricePerPerson ?? 0);

  return (
    <DialogContent
      className="max-w-[650px]! sm:px-[60px] sm:py-[44px] px-[28px]! py-[20px]! rounded-[24px] lg:rounded-[48px]"
      ref={dialogRef}
    >
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
        <DialogTitle className="justify-between">
          {t("title")}
          {Number(peoples) > 1 && (
            <span className="opacity-50">
              {" "}
              ({peopleIndex + 1}/{peoples})
            </span>
          )}
        </DialogTitle>
        {visaPricesPerPerson && (
          <div className="flex justify-between items-center gap-4 mt-[24px]">
            <H2FORM className="text-foreground text-nowrap text-sm! sm:text-lg!">
              {t("total")}
            </H2FORM>
            <div className="flex sm:flex-row gap-1 flex-col">
              <Button className="rounded-[8px]! " size={"sm"}>
                {visaPricesPerPerson?.length > 0 && peopleIndex !== 0
                  ? (total as number) +
                    (data?.slice(0, peopleIndex).reduce((acc, item) => {
                      const price =
                        typeof item?.price === "string"
                          ? Number(item.price)
                          : Number(item?.price ?? 0);
                      return acc + price;
                    }, 0) ?? 0) +
                    (visaPricesPerPerson
                      ?.slice(peopleIndex + 1)
                      .reduce(
                        (acc, price) => (acc as number) + (price ?? 0),
                        0
                      ) ?? 0) -
                    Number(
                      getLabelByValue(selectedTour as string)?.price.replace(
                        /\D/g,
                        ""
                      )
                    )
                  : totalVisaPrice}
                ₽{" "}
                {selectedTour !== "no-tour" && isVip !== true && (
                  <span className="opacity-50">
                    +
                    {getLabelByValue(selectedTour as string)?.price
                      ? Number(
                          getLabelByValue(
                            selectedTour as string
                          )?.price.replace(/\D/g, "")
                        )
                      : 0}
                    ₽
                  </span>
                )}
              </Button>
              {selectedTour != "no-tour" && (
                <Button className="rounded-[8px]!" size={"sm"}>
                  {t("st")}: {getLabelByValue(selectedTour as string)?.label}
                </Button>
              )}
            </div>
          </div>
        )}
        <Separator className="mt-[12px]" />
      </DialogHeader>

      <Form {...form}>
        <form
          className="space-y-6 mt-[12px] px-1"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>*{t("lastName")}</FormLabel>
                <FormControl>
                  <Input {...field} placeholder={t("lastNamePlaceholder")} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>*{t("firstName")}</FormLabel>
                <FormControl>
                  <Input {...field} placeholder={t("firstNamePlaceholder")} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="middleName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>*{t("middleName")}</FormLabel>
                <FormControl>
                  <Input {...field} placeholder={t("middleNamePlaceholder")} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="citizenship"
            render={({ field }) => (
              <FormItem>
                <FormLabel>*{y("firststep.form.citizenship")}</FormLabel>
                <FormControl>
                  <Combobox
                    {...field}
                    options={countries}
                    placeholder={y("firststep.form.citizenshipPlaceholder")}
                    searchPlaceholder={y("firststep.form.citizenshipSearch")}
                    emptyText={y("firststep.form.citizenshipEmpty")}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="visaType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>*{y("firststep.form.visaType")}</FormLabel>
                <FormControl>
                  <Combobox
                    disabled={!form.watch("citizenship")}
                    {...field}
                    options={visaTypes}
                    placeholder={y("firststep.form.visaTypePlaceholder")}
                    searchPlaceholder={y("firststep.form.visaTypeSearch")}
                    emptyText={y("firststep.form.visaTypeEmpty")}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="visaTypeTwo"
            render={({ field }) => (
              // &&
              //           selectedVisaType === x("15 дней - Однократная")) ||
              //         selectedVisaType === x("30 дней - Однократная")
              <FormItem>
                <FormLabel>*{y("firststep.form.visaTime")}</FormLabel>
                <FormControl>
                  <Combobox
                    disabled={!form.watch("visaType")}
                    {...field}
                    issss
                    // visaType={
                    //   selectedVisaTime === x("15 дней - Однократная") ||
                    //   selectedVisaTime === x("30 дней - Однократная")
                    //     ? true
                    //     : false
                    // }
                    options={visaTimes}
                    placeholder={y("firststep.form.visaTimePlaceholder")}
                    searchPlaceholder={y("firststep.form.visaTimeSearch")}
                    emptyText={y("firststep.form.visaTimeEmpty")}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex sm:flex-row gap-2 w-full sm:justify-between sm:items-start">
            <FormField
              control={form.control}
              name="birthDate"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>*{t("birthDate")}</FormLabel>
                  <FormControl>
                    <Input type="date" placeholder={"----"} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>*{t("gender")}</FormLabel>
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
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="passportNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>*{t("passportNumber")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    maxLength={30}
                    placeholder={t("passportNumberPlaceholder")}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="passportExpiryDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>*{t("passportExpiryDate")}</FormLabel>
                <FormControl>
                  <Input type="date" placeholder={"----"} {...field} />
                </FormControl>

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
                <FormLabel>*{t("entryDate")}</FormLabel>
                <FormControl>
                  <Input type="date" placeholder={"----"} {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="exitDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>*{t("exitDate")}</FormLabel>
                <FormControl>
                  <Input type="date" placeholder={"----"} {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tripPurpose"
            render={({ field }) => (
              <FormItem>
                <FormLabel>*{t("tripPurpose")}</FormLabel>
                <FormControl>
                  <Combobox
                    {...field}
                    options={visitTypes}
                    placeholder={t("tripPurposePlaceholder")}
                    searchPlaceholder={t("tripPurposeSearch")}
                    emptyText={t("tripPurposeEmpty")}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="itinerary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>*{t("itinerary")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    multiple
                    placeholder={t("itineraryPlaceholder")}
                  />
                </FormControl>
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
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tourType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>*{y("firststep.form.tourType")}</FormLabel>
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
                  />
                </FormControl>
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
