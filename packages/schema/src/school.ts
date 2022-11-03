import { Schema, model } from "mongoose";
import { ICensus, censusSchema } from "./census";
import { financialsSchema, IFinancials } from "./financials";
import { IPoint, pointSchema } from "./point";
import { ITeachers, teachersSchema } from "./teachers";

export interface ISchool {
  readonly urn: string;
  readonly name: string;
  readonly slug: string;
  readonly localAuthority: string;
  readonly localAuthoritySlug: string;
  readonly classification: string;
  readonly schoolType: string;
  readonly webLink: string;
  readonly address?: string;
  readonly town?: string;
  readonly postcode?: string;
  readonly pos: IPoint;
  readonly telephone?: string;
  readonly website?: string;
  readonly phase: number;
  readonly gender: number;
  readonly ofstedRating: number;
  readonly lastInspDate?: number;
  readonly qualityOfEducation: number;
  readonly behaviourAndAttitudes: number;
  readonly personalDevelopment: number;
  readonly leadershipAndManagement: number;
  readonly safeguarding: number;
  readonly idaci: number; 

  readonly religion?: string;
  readonly adminPolicy?: string;

  readonly census?: ICensus;
  readonly financials?: IFinancials;
  readonly teachers?: ITeachers;
}

const schoolSchema = new Schema<ISchool>({
  urn: { type: String, required: true },
  name: { type: String, required: true },
  slug: { type: String, required: true },
  localAuthority: { type: String, required: true },
  localAuthoritySlug: { type: String, required: true },
  classification: { type: String, required: true },
  schoolType: { type: String, required: true },
  webLink: { type: String, required: true },
  address: { type: String, required: false },
  town: { type: String, required: false },
  postcode: { type: String, required: false },
  pos: { type: pointSchema, required: true },
  telephone: { type: String, required: false },
  website: { type: String, required: false },
  phase: { type: Number, required: true },
  gender: { type: Number, required: true },
  ofstedRating: { type: Number, required: true },
  lastInspDate: { type: Number, required: false },
  qualityOfEducation: { type: Number, required: true },
  behaviourAndAttitudes: { type: Number, required: true },
  personalDevelopment: { type: Number, required: true },
  leadershipAndManagement: { type: Number, required: true },
  safeguarding: { type: Number, required: true },
  idaci: { type: Number, required: true },

  religion: { type: String, required: false },
  adminPolicy: { type: String, required: false },

  census: { type: censusSchema, required: false },
  financials: { type: financialsSchema, required: false},
  teachers: { type: teachersSchema, required: false},
});

schoolSchema.index({ localAuthoritySlug: 1 });
schoolSchema.index({ localAuthoritySlug: 1, slug: 1 }, { unique: true });
schoolSchema.index({ ofstedRating: 1 });
schoolSchema.index({ urm: 'text', name: 'text' });
schoolSchema.index({ pos: '2dsphere' });

export const School = model<ISchool>("School", schoolSchema);
