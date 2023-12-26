import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AddNewBookmark from "./components/AddNewBookmark/AddNewBookmark";
import AppLayout from "./components/AppLayout/AppLayout";
import Bookmark from "./components/Bookmark/Bookmark";
import BookmarkLayout from "./components/BookmarkLayout/BookmarkLayout";
import AuthProvider from "./components/context1/AuthProvider";
import BookmarkListProvider from "./components/context1/BookmarkListContext";
import HotelsProvider from "./components/context1/HotelsProvider";
import Header from "./components/Header/Header";
import Hotels from "./components/Hotels/Hotels";
import LocationList from "./components/LocationList/LocationList";
import Login from "./components/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import SingleBookmark from "./components/SingleBookmark/SingleBookmark";
import SingleHotel from "./components/SingleHotel/SingleHotel";
import { useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import { useDispatch, useSelector } from "react-redux";
import { handleLogout } from "./components/context/hotelsSlice";

function App() {
  const { hotels, isAuthenticated } = useSelector((state) => state.hotels);
  const [isAuthenticated1, setIsAuthenticated] = useState();
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(handleLogout());
  };
  const login = () => {
    dispatch(handleLogin());
  };
  return (
    <>
      {/* <AuthProvider>
      <BookmarkListProvider>
         <HotelsProvider> */}
      <Toaster />
      <Header
        setIsAuthenticated={setIsAuthenticated}
        isAuthenticated={isAuthenticated}
        logout={logout}
      />
      <Routes>
        <Route path="/" element={<LocationList />} />
        <Route path="/hotels" element={<AppLayout />}>
          <Route index element={<Hotels />} />
          <Route path=":id" element={<SingleHotel />} />
        </Route>

        <Route
          path="/bookmark"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <BookmarkLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Bookmark />} />
          <Route path=":id" element={<SingleBookmark />} />
          <Route path="add" element={<AddNewBookmark />} />
        </Route>
        <Route
          path="/login"
          element={
            <Login
              setIsAuthenticated={setIsAuthenticated}
              isAuthenticated={isAuthenticated}
            />
          }
        />
      </Routes>
      {/* <LocationList /> */}
      {/* </HotelsProvider>
      </BookmarkListProvider>
    </AuthProvider> */}
    </>
  );
}

export default App;
