import { cn } from "@/lib/utils";
import React, { FC, HTMLAttributes } from "react";

const headingStyles = {
  xs: "text-[32px] leading-[32px] tracking-[-2px] font-medium",
  sm: "sm:text-[36px] sm:leading-[36px] sm:tracking-[-2px] sm:font-normal",
  md: "md:text-[48px] md:leading-[48px] md:tracking-[-2px] md:font-normal",
  lg: "lg:text-[64px] lg:leading-[64px] lg:tracking-[-3px] lg:font-normal",
  xl: "xl:text-[80px] xl:leading-[80px] xl:tracking-[-3px] xl:font-normal",
  "2xl":
    "2xl:text-[96px] 2xl:leading-[96px] 2xl:tracking-[-3px] 2xl:font-normal",
};

const H1: FC<HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  children,
}) => {
  return (
    <h1
      className={cn(
        ...Object.values(headingStyles),
        "[&>span]:font-sub [&>span]:italic", // стиль для span внутри
        className
      )}
    >
      {children}
    </h1>
  );
};

export default H1;

export const H1Blue: FC<HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  children,
}) => {
  return (
    <h1
      className={cn(
        ...Object.values(headingStyles),
        "[&>span]:text-primary",
        className
      )}
    >
      {children}
    </h1>
  );
};
