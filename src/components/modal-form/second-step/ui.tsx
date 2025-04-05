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

import { ScrollArea } from "@/components/ui/scroll-area";
import useForm from "./hook";
import useFirstStepStore from "../firstStepStore";
import { Input } from "@/components/ui/input";
import PolCards from "@/components/ui/pol-cards";
import { Combobox } from "@/components/ui/combobox";
// import { useUniqueCountries } from "../first-step/ui";
import { DATAVIZA } from "@/app/data";
import { useUniqueCountries } from "../first-step/ui";
import useSecondStepStore from "../secondStepStore";

export const visitTypes = [
  {
    value: "Отдых, экскурсии и знакомство с культурой России",
    label: "Отдых, экскурсии и знакомство с культурой России",
  },
  {
    value:
      "- Участие в конференциях, выставках, посещение официальных мероприятий",
    label:
      "- Участие в конференциях, выставках, посещение официальных мероприятий",
  },
];
const SecondStep: FC = () => {
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
  return (
    <DialogContent className="px-0! py-0! overflow-y-hidden">
      <ScrollArea className="max-h-[95vh] h-full lg:max-h-[80vh] sm:px-[60px] sm:py-[44px] px-[28px] py-[20px]">
        <DialogHeader>
          <DialogDescription>
            <button
              className={cn(
                "sm:text-[24px] text-primary underline underline-offset-4 text-[18px]"
              )}
              onClick={() => setIndex(0)}
            >
              Назад
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
          <DialogTitle>
            Информация о туристах{" "}
            {/* <span className="text-muted-foreground opacity-70">
              ({peopleIndex + 1}/{peoples})
            </span> */}
          </DialogTitle>
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
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Фамилия</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Введите фамилию" />
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
                    <Input {...field} placeholder="Введите имя" />
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
                    <Input {...field} placeholder="Введите отчество" />
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
                    <FormLabel>Пол</FormLabel>
                    <FormControl>
                      <PolCards
                        {...field}
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
                    <Input type="date" {...field} />
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
                  <FormLabel>Дата предполагаемого отъезда из РФ</FormLabel>
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
                  <FormLabel>Гражданство</FormLabel>
                  <FormControl>
                    <Combobox
                      {...field}
                      options={countries}
                      placeholder="Выберите страну"
                      searchPlaceholder="Поиск страны..."
                      emptyText="Страна не найдена"
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
                  <FormLabel>Цель поездки</FormLabel>
                  <FormControl>
                    <Combobox
                      {...field}
                      options={visitTypes}
                      placeholder="Выберите цель поездки"
                      searchPlaceholder="Поиск целей поездки..."
                      emptyText="Цель поездки не найдена"
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
                  <FormLabel>Маршрут и места проживания</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
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
                      placeholder="Введите дополнительную информацию"
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

export default SecondStep;
