import { cn } from "@/lib/utils";
import React, { FC, HTMLAttributes } from "react";

const headingStyles = {
  xs: "text-[24px] leading-[24px] font-medium",
  sm: "sm:text-[18px] sm:leading-[20px] sm:font-medium",
};

const H2FORM: FC<HTMLAttributes<HTMLHeadingElement>> = ({
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

export default H2FORM;
