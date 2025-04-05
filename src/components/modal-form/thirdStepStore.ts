import { create } from "zustand";
import { persist } from "zustand/middleware";

import { FormValues } from "./three-step/types";
import { defaultValues } from "./three-step/default";

// Типизация Zustand стора
export interface ThirdStepStore extends FormValues {
  setThirdStepData: (data: Partial<FormValues>) => void;
  resetThirdStepData: () => void;
}

// Zustand store
const useThirdStepStore = create<ThirdStepStore>()(
  persist(
    (set) => ({
      ...defaultValues,

      // Обновление полей (можно обновлять частично)
      setThirdStepData: (data) => set((state) => ({ ...state, ...data })),

      // Сброс всех данных
      resetThirdStepData: () =>
        set({
          ...defaultValues,
        }),
    }),
    {
      name: "third-step-store", // ключ в localStorage
    }
  )
);

export default useThirdStepStore;
