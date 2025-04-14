import { FormValues } from "./types";

// Получаем текущую дату
const date = new Date();

// Функция для форматирования даты в YYYY-MM-DD
function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

// Сегодняшняя дата
const today = formatDate(date);

// Дата через 6 месяцев
const newDate = new Date(date); // создаём копию оригинальной даты
newDate.setMonth(newDate.getMonth() + 6); // +6 месяцев
newDate.setDate(newDate.getDate() + 1); // +1 день

const sixMonthsLater = formatDate(newDate);
export const defaultValues: FormValues = {
  lastName: "",
  firstName: "",
  middleName: "",
  birthDate: today,
  gender: "male",
  tourType: "Economy",
  passportNumber: "",
  passportExpiryDate: sixMonthsLater,
  entryDate: today,
  exitDate: today,
  citizenship: "",
  tripPurpose: "",
  itinerary: "",
  additionalInfo: "",
  visaType: "",
  visaTypeTwo: "",
};
