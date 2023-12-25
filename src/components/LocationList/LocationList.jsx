import useFetch from "../../hooks/useFetch";
import Data from "../../../data/Data";
import { Link } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { localStorageHandler } from "../context/hotelsSlice";
import Loader from "../Loader/Loader";
function LocationList() {
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
  };
  // const { data, isLoading } = useFetch("http://localhost:5000/hotels", "");

  // const { hotels: allHotels } = Data();
  // const [hotels, setHotels] = useLocalStorage("hotels", allHotels);
  const { query, characterLoading, hotels } = useSelector(
    (state) => state.hotels
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(localStorageHandler("hotels"));
  }, []);

  if (!hotels) <p>Loading...</p>;
  return (
    <div className="nearbyLocation">
      <h2> Near by location</h2>
      <div className="locationList">
        {hotels &&
          hotels.map((item) => {
            return (
              <Link
                to={`/hotels/${item.id}`}
                className="locationItem"
                key={item.id}
              >
                <Photo url={item.picture_url.url} alt={item.name} />
                <div className="locationItemDesc">
                  <p className="location">{item.smart_location}</p>
                  <p className="name">{item.name}</p>
                  <p className="price">
                    €&nbsp;{item.price}&nbsp;
                    <span>night</span>
                  </p>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
}

export default LocationList;

export function Photo({ url, alt }) {
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <>
      <div
        className="w-1/3 h-1/3 bg-gray-200"
        style={{
          display: loading ? "flex" : "none",
          width: "100%",
          height: "330px",
          alignItems: "center",
        }}
      >
        <Loader />
      </div>
      <img
        src={url}
        alt={alt}
        onLoad={handleImageLoad}
        style={{ display: loading ? "none" : "block" }}
      />
    </>
  );
}
