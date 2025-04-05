import { z } from "zod";
import { addMonths, isBefore } from "date-fns";

export const schema = z.object({
  lastName: z.string().min(1, "Обязательное поле"),
  firstName: z.string().min(1, "Обязательное поле"),
  middleName: z.string().optional(),
  birthDate: z.string().min(1, "Обязательное поле"),
  gender: z.enum(["male", "female"], {
    required_error: "Выберите пол",
  }),
  passportNumber: z.string().min(1, "Обязательное поле"),
  passportExpiryDate: z
    .string()
    .min(1, "Обязательное поле")
    .refine(
      (value) => {
        const date = new Date(value);
        const minDate = addMonths(new Date(), 6);
        return isBefore(minDate, date);
      },
      {
        message: "Паспорт должен быть действителен минимум 6 месяцев.",
      }
    ),
  entryDate: z.string().min(1, "Обязательное поле"),
  exitDate: z.string().min(1, "Обязательное поле"),
  citizenship: z.string().min(1, "Обязательное поле"),
  tripPurpose: z.string().min(1, "Обязательное поле"),
  itinerary: z.string().min(1, "Обязательное поле"),
  additionalInfo: z.string().optional(),
});
