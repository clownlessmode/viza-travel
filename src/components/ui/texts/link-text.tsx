import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import React, { FC } from "react";

// Определяем пропсы для Link, исключая конфликтующий href
interface LinkPropss
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">,
    LinkProps {}

const paragraphStyle = {
  xs: "text-[14px] leading-[16px] tracking-[0px] font-medium",
};

const LinkText: FC<LinkPropss> = ({ className, children, ...props }) => {
  return (
    <Link
      className={cn(
        ...Object.values(paragraphStyle),
        "[&>span]:font-sub [&>span]:italic underline",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
};

export default LinkText;
