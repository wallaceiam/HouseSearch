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

  console.log('Getting local authorites...');
  const localAuthorities = await getLocalAuthorities(dir);

  console.log('Getting postcodes...');
  const postcodes = await getPostcodeLookup(dir);

  console.log('Getting childcare...');
  const childcare = await getChildcareInformation(dir, postcodes, localAuthorities);
  console.log('Getting schools...');
  const schools = await getSchoolInformation(dir, postcodes);
  console.log('Getting census...');
  const census = await getCensus(dir);
  console.log('Getting financials...');
  const financials = await getFinancials(dir);
  console.log('Getting teachers...');
  const teachers = await getTeacherInformation(dir);

  console.log('Merging...');
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

  console.log('Saving...');

  // const allValues = all.map(
  //   ({ religiousCharacter }) => religiousCharacter ?? ""
  // );
  // printUnique(allValues);

  await save(dir, all);

  await saveSchools(all);
}

main();
