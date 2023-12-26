import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  useMapEvent,
} from "react-leaflet";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useGeoLocation from "../../hooks/useGeoLocation";
import useUrlLocation from "../../hooks/useUrlLocation";
function Map({ markerLocations }) {
  const {
    isLoading: isLoadingPosition,
    error,
    position: geoLocationPosition,
    getPosition,
  } = useGeoLocation();
  const [mapCenter, setMapCenter] = useState([20, 4]);
  const [lat, lng] = useUrlLocation();

  useEffect(() => {
    if (lat && lng) setMapCenter([lat, lng]);
  }, [lat, lng]);
  useEffect(() => {
    if (geoLocationPosition?.lat && geoLocationPosition?.lng) {
      setMapCenter([geoLocationPosition.lat, geoLocationPosition.lng]);
    }
  }, [geoLocationPosition]);
  return (
    <div className="mapContainer flex-1 bg-[color:var(--text-100)] relative z-40">
      <MapContainer
        className="map h-full"
        center={mapCenter}
        zoom={8}
        scrollWheelZoom={true}
      >
        <button
          className="getLocation text-xs shadow-[0_0_10px_var(--primary-500)] px-2 py-[0.3rem] left-4 bottom-4 z-30 font-bold rounded-lg absolute text-white"
          onClick={getPosition}
        >
          {isLoadingPosition ? "loading your position" : "Use your location"}
        </button>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <DetectClick />
        <ChangeCenter position={mapCenter} />
        {markerLocations &&
          markerLocations.map((item) => (
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
function DetectClick() {
  const { pathname } = useLocation();

  const navigate = useNavigate();
  useMapEvent({
    click: (e) => {
      pathname.includes("add")
        ? navigate(`/bookmark/add?lat=${e.latlng.lat}&lng=${e.latlng.lng}`, {
            replace: true,
          })
        : navigate(`/bookmark/add?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
  return null;
}
