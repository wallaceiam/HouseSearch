import React, { useMemo } from "react";
import {
  AcademicCapIcon,
  DevicePhoneMobileIcon,
  MapPinIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { ISchoolSummary } from "../../stores/education";

interface ISchoolPopup {
  school: ISchoolSummary;
  ref: any;
}

const Popup = ({ school }: ISchoolPopup) => {
  const {
    rating,
    webLink,
    name,
    minorGroup,
    schoolType,
    isTypeFlag,
    address,
    telephone,
  } = school;
  const [ratingClass, ratingText] = useMemo(() => {
    switch (rating) {
      case 1:
        return ["text-green-400", "Outstanding"];
      case 2:
        return ["text-yellow-400", "Good"];
      case 3:
        return ["text-gray-400", "Requires Improvement"];
      case 4:
        return ["text-red-400", "Inadequate"];
    }
    return ["", "Unknwon"];
  }, [rating]);

  const ofstedReportLink = useMemo(
    () =>
      `http://www.ofsted.gov.uk/inspection-reports/find-inspection-report/provider${webLink}`,
    [webLink]
  );

  const type = useMemo(() => {
    return [(isTypeFlag & 8) !== 0 ? 'Post 16' : undefined,  
    (isTypeFlag & 4) !== 0 ? 'Secondary' : undefined,
    (isTypeFlag & 2) !== 0 ? 'Primary' : undefined,
    (isTypeFlag & 1) !== 0 ? 'Nursery' : undefined
  ].filter((v) => v !== undefined).join(', ');
  }, [isTypeFlag]);

  return (
    <div
      role="tooltip"
      className="p-1 max-w-sm w-80 text-sm font-light text-gray-500 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
      // className="inline-block absolute invisible z-10 w-80 text-sm font-light text-gray-500 bg-white rounded-lg border border-gray-200 shadow-sm opacity-0 transition-opacity duration-300 dark:text-gray-400 dark:bg-gray-800 dark:border-gray-600"
    >
      <div className="p-3">
        <div className="flex">
          <div className="mr-3 shrink-0">
            <a
              href={webLink}
              rel="noreferrer"
              target="_blank"
              className="block p-2 bg-gray-100 rounded-lg dark:bg-gray-700"
            >
              <AcademicCapIcon
                className={`w-8 h-8 rounded-full ${ratingClass}`}
              />
            </a>
          </div>
          <div>
            <p className="mb-1 text-base font-semibold leading-none text-gray-900 dark:text-white">
              <a
                href={webLink}
                rel="noreferrer"
                target="_blank"
                className="hover:underline"
              >
                {name}
              </a>
            </p>
            <p className="mb-3 text-sm font-normal">{type}: {schoolType}</p>
            <p className="mb-4 text-sm font-light">{minorGroup}</p>
            <ul className="text-sm font-light">
              <li className="flex items-start mb-2">
                <StarIcon className="mr-1 w-4 h-4 font-semibold text-gray-400" />
                <span>{ratingText}</span>
                <a
                  href={ofstedReportLink}
                  target="_blank"
                  rel="noreferrer"
                  className="ml-1 text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Ofsted
                </a>
              </li>
              <li className="flex items-start mb-2">
                <MapPinIcon className="mr-1 w-4 h-4 font-semibold text-gray-400" />
                <span>{address}</span>
              </li>
              {telephone && (
                <li className="flex items-start mb-2">
                  <DevicePhoneMobileIcon className="mr-1 w-4 h-4 font-semibold text-gray-400" />
                  <a
                    href={`tel:${telephone}`}
                    className="text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    {telephone}
                  </a>
                </li>
              )}
            </ul>

            <div className="flex">
              <button
                type="button"
                className="inline-flex justify-center items-center py-2 px-5 mr-2 w-full text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                <svg
                  className="mr-2 w-4 h-4"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Like page
              </button>
              <button
                className="inline-flex items-center py-2 px-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 shrink-0 focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                type="button"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
