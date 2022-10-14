import React from "react";

interface IGroupComoboProps {
  checked?: number[];
  items: string[];
  label: string;
  setChecked: (value: number) => void;
}

const GroupComobo = ({
  checked = [],
  items,
  label,
  setChecked,
}: IGroupComoboProps) => {
  return (
    <div className="pt-3">
      <label className="flex mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
        <span className="inline-flex flex-grow whitespace-nowrap">{label}</span>
      </label>
      {items.map((item, index) => (
        <div key={index} className="flex items-center mb-4">
          <input
            id={index.toString()}
            type="checkbox"
            value=""
            checked={checked.includes(index)}
            onChange={() => setChecked(index)}
            className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor={index.toString()}
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            {item}
          </label>
        </div>
      ))}
    </div>
  );
};

export default GroupComobo;
