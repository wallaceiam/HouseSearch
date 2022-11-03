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
  } else if (id === "928") {
    return {
      localAuthorityId: id,
      name: "Northamptonshire (Pre LGR-2021)",
    };
  }
  return { localAuthorityId: id, localAuthority: name };
};