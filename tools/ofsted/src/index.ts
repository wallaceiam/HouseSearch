import * as path from "path";
import * as fs from "fs";

import {
  getPostcodeLookup,
  getChildcareInformation,
  getSchoolInformation,
  getCensus,
  getFinancials,
  getTeacherInformation,
  getLocalAuthorities,
} from "./loaders";

import { ISchool } from "./types";
import { merge } from "./merge";
import { saveSchools } from "./utils";

const save = async (dir: string, schools: ISchool[]) =>
  new Promise<void>((resolve) => {
    const stream = fs.createWriteStream(path.resolve(dir, "school_info.json"));
    stream.write(JSON.stringify(schools, undefined, 2));
    resolve();
  });

// const printUnique = (a: any[]) => {
//   const unique = [...new Set(a)].sort();
//   console.table(unique);
// };

async function main() {
  const dir = path.resolve(__dirname, "..", "..", "..", "data");

  const localAuthorities = await getLocalAuthorities(dir);

  const postcodes = await getPostcodeLookup(dir);

  const childcare = await getChildcareInformation(dir, postcodes, localAuthorities);
  const schools = await getSchoolInformation(dir, postcodes);
  const census = await getCensus(dir);
  const financials = await getFinancials(dir);
  const teachers = await getTeacherInformation(dir);

  const merged = merge(childcare, schools, census, financials, teachers);

  const all = [...merged.filter(({ isOpen }) => isOpen)];
  all.reduce((prev, { urn, localAuthority: localAuthortiy }) => {
    const key = `${urn}-${localAuthortiy}`;
    if (prev.includes(key)) {
      console.warn(`DUPLICATE URN DETECTED: ${urn} in ${localAuthortiy}`);
    } else {
      prev.push(key);
    }
    return prev;
  }, new Array<string>());

  

  // const allValues = all.map(
  //   ({ religiousCharacter }) => religiousCharacter ?? ""
  // );
  // printUnique(allValues);

  await save(dir, all);

  await saveSchools(all);
}

main();
