// schema.ts
import { z } from "zod";

export const schema = z.object({
  citizenship: z.string(),
  vizaType: z.string(),
  peoples: z.string(),
  tourType: z.string(),
  vizaTypeTwo: z.string().min(1, "Обязательное поле"),
});
