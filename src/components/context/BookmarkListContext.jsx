import axios from "axios";
import { useContext, createContext, useState } from "react";
import { toast } from "react-hot-toast";
import useFetch from "../../hooks/useFetch";

const BookmarkContext = createContext();
const BASE_URL = "http://localhost:5000";
function BookmarkListProvider({ children }) {
  const [isLoadingCurrentBoookmark, setIsLoadingCurrentBookmark] =
    useState(false);
  const [currentBookmark, setCurrentBookmark] = useState();

  const { data: bookmarks, isLoading } = useFetch(`${BASE_URL}/bookmarks`);
  async function getBookmark(id) {
    setIsLoadingCurrentBookmark(true);
    try {
      const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
      setCurrentHotel(data);
      setIsLoadingCurrentBookmark(false);
    } catch (error) {
      toast.error(error.message);
      setIsLoadingCurrentBookmark(false);
    }
  }
  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        isLoading,
        isLoadingCurrentBoookmark,
        getBookmark,
        currentBookmark,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export default BookmarkListProvider;

export function useBookmark() {
  return useContext(BookmarkContext);
}
