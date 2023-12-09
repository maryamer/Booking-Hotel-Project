import useFetch from "../../hooks/useFetch";
import Data from "../../../data/Data";
import { Link } from "react-router-dom";
function LocationList() {
  // const { data, isLoading } = useFetch("http://localhost:5000/hotels", "");
  const { hotels: data } = Data();
  if (!data) <p>Loading...</p>;
  return (
    <div className="nearbyLocation">
      <h2> Near by location</h2>
      <div className="locationList">
        {data &&
          data.map((item) => {
            return (
              <Link
                to={`/hotels/${item.id}`}
                className="locationItem"
                key={item.id}
              >
                <img src={item.picture_url.url} alt={item.name} />
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
