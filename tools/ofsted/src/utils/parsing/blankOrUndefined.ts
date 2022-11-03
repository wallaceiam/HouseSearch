export const blankOrUndefined = (a: string | undefined) =>
  a?.length ?? 0 < 1 ? undefined : a;