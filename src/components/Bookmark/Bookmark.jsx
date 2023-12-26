import React from "react";
import { useEffect } from "react";
import ReactCountryFlag from "react-country-flag";
import { Link, useParams } from "react-router-dom";
import { useBookmark } from "../context1/BookmarkListContext";
import Loader from "../Loader/Loader";
import { HiTrash } from "react-icons/hi";
import Data from "../../../data/Data";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useDispatch, useSelector } from "react-redux";
import { deleteBookmark } from "../context/hotelsSlice";

function Bookmark() {
  // const { isLoading, bookmarks, currentBookmark, deleteBookmark } =
  //   useBookmark();

  // const { bookmarks: allBookmarks, currentBookmark } = Data();
  // const [bookmarks, setBookmarks] = useLocalStorage("bookmarks", allBookmarks);
  const { query, loading, currentBookmark, bookmarks } = useSelector(
    (state) => state.hotels
  );

  const dispatch = useDispatch();

  if (!bookmarks) return <Loader />;
  if (!bookmarks.length) return <p> there is no bookmarked location</p>;
  return (
    <div>
      <h2>BookmarkList</h2>{" "}
      <div className="bookmarkList mt-4">
        {bookmarks &&
          bookmarks.map((item) => (
            <Link
              key={item.id}
              to={`${item.id}?lat=${item.latitude}?lng=${item.longitude}`}
            >
              <div
                className={`bookmarkItem border border-[color:var(--text-400)] flex items-center justify-between mb-4 p-4 rounded-2xl border-solid${
                  item.id === currentBookmark?.id &&
                  "current-bookmark border-[color:var(--primary-600)] bg-[color:var(--text-100)] border-2 border-solid"
                }`}
              >
                <div>
                  <ReactCountryFlag svg countryCode={item.countryCode} />
                  &nbsp;<strong>{item.cityName}</strong>&nbsp;
                  <strong>{item.country}</strong>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault(), dispatch(deleteBookmark(item.id));
                  }}
                >
                  <HiTrash className="trash text-[color:var(--rose-500)] w-6 h-6" />
                </button>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default Bookmark;
