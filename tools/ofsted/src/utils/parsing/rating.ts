import { RATING } from "../../types";

export const rating = (a: string | undefined): RATING => {
  if (a === undefined || a.length < 1) {
    return 0;
  }
  switch (a.toUpperCase()) {
    case "1":
    case "OUTSTANDING":
      return 1;
    case "2":
    case "GOOD":
      return 2;
    case "3":
    case "REQUIRES IMPROVEMENT":
      return 3;
    case "4":
    case "INADEQUATE":
    case "SERIOUS WEAKNESSES":
    case "SPECIAL MEASURES":
      return 4;
    case "-":
    case "NULL":
    case "9":
      return 0;
  }
  console.warn(`UNKNOWN RATING: ${a}`);
  return 0;
};