"use client";
import * as React from "react";
import cn from "@/front-end/utils/cn";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center rounded font-medium ring-offset-background transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:cursor-pointer focus-visible:ring-offset-2 focus-visible:ring-offset-primary-900 data-[state=open]:bg-accent data-[state=open]:text-accent-foreground font-primary  ",
  {
    variants: {
      variant: {
        default:
          "cta bg-linear-to-br from-primary to-primary-700 text-primary-foreground rounded-full shadow-xl hover:shadow-xl shadow-black/50 hover:shadow-black/30 focus:shadow-black/30 hover:bg-linear-to-tr focus:bg-linear-to-tr transition-400 hover:from-primary-700 hover:to-primary outline-primary-700 outline-offset-2 outline-2 focus:from-primary-700 focus:to-primary uppercase font-bold tracking-wide",
        // destructive:
        //   "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        // outline:
        //   "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        // secondary:
        //   "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        link: "cta text-primary underline-offset-4 hover:underline",
        regular:
          "bg-linear-to-br from-primary to-primary-700 text-primary-foreground rounded-full hover:bg-linear-to-tr focus:bg-linear-to-tr transition-400 hover:from-primary-700 hover:to-primary outline-primary-700 outline-offset-2 outline-2 focus:from-primary-700 focus:to-primary uppercase font-bold tracking-wide",
        login:
          "font-primary text-lg md:text-2xl hover:cursor-pointer text-primary-700 border-primary-700 border-1 bg-primary-100/40",
      },
      size: {
        default:
          "h-12 md:h-14 px-6 min-w-[240px] md:min-w-[260px] text-[22px] md:text-[26px]",
        sm: "h-9 md:h-10 rounded-lg px-2",
        md: "h-10 md:h-12 px-6 min-w-[160px] md:min-w-[180px] text-[22px] md:text-[26px]",
        // icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref as React.Ref<HTMLButtonElement>}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
