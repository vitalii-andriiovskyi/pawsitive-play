import cn from "@/front-end/utils/cn";
import React, { ReactNode } from "react";

interface FormControlWrapperProps {
  label?: string | ReactNode; // for now label is only text or JSX
  id?: string;
  isTouched?: boolean;
  errorMsg?: string;
  helpText?: string;
  className?: string;
  children: ReactNode;
}

const FormControlWrapper = ({
  label = "", // for now label is only text or JSX
  id,
  isTouched = false,
  errorMsg = "",
  helpText = "",
  className = "",
  children,
}: FormControlWrapperProps) => {
  return (
    <div className={cn(className, "group flex w-full flex-col gap-1.5")}>
      {label && (
        <label className="flex gap-1" htmlFor={id}>
          {label}
          <strong className="-translate-y-0.4 hidden text-red-500 group-has-required:inline-flex">
            *
          </strong>
        </label>
      )}
      {children}
      {isTouched && errorMsg && (
        <small className="error-msg text-red-500">{errorMsg}</small>
      )}
      {helpText && <small>{helpText}</small>}
    </div>
  );
};

export default FormControlWrapper;
