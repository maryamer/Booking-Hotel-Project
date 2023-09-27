import { useHotels } from "../context/HotelsProvider";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
function Map() {
  const position = [51.505, -0.09];
  const { hotels, isLoading } = useHotels();
  return (
    <div className="mapContainer">
      <MapContainer
        className="map"
        center={position}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {hotels &&
          hotels.map((item) => (
            <Marker item={item.id} position={[item.latitude, item.longitude]}>
              <Popup>{item.host_location}</Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
}

export default Map;
