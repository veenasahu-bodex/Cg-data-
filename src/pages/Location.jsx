import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Location.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const locations = [
  { name: "Balod", district: "Balod", lat: 20.7308, lng: 81.205 },
  { name: "Baloda Bazar", district: "Baloda Bazar", lat: 21.6565, lng: 82.1607 },
  { name: "Balrampur", district: "Balrampur-Ramanujganj", lat: 23.1355, lng: 83.5635 },
  { name: "Bastar", district: "Bastar", lat: 19.1071, lng: 81.9535 },
  { name: "Bemetara", district: "Bemetara", lat: 21.7156, lng: 81.5345 },
  { name: "Bijapur", district: "Bijapur", lat: 18.8432, lng: 80.7755 },
  { name: "Bilaspur", district: "Bilaspur", lat: 22.0797, lng: 82.1409 },
  { name: "Dantewada", district: "Dantewada", lat: 18.9, lng: 81.35 },
  { name: "Dhamtari", district: "Dhamtari", lat: 20.7072, lng: 81.5497 },
  { name: "Durg", district: "Durg", lat: 21.1904, lng: 81.2849 },
  { name: "Gariaband", district: "Gariaband", lat: 20.6333, lng: 82.0667 },
  { name: "Gaurela-Pendra-Marwahi", district: "Gaurela-Pendra-Marwahi", lat: 22.754, lng: 81.901 },
  { name: "Janjgir-Champa", district: "Janjgir-Champa", lat: 22.0094, lng: 82.577 },
  { name: "Jashpur", district: "Jashpur", lat: 22.9, lng: 84.15 },
  { name: "Kabirdham", district: "Kabirdham", lat: 22.0918, lng: 81.1671 },
  { name: "Kanker", district: "Kanker", lat: 20.2719, lng: 81.4918 },
  { name: "Kondagaon", district: "Kondagaon", lat: 19.59, lng: 81.665 },
  { name: "Korba", district: "Korba", lat: 22.3595, lng: 82.7501 },
  { name: "Koriya", district: "Koriya", lat: 23.25, lng: 82.55 },
  { name: "Mahasamund", district: "Mahasamund", lat: 21.1094, lng: 82.0971 },
  { name: "Mungeli", district: "Mungeli", lat: 22.065, lng: 81.685 },
  { name: "Narayanpur", district: "Narayanpur", lat: 19.72, lng: 81.25 },
  { name: "Raigarh", district: "Raigarh", lat: 21.8974, lng: 83.395 },
  { name: "Raipur", district: "Raipur", lat: 21.2514, lng: 81.6296 },
  { name: "Rajnandgaon", district: "Rajnandgaon", lat: 21.0974, lng: 81.0286 },
  { name: "Sukma", district: "Sukma", lat: 18.39, lng: 81.66 },
  { name: "Surajpur", district: "Surajpur", lat: 23.21, lng: 82.85 },
  { name: "Surguja", district: "Surguja", lat: 23.1355, lng: 83.1811 },
  { name: "Sakti", district: "Sakti", lat: 22.026, lng: 82.96 },
  { name: "Sarangarh-Bilaigarh", district: "Sarangarh-Bilaigarh", lat: 21.586, lng: 83.07 },
  { name: "Manendragarh-Chirmiri-Bharatpur", district: "Manendragarh-Chirmiri-Bharatpur", lat: 23.2, lng: 82.2 },
  { name: "Khairagarh-Chhuikhadan-Gandai", district: "Khairagarh-Chhuikhadan-Gandai", lat: 21.42, lng: 80.98 },
  { name: "Mohla-Manpur-Ambagarh Chowki", district: "Mohla-Manpur-Ambagarh Chowki", lat: 20.35, lng: 80.75 },
];

function MapController({ selectedLocation }) {
  const map = useMap();

  if (selectedLocation) {
    map.flyTo(
      [selectedLocation.lat, selectedLocation.lng],
      11,
      { duration: 1.2 }
    );
  }

  return null;
}

function Location() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);

  const filteredLocations = locations.filter((location) => {
    const value = search.toLowerCase().trim();
    return (
      location.name.toLowerCase().includes(value) ||
      location.district.toLowerCase().includes(value)
    );
  });

  const handleDirections = (location) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleGoogleMaps = (location) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const selectLocation = (location) => {
    setSelectedLocation(location);
  };

  return (
    <div className="location-page">
      <div className="location-page-header">
      <button
  type="button"
  className="back-button"
  onClick={() => navigate(-1)}
>
  ← Back
</button>
        <div className="location-header-content">
          <span className="location-kicker">CHHATTISGARH</span>
          <h1>Explore Locations</h1>
          <p>Explore all 33 districts of Chhattisgarh on the interactive map.</p>
        </div>
        <div className="location-count">
          <strong>{locations.length}</strong>
          <span>Districts</span>
        </div>
      </div>

      <div className="location-search">
        <span>🔍</span>
        <input
          type="text"
          placeholder="Search district..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="location-layout">
        <div className="location-list">
          <div className="location-list-header">
            <h2>All Districts</h2>
            <span>{filteredLocations.length}</span>
          </div>

          <div className="location-list-items">
            {filteredLocations.map((location) => (
              <button
                type="button"
                key={location.name}
                className={`location-list-card ${
                  selectedLocation?.name === location.name ? "active" : ""
                }`}
                onClick={() => selectLocation(location)}
              >
                <div className="location-list-icon">📍</div>
                <div className="location-list-info">
                  <strong>{location.name}</strong>
                  <span>{location.district}</span>
                </div>
                <b>→</b>
              </button>
            ))}

            {filteredLocations.length === 0 && (
              <div className="no-location">
                <span>📍</span>
                <h3>Location not found</h3>
                <p>Try another district name.</p>
              </div>
            )}
          </div>
        </div>

        <div className="location-map">
          <MapContainer
            center={[21.2787, 81.8661]}
            zoom={7}
            scrollWheelZoom={true}
            className="map-container"
          >
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MapController selectedLocation={selectedLocation} />

            {locations.map((location) => (
              <Marker
                key={location.name}
                position={[location.lat, location.lng]}
                eventHandlers={{
                  click: () => selectLocation(location),
                }}
              >
                <Popup>
                  <div className="map-popup">
                    <div className="map-popup-icon">📍</div>
                    <strong className="map-popup-title">
                      {location.name}
                    </strong>
                    <span className="map-popup-district">
                      {location.district}
                    </span>

                    <div className="map-popup-actions">
                      <button
                        type="button"
                        className="map-action direction-action"
                        onClick={() => handleDirections(location)}
                      >
                        🧭 <span>Directions</span>
                      </button>

                      <button
                        type="button"
                        className="map-action google-action"
                        onClick={() => handleGoogleMaps(location)}
                      >
                        🗺️ <span>Google Maps</span>
                      </button>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          <div className="map-label">
            <span>📍</span>
            <div>
              <strong>Chhattisgarh</strong>
              <small>Interactive Location Map</small>
            </div>
          </div>
        </div>
      </div>

      {selectedLocation && (
        <div className="selected-location-card">
          <div className="selected-location-icon">📍</div>

          <div className="selected-location-info">
            <span>SELECTED LOCATION</span>
            <h3>{selectedLocation.name}</h3>
            <p>{selectedLocation.district}</p>
          </div>

          <div className="selected-location-actions">
            <button
              type="button"
              onClick={() => handleDirections(selectedLocation)}
            >
              🧭 Directions
            </button>

            <button
              type="button"
              onClick={() => handleGoogleMaps(selectedLocation)}
            >
              🗺️ Open Google Maps
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Location;