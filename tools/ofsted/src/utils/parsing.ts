import parse from "date-fns/parse";

export const date = (a: string | undefined) => {
  if (a === undefined || a.length < 1) {
    return undefined;
  }

  return new Date(a)?.getTime();
};

export const dateWithFormat = (format: string) => (a: string | undefined) => {
  if (a === undefined || a.length < 1) {
    return undefined;
  }

  return parse(a, format, new Date())?.getTime();
};

export const telephone = (a: string | undefined) => {
  if (a === undefined || a.length < 1) {
    return undefined;
  }

  return a.replace(/ /g, "");
};

export const blankOrUndefined = (a: string | undefined) =>
  a === "" ? undefined : a;

export const localAuthority = (a: string | undefined) => {
  if (a === undefined || a.length < 1 || a === "Not Recorded") {
    return "Unknown";
  }
  let b = a
    .replace(/ and /i, " & ")
    .replace(/, City of/i, "")
    .replace(/, County of/i, "")
    .replace(/ Of /, " of ")
    .replace(/d on S/i, "d-on-S")
    .replace(/st helens/i, "St. Helens");

  return b;
};

// https://www.sims-partners.com/General-Advice/Publications/Bournemouth
export const localAuthorityMapper = (id: string, name: string) => {
  if (id === "835") {
    return { localAuthorityId: "838", localAuthority: "Dorset" };
  } else if (id === "836" || id === "837") {
    return {
      localAuthorityId: "839",
      localAuthority: "Bournemouth, Christchurch & Poole",
    };
  } else if(id === '928') {
    return {
      localAuthorityId: id,
      name: 'Northamptonshire (Pre LGR-2021)'
    }
  }
  return { localAuthorityId: id, localAuthority: name };
};

export const town = (a: string | undefined) => {
  if (a === undefined || a.length < 1) {
    return "";
  }

  let b = a
    .toLowerCase()
    .replace(/(\b[a-z](?!\s))/g, (x) => x.toUpperCase())
    .replace(/ on /i, "-on-")
    .replace(/-On-/, "-on-")
    .replace(/ in /i, "-in-")
    .replace(/-In-/, "-in-")
    .replace(/ by /i, "-by-")
    .replace(/-By-/, "-by-")
    .replace(/ the /i, "-the-")
    .replace(/-the /i, "-the-")
    .replace(/-The-/, "-the-")
    .replace(/ le /i, "-le-")
    .replace(/-le /i, "-le-")
    .replace(/ super /i, "-super-")
    .replace(/-super-/i, "-super-")
    .replace(/ under /i, "-under-")
    .replace(/-under-/i, "-under-")
    .replace(/ upon /i, "-upon-")
    .replace(/-upon-/i, "-upon-")
    .replace(/ sub /i, "-sub-")
    .replace(/-sub-/i, "-sub-")
    .replace(/st helens/i, "St. Helens")
    .replace(/ St H/, " St. H")
    .replace(/^Nr /i, "Near ")
    .replace(/^Nr\. /, "Near ")
    .replace(/ - Upon- /i, "-upon-")
    .replace(/-upon-/i, "-upon-")
    .replace(/St\.Helens/i, "St. Helens")
    .replace(/^St /i, "St. ")
    .replace(/ St /, " St. ")
    .replace(/'S/i, "'s");

  return b;
};
export const gender = (a: string | undefined): number => {
  if (a === undefined || a.length < 1 || a === "Not applicable") {
    return 0;
  }
  switch (a.toLowerCase()) {
    case "boys":
      return 1;
    case "girls":
      return 2;
    case "mixed":
      return 4;
  }

  console.warn(`GENDER: ${a} not found`);
  return -1;
};

export const rating = (a: string | undefined): 0 | 1 | 2 | 3 | 4 => {
  if (a === undefined || a.length < 1) {
    return 0;
  }
  switch (a.toUpperCase()) {
    case "1":
    case "OUTSTANDING":
      return 1;
    case "2":
    case "GOOD":
      return 2;
    case "3":
    case "REQUIRES IMPROVEMENT":
      return 3;
    case "4":
    case "INADEQUATE":
    case "SERIOUS WEAKNESSES":
    case "SPECIAL MEASURES":
      return 4;
  }
  console.warn(`UNKNOWN RATING: ${a}`);
  return 0;
};
