import React from "react";

interface LabelProps {
  readonly label: string;
  readonly htmlFor?: string;
}

const Label = ({ label, htmlFor }: LabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className="flex mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
    >
      <span className="inline-flex flex-grow whitespace-nowrap">{label}</span>
      {/* <span className="inline-flex justify-center items-center text-right px-2 ml-3 text-xs font-medium text-gray-900 dark:text-gray-300">
      {titles[value] ?? ""}
    </span> */}
    </label>
  );
};

export default Label;
