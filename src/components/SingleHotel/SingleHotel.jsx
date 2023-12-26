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
  console.log(currentHotel);
  if (isLoading || !currentHotel) return <Loader />;
  return (
    <div className="room flex justify-center items-center gap-4 max-w-screen-xl mx-auto md:mt-2">
      {currentHotel && (
        <div className="roomDetail flex flex-col justify-center items-center ">
          <Photo url={currentHotel.picture_url.url} alt={currentHotel.name} />
          <div className="pr-[7px] w-[70%] md:w-full p-1 flex flex-col items-start justify-start text-left">
            <h2 className="mb-1 text-base text-blue-500">
              {currentHotel.country}, {currentHotel.city}
            </h2>
            <h2 className="mb-1 text-base text-slate-700">
              {currentHotel.name}
            </h2>
            <div className="mb-4 text-green-700">
              {currentHotel.number_of_reviews} reviews
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SingleHotel;
