
import { v5 as uuidv5 } from "uuid";
import nanoid from "nanoid";

const seed = '905f19ac-27e1-4d83-a9ff-6d096fbecd78';

const enc = new TextEncoder();

interface GetIdProps {
  readonly urn: string;
  readonly localAuthorityId: number;
  readonly postcode: string;
}

export const getId = ({ urn, localAuthorityId, postcode }: GetIdProps): string => {
  const guid = uuidv5(`${urn}-${localAuthorityId}-${postcode}`, seed);
  const buff = enc.encode(guid);

  const randId = nanoid.customRandom(nanoid.urlAlphabet, 10, (size) => buff.slice(0, size));
  return randId();
}