export const phase = (
  isNursery: boolean = false,
  isPrimary: boolean = false,
  isSecondary: boolean = false,
  isPost16: boolean = false
): number =>
  (isNursery ? 1 : 0) +
  (isPrimary ? 2 : 0) +
  (isSecondary ? 4 : 0) +
  (isPost16 ? 8 : 0);
