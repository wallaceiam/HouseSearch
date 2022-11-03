export const telephone = (a: string | undefined) => {
  if (a === undefined || a.length < 1) {
    return undefined;
  }

  return a.replace(/ /g, "");
};