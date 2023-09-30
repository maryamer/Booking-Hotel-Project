import axios from "axios";
import { useEffect } from "react";
import { useContext, createContext, useState } from "react";
import { toast } from "react-hot-toast";
import useFetch from "../../hooks/useFetch";

const BookmarkContext = createContext();
const BASE_URL = "http://localhost:5000";
function BookmarkListProvider({ children }) {
  const [bookmarks, setBookmarks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCurrentBookmark, setIsLoadingCurrentBookmark] =
    useState(false);
  const [currentBookmark, setCurrentBookmark] = useState();
  // const { data: bookmarks, isLoading } = useFetch(`${BASE_URL}/bookmarks`);

  useEffect(() => {
    async function fethBookmarkList() {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`${BASE_URL}/bookmarks`);
        setBookmarks(data);
        setIsLoading(false);
      } catch (error) {
        toast.error(error.message);
        setIsLoading(false);
      }
    }
    fethBookmarkList();
  }, []);
  async function getBookmark(id) {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
      setCurrentBookmark(data);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  }
  async function createBookmark(newBookmark) {
    setIsLoading(true);
    try {
      const { data } = await axios.post(`${BASE_URL}/bookmarks/`, newBookmark);
      setCurrentBookmark(data);
      setBookmarks((prev) => [...prev, newBookmark]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }
  async function deleteBookmark(id) {
    setIsLoading(true);
    try {
      await axios.delete(`${BASE_URL}/bookmarks/${id}`);
      setBookmarks((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        isLoading,
        deleteBookmark,
        getBookmark,
        currentBookmark,
        createBookmark,
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
