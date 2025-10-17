/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Slider, SliderChangeEvent, SliderProps } from "primereact/slider";
import useDebounce from "@/front-end/hooks/useDebounce";
import cn from "@/front-end/utils/cn";

interface DebouncedSliderProps extends Omit<SliderProps, "onChange" | "value"> {
  value: number | [number, number];
  onChange: (value: number | [number, number]) => void;
  className?: string;
}

const DebouncedSlider = ({
  value,
  onChange,
  className = "",
  ...rest
}: DebouncedSliderProps) => {
  const [internalValue, setInternalValue] = useState(value);
  const debouncedValue = useDebounce(internalValue, 500);

  useEffect(() => {
    onChange(debouncedValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const handleChange = (e: SliderChangeEvent) => setInternalValue(e.value);
  const sliderProps: any = { ...rest };

  let css = "";
  let style: any = {};

  if (rest.range) {
    css = `
      [&_[data-pc-section=range]]:before:absolute
      [&_[data-pc-section=range]]:before:top-[10px]
      [&_[data-pc-section=range]]:before:left-0
      [&_[data-pc-section=range]]:before:-translate-x-1/2
      [&_[data-pc-section=range]]:before:content-(--range-start)!
      [&_[data-pc-section=range]]:before:text-[12px]
      [&_[data-pc-section=range]]:before:font-bold
      [&_[data-pc-section=range]]:after:absolute
      [&_[data-pc-section=range]]:after:top-[10px]
      [&_[data-pc-section=range]]:after:right-0
      [&_[data-pc-section=range]]:after:translate-x-1/2
      [&_[data-pc-section=range]]:after:text-[12px]
      [&_[data-pc-section=range]]:after:font-bold
      [&_[data-pc-section=range]]:after:content-(--range-end)!
    `;

    const rangeStart = Math.min(...((internalValue as number[]) || [0]));
    const rangeEnd = Math.max(...((internalValue as number[]) || [100]));

    style["--range-start"] = `"${rangeStart}"`;
    style["--range-end"] = `"${rangeEnd}"`;
  }

  return (
    <Slider
      style={{
        ...style,
      }}
      className={cn(className, { [css]: rest.range })}
      value={internalValue}
      onChange={handleChange}
      {...sliderProps}
    />
  );
};

export default DebouncedSlider;
