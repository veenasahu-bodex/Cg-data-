import { useNavigate } from "react-router-dom";
import districtData from "../data/districtData";
import "./Districts.css";

function Districts() {
  const navigate = useNavigate();

  const districts = Object.keys(districtData);

  const handleDistrictClick = (districtName) => {
    navigate(`/district/${encodeURIComponent(districtName)}`);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="districts-page">

      {/* ================= BACK BUTTON ================= */}

      <button
        type="button"
        className="districts-back-button"
        onClick={handleBack}
      >
        <span>←</span>
        <span>Back</span>
      </button>


      {/* ================= HEADER ================= */}

      <div className="districts-page-header">

        <div className="districts-header-content">

          <span className="districts-label">
            CHHATTISGARH
          </span>

          <h1>All Districts</h1>

          <p>
            Explore all districts of Chhattisgarh and
            view detailed information.
          </p>

        </div>


        {/* DISTRICT COUNT */}

        <div className="district-count">

          <strong>
            {districts.length}
          </strong>

          <span>
            Districts
          </span>

        </div>

      </div>


      {/* ================= SEARCH ================= */}

      <div className="district-search-box">

        <span className="search-icon">
          🔍
        </span>

        <input
          type="text"
          placeholder="Search district..."
          onChange={(e) => {
            const value =
              e.target.value.toLowerCase().trim();

            document
              .querySelectorAll(".district-page-card")
              .forEach((card) => {

                const name =
                  card.dataset.name.toLowerCase();

                card.style.display =
                  name.includes(value)
                    ? "flex"
                    : "none";
              });
          }}
        />

      </div>


      {/* ================= DISTRICT CARDS ================= */}

      <div className="district-cards-grid">

        {districts.map((districtName, index) => {

          const data =
            districtData[districtName];

          return (

            <button
              key={districtName}
              type="button"
              className={`district-page-card district-card-${index % 6}`}
              data-name={districtName}
              onClick={() =>
                handleDistrictClick(districtName)
              }
            >

              {/* ================= CARD TOP ================= */}

              <div className="district-card-top">

                {/* DISTRICT IMAGE */}

                <div className="district-card-image">

                  <img
                    src={
                      data?.headerImage ||
                      "/images/default.jpg"
                    }
                    alt={districtName}
                  />

                </div>


                {/* CARD NUMBER */}

                <span className="district-card-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

              </div>


              {/* ================= CARD CONTENT ================= */}

              <div className="district-card-content">

                <h2>
                  {districtName}
                </h2>

                <p>
                  Headquarters:{" "}

                  <strong>
                    {data?.headquarters ||
                      "Not Available"}
                  </strong>
                </p>

              </div>


              {/* ================= CARD BOTTOM ================= */}

              <div className="district-card-bottom">

                <span>
                  View District Details
                </span>

                <b>
                  →
                </b>

              </div>

            </button>

          );
        })}

      </div>


      {/* ================= EMPTY STATE ================= */}

      {districts.length === 0 && (

        <div className="district-empty">

          <h2>
            No districts found
          </h2>

          <p>
            District information is not available.
          </p>

        </div>

      )}

    </div>
  );
}

export default Districts;