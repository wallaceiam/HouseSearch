import React from "react";
import { LoaderFunctionArgs } from "react-router-dom";

export const infoLoader = ({ params }: LoaderFunctionArgs) => {
  fetch(`/v1/ofsted/${params.slug}.json`);
};

const InfoFeature = () => {
  return <div>Hello world</div>;
};

export default InfoFeature;
