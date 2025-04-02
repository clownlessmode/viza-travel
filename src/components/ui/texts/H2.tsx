import { cn } from "@/lib/utils";
import React, { FC, HTMLAttributes } from "react";

const headingStyles = {
  xs: "text-[24px] leading-[24px] tracking-[-1px] font-medium",
  sm: "sm:text-[32px] sm:leading-[32px] sm:tracking-[-2px] sm:font-normal",
  md: "md:text-[40px] md:leading-[40px] md:tracking-[-2px] md:font-normal",

  "2xl": "lg:text-[64px] lg:leading-[64px] lg:tracking-[-2px] lg:font-normal",
};

const H2: FC<HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  children,
}) => {
  return (
    <h2
      className={cn(
        ...Object.values(headingStyles),
        "[&>span]:text-primary",
        className
      )}
    >
      {children}
    </h2>
  );
};

export default H2;
