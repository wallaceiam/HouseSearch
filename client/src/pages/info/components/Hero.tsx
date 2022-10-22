import { AcademicCapIcon } from "@heroicons/react/24/solid";
import React, { useMemo } from "react";
import Breadcrumbs from "../../../components/Breadcrumbs";

interface HeroProps {
  readonly urn: string;
  readonly name: string;
  readonly localAuthority?: string;
  readonly schoolType?: string;
  readonly minorGroup?: string;
  readonly ofstedRating?: number;
  readonly webLink?: string;
  readonly dateOfLastInspection?: Date;
}
const Hero = ({
  name,
  localAuthority,
  schoolType,
  minorGroup,
  ofstedRating,
  webLink,
  urn,
  dateOfLastInspection,
}: HeroProps) => {
  const [ratingClass, ratingText] = useMemo(() => {
    switch (ofstedRating) {
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
  }, [ofstedRating]);

  const ofstedReportLink = useMemo(
    () =>
      `http://www.ofsted.gov.uk/inspection-reports/find-inspection-report/provider${webLink}`,
    [webLink]
  );
  return (
    <div className="bg-gray-800">
      <div className="mx-auto max-w-7xl py-2 px-1 lg:flex lg:justify-between lg:px-8">
        <Breadcrumbs localAuthority={localAuthority} schoolType={schoolType} />
      </div>
      <div className="mx-auto max-w-7xl py-4 px-4 sm:py-12 sm:px-6 lg:flex lg:justify-between lg:px-8">
        <div className="flex">
          <div className="mr-2">
            <AcademicCapIcon
              className={`w-16 h-16 rounded-full ${ratingClass}`}
            />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {name}
            </h2>
            <p className="mt-5 text-xl text-gray-400">{minorGroup}</p>
          </div>
        </div>
        <div className="w-full max-w-xs flex flex-col px-1 py-1">
          <p className="mt-auto text-xl uppercase text-white">{ratingText}</p>
          {dateOfLastInspection && (
            <p className="text-l text-gray-400">
              {dateOfLastInspection?.toDateString()}
            </p>
          )}
          <p className="text-l text-gray-400">
            <a href={ofstedReportLink}>URN: {urn}</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
