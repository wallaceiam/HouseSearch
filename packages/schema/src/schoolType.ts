import { Schema, model } from "mongoose";

export interface ISchoolType {
  name: string;
  slug: string;
}

const schoolTypeSchema = new Schema<ISchoolType>({
  name: { type: String, required: true },
  slug: { type: String, required: true, index: true },
});

export const SchoolType = model<ISchoolType>("SchoolType", schoolTypeSchema);
