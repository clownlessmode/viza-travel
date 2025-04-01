import { cn } from "@/lib/utils";
import React, { FC, HTMLAttributes } from "react";

const paragraphStyle = {
  xs: "text-[16px] leading-[20.8px] tracking-[0px] font-medium",

  md: "md:text-[20px] md:leading-[26px] md:tracking-[-0.6px] md:font-normal",

  "2xl":
    "2xl:text-[24px] 2xl:leading-[31.2px] 2xl:tracking-[-0.6px] 2xl:font-normal",
};

const Text: FC<HTMLAttributes<HTMLParagraphElement>> = ({
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

export default Text;
