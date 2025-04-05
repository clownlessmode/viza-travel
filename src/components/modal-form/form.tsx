"use client";
import React, { FC, PropsWithChildren, useState } from "react";

import { Dialog, DialogTrigger } from "../ui/dialog";
import FirstStep from "./first-step/ui";
import useIndexForm from "./indexStore";
import SecondStep from "./second-step/ui";
import ThirdStep from "./three-step/ui";
import SVODKA from "./svodka/ui";

const ModalForm: FC<PropsWithChildren> = ({ children }) => {
  const { index } = useIndexForm();
  const [isOpen, setIsOpen] = useState(false);
  const forms = [
    {
      component: <FirstStep onClose={() => setIsOpen(false)} />,
    },
    {
      component: <SecondStep />,
    },
    {
      component: <ThirdStep />,
    },
    {
      component: <SVODKA onClose={() => setIsOpen(false)} />,
    },
  ];
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      {forms[index].component}
    </Dialog>
  );
};

export default ModalForm;
