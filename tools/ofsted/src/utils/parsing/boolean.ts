export const boolean = (a: string | undefined): boolean | undefined => {
  switch (a?.toUpperCase()) {
    case "Y":
    case "YES":
    case "TRUE":
      return true;
  }
  return false;
};