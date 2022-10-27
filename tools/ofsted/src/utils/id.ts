import slugify from "slugify";
import { v5 as uuidv5 } from "uuid";

const seed = "905f19ac-27e1-4d83-a9ff-6d096fbecd78";

interface GetIdProps {
  readonly urn: string;
  readonly localAuthorityId: number;
  readonly postcode: string;
}

export const getId = ({
  urn,
  localAuthorityId,
  postcode,
}: GetIdProps): string => {
  const guid = uuidv5(`${urn}-${localAuthorityId}-${postcode}`, seed);
  const [first, second] = guid.split("-");
  return `${first}${second![0]}`;
};

const slugifyOptions = {
  lower: true,
  strict: true,
  trim: true,
};

export const slug = (text: string) =>
      slugify(text, slugifyOptions);