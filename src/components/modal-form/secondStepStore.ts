import { create } from "zustand";
import { persist } from "zustand/middleware";

// Типизация значений второго шага
export interface SecondStepData {
  lastName: string;
  firstName: string;
  middleName?: string;
  birthDate: string;
  gender: "male" | "female";
  visaType: string;
  passportNumber: string;
  passportExpiryDate: string;
  entryDate: string;
  exitDate: string;
  citizenship: string;
  tripPurpose: string;
  itinerary: string;
  additionalInfo?: string;
}

// Типизация Zustand стора
interface SecondStepStore extends SecondStepData {
  setSecondStepData: (data: Partial<SecondStepData>) => void;
  resetSecondStepData: () => void;
}

// Zustand store
const useSecondStepStore = create<SecondStepStore>()(
  persist(
    (set) => ({
      // Начальные значения
      lastName: "",
      firstName: "",
      middleName: "",
      birthDate: "",
      gender: "male",
      visaType: "",
      passportNumber: "",
      passportExpiryDate: "",
      entryDate: "",
      exitDate: "",
      citizenship: "",
      tripPurpose: "",
      itinerary: "",
      additionalInfo: "",

      // Обновление полей (можно обновлять частично)
      setSecondStepData: (data) => set((state) => ({ ...state, ...data })),

      // Сброс всех данных
      resetSecondStepData: () =>
        set({
          lastName: "",
          firstName: "",
          middleName: "",
          birthDate: "",
          gender: "male",
          visaType: "",
          passportNumber: "",
          passportExpiryDate: "",
          entryDate: "",
          exitDate: "",
          citizenship: "",
          tripPurpose: "",
          itinerary: "",
          additionalInfo: "",
        }),
    }),
    {
      name: "second-step-store", // ключ в localStorage
    }
  )
);

export default useSecondStepStore;
