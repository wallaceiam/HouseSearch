import React, { useCallback, useMemo, useRef, useState } from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useOutsideAlerter } from "../hooks";
import Label from "./Label";

interface DropdownItems {
  readonly [value: number]: string;
}

interface DropdownWithCheckBoxesProps {
  readonly id: string;
  readonly label?: string;
  readonly items: DropdownItems;
  readonly selectedItem?: number;
  readonly onItemSelected: (value: number) => void;
  readonly noneSelectedText?: string;
  readonly disabled?: boolean;
}
const DropdownWithCheckBoxes = ({
  id,
  label,
  items = {},
  selectedItem = -1,
  onItemSelected,
  noneSelectedText = "Select",
  disabled = false,
}: DropdownWithCheckBoxesProps) => {
  const ref = useRef(null);
  const [isOpen, setOpen] = useState(false);

  const onClick = useCallback(() => {
    if (!disabled) {
      setOpen(!isOpen);
    }
  }, [disabled, setOpen, isOpen]);

  const onItemClick = useCallback(
    (item: number) => {
      if (!disabled) {
        onItemSelected(item);
      }
      setOpen(false);
    },
    [disabled, onItemSelected, setOpen]
  );

  const text = useMemo(() => {
    console.log(selectedItem);
    if (selectedItem < 0) {
      return noneSelectedText;
    }
    const item = Object.keys(items).find((i) => selectedItem === +i);
    return item !== undefined ? items[+item] : `${selectedItem}`;
  }, [items, selectedItem, noneSelectedText]);

  useOutsideAlerter(ref, () => setOpen(false));

  const classes = useMemo(() => {
    return `max-w-64 w-48 ${
      disabled
        ? "text-gray-800 bg-gray-700 dark:bg-gray-600"
        : "text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
    } font-medium rounded-lg text-sm px-4 py-2.5 text-left inline-flex items-center`;
  }, [disabled]);

  return (
    <div ref={ref} className={"relative mt-3"}>
      {label && <Label label={label} htmlFor={id} />}
      <button
        disabled={disabled}
        id={id}
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
        id={`${id}-dropdown`}
        className={`${
          isOpen ? "" : "hidden"
        } absolute z-10 mt-2 max-h-60 max-w-72 w-48 bg-white overflow-y-auto rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600`}
        // style="position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate3d(0px, 402px, 0px);"
      >
        {Object.keys(items).length > 0 && (
          <ul className="p-3 space-y-3 text-sm text-gray-700 dark:text-gray-200">
            {Object.keys(items).map((value, i) => (
              <li key={i}>
                <div className="flex items-start">
                  <button
                    className="flex-1 ml-2 text-sm text-left whitespace-nowrap font-medium text-gray-900 dark:text-gray-300"
                    onClick={() => onItemClick(+value)}
                  >
                    {items[+value]}
                  </button>
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
