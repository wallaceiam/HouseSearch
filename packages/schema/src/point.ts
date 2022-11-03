import { Schema } from "mongoose";

export interface IPoint {
  type: "Point";
  coordinates: number[];
}

export const pointSchema = new Schema({
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
