import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import ReactCountryFlag from "react-country-flag";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useUrlLocation from "../../hooks/useUrlLocation";
import { useBookmark } from "../context/BookmarkListContext";
import Loader from "../Loader/Loader";

const BASE_GEOCODING_URL =
  "https://api.bigdatacloud.net/data/reverse-geocode-client";
function AddNewBookmark() {
  const navigate = useNavigate();
  const [lat, lng] = useUrlLocation();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
  const { createBookmark } = useBookmark();

  useEffect(() => {
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
    if ((!cityName, !country)) return;
    const newBookmark = {
      cityName,
      country,
      countryCode,
      latitude: lat,
      longitude: lng,
      host_location: cityName + "" + country,
    };
    await createBookmark(newBookmark);
    navigate(`/bookmark`);
  };
  if (isLoadingGeoCoding) return <Loader />;
  return (
    <div>
      <h2>Add New Location to Bookmark List</h2>
      <form action="" className="form" onSubmit={handleSubmit}>
        <div className="formControl">
          <label htmlFor="cityName">City Name: </label>
          <input
            type="text"
            name="cityName"
            id="cityName"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
          />
        </div>
        <div className="formControl">
          <label htmlFor="country">Country Name: </label>
          <input
            type="text"
            name="country"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <span className="flag">
            <ReactCountryFlag svg countryCode={countryCode} />
          </span>
        </div>
        <button className="buttons">
          <button
            onClick={(e) => {
              e.preventDefault(), navigate(-1);
            }}
            className="btn btn--back"
          >
            &larr; Back
          </button>
          <button className="btn btn--primary"> Add </button>
        </button>
      </form>
    </div>
  );
}

export default AddNewBookmark;
