import path from "path";

import { parser } from "../parser";
import { ILocalAuthority } from "../types";
import { localAuthority as localAuthorityParser } from "../utils";

export const getLocalAuthorities = async (
  dir: string
) => {
  const fileName = path.resolve(
    dir,
    "ofsted",
    "2020-2021",
    "england_school_information.csv"
  );

  const transformer = (row: any): ILocalAuthority | undefined => {

    const la: ILocalAuthority = {
      localAuthorityId: +row["LA"],
      localAuthority: localAuthorityParser(row["LANAME"]) ?? "",
    };
    return la;
  };

  const localAuthorities = await parser<ILocalAuthority>({
    fileName,
    transformer,
  });

  const result = localAuthorities.reduce((prev, { localAuthority, localAuthorityId }) => {
    const existing = prev.find((p) => p.localAuthorityId === localAuthorityId);
    if(!existing) {
      prev.push({ localAuthority, localAuthorityId});
    } else if(existing.localAuthority !== localAuthority) {
      console.warn(`DUPLICATE LA ${localAuthority} with ${existing.localAuthority} and ${localAuthority}`);
    }
    return prev;
  }, new Array<ILocalAuthority>());

  return result;
}