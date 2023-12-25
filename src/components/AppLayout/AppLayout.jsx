import React from "react";
import { Outlet } from "react-router-dom";
import { useHotels } from "../context1/HotelsProvider";
import Map from "../Map/Map";
import Data from "../../../data/Data";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useSelector } from "react-redux";

function AppLayout() {
  // const { hotels } = useHotels();

  // const { hotels: allHotels } = Data();
  // const [hotels, setHotels] = useLocalStorage("hotels", allHotels);
  const { query, loading, characterLoading, hotels } = useSelector(
    (state) => state.hotels
  );

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
