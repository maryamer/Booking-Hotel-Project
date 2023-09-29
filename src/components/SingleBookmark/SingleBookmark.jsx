import { useEffect } from "react";
import ReactCountryFlag from "react-country-flag";
import { useNavigate, useParams } from "react-router-dom";
import { useBookmark } from "../context/BookmarkListContext";
import Loader from "../Loader/Loader";

function SingleBookmark() {
  const { id } = useParams();
  const navigate = useNavigate();

  //   const { getHotel, isLoadingCurrentHotel, currentHotel } = useHotels();
  const { getBookmark, currentBookmark, isLoadingCurrentBookmark } =
    useBookmark();

  useEffect(() => {
    getBookmark(id);
  }, [id]);
  if (isLoadingCurrentBookmark || !currentBookmark) return <Loader />;

  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div className="room">
      <div className="roomDetail">
        <button onClick={handleBack} className="btn btn--back">
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
