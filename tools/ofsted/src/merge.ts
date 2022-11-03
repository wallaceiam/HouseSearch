// import { ICensus, IFinancials, ISchool, ITeacher, IUnique } from "./types";

// interface ILeft {
//   readonly urn: string;
//   readonly localAuthorityId: number;
// }
// const diff = <T>(left: ILeft[], right: IUnique<T>[]) => {
//   const leftKeys = left.map(
//     ({ urn, localAuthorityId }) => `${urn}-${localAuthorityId}`
//   );
//   const rightKeys = right.map(
//     ({ urn, localAuthorityId }) => `${urn}-${localAuthorityId}`
//   );

//   const matched = leftKeys.filter((a) => rightKeys.includes(a));
//   const onlyLeft = leftKeys.filter((a) => !matched.includes(a));
//   const onlyRight = rightKeys.filter((a) => !matched.includes(a));

//   console.log(
//     `  Matched ${matched.length}\tUnmatched L: ${onlyLeft.length}\tUnmatched R: ${onlyRight.length}`
//   );

//   const leftKeys2 = left
//     .filter(
//       ({ urn, localAuthorityId }) =>
//         !matched.includes(`${urn}-${localAuthorityId}`)
//     )
//     .map(({ urn }) => urn);

//   const rightKeys2 = right
//     .filter(
//       ({ urn, localAuthorityId }) =>
//         !matched.includes(`${urn}-${localAuthorityId}`)
//     )
//     .map(({ urn }) => urn);

//   const matched2 = leftKeys2.filter((a) => rightKeys2.includes(a));
//   const onlyLeft2 = leftKeys2.filter((a) => !matched2.includes(a));
//   const onlyRight2 = rightKeys2.filter((a) => !matched2.includes(a));

//   console.log(
//     `  Matched ${matched2.length}\tUnmatched L: ${onlyLeft2.length}\tUnmatched R: ${onlyRight2.length}`
//   );

//   // if(onlyRight2.length > 0) {
//   //   console.table(onlyRight2.slice(0, 10));
//   // }
// };

// export const merge = (
//   childcare: ISchool[],
//   schools: ISchool[],
//   census: ICensus[],
//   financials: IFinancials[],
//   teachers: ITeacher[]
// ): ISchool[] => {
//   const all = [...childcare, ...schools];
//   console.log(`All schools : ${all.length}`);
//   console.log(`Census      : ${census.length}`);
//   diff(all, census);
//   console.log(`Financials: : ${financials.length}`);
//   diff(all, financials);
//   console.log(`Teachers    : ${teachers.length}`);
//   diff(all, teachers);
//   return all.map((school) => {
//     const censusData = census.find(
//       (c) =>
//         c.urn === school.urn && c.localAuthorityId === school.localAuthorityId
//     );
//     const financialData = financials.find(
//       (f) =>
//         f.urn === school.urn && f.localAuthorityId === school.localAuthorityId
//     );
//     const teacherData = teachers.find(
//       (t) =>
//         t.urn === school.urn && t.localAuthorityId === school.localAuthorityId
//     );
//     return {
//       ...school,
//       census: censusData?.data,
//       financials: financialData?.data,
//       teachers: teacherData?.data
//     };
//   });
// };
