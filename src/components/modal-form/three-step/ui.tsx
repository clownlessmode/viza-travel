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
import useForm from "./hook";
import { FormValues } from "./types";
import useIndexForm from "../indexStore";

import H2FORM from "../h2";

import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import useFirstStepStore from "../firstStepStore";
import PolCards from "@/components/ui/pol-cards";
import useThirdStepStore from "../thirdStepStore";
import { useTranslations } from "next-intl";
import { useTranslatedTours } from "../first-step/ui";

export interface VisaDataItem {
  id: number;
  country: string;
  type: string;
  time: string;
  cost: string;
}

const ThirdStep: FC = () => {
  const form = useForm();
  const { index: currentIndex, setIndex } = useIndexForm();
  const { setThirdStepData } = useThirdStepStore();
  const { firstStepPrice, tourType } = useFirstStepStore();

  function onSubmit(values: FormValues) {
    setThirdStepData({ ...values });

    setIndex(currentIndex + 1);
  }
  const t = useTranslations("contactForm");
  const tours = useTranslatedTours();
  const getLabelByValue = (value: string) => {
    return tours.find((tour) => tour.value === value);
  };
  return (
    <DialogContent className="max-w-[650px]! sm:px-[60px] sm:py-[44px] px-[28px]! py-[20px]! rounded-[24px] lg:rounded-[48px]">
      <DialogHeader>
        <DialogDescription>
          <button
            className={cn(
              "sm:text-[24px] text-primary underline underline-offset-4 text-[18px]"
            )}
            onClick={() => setIndex(1)}
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
        {firstStepPrice !== null && (
          <div className="flex justify-between items-center gap-4 mt-[24px]">
            <H2FORM className="text-foreground text-nowrap">
              {t("total")}
            </H2FORM>
            <div className="flex flex-row gap-1">
              <Button className="rounded-[8px]!">
                {Number(firstStepPrice.slice(0, -1)) -
                  (getLabelByValue(tourType as string)?.price
                    ? Number(
                        getLabelByValue(tourType as string)?.price.replace(
                          /\D/g,
                          ""
                        )
                      )
                    : 0)}
                {/* {isVip ? "₽ VIP" : "₽"} */}₽
                {tourType != "no-tour" && (
                  <span className="opacity-50">
                    +
                    {getLabelByValue(tourType as string)?.price
                      ? Number(
                          getLabelByValue(tourType as string)?.price.replace(
                            /\D/g,
                            ""
                          )
                        )
                      : 0}
                    ₽
                  </span>
                )}
              </Button>
              {tourType != "no-tour" && (
                <Button className="rounded-[8px]!">
                  {t("st")}: {getLabelByValue(tourType as string)?.label}
                </Button>
              )}
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
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("phone")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={t("phonePlaceholder")}
                    type="tel"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("email")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={t("emailPlaceholder")}
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <DialogTitle>{t("preferredTitle")}</DialogTitle>
            <Separator className="mt-[12px]" />
          </div>

          <FormField
            control={form.control}
            name="preferredContact"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <PolCards
                    {...field}
                    onValueChange={field.onChange}
                    options={[
                      { label: t("whatsapp"), value: "whatsapp" },
                      { label: t("telegram"), value: "telegram" },
                      { label: t("email"), value: "email" },
                    ]}
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

export default ThirdStep;
