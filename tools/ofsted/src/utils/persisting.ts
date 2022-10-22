import Redis from "ioredis";

import { ISchool } from "src/types";

const indexKey = "school.index";
const valueKeyPrefix = "school.simple:";
const fullValueKeyPrefx = "school:";

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
  readonly lastInspDate: Date | undefined;
}

type SORU = string | undefined;

const combine = (...args: SORU[]): string =>
  args.filter((a) => a !== undefined && a.length > 1).join(", ");

const flag = (
  isNursery: boolean,
  isPrimary: boolean,
  isSecondary: boolean,
  isPost16: boolean
): number =>
  (isNursery ? 1 : 0) +
  (isPrimary ? 2 : 0) +
  (isSecondary ? 4 : 0) +
  (isPost16 ? 8 : 0);

export const saveSchools = async (schools: ISchool[]) => {
  console.log("Saving schools to redis...");
  const redis = new Redis();
  const pipeline = await redis.pipeline();

  pipeline.del(indexKey);
  pipeline.del("school.geoindex");

  const step = schools.length / 100;
  schools.forEach((school, index) => {
    const {
      id,
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
      minorGroup,
      schoolType,
      isNursery,
      isPrimary,
      isSecondary,
      isPost16,
      dateOfLastInspection,
    } = school;

    const summary: IShoolSummary = {
      id,
      webLink,
      urn,
      name,
      localAuthority,
      address: combine(address, address2, address3, town, postcode),
      telephone,
      lat,
      long,
      gender,
      minorGroup,
      schoolType,
      isTypeFlag: flag(isNursery, isPrimary, isSecondary, isPost16),
      rating: ofstedRating,
      lastInspDate: dateOfLastInspection,
    };

    pipeline.del(`${valueKeyPrefix}${id}`);
    pipeline.hmset(`${valueKeyPrefix}${id}`, summary);

    pipeline.del(`school-simple:${id}`);
    pipeline.del(`${fullValueKeyPrefx}${id}`);
    pipeline.hmset(`${fullValueKeyPrefx}${id}`, school);

    pipeline.zadd(indexKey, ofstedRating, id);

    pipeline.geoadd("school.geoindex", long, lat, id);

    if (index % step === 0) {
      console.log(((index / schools.length) * 100).toFixed(2));
    }
  });

  console.log("Executing...");
  await pipeline.exec();

  redis.disconnect();
  console.log("Schools saved.");
};
