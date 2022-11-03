import parse from "date-fns/parse";

// const date1 = (a: string | undefined) => {
//   if (a === undefined || a.length < 1) {
//     return undefined;
//   }

//   const ret = new Date(a)?.getTime();
//   if (ret === Number.NaN || (ret as any) === "NaN") {
//     console.warn(`DATE: ${a} is ${ret}`);
//     return undefined;
//   }
//   return ret;
// };

export const date = (a: string | undefined, format: string) => {
  if (a === undefined || a.length < 1 || a === 'NULL') {
    return undefined;
  }

  const ret = parse(a, format, new Date())?.getTime() ?? undefined;
  if (ret === undefined || ret === null || ret === NaN || ret === Number.NaN || `${ret}` === "NaN") {
    console.warn(`DATE: ${a} is ${ret}`);
    return undefined;
  }
  return ret;
};