import React from "react";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import ErrorPage from "./error";
import InfoFeature, { infoLoader } from "./info";
import MapFeature from "./map";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MapFeature />,
    errorElement: <ErrorPage />,
  },
  {
    // stocks/ca/consumer-durables/tsx-goos/canada-goose-holdings-shares
    // schools/bromly/nursery/abc123/the-little-bees-nursery
    path: "/schools/:la/:mg/:slug/:name",
    element: <InfoFeature />,
    loader: infoLoader,
    errorElement: <ErrorPage />,
  },
  {
    // stocks/ca/consumer-durables/tsx-goos/canada-goose-holdings-shares
    // schools/bromly/nursery/abc123/the-little-bees-nursery
    path: "/schools/:la/:slug",
    element: <InfoFeature />,
    loader: infoLoader,
    errorElement: <ErrorPage />,
  },
]);

const Pages = () => {
  return <RouterProvider router={router} />;
};

export default Pages;
