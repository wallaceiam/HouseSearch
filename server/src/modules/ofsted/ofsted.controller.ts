import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import pick from '../utils/pick';
import { IOptions } from '../paginate/paginate';
import * as dataService from './ofsted.service';
import { IOfstedSchool } from './ofsted.service';

let ofsted: ISchool[] | undefined;

export const getOfsted = catchAsync(async (_req: Request, res: Response) => {
  if (ofsted) {
    res.send(ofsted);
    return;
  }
  const result = await dataService.queryOfsted();
  ofsted = result; // .filter(({ region }) => region === 'London');
  res.send(ofsted);
});
