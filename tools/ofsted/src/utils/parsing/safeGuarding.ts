import { RATING } from "../../types";

export const safeGuarding = (a: string | undefined): RATING => {
  if (a === undefined || a.length < 1) {
    return 0;
  }
  switch (a.toUpperCase()) {
    case "YES":
      return 1;
    case "NO":
      return 4;
    case "-":
    case "NULL":
    case "9":
      return 0;
  }
  console.warn(`UNKNOWN SAFEGUARDING: ${a}`);
  return 0;
};