/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";

import useDebounce from "@/front-end/hooks/useDebounce";
import cn from "@/front-end/utils/cn";

interface DebouncedInputTextProps {
  id?: string;
  className?: string;
  name: string;
  value?: string;
  placeholder?: string;
  onChange: (value: string) => void;
  onBlur?: (e: React.FocusEvent<any>) => void;
  required?: boolean;
  type?: string;
  invalid?: boolean;
  autoComplete?: string;
}
const DebouncedInputText = ({
  id,
  className = "",
  name,
  value = "",
  placeholder = "",
  onChange,
  onBlur,
  required,
  type = "text",
  invalid,
  autoComplete,
}: DebouncedInputTextProps) => {
  const [str, setStr] = useState(value);
  const debounceSearch = useDebounce(str, 500);

  useEffect(() => {
    onChange(debounceSearch);
  }, [debounceSearch]);

  // When value='' at the begining and later after data comes from BE changes to a text, need to set the text from BE
  // The case when there's value and no text comes from BE is not needed to handle. It's almost impossible case
  useEffect(() => {
    setStr((prev) => prev || value);
  }, [value]);

  const onChangeStr = (e: React.ChangeEvent<HTMLInputElement>) =>
    setStr(e.target.value);

  const inputProps: any = {};
  if (onBlur) {
    inputProps["onBlur"] = onBlur;
  }
  if (id) {
    inputProps["id"] = id;
  }
  if (invalid !== undefined) {
    inputProps["invalid"] = invalid;
  }
  if (autoComplete) {
    inputProps["autoComplete"] = autoComplete;
  }
  return (
    <InputText
      className={cn(className)}
      name={name}
      value={str}
      onChange={onChangeStr}
      required={required}
      placeholder={placeholder}
      type={type}
      {...inputProps}
    />
  );
};

export default DebouncedInputText;
