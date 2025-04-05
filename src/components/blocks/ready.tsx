"use client";
import React, { FC } from "react";
import { H1, H2 } from "../ui/texts";
import Text from "../ui/texts/Text";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import LinkText from "../ui/texts/link-text";
import { useTranslations } from "next-intl";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
type FormData = {
  name: string;
  tel: string;
  email: string;
  checkbox1: boolean;
  checkbox2: boolean;
};
const Ready: FC = () => {
  // Мемоизация схемы валидации при смене языка
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    setValue,
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      name: "",
      tel: "",
      email: "",
      checkbox1: false,
      checkbox2: false,
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
    toast(t("toast.title"), {
      description: t("toast.description"),
    });
  };

  const t = useTranslations("form");
  return (
    <div className="flex flex-col bg-white rounded-[48px] xl:flex-row">
      <div
        className="rounded-[48px] bg-cover bg-center w-full h-[557px] xl:w-1/2 xl:h-[850px]"
        style={{
          backgroundImage: "url('/blocks/ready/girl.webp')",
        }}
      ></div>

      <div className="flex flex-col p-[24px] gap-[48px]">
        <H1></H1>
        <H1 className="block sm:hidden">
          {t("heading.text")} <br /> {t("heading.br")}
        </H1>
        <H2 className="hidden sm:block">
          {t("heading.text")} <br /> {t("heading.br")}
        </H2>
        <form
          className="flex flex-col gap-[32px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Text>
            {t("desk.text")} <br /> {t("desk.br")}
          </Text>

          <div className="flex flex-col gap-[40px]">
            <div className="flex flex-col gap-[24px]">
              {/* Name Field */}
              <div>
                <Input
                  placeholder={t("inp.name")}
                  {...register("name", {
                    required: t("errors.required"),
                  })}
                />
                {errors.name && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <Input
                  placeholder={t("inp.tel")}
                  {...register("tel", {
                    required: t("errors.required"),
                  })}
                />
                {errors.tel && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.tel.message}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <Input
                  placeholder={t("inp.mail")}
                  {...register("email", {
                    required: t("errors.required"),
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: t("errors.email"),
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            {/* Checkboxes */}
            <div className="flex flex-col gap-[12px]">
              {/* Checkbox 1 */}
              <div className="flex flex-row gap-[12px] items-center">
                <Checkbox
                  checked={watch("checkbox1")}
                  onCheckedChange={(checked) =>
                    setValue("checkbox1", Boolean(checked), {
                      shouldValidate: true,
                    })
                  }
                />
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  <LinkText href="policy">{t("checkbox.text1")}</LinkText>
                </label>
              </div>
              {errors.checkbox1 && (
                <p className="text-sm text-red-500 pl-8">
                  {errors.checkbox1.message}
                </p>
              )}

              {/* Checkbox 2 */}
              <div className="flex flex-row gap-[12px] items-center">
                <Checkbox
                  checked={watch("checkbox2")}
                  onCheckedChange={(checked) =>
                    setValue("checkbox2", Boolean(checked), {
                      shouldValidate: true,
                    })
                  }
                />
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  <LinkText href="agreement">{t("checkbox.text2")}</LinkText>
                </label>
              </div>
              {errors.checkbox2 && (
                <p className="text-sm text-red-500 pl-8">
                  {errors.checkbox2.message}
                </p>
              )}

              {/* Static Policy Text */}
              <div className="flex flex-row gap-[12px] items-center pl-[calc(24px+12px)]">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  <LinkText href="policy">{t("checkbox.text3")}</LinkText>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <Button className="w-full" type="submit" disabled={!isValid}>
              {t("button")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Ready;
