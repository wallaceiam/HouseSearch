export const classification = (a: string | undefined): string | undefined => {
  if(a === undefined || a.length < 1) {
    return undefined;
  }

  return a.replace(/ on non-domestic premises/, '');
}