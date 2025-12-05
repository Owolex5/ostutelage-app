// components/ui/alert.tsx
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

type AlertProps = React.HTMLAttributes<HTMLDivElement>;

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      className={cn(
        "relative w-full rounded-xl border p-4 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg+div]:translate-y-[-3px] [&>svg]:text-foreground",
        className
      )}
      {...props}
    />
  )
);
Alert.displayName = "Alert";

export const AlertDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";