import { useContext, createContext } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const HotelContext = createContext();
function HotelsProvider({ children }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const destination = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("options"))?.room;

  const { data: hotels, isLoading } = useFetch(
    "http://localhost:5000/hotels",
    `q=${destination || ""}&accommodates_gte=${room || 1}`
  );
  return (
    <HotelContext.Provider value={{ hotels, isLoading }}>
      {children}
    </HotelContext.Provider>
  );
}

export default HotelsProvider;

export function useHotels() {
  return useContext(HotelContext);
}
