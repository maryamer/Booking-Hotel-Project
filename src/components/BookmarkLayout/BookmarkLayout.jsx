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
    <div className="appLayout">
      {bookmarks ? (
        <>
          <div className="sidebar">
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
