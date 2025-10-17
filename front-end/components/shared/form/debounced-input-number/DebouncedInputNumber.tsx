/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  InputNumber,
  InputNumberValueChangeEvent,
} from "primereact/inputnumber";

import useDebounce from "@/front-end/hooks/useDebounce";
import cn from "@/front-end/utils/cn";

interface DebouncedInputNumberProps {
  id?: string;
  className?: string;
  name: string;
  value?: number;
  placeholder?: string;
  onChange: (value: string) => void;
  onBlur?: (e: React.FocusEvent<any>) => void;
  required?: boolean;
  invalid?: boolean;
  autoComplete?: string;
  min?: number;
  max?: number;
  step?: number;
  useGrouping?: boolean;
  format?: string;
  maxLength?: number;
}
const DebouncedInputNumber = ({
  id,
  className = "",
  name,
  value = 0,
  placeholder = "",
  onChange,
  onBlur,
  required,
  invalid,
  autoComplete,
  min,
  max,
  step = 1,
  useGrouping = true,
  format,
  maxLength,
}: DebouncedInputNumberProps) => {
  const [innerValue, setInnerValue] = useState(value);
  const debounceInnerValue = useDebounce(innerValue, 500);

  useEffect(() => {
    onChange(debounceInnerValue);
  }, [debounceInnerValue]);

  // When value='' at the begining and later after data comes from BE changes to a text, need to set the text from BE
  // The case when there's value and no text comes from BE is not needed to handle. It's almost impossible case
  useEffect(() => {
    setInnerValue((prev) => prev || value);
  }, [value]);

  const onChangeInnerValue = (e: InputNumberValueChangeEvent) => {
    setInnerValue(e.value as number);
  };

  const inputProps: any = {};
  if (onBlur) {
    inputProps["onBlur"] = onBlur;
  }
  if (id) {
    inputProps["inputId"] = id;
  }
  if (invalid !== undefined) {
    inputProps["invalid"] = invalid;
  }
  if (autoComplete) {
    inputProps["autoComplete"] = autoComplete;
  }
  if (min !== undefined) {
    inputProps["min"] = min;
  }
  if (max !== undefined) {
    inputProps["max"] = max;
  }
  if (step !== undefined) {
    inputProps["step"] = step;
  }
  if (useGrouping !== undefined) {
    inputProps["useGrouping"] = useGrouping;
  }
  if (format !== undefined) {
    inputProps["format"] = format;
  }
  if (maxLength !== undefined) {
    inputProps["maxLength"] = maxLength;
  }

  return (
    <InputNumber
      className={cn(className)}
      name={name}
      value={innerValue}
      onValueChange={onChangeInnerValue}
      required={required}
      placeholder={placeholder}
      {...inputProps}
    />
  );
};

export default DebouncedInputNumber;
