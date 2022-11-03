import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { ApiError } from '../errors';
import { pick } from '../utils';
import catchAsync from '../utils/catchAsync';
import * as service from './ofsted.service';

export const getLocalAuthorities = catchAsync(async (_req: Request, res: Response) => {
  const result = await service.queryLocalAuthorities();
  const localAuthorities = result.reduce((prev, cur) => {
    prev[cur.slug] = cur.name;
    return prev;
  }, {} as any);
  res.send(localAuthorities);
});

export const getSchoolTypes = catchAsync(async (_req: Request, res: Response) => {
  const result = await service.querySchoolTypes();
  const schoolTypes = result.reduce((prev, cur) => {
    prev[cur.slug] = cur.name;
    return prev;
  }, {} as any);
  res.send(schoolTypes);
});

export const getSummaries = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, ['localAuthoritySlug', 'schoolType', 'ageRange', 'rating']);
  const result = await service.querySummaries(filter);

  res.send(result);
});

export const getSchoolsByLocalAuthority = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.params, ['localAuthoritySlug']);
  const result = await service.querySummaries(filter);

  res.send(result);
});

export const getSchool = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.params, ['localAuthoritySlug', 'slug']);
  console.log(filter);
  const result = await service.getSchoolById(filter);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, `School ${filter.slug} not found in ${filter.localAuthority}`);
  }
  res.send(result);
});
