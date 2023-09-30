import React from "react";
import { useEffect } from "react";
import ReactCountryFlag from "react-country-flag";
import { Link } from "react-router-dom";
import { useBookmark } from "../context/BookmarkListContext";
import Loader from "../Loader/Loader";
import { HiTrash } from "react-icons/hi";

function Bookmark() {
  const { isLoading, bookmarks, currentBookmark, deleteBookmark } =
    useBookmark();

  const handleDelete = async (e, id) => {
    e.preventDefault();
    await deleteBookmark(id);
  };

  if (isLoading) return <Loader />;
  if (!bookmarks.length) return <p> there is no bookmarked location</p>;
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
              <div
                className={`bookmarkItem ${
                  item.id === currentBookmark?.id && "current-bookmark"
                }`}
              >
                <div>
                  <ReactCountryFlag svg countryCode={item.countryCode} />
                  &nbsp;<strong>{item.cityName}</strong>&nbsp;
                  <strong>{item.country}</strong>
                </div>
                <button onClick={(e) => handleDelete(e, item.id)}>
                  <HiTrash className="trash" />
                </button>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default Bookmark;
