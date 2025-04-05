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

import { ScrollArea } from "@/components/ui/scroll-area";
import useFirstStepStore from "../firstStepStore";
import PolCards from "@/components/ui/pol-cards";
import useThirdStepStore from "../thirdStepStore";

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
  const { firstStepPrice } = useFirstStepStore();

  function onSubmit(values: FormValues) {
    setThirdStepData({ ...values });
    setIndex(currentIndex + 1);
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
              onClick={() => setIndex(1)}
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
          {firstStepPrice !== null && (
            <div className="flex justify-between items-center gap-4 mt-[24px]">
              <H2FORM className="text-foreground text-nowrap">
                Сумма заказа:
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
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Номер телефона</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="+7 (___) ___-__-__"
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
                  <FormLabel>Почта</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="example@mail.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <DialogTitle>Где Вам удобнее связаться?</DialogTitle>
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

export default ThirdStep;
