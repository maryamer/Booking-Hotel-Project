import { Link } from "react-router-dom";
import { useHotels } from "../context/HotelsProvider";
import Loader from "../Loader/Loader";

function Hotels() {
  const { isLoading, hotels } = useHotels();
  if (isLoading) <Loader />;
  return (
    <div className="searchList">
      <h2> Search Results {hotels.length}</h2>

      {hotels &&
        hotels.map((item) => (
          <Link
            key={item.id}
            to={`/hotels/${item.id}?lat=${item.latitude}&lang=${item.longitude}`}
          >
            <div className="searchItem">
              <img src={item.picture_url.url} alt={item.name} srcset="" />
              <div className="searchItemDesc">
                <p className="location">{item.smart_location}</p>
                <p className="name">{item.name}</p>
                €&nbsp;{item.price}&nbsp;
                <span>night</span>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
}

export default Hotels;
