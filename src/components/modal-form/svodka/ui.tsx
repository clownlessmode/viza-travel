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

import { ScrollArea } from "@/components/ui/scroll-area";
import useFirstStepStore, { FirstStepData } from "../firstStepStore";

import useThirdStepStore from "../thirdStepStore";
import { useForm } from "react-hook-form";
import useSecondStepStore, { SecondStepData } from "../secondStepStore";
import { FormValues } from "../three-step/types";
import RadioCards from "@/components/ui/radio-cards";
import { tours, useUniqueCountries } from "../first-step/ui";
import PolCards from "@/components/ui/pol-cards";
import { Checkbox } from "@/components/ui/checkbox";
import LinkText from "@/components/ui/texts/link-text";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { DATAVIZA } from "@/app/data";
import { visitTypes } from "../second-step/ui";

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
const SVODKA: FC<{ onClose: () => void }> = ({ onClose }) => {
  const { index: currentIndex, setIndex } = useIndexForm();
  const { setThirdStepData, resetThirdStepData, ...thirdStepData } =
    useThirdStepStore();
  const {
    setFirstStepData,
    resetFirstStepData,
    firstStepPrice,
    ...firstStepData
  } = useFirstStepStore();
  const { setSecondStepData, resetSecondStepData, ...secondStepData } =
    useSecondStepStore();

  async function onSubmit(data: YGUYB) {
    // setThirdStepData({ ...values });
    // setIndex(currentIndex + 1);
    toast.success("Заявка успешно отправлена!");
    onClose();
    console.log(data);
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
  const countries = useUniqueCountries(DATAVIZA); // data: VisaDataItem[]
  const selectedCountry = countries.find(
    (country) => country.value === form.watch("citizenship")
  );

  const t = useTranslations("form");
  return (
    <DialogContent className="px-0! py-0! overflow-y-hidden">
      <ScrollArea className="max-h-[95vh] h-full lg:max-h-[80vh] sm:px-[60px] sm:py-[44px] px-[28px] py-[20px]">
        <DialogHeader>
          <DialogDescription>
            <button
              className={cn(
                "sm:text-[24px] text-primary underline underline-offset-4 text-[18px]"
              )}
              onClick={() => setIndex(currentIndex - 1)}
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
          <DialogTitle>Сводка</DialogTitle>

          <Separator className="mt-[12px]" />
        </DialogHeader>
        <Form {...form}>
          <form
            className="space-y-2 mt-[12px] px-1"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            {/* FIRST */}
            <FormField
              control={form.control}
              name="citizenship"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Гражданство</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled
                      value={selectedCountry?.label || field.value}
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
                    <Input disabled {...field} />
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
                    <Input disabled {...field} />
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
                      disabled
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
                  <FormControl>
                    <RadioCards
                      {...field}
                      onValueChange={field.onChange}
                      options={tours}
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Фамилия</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Введите фамилию" disabled />
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
                  <FormLabel>Имя</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Введите имя" disabled />
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
                  <FormLabel>Отчество</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Введите отчество" disabled />
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
                    <FormLabel>Дата рождения</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} disabled />
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
                    <FormLabel>Пол</FormLabel>
                    <FormControl>
                      <PolCards
                        {...field}
                        disabled
                        onValueChange={field.onChange}
                        options={[
                          {
                            label: "Муж",
                            value: "male",
                          },
                          {
                            label: "Жен",
                            value: "female",
                          },
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
                  <FormLabel>Номер паспорта</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      disabled
                      maxLength={30}
                      placeholder="Введите номер паспорта"
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
                  <FormLabel>Дата окончания срока действия паспорта</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} disabled />
                  </FormControl>
                  <FormMessage />
                  {form.formState.errors.passportExpiryDate && (
                    <div className="sm:border-2 border flex flex-col gap-2.5 border-destructive bg-[rgba(244, 246, 251, 1)] rounded-[24px] p-[12px] sm:p-[24px] mt-2">
                      <p>
                        Обратите внимание: для оформления приглашения в РФ срок
                        действия вашего паспорта должен составлять не менее 6
                        месяцев с даты окончания поездки. В противном случае
                        заявка не может быть принята.
                      </p>
                      <p>
                        Пожалуйста, проверьте срок действия документа перед
                        отправкой запроса.
                      </p>
                      <p>Благодарим за понимание!</p>
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
                  <FormLabel>Дата предполагаемого въезда в РФ</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} disabled />
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
                  <FormLabel>Дата предполагаемого отъезда из РФ</FormLabel>
                  <FormControl>
                    <Input {...field} disabled type="date" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <FormField
              control={form.control}
              name="citizenship"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Гражданство</FormLabel>
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <FormField
              control={form.control}
              name="tripPurpose"
              render={({ field }) => {
                const selectedOption = visitTypes.find(
                  (option) => option.value === field.value
                );
                return (
                  <FormItem>
                    <FormLabel>Цель поездки</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled
                        value={selectedOption?.label || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="itinerary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Маршрут и места проживания</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled
                      multiple
                      placeholder="Введите маршрут и места проживания"
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
                  <FormLabel>Дополнительная информация</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      multiple
                      disabled
                      placeholder="Введите дополнительную информацию"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                      disabled
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
                      disabled
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
                  Сумма заказа:
                </H2FORM>
                <Button className="rounded-[8px]! sm:w-[300px]">
                  {firstStepPrice}
                </Button>
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
                  <LinkText href="policy">{t("checkbox.text1")}</LinkText>
                </label>
              </div>
              {form.formState.errors.checkbox1 && (
                <p className="text-sm text-red-500 pl-8">
                  {form.formState.errors.checkbox1.message}
                </p>
              )}

              {/* Checkbox 2 */}
              <div className="flex flex-row gap-[12px] items-center">
                <Checkbox
                  checked={form.watch("checkbox2")}
                  onCheckedChange={(checked) =>
                    form.setValue("checkbox2", Boolean(checked), {
                      shouldValidate: true,
                    })
                  }
                />
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  <LinkText href="agreement">{t("checkbox.text2")}</LinkText>
                </label>
              </div>
              {form.formState.errors.checkbox2 && (
                <p className="text-sm text-red-500 pl-8">
                  {form.formState.errors.checkbox2.message}
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

export default SVODKA;
