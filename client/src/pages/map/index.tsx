import React from "react";
import EducationProvider from "./components/EducationProvider";
import MapProvider from "./components/MapProvider";
import Sidebar from "./components/Sidebar";
import Map from "./Map";

const MapFeature = () => {
  return (
    <EducationProvider>
      <MapProvider>
        <Sidebar />
        <Map />
      </MapProvider>
    </EducationProvider>
  );
};

export default MapFeature;
