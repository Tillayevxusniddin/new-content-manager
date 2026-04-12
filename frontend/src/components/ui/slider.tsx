import { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface SliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  onChangeValue?: (value: number) => void;
}

export function Slider({ className, value, min = 0, max = 100, step = 1, onChangeValue, ...props }: SliderProps) {
  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(event) => onChangeValue?.(Number(event.target.value))}
      className={cn("w-full accent-primary", className)}
      {...props}
    />
  );
}
