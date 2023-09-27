import { useContext } from "react";
import { createContext } from "react";

const HotelContext = createContext();
function HotelsProvider({ children }) {
  return <HotelContext.Provider>{children}</HotelContext.Provider>;
}

export default HotelsProvider;

export function useHotels() {
  return useContext(HotelContext);
}
