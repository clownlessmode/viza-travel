import { cn } from "@/lib/utils";
import React, { FC, HTMLAttributes } from "react";

const paragraphStyle = {
  xs: "text-[14px] leading-[16px] tracking-[0px] font-medium",

  "2xl":
    "2xl:text-[18px] 2xl:leading-[20.2px] 2xl:tracking-[-0px] 2xl:font-normal",
};

const NavigationText: FC<HTMLAttributes<HTMLParagraphElement>> = ({
  className,
  children,
}) => {
  return (
    <p
      className={cn(
        ...Object.values(paragraphStyle),
        "[&>span]:font-sub [&>span]:italic", // стиль для span внутри
        className
      )}
    >
      {children}
    </p>
  );
};

export default NavigationText;
