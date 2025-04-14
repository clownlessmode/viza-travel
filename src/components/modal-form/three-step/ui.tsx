// ui.tsx
"use client";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { cn } from "@/lib/utils";
import React, { FC } from "react";

import { FormValues } from "./types";
import useIndexForm from "../indexStore";

import H2FORM from "../h2";

import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import useFirstStepStore from "../firstStepStore";
import PolCards from "@/components/ui/pol-cards";
import useThirdStepStore from "../thirdStepStore";
import { useLocale, useTranslations } from "next-intl";
import useSecondStepStore from "../secondStepStore";
import { useForm } from "react-hook-form";

export interface VisaDataItem {
  id: number;
  country: string;
  type: string;
  time: string;
  cost: string;
}

const ThirdStep: FC = () => {
  const { setThirdStepData, ...third } = useThirdStepStore();

  const form = useForm({
    defaultValues: {
      phone: third.phone || "",
      email: third.email || "",
      preferredContact: third.preferredContact || "telegram",
    },
  });
  const { index: currentIndex, setIndex } = useIndexForm();
  const { data } = useSecondStepStore();
  const { firstStepPrice } = useFirstStepStore();

  function onSubmit(values: FormValues) {
    setThirdStepData({ ...values });

    setIndex(currentIndex + 1);
  }
  console.log(firstStepPrice, "firtstep");
  console.log(data, "dataa");
  const t = useTranslations("contactForm");
  const sum = data.reduce((acc, num) => acc + num.price, 0);
  const locale = useLocale();
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
            <H2FORM className="text-foreground text-nowrap text-sm! sm:text-lg!">
              {t("total")}
            </H2FORM>
            <div className="flex flex-row gap-1">
              <Button className="rounded-[8px]! " size={"sm"}>
                {sum}₽
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
            name="phone"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>*{t("phone")}</FormLabel>
                <FormControl>
                  <PhoneInput
                    country={locale || "ru"}
                    value={field.value}
                    onChange={field.onChange}
                    inputProps={{
                      name: field.name,
                      required: true,
                      onBlur: field.onBlur,
                    }}
                    inputClass={cn(
                      "file:text-foreground w-full! h-[52px]! sm: placeholder:text-black/30 text-[14px] selection:bg-primary selection:text-primary-foreground border-input flex w-full min-w-0 rounded-[8px] bg-[rgba(0,0,0,0.03)] px-[24px] py-[16px] sm:text-[18px] leading-[130%] text-base transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                      "focus-visible:border-ring focus-visible:ring-primary/50 focus-visible:ring-[3px]",
                      "aria-invalid:ring-destructive/20 aria-invalid:border-destructive"
                    )}
                    containerClass="w-full!"
                    buttonClass="!bg-transparent" // чтобы убрать фон у флага
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>*{t("email")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={t("emailPlaceholder")}
                    type="email"
                  />
                </FormControl>
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
