import Joi from "joi";

export const getSummaries = {
  query: Joi.object().keys({
    rating: Joi.array().items(Joi.number()),
    localAuthority: Joi.string(),
    schoolType: Joi.string(),
    ageRange: Joi.array<number>(),
    lat: Joi.number(),
    long: Joi.number(),
    zoom: Joi.number(),
  }).and('lat', 'long', 'zoom')
};


export const getOfsted = {
  params: Joi.object().keys({
    ofstedId: Joi.string().required(),
  }),
};