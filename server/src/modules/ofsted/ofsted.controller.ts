import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { IShoolSummary } from './ofsted.models';
import * as dataService from './ofsted.service';

let ofsted: IShoolSummary[] | undefined;

export const getOfsted = catchAsync(async (_req: Request, res: Response) => {
  if (ofsted) {
    res.send(ofsted);
    return;
  }
  const result = await dataService.queryOfsted();

  ofsted = result;
  res.send(ofsted);
});
