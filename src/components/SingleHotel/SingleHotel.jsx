import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useHotels } from "../context/HotelsProvider";
import Loader from "../Loader/Loader";
import Data from "../../../data/Data";

function SingleHotel() {
  const { id } = useParams();
  const {
    getHotel,
    isLoadingCurrentHotel,
    currentHotel: notUsing,
  } = useHotels();
  const { currentHotel } = Data();
  //   const { data, isLoading } = useFetch(`http://localhost:5000/hotels/${id}`);
  useEffect(() => {
    getHotel(id);
  }, [id]);
  if (isLoadingCurrentHotel || !currentHotel) return <Loader />;
  return (
    <div className="room">
      <div className="roomDetail">
        <h2>{currentHotel.name}</h2>
        <div>
          {currentHotel.number_of_reviews} reviews & &bull;{" "}
          {currentHotel.smart_location}
        </div>
        <img src={currentHotel.xl_picture_url} alt={currentHotel.name} />
      </div>
    </div>
  );
}

export default SingleHotel;
