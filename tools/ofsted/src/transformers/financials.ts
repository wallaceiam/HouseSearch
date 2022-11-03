import { parse } from "fast-csv";
import config from "../config";
import { Transform, TransformCallback, TransformOptions } from 'stream'
import { localAuthorityMapper } from "../utils/parsing";
import { IPartialSchool, IFinancials } from "../types";
import { createReadStream } from "../readers/createStream";

interface IFinancialsLookup {
  [key: string]: IFinancials;
}

class Financials extends Transform {
  private readonly lookup: IFinancialsLookup;
  constructor(lookup: IFinancialsLookup, opts?: TransformOptions) {
    super({ ...opts, readableObjectMode: true, writableObjectMode: true });
    this.lookup = lookup;
  }

  override _transform(chunk: any, _: string, callback: TransformCallback) {
    const { urn, localAuthorityId: laId } = chunk as IPartialSchool;
    if (laId === undefined) {
      this.push(chunk);
      callback();
      return;
    }

    const { localAuthorityId } = localAuthorityMapper(`${laId}`, '');
    const key = `${urn}_${localAuthorityId}`;
    const financials = this.lookup[key];
    if (financials === undefined) {
      //console.warn(`FINANCIALS: ${urn} ${localAuthorityId} not found`);
    }
    this.push({ ...chunk, financials });
    callback()
  }
}

export const financials = async () => {
  console.log('Reading Financials...');
  const stream = await createReadStream(config.financialsFileName);
  const transform = await new Promise<Transform>((resolve) => {
    const lookup: IFinancialsLookup = {};
    stream
      .pipe(parse({ headers: true, ignoreEmpty: true }))
      .on('data', (row) => {
        const { localAuthorityId } = localAuthorityMapper(row["LA"], '');
        const key = `${row["URN"]}_${localAuthorityId}`;
        lookup[key] = {
          isLondon: row["LONDON/NON-LONDON"] === "London",
          median: row["MEDIAN"],
          numOfFTEPupils: +row["PUPILS"],
          perOfEligiblePupilsForFreeSchoolMeal: +row["FSM"],
          freeSchoolMealsEligibilityBand: row["FSMBAND"],
          perPupil: {
            grantFunding: +row["GRANTFUNDING"],
            selfGeneratedIncome: +row["SELFGENERATEDINCOME"],
            totalIncome: +row["TOTALINCOME"],
  
            teachingStaff: +row["TEACHINGSTAFF"],
            supplyTeachers: +row["SUPPLYTEACHERS"],
            educationSupportStaff: +row["EDUCATIONSUPPORTSTAFF"],
            premises: +row["PREMISES"],
            backOffice: +row["BACKOFFICE"],
            catering: +row["CATERING"],
            otherStaff: +row["OTHERSTAFF"],
            energy: +row["ENERGY"],
            nonIctLearningResources: +row["LEARNINGRESOURCES"],
            ictLearningResources: +row["ICT"],
            boughtInProfServices: +row["BOUGHTINPROFESSIONALSERVICES"],
            other: +row["OTHER"],
            totalExpenditure: +row["TOTALEXPENDITURE"],
          },
          perOfTotalIncome: {
            grantFunding: +row["PGRANTFUNDING"],
            selfGeneratedIncome: +row["PSELFGENERATEDINCOME"],
          },
          perOfTotalExpenditure: {
            teachingStaff: +row["PTEACHINGSTAFF"],
            supplyTeachers: +row["PSUPPLYTEACHERS"],
            educationSupportStaff: +row["PEDUCATIONSUPPORTSTAFF"],
            premises: +row["PPREMISES"],
            backOffice: +row["PBACKOFFICE"],
            catering: +row["PCATERING"],
            otherStaff: +row["POTHERSTAFF"],
            energy: +row["PENERGY"],
            nonIctLearningResources: +row["PLEARNINGRESOURCES"],
            ictLearningResources: +row["PICT"],
            boughtInProfServices: +row["PBOUGHTINPROFESSIONALSERVICES"],
            other: +row["POTHER"],
          },
        }
      })
      .on('end', () => {
        resolve(new Financials(lookup));
      });
  });
  return transform;
}


