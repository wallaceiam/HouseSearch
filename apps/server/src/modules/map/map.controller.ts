/* eslint-disable import/prefer-default-export */
import { Request, Response } from 'express';
import circle from '@turf/circle';
import intersect from '@turf/intersect';
// import booleanDisjoint from '@turf/boolean-disjoint';
import { point } from '@turf/helpers';
import catchAsync from '../utils/catchAsync';
import pick from '../utils/pick';
import { IOptions } from '../paginate/paginate';
import * as dataService from './map.service';

export const getOfsted = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, ['score']);
  const options: IOptions = pick(req.query, ['sortBy', 'limit', 'page', 'projectBy']);
  const data = await dataService.queryOfsted(filter, options);
  const features = data
    .filter(({ region }) => region === 'London')
    .filter(({ overallEffectiveness }) => +overallEffectiveness <= 1);

  const result = {
    type: 'FeatureCollection',
    features: features.map(({ lat, long, ...rest }) => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [long, lat],
      },
      properties: rest,
    })),
  };

  res.send(result);
});

export const getStations = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, []);
  const options: IOptions = pick(req.query, ['sortBy', 'limit', 'page', 'projectBy']);
  const features = await dataService.queryStations(filter, options);

  const result = {
    type: 'FeatureCollection',
    features: features.map(({ lat, long, ...rest }) => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [long, lat],
      },
      properties: rest,
    })),
  };

  res.send(result);
});

export const getIdeal = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, ['score']);
  const options: IOptions = pick(req.query, ['sortBy', 'limit', 'page', 'projectBy']);
  const schoolData = await dataService.queryOfsted(filter, options);
  const schools = schoolData
    .filter(({ region }) => region === 'London')
    .filter(({ overallEffectiveness }) => +overallEffectiveness <= 1)
    .map(({ lat, long }) => circle(point([long, lat]), 0.6, { steps: 10, units: 'miles' }));

  const stationData = await dataService.queryStations(filter, options);
  const stations = stationData.map(({ lat, long }) => circle(point([long, lat]), 0.6, { steps: 10, units: 'miles' }));

  const intersections = schools.reduce((prev, cur) => {
    stations.forEach((station) => {
      const intersection = intersect(cur, station);
      if (intersection !== null) {
        prev.push(intersection);
      }
    });
    return prev;
  }, new Array<any>());

  const features = intersections;

  const result = {
    type: 'FeatureCollection',
    features,
  };

  res.send(result);
});
