import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { HomeIcon } from "@heroicons/react/24/solid";
import React, { useMemo } from "react";
import slugify from "slugify";

const opts = {
  lower: true,
  strict: true,
  trim: true,
};

interface BreadcrumbsProps {
  readonly localAuthority?: string;
  readonly schoolType?: string;
}

const Breadcrumbs = ({ localAuthority, schoolType }: BreadcrumbsProps) => {
  const la = useMemo(() => slugify(localAuthority ?? ""), [localAuthority]);
  const st = useMemo(() => slugify(schoolType ?? ""), [schoolType]);

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <a
            href="/"
            className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <HomeIcon className="w-4 h-4 mr-2" />
            Home
          </a>
        </li>
        {localAuthority && (
          <li>
            <div className="flex items-center">
              <ChevronRightIcon className="w-6 h-6 text-gray-400" />
              <a
                href={`/schools/${la}`}
                className="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white"
              >
                {localAuthority}
              </a>
            </div>
          </li>
        )}
        {localAuthority && schoolType && (
          <li aria-current="page">
            <div className="flex items-center">
              <ChevronRightIcon className="w-6 h-6 text-gray-400" />
              <a
                href={`/schools/${la}/${st}`}
                className="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white"
              >
                {schoolType}
              </a>
            </div>
          </li>
        )}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
