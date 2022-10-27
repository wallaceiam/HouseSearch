/* eslint-disable @typescript-eslint/no-unused-vars */
import path from 'path';
import csv from '@fast-csv/parse';
import { IOptions } from '../paginate/paginate';

const dir = path.resolve('.', '..', 'data');

const readCsv = <T>(fileName: string, options?: csv.ParserOptionsArgs, rowProcessor: (row: any) => T = (a) => a) => {
  return new Promise<T[]>((resolve, reject) => {
    const data: any = [];

    csv
      .parseFile(fileName, options)
      .on('error', reject)
      .on('data', (row) => {
        const obj = rowProcessor(row);
        if (obj) data.push(obj);
      })
      .on('end', () => {
        resolve(data);
      });
  });
};

export interface IOfstedSchool {
  readonly urn: string;
  readonly webLink: string;
  readonly name: string;
  readonly region: string;
  readonly faithGroup: number;
  readonly postcode: string;
  readonly overallEffectiveness: number;
  readonly typeOfEducation: number;
  readonly lat: number;
  readonly long: number;
  readonly idaci: number;
  readonly totalNumOfPupils: number;
  readonly age: [number, number];
  readonly catOfConcern: string;
  readonly qualityOfEducation: number;
  readonly behaviourAndAttitudes: number;
  readonly personalDevelopment: number;
  readonly effectivenessOfLeadership: number;
  readonly effectivenessOfSafeguarding: number;
}

/**
 * Query for ofsted schools
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
export const queryOfsted = async (_filter: Record<string, any>, _options: IOptions): Promise<IOfstedSchool[]> => {
  const toNum = (val: string | number, overall: number): number => {
    if ([9, 8, 0, '9', '8', '', 'NULL', 'SWK', 'SM', '0'].includes(val)) {
      return overall;
    }
    if (val === 'Yes') {
      return 1;
    }
    if (val === 'No') {
      return 4;
    }
    return +val;
  };
  const rowProcessor = ({
    urn,
    webLink,
    name,
    region,
    faithGroup,
    postcode,
    overallEffectiveness,
    typeOfEducation,
    lat,
    long,
    idaci,
    totalNumOfPupils,
    age,
    catOfConcern,
    qualityOfEducation,
    behaviourAndAttitudes,
    personalDevelopment,
    effectivenessOfLeadership,
    effectivenessOfSafeguarding,
  }: any): IOfstedSchool => ({
    urn,
    webLink,
    name,
    region,
    faithGroup: +faithGroup,
    postcode,
    overallEffectiveness: +overallEffectiveness,
    typeOfEducation: +typeOfEducation,
    lat: +lat,
    long: +long,
    idaci: +idaci,
    totalNumOfPupils: +totalNumOfPupils,
    age: age.split(',').map((i: string) => +i),
    catOfConcern,
    qualityOfEducation: +toNum(qualityOfEducation, +overallEffectiveness),
    behaviourAndAttitudes: +toNum(behaviourAndAttitudes, +overallEffectiveness),
    personalDevelopment: +toNum(personalDevelopment, +overallEffectiveness),
    effectivenessOfLeadership: +toNum(effectivenessOfLeadership, +overallEffectiveness),
    effectivenessOfSafeguarding: +toNum(effectivenessOfSafeguarding, +overallEffectiveness),
  });
  const data = await readCsv<IOfstedSchool>(path.resolve(dir, 'ofsted.csv'), { headers: true }, rowProcessor);
  return data;
};

export interface IStation {
  readonly station: string;
  readonly lat: number;
  readonly long: number;
  readonly zone: string;
  readonly postcode: string;
  readonly type: string;
}
/**
 * Query for stations
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
export const queryStations = async (_filter: Record<string, any>, _options: IOptions): Promise<IStation[]> => {
  const rowProcessor = ({ station, lat, long, zone, postcode, type }: any): IStation => ({
    station,
    lat: +lat,
    long: +long,
    zone,
    postcode,
    type,
  });
  const data = await readCsv<IStation>(path.resolve(dir, 'transport.csv'), { headers: true }, rowProcessor);
  return data;
};
