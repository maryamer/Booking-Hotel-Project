import axios from "axios";
import { useEffect } from "react";
import { useReducer } from "react";
import { useContext, createContext, useState } from "react";
import { toast } from "react-hot-toast";
import useFetch from "../../hooks/useFetch";

const initialState = {
  bookmarks: [],
  isLoading: false,
  currentBookmark: null,
  error: null,
};
function bookmarkReducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "bookmarks/loaded":
      return {
        ...state,
        bookmarks: action.payload,
        isLoading: false,
      };
    case "bookmark/loaded":
      return {
        ...state,
        currentBookmark: action.payload,
        isLoading: false,
      };
    case "bookmark/created":
      return {
        ...state,
        currentBookmark: action.payload,
        bookmarks: [...state.bookmarks, action.payload],
        isLoading: false,
      };
    case "bookmark/deleted":
      return {
        ...state,
        bookmarks: state.bookmarks.filter((item) => item.id !== action.payload),
        isLoading: false,
        currentBookmark: null,
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      throw new Error("unknown action");
  }
}
const BookmarkContext = createContext();
const BASE_URL = "http://localhost:5000";
function BookmarkListProvider({ children }) {
  // const [bookmarks, setBookmarks] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentBookmark, setCurrentBookmark] = useState(null);
  const [{ bookmarks, isLoading, currentBookmark }, dispatch] = useReducer(
    bookmarkReducer,
    initialState
  );
  useEffect(() => {
    async function fethBookmarkList() {
      dispatch({ type: "loading" });
      try {
        const { data } = await axios.get(`${BASE_URL}/bookmarks`);
        dispatch({ type: "bookmarks/loaded", payload: data });
        // setBookmarks(data);
        // setIsLoading(false);
      } catch (error) {
        toast.error(error.message);
        dispatch({ type: "rejected", payload: error.message });
      }
    }
    fethBookmarkList();
  }, []);
  async function getBookmark(id) {
    if (currentBookmark?.id == id) return;
    dispatch({ type: "loading" });
    try {
      const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
      dispatch({ type: "bookmark/loaded", payload: data });
      // setCurrentBookmark(data);
      // setIsLoading(false);
    } catch (error) {
      toast.error(error.message);
      dispatch({ type: "rejected", payload: error.message });
    }
  }
  async function createBookmark(newBookmark) {
    // setIsLoading(true);
    dispatch({ type: "loading" });
    try {
      const { data } = await axios.post(`${BASE_URL}/bookmarks/`, newBookmark);
      dispatch({ type: "bookmark/created", payload: data });
      // setCurrentBookmark(data);
      // setBookmarks((prev) => [...prev, newBookmark]);
    } catch (error) {
      toast.error(error.message);
      dispatch({ type: "rejected", payload: error.message });
    } finally {
      // setIsLoading(false);
    }
  }
  async function deleteBookmark(id) {
    // setIsLoading(true);
    dispatch({ type: "loading" });

    try {
      await axios.delete(`${BASE_URL}/bookmarks/${id}`);
      dispatch({ type: "bookmark/deleted", payload: id });
      // setBookmarks((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      toast.error(error.message);
      dispatch({ type: "rejected", payload: error.message });
    } finally {
      // setIsLoading(false);
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
