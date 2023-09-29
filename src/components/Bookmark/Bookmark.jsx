import React from "react";
import ReactCountryFlag from "react-country-flag";
import { Link } from "react-router-dom";
import { useBookmark } from "../context/BookmarkListContext";
import Loader from "../Loader/Loader";

function Bookmark() {
  const { isLoading, bookmarks } = useBookmark();
  if (isLoading) return <Loader />;
  return (
    <div>
      <h2>BookmarkList</h2>{" "}
      <div className="bookmarkList">
        {bookmarks &&
          bookmarks.map((item) => (
            <Link
              key={item.id}
              to={`${item.id}?lat=${item.latitude}?lng=${item.longitude}`}
            >
              <div className="bookmarkItem">
                <ReactCountryFlag svg countryCode={item.countryCode} />
                &nbsp;<strong>{item.cityName}</strong>&nbsp;
                <strong>{item.country}</strong>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default Bookmark;
