import React from "react";
import Provider from "./features/map/components/Provider";
import Sidebar from "./features/map/components/Sidebar";
import Map from "./features/map/Map";

const App = () => {
  return (
    <Provider>
      <Sidebar />
      <Map />
    </Provider>
  );
};

export default App;