import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

interface MaxWidthWrapperProps {
  className?: string;
}

export const MaxWidthWrapper = ({
  children,
  className,
}: PropsWithChildren<MaxWidthWrapperProps>) => {
  return (
    <div
      className={cn(
        "h-fll mx-auto w-full max-w-screen-xl px-2.5 md:px-4",
        className
      )}
    >
      {children}
    </div>
  );
};
