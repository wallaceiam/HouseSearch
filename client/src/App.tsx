import React from "react";
import Provider from "./components/Provider";
import Sidebar from "./components/Sidebar";
import Map from "./components/Map";

const App = () => {
  return (
    <Provider>
      <Sidebar />
      <Map />
    </Provider>
  );
};

export default App;