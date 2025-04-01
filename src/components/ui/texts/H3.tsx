import { cn } from "@/lib/utils";
import React, { FC, HTMLAttributes } from "react";

const headingStyles = {
  xs: "text-[24px] leading-[24px] tracking-[-1px] font-medium",
  md: "md:text-[32px] md:leading-[32px] md:tracking-[-1px] md:font-normal",
};

const H3: FC<HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  children,
}) => {
  return (
    <h3
      className={cn(
        ...Object.values(headingStyles),
        "[&>span]:font-sub [&>span]:italic", // стиль для span внутри
        className
      )}
    >
      {children}
    </h3>
  );
};

export default H3;
