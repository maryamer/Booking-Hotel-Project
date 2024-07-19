import useFetch from "../../hooks/useFetch";
import Data from "../../../data/Data";
import { Link, useLocation } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { localStorageHandler } from "../context/hotelsSlice";
import Loader from "../Loader/Loader";
import useUrlLocation from "../../hooks/useUrlLocation";
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
    <div className="nearbyLocation max-w-[1280px] mx-auto mt-8 ">
      <h2 className="mb-4"> Near by location</h2>
      <div className="locationList grid gap-8 ">
        {hotels &&
          hotels.map((item) => {
            return (
              <Link
                to={`/hotels/${item.id}?lat=${item.latitude}&&lng=${item.longitude}`}
                className="locationItem"
                key={item.id}
              >
                <Photo url={item.thumbnail_url} alt={item.name} />
                <div className="locationItemDesc">
                  <p className="location font-medium">{item.smart_location}</p>
                  <p className="name">{item.name}</p>
                  <p className="price font-medium flex items-center">
                    €&nbsp;{item.price}&nbsp;
                    <span
                      className="
                    font-normal"
                    >
                      night
                    </span>
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
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <>
      <div
        className="w-full h-full rounded-lg md:h-[300px] bg-gray-200"
        style={{
          display: loading ? "flex" : "none",

          alignItems: "center",
        }}
      >
        <Loader />
      </div>
      <img
        src={url}
        className={`${
          pathname.includes("hotels") ? "w-[70%]" : "w-full"
        }  md:w-full  h-64 object-cover object-center rounded-lg mb-2`}
        alt={alt}
        onLoad={handleImageLoad}
        style={{ display: loading ? "none" : "block" }}
      />
    </>
  );
}
