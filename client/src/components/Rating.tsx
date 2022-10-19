import React from "react";
import { StarIcon as StarOutlineIcon } from "@heroicons/react/24/outline";
import { StarIcon as StarSolidIcon } from "@heroicons/react/24/solid";

type IconProp = (
  props: React.ComponentProps<"svg"> & {
    title?: string;
    titleId?: string;
  }
) => JSX.Element;
interface IRatingProps {
  label: string;
  value: number;
  titles: ITitles;
  setValue: (rating: number) => void;
  selectedIcon?: IconProp;
  unselectedIcon?: IconProp;
}

interface ITitles {
  [index: number]: string;
}

const Rating = ({
  value,
  setValue,
  label,
  titles,
  selectedIcon: SelectedIcon = StarSolidIcon,
  unselectedIcon: UnselectedIcon = StarOutlineIcon,
}: IRatingProps) => {
  return (
    <div className="pt-3">
      <label
        htmlFor="rating"
        className="flex mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        <span className="inline-flex flex-grow whitespace-nowrap">{label}</span>
        <span className="inline-flex justify-center items-center text-right px-2 ml-3 text-xs font-medium text-gray-900 dark:text-gray-300">
          {titles[value] ?? ""}
        </span>
      </label>
      <div className="flex item-center">
        {Object.keys(titles)
          .map((i) => +i)
          .reverse()
          .map((i) =>
            value <= i ? (
              <SelectedIcon
                key={i}
                className="w-5 h-5 text-gray-400 cursor-pointer"
                title={titles[i]}
                onClick={() => setValue(i)}
              />
            ) : (
              <UnselectedIcon
                key={i}
                className="w-5 h-5 text-gray-400 cursor-pointer"
                title={titles[i]}
                onClick={() => setValue(i)}
              />
            )
          )}
      </div>
    </div>
  );
};

export default Rating;
