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
    <div className="mapContainer">
      <MapContainer
        className="map"
        center={mapCenter}
        zoom={8}
        scrollWheelZoom={true}
      >
        <button className="getLocation" onClick={getPosition}>
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
