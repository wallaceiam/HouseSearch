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

interface IOfstedSchool {
  readonly urn: string;
  readonly webLink: string;
  readonly name: string;
  readonly region: string;
  readonly postcode: string;
  readonly overallEffectiveness: number;
  readonly typeOfEdication: string;
  readonly lat: number;
  readonly long: number;
}

/**
 * Query for ofsted schools
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
export const queryOfsted = async (_filter: Record<string, any>, _options: IOptions): Promise<IOfstedSchool[]> => {
  const data = await readCsv<IOfstedSchool>(path.resolve(dir, 'ofsted.csv'), { headers: true });
  return data;
};

interface IStation {
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
  const data = await readCsv<IStation>(path.resolve(dir, 'transport.csv'), { headers: true });
  return data;
};
