// firstStepStore.ts
import { create } from "zustand";

// Типизация значений первого шага
export interface FirstStepData {
  citizenship: string;
  vizaType: string;
  peoples: string;
  firstStepPrice: string;
  vizaTypeTwo: string;
}

// Типизация Zustand стора
interface FirstStepStore extends FirstStepData {
  setFirstStepData: (data: Partial<FirstStepData>) => void;
  resetFirstStepData: () => void;
}

// Zustand store
const useFirstStepStore = create<FirstStepStore>()((set) => ({
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
      firstStepPrice: "",
    }),
}));

export default useFirstStepStore;
