import { parse } from "fast-csv";

const transform = (row: any): { localAuthorityId: number, localAuthorityName: string } | undefined => {
  const la = {
    localAuthorityId: +row['localAuthorityId'],
    localAuthorityName: row['localAuthority'],
  };
  return la;
}

export const localAuthority = parse({
  headers: true,
  ignoreEmpty: true,
}).transform(transform);
