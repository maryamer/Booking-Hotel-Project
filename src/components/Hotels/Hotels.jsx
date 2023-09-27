import { useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Loader from "../Loader/Loader";

function Hotels() {
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("options"))?.room;
  console.log(destination, room);
  const { data, isLoading } = useFetch(
    "http://localhost:5000/hotels",
    `q=${destination || ""}||name_like=${destination || ""}&accommodates_gte=${
      room || 1
    }`
  );
  console.log(data);
  if (isLoading) <Loader />;
  return <div>{data.length}</div>;
}

export default Hotels;
