import React from "react";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";

interface ISectionProps {
  readonly icon?: React.ReactNode;
  readonly children?: React.ReactNode;
  readonly title?: string;
  readonly expanded: boolean;
  readonly onToggleExpand: () => void;
}

export interface IExpandingProps {
  readonly expanded: boolean;
  readonly onToggleExpand: () => void;
}

const Section = ({
  icon,
  children,
  title,
  expanded,
  onToggleExpand,
}: ISectionProps) => {
  return (
    <>
      <div
        // type="button"
        onClick={onToggleExpand}
        className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        {icon}
        <span className="flex-1 ml-3 whitespace-nowrap hidden group-hover:block">
          {title}
        </span>
        <span className="hidden group-hover:inline-flex justify-center items-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">
          {expanded ? (
            <MinusIcon className="h-5 w-5" />
          ) : (
            <PlusIcon className="h-5 w-5" />
          )}
        </span>
      </div>
      {expanded === true && (
        <div className="ml-10 hidden group-hover:block">{children}</div>
      )}
    </>
    //       <div className="pt-6" id="filter-section-mobile-0">
    //         <div className="space-y-6">
    //           <div className="flex items-center">
    //             <input
    //               id="filter-mobile-color-0"
    //               name="color[]"
    //               value="white"
    //               type="checkbox"
    //               className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
    //             />
    //             <label
    //               htmlFor="filter-mobile-color-0"
    //               className="ml-3 min-w-0 flex-1 text-gray-500"
    //             >
    //               White
    //             </label>
    //           </div>

    //           <div className="flex items-center">
    //             <input
    //               id="filter-mobile-color-1"
    //               name="color[]"
    //               value="beige"
    //               type="checkbox"
    //               className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
    //             />
    //             <label
    //               htmlFor="filter-mobile-color-1"
    //               className="ml-3 min-w-0 flex-1 text-gray-500"
    //             >
    //               Beige
    //             </label>
    //           </div>

    //           <div className="flex items-center">
    //             <input
    //               id="filter-mobile-color-2"
    //               name="color[]"
    //               value="blue"
    //               type="checkbox"
    //               checked
    //               className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
    //             />
    //             <label
    //               htmlFor="filter-mobile-color-2"
    //               className="ml-3 min-w-0 flex-1 text-gray-500"
    //             >
    //               Blue
    //             </label>
    //           </div>

    //           <div className="flex items-center">
    //             <input
    //               id="filter-mobile-color-3"
    //               name="color[]"
    //               value="brown"
    //               type="checkbox"
    //               className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
    //             />
    //             <label
    //               htmlFor="filter-mobile-color-3"
    //               className="ml-3 min-w-0 flex-1 text-gray-500"
    //             >
    //               Brown
    //             </label>
    //           </div>

    //           <div className="flex items-center">
    //             <input
    //               id="filter-mobile-color-4"
    //               name="color[]"
    //               value="green"
    //               type="checkbox"
    //               className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
    //             />
    //             <label
    //               htmlFor="filter-mobile-color-4"
    //               className="ml-3 min-w-0 flex-1 text-gray-500"
    //             >
    //               Green
    //             </label>
    //           </div>

    //           <div className="flex items-center">
    //             <input
    //               id="filter-mobile-color-5"
    //               name="color[]"
    //               value="purple"
    //               type="checkbox"
    //               className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
    //             />
    //             <label
    //               htmlFor="filter-mobile-color-5"
    //               className="ml-3 min-w-0 flex-1 text-gray-500"
    //             >
    //               Purple
    //             </label>
    //           </div>
    //         </div>
    //       </div>
    //     )}
    //   </div>
    // </>
  );
};

export default Section;
