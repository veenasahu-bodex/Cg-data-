import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./DistrictDetails.css";

function DistrictDetails({
  districtName,
  data,
  onBack,
}) {
  const [selectedCity, setSelectedCity] = useState(null);

  const navigate = useNavigate();

  /* =========================
     DISTRICT DATA NOT FOUND
  ========================= */

  if (!data) {
    return (
      <div className="district-details-page">

        <div className="district-not-found">

          <div className="not-found-icon">
            !
          </div>

          <span>
            DISTRICT INFORMATION
          </span>

          <h2>
            District Data Not Found
          </h2>

          <p>
            Information for {districtName} is not available.
          </p>

          <button onClick={onBack}>
            ← Back to Overview
          </button>

        </div>

      </div>
    );
  }


  /* =========================
     CITY DETAILS
  ========================= */

  if (selectedCity) {
    return (
      <div className="district-details-page">

        {/* CITY BACK BUTTON */}

        <button
          type="button"
          className="city-back"
          onClick={() => setSelectedCity(null)}
        >
          ← Back to {districtName}
        </button>


        {/* CITY HERO */}

        <div className="city-hero">

          <div className="city-symbol">
            🏙️
          </div>

          <div className="city-hero-content">

            <span>
              CITY / TOWN
            </span>

            <h2>
              {selectedCity.name}
            </h2>

            <p>
              {districtName} District, Chhattisgarh
            </p>

          </div>

        </div>


        {/* CITY INFORMATION */}

        <div className="city-info-grid">

          {/* CITY NAME */}

          <div className="city-info-card green">

            <span>
              City Name
            </span>

            <strong>
              {selectedCity.name}
            </strong>

          </div>


          {/* POPULATION */}

          <div className="city-info-card yellow">

            <span>
              Population
            </span>

            <strong>
              {selectedCity.population || "N/A"}
            </strong>

          </div>


          {/* TYPE */}

          <div className="city-info-card blue">

            <span>
              Type
            </span>

            <strong>
              {selectedCity.type || "City / Town"}
            </strong>

          </div>

        </div>


        {/* ABOUT CITY */}

        <div className="city-about">

          <div className="district-section-title">

            <span>
              ABOUT THE PLACE
            </span>

            <h3>
              About {selectedCity.name}
            </h3>

          </div>

          <p>
            {selectedCity.name} is located in{" "}
            {districtName} district of Chhattisgarh.
          </p>

        </div>

      </div>
    );
  }


  /* =========================
     DISTRICT OVERVIEW
  ========================= */

  return (
    <div className="district-details-page">


      {/* =========================
          TOP HEADER
      ========================= */}

      <div className="district-top">

        <div className="district-title">

          <div className="district-symbol">
            CG
          </div>

          <div>

            <span>
              DISTRICT OVERVIEW
            </span>

            <h2>
              {districtName}
            </h2>

            <p>
              Chhattisgarh • District Information
            </p>

          </div>

        </div>


        <div className="district-active">

          <i></i>

          Active

        </div>

      </div>



      {/* =========================
          DISTRICT STATS
      ========================= */}

      <div className="district-stats-grid">


        {/* POPULATION */}

        <div className="district-stat green">

          <div className="district-stat-icon">
            👥
          </div>

          <div>

            <span>
              Population
            </span>

            <strong>
              {data.population || "N/A"}
            </strong>

          </div>

        </div>


        {/* AREA */}

        <div className="district-stat yellow">

          <div className="district-stat-icon">
            📐
          </div>

          <div>

            <span>
              Area
            </span>

            <strong>
              {data.area || "N/A"}
            </strong>

          </div>

        </div>


        {/* BLOCKS */}

        <div className="district-stat blue">

          <div className="district-stat-icon">
            ▦
          </div>

          <div>

            <span>
              Blocks
            </span>

            <strong>
              {data.blocks?.length || 0}
            </strong>

          </div>

        </div>


        {/* TEHSILS */}

        <div className="district-stat purple">

          <div className="district-stat-icon">
            ◈
          </div>

          <div>

            <span>
              Tehsils
            </span>

            <strong>
              {data.tehsils?.length || 0}
            </strong>

          </div>

        </div>

      </div>



      {/* =========================
          HEADQUARTERS
      ========================= */}

      <div className="district-headquarter">

        <div className="hq-icon">
          ⌖
        </div>

        <div>

          <span>
            DISTRICT HEADQUARTERS
          </span>

          <h3>
            {data.headquarters || "N/A"}
          </h3>

          <p>
            Administrative headquarters of{" "}
            {districtName}
          </p>

        </div>

      </div>



      {/* =========================
          CITIES & TOWNS
      ========================= */}

      <div className="district-section">

        <div className="district-section-title">

          <span>
            PLACES
          </span>

          <h3>
            Cities & Towns
          </h3>

          <p>
            Explore important places
          </p>

        </div>


        {data.cities?.length > 0 ? (

          <div className="cities-grid">

            {data.cities.map((city, index) => {

              /*
                Your districtData currently has
                cities like:

                cities: [
                  "Dhamtari",
                  "Kurud",
                  "Nagri"
                ]

                But this code also supports:

                {
                  name: "Dhamtari",
                  type: "City",
                  population: "..."
                }
              */

              const cityName =
                typeof city === "string"
                  ? city
                  : city?.name || "Unknown City";


              const cityType =
                typeof city === "object" &&
                city?.type
                  ? city.type
                  : "City / Town";


              const cityPopulation =
                typeof city === "object"
                  ? city?.population || null
                  : null;


              return (

                <button
                  key={`${cityName}-${index}`}
                  type="button"
                  className={`city-card city-${index % 4}`}
                  onClick={() =>
                    setSelectedCity({
                      name: cityName,
                      type: cityType,
                      population: cityPopulation,
                    })
                  }
                >

                  {/* CITY ICON */}

                  <div className="city-icon">

                    {index % 2 === 0
                      ? "🏙️"
                      : "📍"}

                  </div>


                  {/* CITY NAME */}

                  <div className="city-card-info">

                    <strong>
                      {cityName}
                    </strong>

                    <span>
                      {cityType}
                    </span>

                  </div>


                  {/* ARROW */}

                  <b>
                    →
                  </b>

                </button>

              );
            })}

          </div>

        ) : (

          <div className="no-cities">
            No city information available.
          </div>

        )}

      </div>



      {/* =========================
          ADMINISTRATION
      ========================= */}

      <div className="district-section">

        <div className="district-section-title">

          <span>
            ADMINISTRATION
          </span>

          <h3>
            District Administration
          </h3>

        </div>

        <div className="admin-grid">


          {/* HEADQUARTERS */}

          <div className="admin-card admin-green">

            <span>
              Headquarters
            </span>

            <strong>
              {data.headquarters || "N/A"}
            </strong>

          </div>

          {/* COLLECTOR */}

          <div className="admin-card admin-blue">

            <span>
              Collector
            </span>

            <strong>
              {data.collector?.name || "N/A"}
            </strong>

          </div>

          {/* COLLECTOR CONTACT */}

          <div className="admin-card admin-yellow">

            <span>
              Collector Contact
            </span>

            <strong>
              {data.collector?.phone || "N/A"}
            </strong>

          </div>

        </div>

      </div>

      {/* =========================
          READ MORE
      ========================= */}

      <button
        type="button"
        className="district-read-more"
        onClick={() =>
          navigate(
            `/district/${encodeURIComponent(
              districtName
            )}`
          )
        }
      >

        <div>

          <strong>
            Read More
          </strong>

          <span>
            View complete district information
          </span>

        </div>

        <b>
          →
        </b>

      </button>



      {/* =========================
          BACK TO STATE
      ========================= */}

      <button
        type="button"
        className="district-back"
        onClick={onBack}
      >
        ← Back to State Overview
      </button>


    </div>
  );
}

export default DistrictDetails;