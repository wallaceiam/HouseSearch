import { ICensus } from "./census";
import { ICoordinates } from "./coordinates";
import { IFinancials } from "./financials";
import { ITeachers } from "./teachers";
import { GENDER, IDACI, RATING } from "./unions";

export interface IPartialSchool {
  readonly webLink: string;
  readonly urn: string;
  readonly name: string;
  readonly localAuthority: string;
  readonly localAuthorityId?: number;
  readonly classification: string;
  readonly schoolType: string;
  readonly isOpen: boolean;
  readonly openDate?: number;
  readonly closedDate?: number;
  readonly onEYR?: boolean;
  readonly onCCR?: boolean;
  readonly onVCR?: boolean;
  readonly isNursery?: boolean;
  readonly isPost16?: boolean;
  readonly isPrimary?: boolean;
  readonly isSecondary?: boolean;
  readonly ageLow?: number;
  readonly ageHigh?: number;
  readonly address?: string;
  readonly address2?: string;
  readonly address3?: string;
  readonly town?: string;
  readonly postcode: string;
  readonly coordinates?: ICoordinates;
  readonly telephone?: string;
  readonly website?: string;
  readonly idaci?: IDACI
  readonly numOfPlaces?: number;
  readonly numOfPlacesIncEstimates?: number;
  readonly gender?: GENDER;
  readonly ofstedRating?: RATING;
  readonly dateOfLastInspection?: number;
  readonly qualityOfEducation?: RATING;
  readonly behaviourAndAttitudes?: RATING;
  readonly personalDevelopment?: RATING;
  readonly leadershipAndManagement?: RATING;
  readonly safeguarding?: RATING;
  readonly religion?: string;
  readonly religionEthos?: string;
  readonly faithGroup?: string;
  readonly adminPolicy?: string;

  readonly census?: ICensus;
  readonly financials?: IFinancials;
  readonly teachers?: ITeachers;
}

export interface ISchoolReport {
  readonly openDate?: number;
  readonly ageLow?: number;
  readonly ageHigh?: number;
  readonly religion?: string;
  readonly religionEthos?: string;
  readonly religiousGroup?: string;
  readonly adminPolicy?: string;
  readonly idaci?: IDACI,
  readonly numOfPupils?: number;

  readonly ofstedRating?: RATING;
  readonly dateOfLastInspection?: number;
  readonly qualityOfEducation?: RATING;
  readonly behaviourAndAttitudes?: RATING;
  readonly personalDevelopment?: RATING;
  readonly leadershipAndManagement?: RATING;
  readonly safeguarding?: RATING;
}