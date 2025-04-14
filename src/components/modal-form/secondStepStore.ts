/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

// Типизация значений второго шага
export interface SecondStepData {
  lastName: string;
  firstName: string;
  middleName?: string;
  birthDate: string;
  gender: "male" | "female";
  visaType: string;
  visaTime: string;
  tourType: string;
  passportNumber: string;
  passportExpiryDate: string;
  entryDate: string;
  exitDate: string;
  citizenship: string;
  tripPurpose: string;
  itinerary: string;
  additionalInfo?: string;
  price: number;
}

// Типизация Zustand стора
interface SecondStepStore {
  data: SecondStepData[];
  addSecondStepData: (entry: any, index: any) => void;
  updateSecondStepData: (
    index: number,
    updatedEntry: Partial<SecondStepData>
  ) => void;
  removeSecondStepData: (index: number) => void;
  resetSecondStepData: () => void;
}

// Zustand store
const useSecondStepStore = create<SecondStepStore>()((set) => ({
  data: [],
  // Добавить новый элемент
  addSecondStepData: (entry, index) =>
    set((state) => {
      const newData = [...state.data];
      // Проверяем, существует ли запись с текущим индексом
      if (typeof index === "number" && newData[index]) {
        newData[index] = entry; // Обновляем существующую запись
      } else {
        newData.push(entry); // Добавляем новую, если индекс не указан или не существует
      }
      return { data: newData };
    }),

  // Обновить существующий элемент по индексу
  updateSecondStepData: (index, updatedEntry) =>
    set((state) => ({
      data: state.data.map((item, i) =>
        i === index ? { ...item, ...updatedEntry } : item
      ),
    })),

  // Удалить элемент по индексу
  removeSecondStepData: (index) =>
    set((state) => ({
      data: state.data.filter((_, i) => i !== index),
    })),

  // Сбросить все данные
  resetSecondStepData: () => set({ data: [] }),
}));

export default useSecondStepStore;
