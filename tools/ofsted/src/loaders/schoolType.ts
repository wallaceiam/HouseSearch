import path from "path";

import { parser } from "../parser";

const getSchoolTypes = async (dir: string) => {
  const fileName = path.resolve(
    dir,
    "ofsted",
    "2020-2021",
    "england_school_information.csv"
  );

  const transformer = (row: any): string | undefined => row["MINORGROUP"];

  const minorGroups = await parser<string>({
    fileName,
    transformer,
  });
  return minorGroups;
};

const getChildcareTypes = async (dir: string) => {
  const fileName = path.resolve(
    dir,
    "Childcare_provider_level_data_as_at_31_March_2022",
    "D1-_Childcare_providers.csv"
  );

  const transformer = (row: any): string | undefined => {
    if (row["Postcode"] === "REDACTED") return undefined;
    return row["Provider type"];
  };

  const minorGroups = await parser<string>({
    fileName,
    transformer,
    parseOptions: { headers: true, skipLines: 3, ignoreEmpty: true },
  });
  return minorGroups;
};

export const getSchoolType = async (dir: string) => {
  const schoolTypes = await getSchoolTypes(dir);
  const childcareTypes = await getChildcareTypes(dir);

  const result = [...schoolTypes, ...childcareTypes].reduce((prev, cur) => {
    if (!prev.includes(cur)) {
      prev.push(cur);
    }
    return prev;
  }, new Array<string>());

  console.table(result);

  return result;
};
