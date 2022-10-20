import path from "path";

import { parser } from "../parser";
import { IPostcode, IPostcodeLookup } from "../types";

export const getPostcodeLookup = async (dir: string) => {
  const fileName = path.resolve(dir, "postcodes.csv");

  const transformer = (row: any): IPostcode | undefined => ({
    postcode: row["pcds"],
    lat: +row["lat"],
    long: +row["long"],
  });

  const postcodes = await parser<IPostcode>({
    fileName,
    transformer,
  });

  return postcodes.reduce((prev, { postcode, lat, long }) => {
    prev[postcode] = { lat, long };
    return prev;
  }, {} as IPostcodeLookup);
};
