export const religion = (a: string | undefined): string | undefined => {
  if(a === undefined || a.length < 1) {
    return undefined;
  }

  if(a.toLowerCase() === 'none' || a.toLowerCase() === 'does not apply') {
    return undefined;
  }

  return a;
}