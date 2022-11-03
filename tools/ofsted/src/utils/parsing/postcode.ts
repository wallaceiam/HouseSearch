const replace: any = {
  'SW5 5PA': 'SW6 5PA',
  'SW1 1ND': 'SW7 1ND',
  'SW19 2SL': 'SW18 2SL',
  'GU6 6AQ': 'GU26 6AQ',
  'OX3 1JP': 'OX33 1JP',
  'SK10 0RN': 'SK10 3LQ',
  'MK5 7SB': 'MK5 7AX',
  'CO11 2GB': 'CO11 2EF',
  'CB3 5HN': 'CB4 3HN',
  'SS6 5DT': 'SS6 7UP',
  'GL3 4ZN': 'GL3 4QF',
  //'SK7 1GX': 'SK7 1GX'
};

export const postcode = (a: string | undefined): string | undefined => {
  if (a === undefined || a.length < 1) {
    return undefined;
  }

  const b = a.toUpperCase();
  return replace[b] ?? b;
}
