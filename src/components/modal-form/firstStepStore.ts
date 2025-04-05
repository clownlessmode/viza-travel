// firstStepStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Типизация значений первого шага
export interface FirstStepData {
  citizenship: string;
  vizaType: string;
  peoples: string; // или number, если хочешь хранить как число
  tourType?: string;
  firstStepPrice: string;
  vizaTypeTwo: string;
}

// Типизация Zustand стора
interface FirstStepStore extends FirstStepData {
  setFirstStepData: (data: Partial<FirstStepData>) => void;
  resetFirstStepData: () => void;
}

// Zustand store
const useFirstStepStore = create<FirstStepStore>()(
  persist(
    (set) => ({
      // Начальные значения
      vizaTypeTwo: "",
      citizenship: "",
      vizaType: "",
      peoples: "1",
      tourType: "",
      firstStepPrice: "",

      // Обновление отдельных полей (можно передавать одно или несколько сразу)
      setFirstStepData: (data) => set((state) => ({ ...state, ...data })),

      // Полный сброс
      resetFirstStepData: () =>
        set({
          vizaTypeTwo: "",
          citizenship: "",
          vizaType: "",
          peoples: "1",
          tourType: "",
          firstStepPrice: "",
        }),
    }),
    {
      name: "first-step-store", // ключ в localStorage
    }
  )
);

export default useFirstStepStore;
