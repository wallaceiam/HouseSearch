import { IDACI } from "../../types";

export const idaci = (a: string | undefined): IDACI | undefined => {
  switch (a?.toUpperCase()) {
    case "LEAST DEPRIVED":
      return 1;
    case "AVERAGE":
      return 2;
    case "LESS DEPRIVED":
      return 3;
    case "DEPRIVED":
      return 4;
    case "MOST DEPRIVED":
      return 5;
  }
  return undefined;
};