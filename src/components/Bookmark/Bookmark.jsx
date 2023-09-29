import React from "react";
import ReactCountryFlag from "react-country-flag";
import { useBookmark } from "../context/BookmarkListContext";
import Loader from "../Loader/Loader";

function Bookmark() {
  const { isLoading, bookmarks } = useBookmark();
  if (isLoading) return <Loader />;
  return (
    <div>
      <h2>BookmarkList</h2>
      <div className="bookmarkList">
        {bookmarks.map((item) => (
          <div key={item.id} className="bookmarkItem">
            <ReactCountryFlag svg countryCode={item.countryCode} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Bookmark;
