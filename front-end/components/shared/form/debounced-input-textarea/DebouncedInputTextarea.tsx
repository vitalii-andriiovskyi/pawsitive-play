/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { InputTextarea } from "primereact/inputtextarea";

import useDebounce from "@/front-end/hooks/useDebounce";
import cn from "@/front-end/utils/cn";

interface DebouncedInputTextareaProps {
  id?: string;
  className?: string;
  name: string;
  value?: string;
  placeholder?: string;
  onChange: (value: string) => void;
  onBlur?: (e: React.FocusEvent<any>) => void;
  required?: boolean;
  rows?: number;
  cols?: number;
  autoResize?: boolean;
  invalid?: boolean;
  autoComplete?: string;
}

const DebouncedInputTextarea = ({
  id,
  className = "",
  name,
  value = "",
  placeholder = "",
  onChange,
  onBlur,
  required,
  rows,
  cols,
  autoResize,
  invalid,
  autoComplete,
}: DebouncedInputTextareaProps) => {
  const [str, setStr] = useState(value);
  const debounceValue = useDebounce(str, 500);

  useEffect(() => {
    onChange(debounceValue);
  }, [debounceValue]);

  useEffect(() => {
    setStr((prev) => prev || value);
  }, [value]);

  const onChangeStr = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setStr(e.target.value);

  const inputProps: any = {};
  if (onBlur) inputProps["onBlur"] = onBlur;
  if (id) inputProps["id"] = id;
  if (invalid !== undefined) inputProps["invalid"] = invalid;
  if (autoComplete) inputProps["autoComplete"] = autoComplete;
  if (rows) inputProps["rows"] = rows;
  if (cols) inputProps["cols"] = cols;
  if (placeholder) inputProps["placeholder"] = placeholder;
  if (autoResize !== undefined) inputProps["autoResize"] = autoResize;

  return (
    <InputTextarea
      className={cn(className)}
      name={name}
      value={str}
      onChange={onChangeStr}
      required={required}
      {...inputProps}
    />
  );
};

export default DebouncedInputTextarea;
