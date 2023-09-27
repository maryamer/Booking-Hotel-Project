import { useHotels } from "../context/HotelsProvider";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useGeoLocation from "../../hooks/useGeoLocation";
function Map() {
  const {
    isLoading: isLoadingPosition,
    error,
    position: geoLocationPosition,
    getPosition,
  } = useGeoLocation();
  const [mapCenter, setMapCenter] = useState([20, 4]);
  const { hotels, isLoading } = useHotels();
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lang");

  useEffect(() => {
    if (lat && lng) setMapCenter([lat, lng]);
  }, [lat, lng]);
  useEffect(() => {
    if (geoLocationPosition?.late && geoLocationPosition?.lng) {
      setMapCenter([geoLocationPosition.lat, geoLocationPosition.lng]);
    }
  }, [geoLocationPosition]);
  return (
    <div className="mapContainer">
      <MapContainer
        className="map"
        center={mapCenter}
        zoom={10}
        scrollWheelZoom={true}
      >
        <button className="getLocation" onClick={getPosition}>
          Use Your Location
        </button>
        {isLoadingPosition ? "loading your position" : "Use your location"}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <ChangeCenter position={mapCenter} />
        {hotels &&
          hotels.map((item) => (
            <Marker
              key={item.id}
              item={item.id}
              position={[item.latitude, item.longitude]}
            >
              <Popup>{item.host_location}</Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
}

export default Map;

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}
