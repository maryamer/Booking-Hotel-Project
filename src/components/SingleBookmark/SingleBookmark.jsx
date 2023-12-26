import { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { useNavigate, useParams } from "react-router-dom";
// import { useBookmark } from "../context/BookmarkListContext";
import Loader from "../Loader/Loader";
import Data from "../../../data/Data";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentBookmark,
  localStorageHandler,
} from "../context/hotelsSlice";

function SingleBookmark() {
  const { id } = useParams();
  const navigate = useNavigate();

  //   const { getHotel, isLoadingCurrentHotel, currentHotel } = useHotels();
  // const { getBookmark, currentBookmark, isLoading } = useBookmark();

  // const { bookmarks: allBookmarks } = Data();
  // const [bookmarks, setBookmarks] = useLocalStorage("bookmarks", allBookmarks);

  const { query, loading, currentBookmark, bookmarks } = useSelector(
    (state) => state.hotels
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentBookmark(id));
    dispatch(localStorageHandler("currentBookmark"));
  }, []);
  // useEffect(() => {
  // getBookmark(id);
  // }, [id]);
  if (!currentBookmark) return <Loader />;

  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div className="room">
      <div className="roomDetail">
        <button
          onClick={handleBack}
          className="btn px-4 py-2 rounded-lg btn--back border border-[color:var(--text-400)] border-solid"
        >
          ...Back to bookmarks
        </button>
        <h2>{currentBookmark.cityName}</h2>
        <div className="bookmarkItem">
          <ReactCountryFlag svg countryCode={currentBookmark.countryCode} />
          &nbsp;<strong>{currentBookmark.cityName}</strong>&nbsp;
          <strong>{currentBookmark.country}</strong>
        </div>
        {/* <img src={currentBookmark.xl_picture_url} alt={currentBookmark.cityName} /> */}
      </div>
    </div>
  );
}

export default SingleBookmark;
