import React, { useMemo } from "react";
import { format, formatDistance, differenceInCalendarYears } from "date-fns";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

interface OfstedRatingProps {
  readonly rating?: number;
  readonly lastInspDate?: number;
}

//// 0 = Insufficient evidence
// 1 = Outstanding
// 2 = Good
// 3 = Requires improvement (previously satisfactory)
// 4 = Inadequate

const OfstedRating = ({ rating, lastInspDate }: OfstedRatingProps) => {
  const [ratingText, ratingCss] = useMemo(() => {
    switch (rating) {
      case 1:
        return ["Outstanding", "bg-green-100 text-green-800"];
      case 2:
        return ["Good", "bg-blue-100 text-blue-800"];
      case 3:
        return ["Requires Improvement", "bg-yellow-100 text-yellow-800"];
      case 4:
        return ["Inadequate", "bg-red-100 text-red-800"];
    }
    return ["Unrated", "bg-gray-100 text-gray-800"];
  }, [rating]);

  const [isOverTenYears, inspDate] = useMemo(() => {
    if (lastInspDate === undefined) {
      return [false, ""];
    }
    try {
      const date = new Date(+lastInspDate);
      const formattedDate = `${format(date, 'dd/MM/yyyy')} (${formatDistance(date, new Date())})`;
      if (differenceInCalendarYears(date, new Date()) > 9) {
        return [true, formattedDate];
      }
      return [false, formattedDate];
    } catch (err) {
      return [false, `${lastInspDate}`];
    }
  }, [lastInspDate]);
  return (
    <div className="inline-flex items-baseline" title={inspDate}>
      <div
        className={`${ratingCss} px-2.5 py-0.5 rounded-full text-sm font-medium md:mt-2 lg:mt-0`}
      >
        {ratingText}
      </div>
      {isOverTenYears && <ExclamationTriangleIcon className="w-4 h-4" />}
    </div>
  );
};

export default OfstedRating;
