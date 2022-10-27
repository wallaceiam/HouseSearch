import Redis from "ioredis";

import { ILocalAuthority, ISchool } from "src/types";
import { slug } from "./id";
import { zscan } from "./redis";

export interface IShoolSummary {
  readonly id: string;
  readonly webLink: string;
  readonly urn: string;
  readonly name: string;
  readonly address: string;
  readonly telephone: string | undefined;
  readonly lat: number;
  readonly long: number;
  readonly rating: number;
  readonly localAuthority: string;
  readonly gender: number;
  readonly minorGroup: string;
  readonly schoolType: string;
  readonly isTypeFlag: number;
  readonly lastInspDate: number | undefined;
}

type SORU = string | undefined;

const combine = (...args: SORU[]): string =>
  args.filter((a) => a !== undefined && a.length > 1).join(", ");

// const flag = (
//   isNursery: boolean,
//   isPrimary: boolean,
//   isSecondary: boolean,
//   isPost16: boolean
// ): number =>
//   (isNursery ? 1 : 0) +
//   (isPrimary ? 2 : 0) +
//   (isSecondary ? 4 : 0) +
//   (isPost16 ? 8 : 0);

const toLocalAuthoritySlug = (la: string): string => slug(la.replace(/ (Pre LGR-2021)/, ""));

const toSchoolTypeSlug = (st: string): string => slug(st.replace(/ on non-domestic premises/, ""));

export const saveSchools = async (schools: ISchool[]) => {
  console.log("Saving schools to redis...");
  const prefix = "school";
  const redis = new Redis();

  const pipeline = await redis.pipeline();

  pipeline.del(`${prefix}.index`);
  pipeline.del(`${prefix}.geoindex`);

  pipeline.del();

  const step = Math.floor(schools.length / 100);
  schools.forEach((school, index) => {
    const {
      ofstedRating,
      webLink,
      urn,
      name,
      localAuthority: la,
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
      dateOfLastInspection,
    } = school;

    // const summary: IShoolSummary = {
    //   id,
    //   slug: slug(name),
    //   webLink,
    //   urn,
    //   name,
    //   localAuthority,
    //   address: combine(address, address2, address3, town, postcode),
    //   telephone,
    //   lat,
    //   long,
    //   gender,
    //   minorGroup,
    //   schoolType,
    //   isTypeFlag: flag(isNursery, isPrimary, isSecondary, isPost16),
    //   rating: ofstedRating,
    //   lastInspDate: dateOfLastInspection,
    // };
    const sId = slug(name);

    const localAuthority = toLocalAuthoritySlug(la);
    const schoolType = toSchoolTypeSlug(st);

    pipeline.del(`${prefix}:${sId}`);
    pipeline.hmset(`${prefix}:${sId}`, {
      slug: sId,
      webLink,
      urn,
      name,
      localAuthority,
      schoolType,
      schoolSubType: sst,
      address: combine(address, address2, address3, town, postcode),
      telephone,
      lat,
      long,
      gender,
      isNursery,
      isPrimary,
      isSecondary,
      isPost16,
      rating: ofstedRating,
      lastInspDate: dateOfLastInspection,
    });

    pipeline.zadd(`${prefix}.index`, ofstedRating, sId);
    pipeline.zadd(`${prefix}:${ofstedRating}.index`, ofstedRating, sId);
    pipeline.zadd(`${localAuthority}.index`, 0, sId);
    pipeline.zadd(`${schoolType}.index`, 0, sId);
    if(isNursery) {
      pipeline.zadd(`nursery.index`, 0, sId);
    }
    if(isPrimary) {
      pipeline.zadd(`primary.index`, 0, sId);
    }
    if(isSecondary) {
      pipeline.zadd(`secondary.index`, 0, sId);
    }
    if(isPost16) {
      pipeline.zadd(`post16.index`, 0, sId);
    }

    pipeline.geoadd(`${prefix}.geoindex`, long, lat, sId);

    if (index % step === 0) {
      console.log(
        `${((index / schools.length) * 100).toFixed(1).padStart(5, " ")}%`
      );
    }
  });

  console.log("Executing...");
  await pipeline.exec();

  redis.disconnect();
  console.log("Schools saved.");
};

export const saveLocalAuthorities = async (
  localAuthorities: ILocalAuthority[]
) => {
  console.log("Saving local authorities to redis...");
  const prefix = "local_authority";

  const redis = new Redis();

  const existing = await zscan(redis, `${prefix}.index`);
  const keysToDelete = (existing ?? []).filter(
    (key) =>
      localAuthorities.find(
        (la) =>
          `${la.localAuthorityId}` === key ||
          toLocalAuthoritySlug(la.localAuthority) === key
      ) === undefined
  );

  const pipeline = await redis.pipeline();
  pipeline.del(`${prefix}.index`);

  keysToDelete.forEach((key) => {
    pipeline.del(`${prefix}:${key}`);
  });

  localAuthorities.forEach((la) => {
    const { localAuthorityId: id, localAuthority: name } = la;
    const laId = toLocalAuthoritySlug(name);

    pipeline.del(`${prefix}:${laId}`);
    pipeline.del(`${prefix}:${laId}.index`);
    pipeline.hmset(`${prefix}:${laId}`, { id, name, slug: laId });

    pipeline.zadd(`${prefix}.index`, 0, laId);
  });

  console.log("Executing...");
  await pipeline.exec();

  redis.disconnect();
  console.log("Local authorities saved.");
};

export const saveSchoolTypes = async (schoolTypes: string[]) => {
  console.log("Saving school types to redis...");
  const prefix = "school_type";

  const redis = new Redis();

  const existing = await zscan(redis, `${prefix}.index`);
  const keysToDelete = (existing ?? []).filter((key) =>
    schoolTypes.find(
      (id) => `${toSchoolTypeSlug(id)}` !== key
    )
  );

  const pipeline = await redis.pipeline();
  pipeline.del(`${prefix}.index`);

  keysToDelete.forEach((key) => {
    pipeline.del(`${prefix}:${key}`);
  });

  schoolTypes.forEach((type, index) => {
    const laId = toSchoolTypeSlug(type);

    pipeline.del(`${prefix}:${laId}`);
    pipeline.del(`${prefix}:${laId}.index`);
    pipeline.hmset(`${prefix}:${laId}`, { id: index, name: type, slug: laId });

    pipeline.zadd(`${prefix}.index`, 0, laId);
  });

  console.log("Executing...");
  await pipeline.exec();

  redis.disconnect();
  console.log("School types saved.");
};
