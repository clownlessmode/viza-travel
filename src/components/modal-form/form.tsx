"use client";
import React, { FC, PropsWithChildren } from "react";

import { Dialog, DialogTrigger } from "../ui/dialog";
import FirstStep from "./first-step/ui";
import useIndexForm from "./indexStore";

const ModalForm: FC<PropsWithChildren> = ({ children }) => {
  const { index } = useIndexForm();
  const forms = [
    {
      component: <FirstStep />,
    },
    {
      component: <FirstStep />,
    },
    {
      component: <FirstStep />,
    },
    {
      component: <FirstStep />,
    },
  ];
  return (
    <Dialog defaultOpen>
      <DialogTrigger asChild>{children}</DialogTrigger>
      {forms[index].component}
    </Dialog>
  );
};

export default ModalForm;
