import { useSearchParams, Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Loader from "../Loader/Loader";

function Hotels() {
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("options"))?.room;
  console.log(destination, room);
  const { data, isLoading } = useFetch(
    "http://localhost:5000/hotels",
    `q=${destination || ""}&accommodates_gte=${room || 1}`
  );
  console.log(data);
  if (isLoading) <Loader />;
  return (
    <div className="searchList">
      <h2> Search Results {data.length}</h2>

      {data &&
        data.map((item) => (
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
