import slugify from "slugify";

const slugifyOptions = {
  lower: true,
  strict: true,
  trim: true,
};

export const slug = (text: string) => slugify(text, slugifyOptions);

export const localAuthoritySlug = (la: string): string =>
  slugify(la.replace(/ (Pre LGR-2021)/, ""), slugifyOptions);
