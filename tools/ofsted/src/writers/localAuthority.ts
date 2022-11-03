import { LocalAuthority } from "@rightlocation/schema";
import { CallbackError } from "mongoose";
import { localAuthoritySlug } from "../utils/slug";

export const localAuthorityWriterFunc = (
  chuck: { localAuthorityId: number, localAuthorityName: string }
): Promise<Error | null | undefined> => {
  return new Promise<Error | null | undefined>((resolve) => {
    const { localAuthorityId: laId, localAuthorityName: name } = chuck;
    const slug = localAuthoritySlug(name);
    const filter = { slug };
    const callback = (err: CallbackError, doc: any, _res: any) => {
      if (err) {
        // console.log(err);
        resolve(undefined);
        return;
      }
      resolve(doc === null ? null : undefined);
    };
    const replacement = { slug, name, laId };
    LocalAuthority.findOneAndReplace(filter, replacement, { upsert: true }, callback);

  });
};