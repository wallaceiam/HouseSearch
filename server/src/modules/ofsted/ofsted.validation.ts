import Joi from "joi";

export const getSummaries = {
};


export const getOfsted = {
  params: Joi.object().keys({
    ofstedId: Joi.string().required(),
  }),
};