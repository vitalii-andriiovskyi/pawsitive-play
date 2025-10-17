/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import cn from "@/front-end/utils/cn";

interface SpinnerProps {
  className?: string;
  color?: string;
  width?: number;
  height?: number;
}

const Spinner = ({
  className = "",
  color = "white",
  width = 23,
  height = 23,
}: SpinnerProps): React.ReactNode => {
  return (
    <span className={cn(className, "inline-flex items-center justify-center")}>
      <span
        style={
          {
            ["--spinner-width" as any]: `${width}px`,
            ["--spinner-height" as any]: `${height}px`,
            ["--spinner-color" as any]: color,
          } as React.CSSProperties
        }
        className={cn(
          "h-(--spinner-height) w-(--spinner-width) animate-spin rounded-full border-2 border-(--spinner-color) border-t-(--spinner-color)/30",
        )}
      />
    </span>
  );
};

export default Spinner;
