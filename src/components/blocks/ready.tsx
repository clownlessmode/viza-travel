"use client";
import React, { FC } from "react";
import { H1, H2 } from "../ui/texts";
import Text from "../ui/texts/Text";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import LinkText from "../ui/texts/link-text";
import { useTranslations } from "next-intl";
interface PersonData {
  lastName: string;
  firstName: string;
  middleName?: string;
  birthDate: string;
  gender: "male" | "female";
  passportNumber: string;
  passportExpiryDate: string;
  entryDate: string;
  exitDate: string;
  citizenship: string;
  tripPurpose: string;
  itinerary: string;
  additionalInfo?: string;
}

export interface VisaApplicationEmailProps {
  citizenship: string;
  vizaType: string;
  peoples: string;
  tourType?: string;
  firstStepPrice: string;
  vizaTypeTwo: string;
  data: PersonData[];
  phone: string;
  email: string;
  preferredContact: "whatsapp" | "telegram" | "email";
}
export const FormTemplate: React.FC<Readonly<VisaApplicationEmailProps>> = ({
  citizenship,
  vizaType,
  peoples,
  tourType,
  firstStepPrice,
  vizaTypeTwo,
  data,
  phone,
  email,
  preferredContact,
}) => (
  <div
    style={{
      fontFamily: "Arial, sans-serif",
      maxWidth: "600px",
      margin: "0 auto",
      padding: "24px",
      border: "1px solid #eaeaea",
      borderRadius: "8px",
      backgroundColor: "#f9f9f9",
    }}
  >
    <h2 style={{ color: "#333", textAlign: "center" }}>
      📬 Новая заявка на визу
    </h2>

    <h3 style={{ marginTop: "20px", color: "#444" }}>Основная информация</h3>
    <table style={{ width: "100%", fontSize: "14px" }}>
      <tbody>
        <tr>
          <td>
            <strong>Гражданство:</strong>
          </td>
          <td>{citizenship}</td>
        </tr>
        <tr>
          <td>
            <strong>Тип визы:</strong>
          </td>
          <td>{vizaType}</td>
        </tr>
        <tr>
          <td>
            <strong>Тип визы 2:</strong>
          </td>
          <td>{vizaTypeTwo}</td>
        </tr>
        <tr>
          <td>
            <strong>Количество человек:</strong>
          </td>
          <td>{peoples}</td>
        </tr>
        {tourType && (
          <tr>
            <td>
              <strong>Тип тура:</strong>
            </td>
            <td>{tourType}</td>
          </tr>
        )}
        <tr>
          <td>
            <strong>Цена первого этапа:</strong>
          </td>
          <td>{firstStepPrice}</td>
        </tr>
      </tbody>
    </table>

    <h3 style={{ marginTop: "30px", color: "#444" }}>Данные заявителей</h3>
    {data.map((person, index) => (
      <div
        key={index}
        style={{
          marginBottom: "20px",
          padding: "10px",
          border: "1px solid #ddd",
        }}
      >
        <p>
          <strong>ФИО:</strong> {person.lastName} {person.firstName}{" "}
          {person.middleName || ""}
        </p>
        <p>
          <strong>Дата рождения:</strong> {person.birthDate}
        </p>
        <p>
          <strong>Пол:</strong>{" "}
          {person.gender === "male" ? "Мужской" : "Женский"}
        </p>
        <p>
          <strong>Номер паспорта:</strong> {person.passportNumber}
        </p>
        <p>
          <strong>Срок действия паспорта:</strong> {person.passportExpiryDate}
        </p>
        <p>
          <strong>Дата въезда:</strong> {person.entryDate}
        </p>
        <p>
          <strong>Дата выезда:</strong> {person.exitDate}
        </p>
        <p>
          <strong>Гражданство:</strong> {person.citizenship}
        </p>
        <p>
          <strong>Цель поездки:</strong> {person.tripPurpose}
        </p>
        <p>
          <strong>Маршрут:</strong> {person.itinerary}
        </p>
        {person.additionalInfo && (
          <p>
            <strong>Доп. информация:</strong> {person.additionalInfo}
          </p>
        )}
      </div>
    ))}

    <h3 style={{ marginTop: "30px", color: "#444" }}>Контактная информация</h3>
    <p>
      <strong>Телефон:</strong> {phone}
    </p>
    <p>
      <strong>Email:</strong> {email}
    </p>
    <p>
      <strong>Предпочтительный способ связи:</strong> {preferredContact}
    </p>

    <p style={{ marginTop: "30px", fontSize: "14px", color: "#999" }}>
      Письмо сгенерировано автоматически. Пожалуйста, не отвечайте на него.
    </p>
  </div>
);

export const ReadyTemplate: React.FC<Readonly<FormData>> = ({
  name,
  email,
  tel,
}) => (
  <div
    style={{
      fontFamily: "Arial, sans-serif",
      maxWidth: "600px",
      margin: "0 auto",
      padding: "24px",
      border: "1px solid #eaeaea",
      borderRadius: "8px",
      backgroundColor: "#f9f9f9",
    }}
  >
    <h2 style={{ color: "#333", textAlign: "center" }}>
      📬 Новая заявка на связь
    </h2>
    <p style={{ fontSize: "16px", color: "#555" }}>
      Вы получили новую заявку с сайта. Ниже приведены данные пользователя:
    </p>

    <table
      style={{
        width: "100%",
        marginTop: "20px",
        fontSize: "16px",
        color: "#333",
      }}
    >
      <tbody>
        <tr>
          <td style={{ padding: "8px", fontWeight: "bold", width: "120px" }}>
            Имя:
          </td>
          <td style={{ padding: "8px" }}>{name}</td>
        </tr>
        <tr style={{ backgroundColor: "#f0f0f0" }}>
          <td style={{ padding: "8px", fontWeight: "bold" }}>Телефон:</td>
          <td style={{ padding: "8px" }}>{tel}</td>
        </tr>
        <tr>
          <td style={{ padding: "8px", fontWeight: "bold" }}>Email:</td>
          <td style={{ padding: "8px" }}>{email}</td>
        </tr>
      </tbody>
    </table>

    <p style={{ marginTop: "30px", fontSize: "14px", color: "#999" }}>
      Письмо сгенерировано автоматически. Пожалуйста, не отвечайте на него.
    </p>
  </div>
);

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

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
      } else {
        const errorData = await response.json();
        console.error("Ошибка при отправке письма:", errorData);
      }
    } catch (error) {
      console.error("Ошибка сети:", error);
    }
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
