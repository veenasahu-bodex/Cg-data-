import { useState } from "react";

import Header from "../components/Header";
import CGMap from "../components/CGMap";
import StateOverview from "../components/StateOverview";
import DistrictDetails from "../components/DistrictDetails";
import SearchBox from "../components/SearchBox";

import districtData from "../data/districtData";

import "./Dashboard.css";

function Dashboard() {
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [search, setSearch] = useState("");

  const districtNames = Object.keys(districtData);

  const filteredDistricts = districtNames.filter((district) =>
    district.toLowerCase().includes(search.toLowerCase())
  );

  const handleDistrictClick = (district) => {
    setSelectedDistrict(district);
    setSearch("");
  };

  return (
    <div className="dashboard">

      {/* Paddy / Rice Background */}
      <div className="rice-background">
        <div className="rice-stalk rice-stalk-1"></div>
        <div className="rice-stalk rice-stalk-2"></div>
        <div className="rice-stalk rice-stalk-3"></div>
        <div className="rice-stalk rice-stalk-4"></div>
        <div className="rice-stalk rice-stalk-5"></div>
        <div className="rice-stalk rice-stalk-6"></div>
        <div className="rice-stalk rice-stalk-7"></div>
        <div className="rice-stalk rice-stalk-8"></div>
      </div>

      <Header />

      <section className="dashboard-hero">
        <div className="hero-content">
          <span className="hero-kicker">
            🌾 HEART OF CENTRAL INDIA
          </span>

          <h1>
            Chhattisgarh
            <span>The Dhan Ka Katora</span>
          </h1>

          <p>
            Explore the districts, people, places and
            important information of Chhattisgarh.
          </p>

          <div className="hero-pills">
            <span>🌾 Paddy State</span>
            <span>📍 33 Districts</span>
            <span>🇮🇳 Central India</span>
          </div>
        </div>

        <div className="hero-rice-decoration">
          <div className="rice-sun"></div>

          <div className="rice-field">
            <span>🌾</span>
            <span>🌾</span>
            <span>🌾</span>
            <span>🌾</span>
            <span>🌾</span>
          </div>
        </div>
      </section>

      <main className="dashboard-content">

        {/* MAP */}
        <section className="map-section">

          <div className="section-header">
            <div>
              <span className="section-label">
                INTERACTIVE MAP
              </span>

              <h2>Chhattisgarh Districts</h2>
            </div>

            <div className="district-count">
              33 Districts
            </div>
          </div>

          <SearchBox
            search={search}
            setSearch={setSearch}
          />

          {search && (
            <div className="search-results">

              {filteredDistricts.length > 0 ? (
                filteredDistricts.map((district) => (
                  <button
                    key={district}
                    type="button"
                    onClick={() =>
                      handleDistrictClick(district)
                    }
                  >
                    <span>📍</span>
                    {district}
                  </button>
                ))
              ) : (
                <p>No district found.</p>
              )}

            </div>
          )}

          <CGMap
            selectedDistrict={selectedDistrict}
            onDistrictClick={handleDistrictClick}
          />

        </section>

        {/* DETAILS */}
        <section className="details-section">

          {!selectedDistrict ? (
            <StateOverview />
          ) : (
            <DistrictDetails
              districtName={selectedDistrict}
              data={districtData[selectedDistrict]}
              onBack={() =>
                setSelectedDistrict(null)
              }
            />
          )}

        </section>

      </main>

      <footer className="dashboard-footer">
        <div>
          <strong>🌾 Chhattisgarh Data</strong>
          <span>
            Exploring the Dhan Ka Katora of India
          </span>
        </div>

        <div className="footer-right">
          <span>33 Districts</span>
          <span>•</span>
          <span>Chhattisgarh</span>
        </div>
      </footer>

    </div>
  );
}

export default Dashboard;