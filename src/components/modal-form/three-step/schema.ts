import { z } from "zod";

export const schema = z.object({
  phone: z
    .string()
    .min(6, "Введите корректный номер телефона")
    .regex(/^\+?\d{6,15}$/, "Неверный формат номера телефона"),
  email: z.string().email("Введите корректную почту"),
  preferredContact: z.enum(["whatsapp", "telegram", "email"], {
    required_error: "Выберите предпочтительный способ связи",
  }),
});
