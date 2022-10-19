import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import pick from '../utils/pick';
import { IOptions } from '../paginate/paginate';
import * as dataService from './data.service';
import { IOfstedSchool, IStation } from './data.service';

let ofsted: IOfstedSchool[] | undefined;
let station: IStation[] | undefined;

export const getOfsted = catchAsync(async (req: Request, res: Response) => {
  if (ofsted) {
    res.send(ofsted);
    return;
  }
  const filter = pick(req.query, ['score']);
  const options: IOptions = pick(req.query, ['sortBy', 'limit', 'page', 'projectBy']);
  const result = await dataService.queryOfsted(filter, options);
  ofsted = result; // .filter(({ region }) => region === 'London');
  res.send(ofsted);
});

export const getStations = catchAsync(async (req: Request, res: Response) => {
  if (station) {
    res.send(station);
    return;
  }
  const filter = pick(req.query, []);
  const options: IOptions = pick(req.query, ['sortBy', 'limit', 'page', 'projectBy']);
  const result = await dataService.queryStations(filter, options);
  station = result;
  res.send(station);
});
