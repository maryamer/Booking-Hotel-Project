import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useHotels } from "../context1/HotelsProvider";
import Loader from "../Loader/Loader";
import Data from "../../../data/Data";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentHotel, localStorageHandler } from "../context/hotelsSlice";
import { Photo } from "../LocationList/LocationList";

function SingleHotel() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
  };

  const { isLoading, currentHotel, currentBookmark, hotels } = useSelector(
    (state) => state.hotels
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCurrentHotel(id));
    dispatch(localStorageHandler("currentHotel"));
  }, []);

  if (isLoading || !currentHotel) return <Loader />;
  return (
    <div className="room">
      {currentHotel && (
        <div className="roomDetail">
          <h2>{currentHotel.name}</h2>
          <div>
            {currentHotel.number_of_reviews} reviews & &bull;{" "}
            {currentHotel.smart_location}
          </div>

          <Photo url={currentHotel.picture_url.url} alt={currentHotel.name} />
        </div>
      )}
    </div>
  );
}

export default SingleHotel;
