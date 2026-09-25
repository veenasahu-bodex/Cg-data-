import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import tourismData from "../data/tourismData";
import "./Tourism.css";

function Tourism() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filteredPlaces = useMemo(() => {
    const value = search.toLowerCase().trim();

    return tourismData.filter(
      (place) =>
        place.name.toLowerCase().includes(value) ||
        place.location.toLowerCase().includes(value)
    );
  }, [search]);

  const openGooglePhotos = (placeName) => {
    const url = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(
      placeName + " Chhattisgarh"
    )}`;

    window.open(url, "_blank");
  };

  const openDirections = (placeName) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      placeName + ", Chhattisgarh, India"
    )}`;

    window.open(url, "_blank");
  };

  return (
    <div className="tourism-page">

      <button
        type="button"
        className="tourism-back-button"
        onClick={() => navigate(-1)}
      >
        <span>←</span>
        <span>Back</span>
      </button>

      {/* HERO */}
      <section className="tourism-hero">
        <div className="tourism-hero-overlay"></div>

        <div className="tourism-hero-content">
          <span className="tourism-kicker">
            CHHATTISGARH
          </span>

          <h1>Tourist Places</h1>

          <p>
            Explore the beautiful waterfalls, temples,
            forests, wildlife and cultural destinations
            of Chhattisgarh.
          </p>
        </div>

        <div className="tourism-hero-icon">
          🏞️
        </div>
      </section>

      {/* INTRO */}
      <section className="tourism-intro">

        <div>
          <span className="tourism-section-label">
            EXPLORE CHHATTISGARH
          </span>

          <h2>Popular Tourist Destinations</h2>

          <p>
            Discover some of the most popular natural,
            historical, religious and cultural places
            across Chhattisgarh.
          </p>
        </div>

        <div className="tourism-count-box">
          <strong>{tourismData.length}</strong>
          <span>Places</span>
        </div>

      </section>

      {/* SEARCH */}
      <section className="tourism-controls">

        <div className="tourism-search">
          <span>🔍</span>

          <input
            type="text"
            placeholder="Search tourist place..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

      </section>

      {/* CARDS */}
      <section className="tourism-grid">

        {filteredPlaces.map((place) => (
          <article
            className="tourism-card"
            key={place.id}
          >

            <div className="tourism-image-wrapper">

              <img
                src={place.image}
                alt={place.name}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.parentElement.classList.add(
                    "image-error"
                  );
                }}
              />

              <span className="tourism-image-label">
                📍 {place.location}
              </span>

            </div>

            <div className="tourism-card-content">

              <h3>{place.name}</h3>

              <p>{place.description}</p>

              <div className="tourism-buttons">

                <button
                  type="button"
                  className="tourism-photo-btn"
                  onClick={() =>
                    openGooglePhotos(place.name)
                  }
                >
                  📷 Google Photos
                </button>

                <button
                  type="button"
                  className="tourism-direction-btn"
                  onClick={() =>
                    openDirections(place.name)
                  }
                >
                  🧭 Directions
                </button>

              </div>

            </div>

          </article>
        ))}

      </section>

      {filteredPlaces.length === 0 && (
        <div className="tourism-empty">
          <div>🏞️</div>

          <h3>Place not found</h3>

          <p>
            Try searching with another tourist place.
          </p>

          <button
            type="button"
            onClick={() => setSearch("")}
          >
            Show All Places
          </button>
        </div>
      )}

    </div>
  );
}

export default Tourism;