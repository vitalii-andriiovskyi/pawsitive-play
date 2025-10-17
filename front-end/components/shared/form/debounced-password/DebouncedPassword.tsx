/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Password } from "primereact/password";
import useDebounce from "@/front-end/hooks/useDebounce";
import cn from "@/front-end/utils/cn";

interface DebouncedPasswordProps {
  id?: string;
  className?: string;
  name: string;
  value?: string;
  placeholder?: string;
  onChange: (value: string) => void;
  onBlur?: (e: React.FocusEvent<any>) => void;
  required?: boolean;
  invalid?: boolean;
  minLength?: number;
  toggleMask?: boolean;
  feedback?: boolean;
  autoComplete?: string;
  inputClassName?: string;
}

const DebouncedPassword = ({
  id,
  className = "",
  name,
  value = "",
  placeholder = "",
  onChange,
  onBlur,
  required,
  invalid,
  minLength,
  toggleMask,
  feedback,
  autoComplete,
  inputClassName,
}: DebouncedPasswordProps) => {
  const [str, setStr] = useState(value);
  const debounceValue = useDebounce(str, 500);

  useEffect(() => {
    onChange(debounceValue);
  }, [debounceValue]);

  useEffect(() => {
    setStr((prev) => prev || value);
  }, [value]);

  const onChangeStr = (e: any) => setStr(e.target.value);

  const inputProps: any = {};
  if (onBlur) inputProps["onBlur"] = onBlur;
  if (id) inputProps["inputId"] = id;
  if (invalid !== undefined) inputProps["invalid"] = invalid;
  if (autoComplete) inputProps["autoComplete"] = autoComplete;
  if (inputClassName) inputProps["inputClassName"] = inputClassName;
  if (minLength !== undefined) inputProps["minLength"] = minLength;
  if (toggleMask !== undefined) inputProps["toggleMask"] = toggleMask;
  if (feedback !== undefined) inputProps["feedback"] = feedback;

  return (
    <Password
      className={cn(className)}
      name={name}
      value={str}
      onChange={onChangeStr}
      required={required}
      placeholder={placeholder}
      {...inputProps}
    />
  );
};

export default DebouncedPassword;
