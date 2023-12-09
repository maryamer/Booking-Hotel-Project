import React from "react";
import { Outlet } from "react-router-dom";
import { useHotels } from "../context/HotelsProvider";
import Map from "../Map/Map";
import Data from "../../../data/Data";

function AppLayout() {
  // const { hotels } = useHotels();
  const { hotels } = Data();
  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>

      <Map markerLocations={hotels} />
    </div>
  );
}

export default AppLayout;
