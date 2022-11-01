import mongoose from "mongoose";

import {
  LocalAuthority,
  ILocalAuthority as ILocalAuthoritySchema,
  SchoolType,
  ISchoolType as ISchoolTypeSchema,
  School,
  ISchool as ISchoolSchema,
} from "@rightlocation/schema";

import { ILocalAuthority, ISchool } from "src/types";
import { slug } from "./id";

const mongoUrl = "mongodb://127.0.0.1:27017/right-location"; // process.env.MONGODB_URL ??

type SORU = string | undefined;

const combine = (...args: SORU[]): string =>
  args.filter((a) => a !== undefined && a.length > 1).join(", ");

const toLocalAuthoritySlug = (la: string): string =>
  slug(la.replace(/ (Pre LGR-2021)/, ""));

const toSchoolTypeSlug = (st: string): string =>
  slug(st.replace(/ on non-domestic premises/, ""));

export const saveSchools = async (schools: ISchool[]) => {
  console.log("Saving schools to mongo...");
  const mongo = await mongoose.connect(mongoUrl);
  await School.deleteMany();

  const ss = schools.map(
    ({
      ofstedRating,
      webLink,
      urn,
      name,
      localAuthority,
      address,
      address2,
      address3,
      town,
      postcode,
      telephone,
      lat,
      long,
      gender,
      minorGroup: st,
      schoolType: sst,
      isNursery,
      isPrimary,
      isSecondary,
      isPost16,
      // dateOfLastInspection,
    }) => {
      const schema: ISchoolSchema = {
        urn,
        name,
        slug: slug(name),
        webLink,
        localAuthority: toLocalAuthoritySlug(localAuthority),
        schoolType: toSchoolTypeSlug(st),
        subSchoolType: sst,
        address: combine(address, address2, address3, town, postcode),
        telephone,
        pos: {
          type: "Point",
          coordinates: [long, lat],
        },
        gender,
        isNursery,
        isPrimary,
        isSecondary,
        isPost16,
        ofstedRating,
        // lastInspDate: dateOfLastInspection,
      };
      return schema;
    }
  );

  //ss.forEach(async (s) => {
  for (let i = 0; i < ss.length; i++) {
    const s = ss[i];
    try {
      await School.insertMany(s);
    } catch (err) {
      console.log(JSON.stringify(s));
      throw err;
    }
  }

  await mongo.disconnect();
  console.log("Schools saved.");
};

export const saveLocalAuthorities = async (
  localAuthorities: ILocalAuthority[]
) => {
  console.log("Saving local authorities to mongo...");

  const mongo = await mongoose.connect(mongoUrl);
  await LocalAuthority.deleteMany();

  const las = localAuthorities.map((la) => {
    const { localAuthorityId: laId, localAuthority: name } = la;
    const slug = toLocalAuthoritySlug(name);
    return { laId, slug, name } as ILocalAuthoritySchema;
  });
  await LocalAuthority.insertMany(las);

  await mongo.disconnect();
  console.log("Local authorities saved.");
};

export const saveSchoolTypes = async (schoolTypes: string[]) => {
  console.log("Saving school types to mongo...");

  const mongo = await mongoose.connect(mongoUrl);
  await SchoolType.deleteMany();

  const las = schoolTypes.map((name) => {
    const slug = toSchoolTypeSlug(name);
    return { slug, name } as ISchoolTypeSchema;
  });
  await SchoolType.insertMany(las);

  await mongo.disconnect();
  console.log("School types saved.");
};
