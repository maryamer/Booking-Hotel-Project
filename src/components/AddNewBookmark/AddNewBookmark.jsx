import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { toast } from "react-hot-toast";
import { json, useNavigate } from "react-router-dom";
import useUrlLocation from "../../hooks/useUrlLocation";
import { useBookmark } from "../context1/BookmarkListContext";
import Loader from "../Loader/Loader";
import Data from "../../../data/Data";
import useLocalStorage from "../../hooks/useLocalStorage";
import { useDispatch, useSelector } from "react-redux";
import { addToBookmarks } from "../context/hotelsSlice";

const BASE_GEOCODING_URL =
  "https://api.bigdatacloud.net/data/reverse-geocode-client";
function AddNewBookmark() {
  const navigate = useNavigate();
  const [lat, lng] = useUrlLocation();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
  // const { createBookmark } = useBookmark();
  const dispatch = useDispatch();

  const [newBookmark, setNewBookmark] = useState({
    cityName,
    country,
    countryCode,
    latitude: lat,
    longitude: lng,
    host_location: cityName + "" + country,
  });
  useEffect(() => {
    setNewBookmark({
      cityName,
      country,
      countryCode,
      latitude: lat,
      longitude: lng,
      host_location: cityName + "" + country,
    });
  }, [cityName, country, countryCode, lat, lng]);
  useEffect(() => {
    const newBookmark = {
      cityName,
      country,
      countryCode,
      latitude: lat,
      longitude: lng,
      host_location: cityName + "" + country,
    };
    console.log(newBookmark);
    if (!lat || !lng) return;
    async function fetchLocationData() {
      setIsLoadingGeoCoding(true);
      try {
        const { data } = await axios.get(
          `${BASE_GEOCODING_URL}?latitude=${lat}&longitude=${lng}`
        );
        if (!data.countryCode)
          throw new Error(
            "This location is not valid, please click somewhere else"
          );
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setCountryCode(data.countryCode);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoadingGeoCoding(false);
      }
    }
    fetchLocationData();
  }, [lat, lng]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cityName || !country) return;
    dispatch(addToBookmarks(newBookmark));
    navigate("/bookmark");
  };
  if (isLoadingGeoCoding) return <Loader />;
  return (
    <div>
      <h2>Add New Location to Bookmark List</h2>
      <form
        action=""
        className="form w-full text-[color:var(--rose-500)]  h-full"
        onSubmit={handleSubmit}
      >
        <div className="formControl relative mb-4">
          <label className="block mb-[0.2rem]" htmlFor="cityName">
            City Name:{" "}
          </label>
          <input
            type="text"
            className="border border-[color:var(--text-400)] w-full p-2 rounded-lg border-solid"
            name="cityName"
            id="cityName"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
          />
        </div>
        <div className="formControl relative mb-4">
          <label className="block mb-[0.2rem]" htmlFor="country">
            Country Name:{" "}
          </label>
          <input
            type="text"
            className="border border-[color:var(--text-400)] w-full p-2 rounded-lg border-solid"
            name="country"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <span className="flag absolute right-4 top-2/4">
            <ReactCountryFlag svg countryCode={countryCode} />
          </span>
        </div>
        <div className="buttons flex items-center justify-between">
          <button
            onClick={(e) => {
              e.preventDefault(), navigate(-1);
            }}
            className="btn px-4 py-2 rounded-lg btn--back border border-[color:var(--text-400)] border-solid"
          >
            &larr; Back
          </button>
          <button className="btn px-4 py-2 rounded-lg bg-[color:var(--primary-600)] text-white btn--primary">
            {" "}
            Add{" "}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddNewBookmark;
