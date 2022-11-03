import { School, ISchool } from "@rightlocation/schema";
import { CallbackError } from "mongoose";
import { phase } from "../utils/phase";
import { slug, localAuthoritySlug } from "../utils/slug";
import { IPartialSchool } from "../types";

type SORU = string | undefined;

const combine = (...args: SORU[]): string =>
  args.filter((a) => a !== undefined && a.length > 1).join(", ");

const mapper = (chuck: IPartialSchool): ISchool => {
  const {
    urn,
    name,
    localAuthority,
    classification,
    schoolType,
    webLink,
    coordinates,
    address,
    address2,
    address3,
    town,
    postcode,
    telephone,
    website,
    ofstedRating = 0,
    gender = 0,
    isNursery,
    isPost16,
    isPrimary,
    isSecondary,
    dateOfLastInspection,
    qualityOfEducation = 0,
    behaviourAndAttitudes = 0,
    personalDevelopment = 0,
    leadershipAndManagement = 0,
    safeguarding = 0,
    idaci = 0,
    religion,
    adminPolicy,
    census,
    financials,
    teachers,
  } = chuck;

  return {
    urn,
    name,
    slug: slug(name),
    localAuthority,
    localAuthoritySlug: localAuthoritySlug(localAuthority),
    classification,
    schoolType,
    webLink,
    address: combine(address, address2, address3),
    town,
    postcode,
    pos: {
      type: 'Point',
      coordinates: [coordinates?.lat ?? 0, coordinates?.long ?? 0]
    },
    telephone,
    website,
    phase: phase(isNursery, isPrimary, isSecondary, isPost16),
    gender,
    ofstedRating,
    lastInspDate: dateOfLastInspection,
    qualityOfEducation,
    behaviourAndAttitudes,
    personalDevelopment,
    leadershipAndManagement,
    safeguarding,
    idaci,
    religion,
    adminPolicy,

    census,
    financials,
    teachers,
  };
};

export const schoolWriterFunc = (
  chuck: IPartialSchool
): Promise<Error | null | undefined> => {
  return new Promise<Error | null | undefined>((resolve) => {
    const { localAuthority, name, isOpen } = chuck;
    const filter = { slug: slug(name), localAuthoritySlug: localAuthoritySlug(localAuthority) };
    const callback = (err: CallbackError, doc: any, _res: any) => {
      if (err) {
        // console.log(err);
        resolve(undefined);
        return;
      }
      resolve(doc === null ? null : undefined);
    };
    if (isOpen) {
      const replacement = mapper(chuck);
      School.findOneAndReplace(filter, replacement, { upsert: true }, callback);
    } else {
      School.findOneAndDelete(filter, callback);
    }
  });
};
