import React, { useCallback, useMemo, useRef, useState } from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useOutsideAlerter } from "../hooks";
import Label from "./Label";

interface DropdownItems {
  readonly [value: string]: string;
}

interface DropdownWithCheckBoxesProps {
  readonly label?: string;
  readonly items: DropdownItems;
  readonly selectedItems: string[];
  readonly onItemSelected: (value: string) => void;
  readonly noneSelectedText?: string;
  readonly allSelectedText?: string;
  readonly disabled?: boolean;
}
const DropdownWithCheckBoxes = ({
  label,
  items = {},
  selectedItems = [],
  onItemSelected,
  noneSelectedText = "None",
  allSelectedText = "All",
  disabled = false,
}: DropdownWithCheckBoxesProps) => {
  const ref = useRef(null);
  const [isOpen, setOpen] = useState(false);

  const onClick = useCallback(() => {
    if (!disabled) {
      setOpen(!isOpen);
    }
  }, [disabled, setOpen, isOpen]);

  const onCheckToggle = useCallback(
    (event: any) => {
      if (!disabled) {
        onItemSelected(event.target.value);
      }
    },
    [disabled, onItemSelected]
  );

  const text = useMemo(() => {
    if (selectedItems.length === 0) {
      return noneSelectedText;
    }
    if (selectedItems.length === Object.keys(items).length) {
      return allSelectedText;
    }
    return Object.keys(items)
      .filter((i) => selectedItems.includes(i))
      .map((i) => items[i])
      .join(", ");
  }, [items, selectedItems, noneSelectedText, allSelectedText]);

  useOutsideAlerter(ref, () => setOpen(false));

  const classes = useMemo(() => {
    return `max-w-48 w-48 ${
      disabled
        ? "text-gray-800 bg-gray-700 dark:bg-gray-600"
        : "text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
    } font-medium rounded-lg text-sm px-4 py-2.5 text-left inline-flex items-center`;
  }, [disabled]);

  return (
    <div ref={ref}>
      {label && <Label label={label} htmlFor={"dropdownCheckboxButton"} />}
      <button
        disabled={disabled}
        id="dropdownCheckboxButton"
        className={classes}
        type="button"
        onClick={onClick}
      >
        <span className="flex-1 truncate justify-start items-start">
          {text}
        </span>
        {!disabled && (
          <span className="inline-flex justify-center items-center">
            {isOpen ? (
              <ChevronUpIcon className="ml-2 w-4 h-4" />
            ) : (
              <ChevronDownIcon className="ml-2 w-4 h-4" />
            )}
          </span>
        )}
      </button>

      <div
        id="dropdownDefaultCheckbox"
        className={`${
          isOpen ? "" : "hidden"
        } z-10 mt-2 max-h-60 max-w-72 w-48 bg-white overflow-y-auto rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600`}
        // style="position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate3d(0px, 402px, 0px);"
      >
        {Object.keys(items).length > 0 && (
          <ul className="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200">
            {Object.keys(items).map((value, i) => (
              <li key={i}>
                <div className="flex items-center">
                  <input
                    disabled={disabled}
                    id={`checkbox-item-${value}-${i}`}
                    type="checkbox"
                    value={value}
                    checked={selectedItems.includes(value)}
                    onChange={onCheckToggle}
                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor={`checkbox-item-${value}-${i}`}
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    {items[value]}
                  </label>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DropdownWithCheckBoxes;
