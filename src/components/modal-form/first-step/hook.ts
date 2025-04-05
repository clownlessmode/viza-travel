// hook.ts
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./schema";
import { defaultValues } from "./default";
import { useForm as useHookForm } from "react-hook-form";
// import { FormValues } from "./types";

const useForm = () => {
  const form = useHookForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
    mode: "all",
  });

  return form;
};

export default useForm;
