import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AppLayout from "./components/AppLayout/AppLayout";
import Header from "./components/Header/Header";
import LocationList from "./components/LocationList/LocationList";

function App() {
  return (
    <div>
      <Toaster />
      <Header />
      <Routes>
        <Route path="/" element={<LocationList />} />
        <Route path="/hotels" element={<AppLayout />}>
          <Route index element={<div>hotels list</div>} />
          <Route path=":id" element={<div>single hotel</div>} />
        </Route>
      </Routes>
      {/* <LocationList /> */}
    </div>
  );
}

export default App;
