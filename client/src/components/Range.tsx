import React, { useCallback } from "react";

interface IRangeProps {
  value?: number;
  label: string;
  min?: number;
  max?: number;
  step?: number;
  setValue: (value: number) => void;
}

const Rating = ({
  value = 5,
  min = 0,
  max = 10,
  step = 1,
  label,
  setValue,
}: IRangeProps) => {
  const onChange = useCallback(
    (event: any) => {
      setValue(event.target.value);
    },
    [setValue]
  );
  return (
    <div className="pt-3">
      <label
        htmlFor="minmax-range"
        className="flex mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        <span className="inline-flex flex-grow whitespace-nowrap">{label}</span>
        <span className="inline-flex justify-center items-center text-right px-2 ml-3 text-xs font-medium text-gray-900 dark:text-gray-300">
          {value}
        </span>
      </label>
      <input
        id="minmax-range"
        type="range"
        step={step}
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
      ></input>
    </div>
  );
};

export default Rating;
