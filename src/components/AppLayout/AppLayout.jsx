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
    <div className="appLayout flex flex-col md:flex-row justify-between h-[calc(100vh_-_130px)] bg-[color:var(--text-100)] items-stretch mt-4">
      <div className="sidebar w-full flex flex-col justify-center h-1/2  p-1 overflow-y-scroll pr-4 md:w-6/12">
        <Outlet />
      </div>

      <Map markerLocations={hotels} />
    </div>
  );
}

export default AppLayout;
