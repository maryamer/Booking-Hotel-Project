import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AppLayout from "./components/AppLayout/AppLayout";
import HotelsProvider from "./components/context/HotelsProvider";
import Header from "./components/Header/Header";
import Hotels from "./components/Hotels/Hotels";
import LocationList from "./components/LocationList/LocationList";

function App() {
  return (
    <HotelsProvider>
      <Toaster />
      <Header />
      <Routes>
        <Route path="/" element={<LocationList />} />
        <Route path="/hotels" element={<AppLayout />}>
          <Route index element={<Hotels />} />
          <Route path=":id" element={<div>single hotel</div>} />
        </Route>
      </Routes>
      {/* <LocationList /> */}
    </HotelsProvider>
  );
}

export default App;
