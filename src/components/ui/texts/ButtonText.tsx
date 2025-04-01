import { cn } from "@/lib/utils";
import React, { FC, HTMLAttributes } from "react";

const headingStyles = {
  xs: "text-[16px] leading-[20.8px] tracking-[0px] font-medium",

  md: "md:text-[20px] md:leading-[26px] md:tracking-[-0.6px] md:font-medium",

  "2xl":
    "2xl:text-[24px] 2xl:leading-[31.2px] 2xl:tracking-[-0.6px] 2xl:font-medium",
};

const ButtonText: FC<HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  children,
}) => {
  return (
    <p
      className={cn(
        ...Object.values(headingStyles),
        "[&>span]:font-sub [&>span]:italic", // стиль для span внутри
        className
      )}
    >
      {children}
    </p>
  );
};

export default ButtonText;
