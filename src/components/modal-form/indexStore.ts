import { create } from "zustand";

// Типизация стора
interface IndexFormStore {
  index: number;
  setIndex: (index: number) => void;
  resetIndex: () => void;
}

// Zustand store
const useIndexFormStore = create<IndexFormStore>()((set) => ({
  index: 0,
  setIndex: (index: number) => set({ index }),
  resetIndex: () => set({ index: 0 }),
}));

// Удобный хук
const useIndexForm = () => {
  const index = useIndexFormStore((state) => state.index);
  const setIndex = useIndexFormStore((state) => state.setIndex);
  const resetIndex = useIndexFormStore((state) => state.resetIndex);

  return { index, setIndex, resetIndex };
};

export default useIndexForm;
