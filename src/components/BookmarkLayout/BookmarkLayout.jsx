import React from "react";
import { Outlet } from "react-router-dom";
import { useBookmark } from "../context1/BookmarkListContext";
import Map from "../Map/Map";
import Data from "../../../data/Data";
import Loader from "../Loader/Loader";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useSelector } from "react-redux";

function BookmarkLayout() {
  // const { bookmarks } = useBookmark();

  // const { bookmarks: allBookmarks } = Data();
  // const [bookmarks, setBookmarks] = useLocalStorage("bookmarks", allBookmarks);

  const { query, loading, characterLoading, bookmarks } = useSelector(
    (state) => state.hotels
  );

  return (
    <div className="appLayout  flex flex-col md:flex-row justify-between  h-[calc(100vh_-_130px)] bg-[color:var(--text-100)] items-stretch mt-4">
      {bookmarks ? (
        <>
          <div className="sidebar w-full h-1/3 md:h-full p-1 overflow-y-scroll pr-4 md:w-6/12">
            <Outlet />
          </div>
          <Map markerLocations={bookmarks} />
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default BookmarkLayout;
