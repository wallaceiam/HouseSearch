export const date = (a: string | undefined) => {
  if (a === undefined || a.length < 1) {
    return undefined;
  }

  return new Date(a);
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

export const town = (a: string | undefined) => {
  if (a === undefined || a.length < 1) {
    return "";
  }

  let b = a
    .toLowerCase()
    .replace(/(\b[a-z](?!\s))/g, (x) => x.toUpperCase())
    .replace(/ on /i, '-on-')
    .replace(/-On-/, '-on-')
    .replace(/ in /i, '-in-')
    .replace(/-In-/, '-in-')
    .replace(/ by /i, '-by-')
    .replace(/-By-/, '-by-')
    .replace(/ the /i, '-the-')
    .replace(/-the /i, '-the-')
    .replace(/-The-/, '-the-')
    .replace(/ le /i, '-le-')
    .replace(/-le /i, '-le-')
    .replace(/ super /i, '-super-')
    .replace(/-super-/i, '-super-')
    .replace(/ under /i, '-under-')
    .replace(/-under-/i, '-under-')
    .replace(/ upon /i, '-upon-')
    .replace(/-upon-/i, '-upon-')
    .replace(/ sub /i, '-sub-')
    .replace(/-sub-/i, '-sub-')
    .replace(/st helens/i, "St. Helens")
    .replace(/ St H/, ' St. H')
    .replace(/^Nr /i, 'Near ')
    .replace(/^Nr\. /, 'Near ')
    .replace(/ - Upon- /i, '-upon-')
    .replace(/-upon-/i, '-upon-')
    .replace(/St\.Helens/i, 'St. Helens')
    .replace(/^St /i, 'St. ')
    .replace(/ St /, ' St. ')
    .replace(/'S/i, '\'s')

    ;

  return b;

}
export const gender = (a: string | undefined) => {
  if (a === undefined || a.length < 1 || a === "Not applicable") {
    return "N/A";
  }
  switch (a.toLowerCase()) {
    case "boys":
      return "Boys";
    case "girls":
      return "Girls";
    case "mixed":
      return "Mixed";
  }

  console.warn(`GENDER: ${a} not found`);
  return a;
};


