import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { ApiError } from '../errors';
import catchAsync from '../utils/catchAsync';
import { IShoolSummary } from './ofsted.models';
import * as service from './ofsted.service';

let ofsted: IShoolSummary[] | undefined;

export const getSummaries = catchAsync(async (_req: Request, res: Response) => {
  if (ofsted) {
    res.send(ofsted);
    return;
  }
  const result = await service.querySummaries();

  ofsted = result;
  res.send(ofsted);
});


export const getOfsted = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['ofstedId'] === 'string') {
    const school = await service.getSchoolById(req.params['ofstedId']);
    if (!school) {
      throw new ApiError(httpStatus.NOT_FOUND, 'School not found');
    }
    res.send(school);
  }
})