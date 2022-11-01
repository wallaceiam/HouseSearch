import { Schema, model } from "mongoose";

export interface IPoint {
  type: "Point";
  coordinates: number[];
}

const pointSchema = new Schema({
  type: {
    type: String,
    enum: ["Point"],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

export interface ISchool {
  urn: string;
  name: string;
  slug: string;
  localAuthority: string;
  schoolType: string;
  subSchoolType: string;
  webLink: string;
  address?: string;
  telephone?: string;
  pos: IPoint;
  ofstedRating: number;
  gender: number;
  isNursery: boolean;
  isPrimary: boolean;
  isSecondary: boolean;
  isPost16: boolean;
  lastInspDate?: number;
}

const schoolSchema = new Schema<ISchool>({
  urn: { type: String, required: true },
  name: { type: String, required: true },
  slug: { type: String, required: true, index: true },
  localAuthority: { type: String, required: true, index: true },
  schoolType: { type: String, required: true, index: true },
  webLink: { type: String, required: true },
  address: { type: String, required: false },
  telephone: { type: String, required: false },
  ofstedRating: { type: Number, required: true, index: true },
  gender: { type: Number, required: true, index: true },
  isNursery: { type: Boolean, required: true, default: false, index: true },
  isPrimary: { type: Boolean, required: true, default: false, index: true },
  isSecondary: { type: Boolean, required: true, default: false, index: true },
  isPost16: { type: Boolean, required: true, default: false, index: true },
  lastInspDate: { type: Number, required: false },

  pos: {
    type: pointSchema,
    index: "2dsphere",
  },
});

schoolSchema.index({ urm: 'text', name: 'text'});

export const School = model<ISchool>("School", schoolSchema);
