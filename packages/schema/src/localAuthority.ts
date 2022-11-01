import { Schema, model } from "mongoose";

export interface ILocalAuthority {
  laId: number;
  name: string;
  slug: string;
}

const localAuthoritySchema = new Schema<ILocalAuthority>({
  laId: { type: Number, required: true },
  name: { type: String, required: true },
  slug: { type: String, required: true, index: true },
});

export const LocalAuthority = model<ILocalAuthority>(
  "LocalAuthority",
  localAuthoritySchema
);
