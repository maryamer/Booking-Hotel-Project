import React from "react";
import { Outlet } from "react-router-dom";
import { useHotels } from "../context/HotelsProvider";
import Map from "../Map/Map";

function AppLayout() {
  const { hotels } = useHotels();
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
