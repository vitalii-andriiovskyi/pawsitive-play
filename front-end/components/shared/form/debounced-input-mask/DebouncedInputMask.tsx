/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { InputMask } from "primereact/inputmask";

import useDebounce from "@/front-end/hooks/useDebounce";
import cn from "@/front-end/utils/cn";

interface DebouncedInputMaskProps {
  id?: string;
  className?: string;
  name: string;
  value?: string | null;
  placeholder?: string;
  onChange: (value: string) => void;
  onBlur?: (e: React.FocusEvent<any>) => void;
  required?: boolean;
  mask?: string;
  invalid?: boolean;
  autoComplete?: string;
}

const DebouncedInputMask = ({
  id,
  className = "",
  name,
  value = "",
  placeholder = "",
  onChange,
  onBlur,
  required = false,
  mask,
  invalid,
  autoComplete,
}: DebouncedInputMaskProps) => {
  const [str, setStr] = useState(value || "");
  const debounceValue = useDebounce(str, 500);

  useEffect(() => {
    onChange(debounceValue);
  }, [debounceValue]);

  useEffect(() => {
    setStr((prev) => prev || (value ?? ""));
  }, [value]);

  const onChangeStr = (e: any) => {
    console.log("e.target.value", e.target.value);
    setStr(e.target.value);
  };

  const inputProps: any = {};
  if (onBlur) inputProps["onBlur"] = onBlur;
  if (id) inputProps["id"] = id;
  if (invalid !== undefined) inputProps["invalid"] = invalid;
  if (autoComplete) inputProps["autoComplete"] = autoComplete;
  if (placeholder) inputProps["placeholder"] = placeholder;
  if (mask) inputProps["mask"] = mask;

  return (
    <InputMask
      className={cn(className)}
      name={name}
      onChange={onChangeStr}
      required={required}
      {...inputProps}
    />
  );
};

export default DebouncedInputMask;
