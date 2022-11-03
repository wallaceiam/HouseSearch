import { GENDER } from "../../types";

export const gender = (a: string | undefined): GENDER => {
  if (a === undefined || a.length < 1 || a === "Not applicable") {
    return 0;
  }
  switch (a.toLowerCase()) {
    case "boys":
      return 1;
    case "girls":
      return 2;
    case "mixed":
      return 4;
  }

  console.warn(`GENDER: ${a} not found`);
  return 0;
};