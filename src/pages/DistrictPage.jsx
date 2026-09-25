import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import districtData from "../data/districtData";
import "./DistrictPage.css";

function DistrictPage() {
  const { districtName } = useParams();
  const navigate = useNavigate();

  const [selectedCity, setSelectedCity] = useState(null);

  const decodedDistrictName = decodeURIComponent(districtName || "");

const normalizeDistrictName = (name) => {
  return String(name || "")
    .trim()
    .toLowerCase()
    .replace(/district/g, "")
    .replace(/chouki/g, "chowki")
    .replace(/korea/g, "koriya")
    .replace(/khairgarh/g, "khairagarh")
    .replace(/gaurella/g, "gaurela")
    .replace(/chirimiri/g, "chirmiri")
    .replace(/[^a-z0-9]/g, "");
};
const districtAliases = {
  balrampur: "Balrampur-Ramanujganj",
  balrampurramanujganj: "Balrampur-Ramanujganj",

  korea: "Korea",
  koriya: "Korea",

  gpm: "Gaurela-Pendra-Marwahi",
  gaurelapendramarwahi: "Gaurela-Pendra-Marwahi",

  kcg: "Khairagarh-Chhuikhadan-Gandai",
  khairagarhchhuikhadangandai:
    "Khairagarh-Chhuikhadan-Gandai",

  mcb: "Manendragarh-Chirmiri-Bharatpur",
  manendragarhchirmiribharatpur:
    "Manendragarh-Chirmiri-Bharatpur",

  mohla: "Mohla-Manpur-AmbagarhChowki",
  mohlamanpurambagarhchowki:
    "Mohla-Manpur-AmbagarhChowki",

  sarangarh: "Sarangarh-Bilaigarh",
  sarangarhbilaigarh: "Sarangarh-Bilaigarh",

  gariaband: "Gariaband",
  gariyaband: "Gariaband",
  gariyabandh: "Gariaband",

  balodabazar: "Baloda Bazar",
  balodabazarbhatapara: "Baloda Bazar",

  janjgir: "Janjgir-Champa",
  janjgirchampa: "Janjgir-Champa",

  kanker: "Kanker",
  uttarbastarkanker: "Kanker",

  dantewada: "Dantewada",
  dakshinbastardantewada: "Dantewada"
};

const normalizedRouteName =
  normalizeDistrictName(decodedDistrictName);

const aliasKey =
  districtAliases[normalizedRouteName];

const matchingKey = Object.keys(districtData).find(
  (key) =>
    normalizeDistrictName(key) ===
    normalizeDistrictName(
      aliasKey || decodedDistrictName
    )
);

const data =
  (matchingKey && districtData[matchingKey]) ||
  districtData[decodedDistrictName];

  /* =========================================
     HELPERS
  ========================================= */

  const getName = (item) => {
    if (item === null || item === undefined) {
      return "";
    }

    if (typeof item === "string" || typeof item === "number") {
      return String(item);
    }

    return (
      item.name ||
      item.title ||
      item.city ||
      item.station ||
      item.place ||
      item.college ||
      item.university ||
      item.hospital ||
      item.school ||
      item.label ||
      ""
    );
  };

  const displayValue = (value, fallback = "—") => {
    if (
      value === null ||
      value === undefined ||
      value === ""
    ) {
      return fallback;
    }

    return value;
  };

  const getValue = (...values) => {
    for (const value of values) {
      if (
        value !== undefined &&
        value !== null &&
        value !== ""
      ) {
        return value;
      }
    }

    return "—";
  };

  const getCount = (value) => {
    if (Array.isArray(value)) {
      return value.length;
    }

    if (
      typeof value === "number" ||
      typeof value === "string"
    ) {
      return value;
    }

    if (value && typeof value === "object") {
      if (value.count !== undefined) {
        return value.count;
      }

      if (Array.isArray(value.items)) {
        return value.items.length;
      }

      if (Array.isArray(value.list)) {
        return value.list.length;
      }

      if (Array.isArray(value.names)) {
        return value.names.length;
      }
    }

    return 0;
  };

  const getList = (value) => {
    if (Array.isArray(value)) {
      return value;
    }

    if (value && typeof value === "object") {
      if (Array.isArray(value.items)) {
        return value.items;
      }

      if (Array.isArray(value.list)) {
        return value.list;
      }

      if (Array.isArray(value.names)) {
        return value.names;
      }
    }

    return [];
  };

  const getWebsite = (item) => {
    if (!item || typeof item !== "object") {
      return "";
    }

    return (
      item.website ||
      item.officialWebsite ||
      item.url ||
      item.link ||
      item.web ||
      ""
    );
  };

  const normalizeWebsite = (url) => {
    if (!url) {
      return "";
    }

    const value = String(url).trim();

    if (!value) {
      return "";
    }

    const normalizeWebsite = (url) => {
  if (!url) {
    return "";
  }

  const value = String(url).trim();

  if (!value) {
    return "";
  }

  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  return `https://${value}`;
};

   return `https://${value}`;
  };

  const getPhotoImage = (photo) => {
    if (typeof photo === "string") {
      return photo;
    }

    if (!photo || typeof photo !== "object") {
      return "";
    }

    return (
      photo.image ||
      photo.imageUrl ||
      photo.photo ||
      photo.url ||
      photo.src ||
      ""
    );
  };

  const getPhotoName = (photo, index) => {
    if (typeof photo === "string") {
      return `Gallery ${index + 1}`;
    }

    if (!photo || typeof photo !== "object") {
      return `Gallery ${index + 1}`;
    }

    return (
      photo.name ||
      photo.title ||
      photo.caption ||
      `Gallery ${index + 1}`
    );
  };

  /* =========================================
     LIST RENDER
  ========================================= */

  const renderSimpleList = (value) => {
    const list = getList(value);

    return list.map((item, index) => (
      <li key={`${getName(item)}-${index}`}>
        <span className="list-dot"></span>

        <span className="list-text">
          {getName(item)}
        </span>
      </li>
    ));
  };

  /* =========================================
     COLLEGE LIST
  ========================================= */

  const renderCollegeList = (value) => {
    const list = getList(value);

    return list.map((college, index) => {
      const collegeName = getName(college);

      const website = normalizeWebsite(
        getWebsite(college)
      );

      return (
        <li key={`${collegeName}-${index}`}>
          {website ? (
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="college-link"
              title={`Visit ${collegeName} official website`}
            >
              <span>{collegeName}</span>
              <b>↗</b>
            </a>
          ) : (
            <span className="college-name-text">
              {collegeName}
            </span>
          )}
        </li>
      );
    });
  };

  /* =========================================
     UNIVERSITY LIST
  ========================================= */

  const renderUniversityList = (value) => {
    const list = getList(value);

    return list.map((university, index) => {
      const universityName = getName(university);

      const website = normalizeWebsite(
        getWebsite(university)
      );

      return (
        <li key={`${universityName}-${index}`}>
          {website ? (
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="university-link"
              title={`Visit ${universityName} official website`}
            >
              <span>{universityName}</span>
              <b>↗</b>
            </a>
          ) : (
            <span className="university-name-text">
              {universityName}
            </span>
          )}
        </li>
      );
    });
  };

  /* =========================================
     DATA
  ========================================= */

  if (!data) {
    return (
      <div className="page-not-found">
        <div className="not-found-icon">📍</div>

        <h2>District Not Found</h2>

        <p>
          No data available for{" "}
          <strong>{decodedDistrictName}</strong>.
        </p>

        <button
          type="button"
          onClick={() => navigate(-1)}
        >
          ← Go Back
        </button>
      </div>
    );
  }

  const blocks = getList(data.blocks);
  const tehsils = getList(data.tehsils);
  const cities = getList(data.cities);
  const colleges = getList(data.colleges);
  const universities = getList(data.universities);
  const touristPlaces = getList(data.touristPlaces);

  const hospitals = getList(
    data.hospitalNames ||
      data.hospitalsList ||
      data.hospitals
  );

  const medicalColleges = getList(
    data.medicalCollegeNames ||
      data.medicalCollegesList ||
      data.medicalColleges
  );

  const policeStations = getList(
    data.policeStationNames ||
      data.policeStationsList ||
      data.policeStations
  );

  const railwayStations = getList(
    data.railwayStations ||
      data.railwayStationNames
  );

  const photos = getList(
    data.photos || data.gallery
  );

  const governmentSchools = getValue(
    data.governmentSchools,
    data.govtSchools,
    data.govtSchoolCount
  );

  const privateSchools = getValue(
    data.privateSchools,
    data.privateSchoolCount
  );

  const chcCount = getValue(
    data.chc,
    data.chcs,
    data.communityHealthCenters
  );

  const hospitalCount = getCount(
    data.hospitals
  );

  const medicalCollegeCount = getCount(
    data.medicalColleges
  );

  const policeCount = getCount(
    data.policeStations
  );

  const railwayCount = getCount(
    data.railwayStations
  );
const languages = getList(data.languages);
const demography = data.demography || {};
const health = data.health || {};
const economy = data.economy || {};
const agriculture = data.agriculture || {};
const culture = data.culture || {};
const transport = data.transport || {};
const publicUtilities = data.publicUtilities || {};


  /* =========================================
     CITY CLICK
  ========================================= */

  const handleCityClick = (city) => {
    setSelectedCity(city);

    const cityName = getName(city);

    if (cityName) {
      navigate(
        `/district/${encodeURIComponent(
          decodedDistrictName
        )}/city/${encodeURIComponent(cityName)}`
      );
    }
  };

  return (
    <div className="district-page-wrapper">

      {/* =========================================
          TOP BAR
      ========================================= */}

      <header className="district-topbar">
        <button
          type="button"
          className="back-button"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <div className="breadcrumb">
          <span>Chhattisgarh</span>
          <b>/</b>
          <strong>{decodedDistrictName}</strong>
        </div>

        <div className="district-badge">
          DISTRICT DATA
        </div>
      </header>

      <main className="district-page">

        {/* =========================================
            HERO
        ========================================= */}

        <section
  className="district-hero"
  style={{
    backgroundImage: `url(${
      data?.headerImage || "/images/default.jpg"
    })`,
  }}
>
  <div className="district-hero-overlay"></div>

  <div className="hero-content">

    <div className="hero-location-icon">
      📍
    </div>

    <div className="hero-text">
      <span className="section-kicker">
        CHHATTISGARH DISTRICT
      </span>

      <h1>{decodedDistrictName}</h1>

      <p>
        District profile, administration,
        education, healthcare and important
        local information.
      </p>
    </div>

  </div>

  <div className="hero-symbol">
    🌾
  </div>
</section>
        {/* =========================================
    TOP STATS
========================================= */}

<section className="district-stats">

  <div className="stat-card population-stat">
    <div className="stat-icon">👥</div>

    <div>
      <span>Population</span>
      <strong>
        {displayValue(data.population)}
      </strong>
    </div>
  </div>

  <div className="stat-card area-stat">
    <div className="stat-icon">📐</div>

    <div>
      <span>Area</span>
      <strong>
        {displayValue(data.area)}
      </strong>
    </div>
  </div>

  <div className="stat-card hq-stat">
    <div className="stat-icon">🏛️</div>

    <div>
      <span>Headquarters</span>
      <strong>
        {displayValue(
          data.headquarters ||
          data.headQuarter ||
          data.hq
        )}
      </strong>
    </div>
  </div>

  <div className="stat-card block-stat">
    <div className="stat-icon">🏘️</div>

    <div>
      <span>Blocks</span>
      <strong>
        {getCount(data.blocks)}
      </strong>
    </div>
  </div>

  <div className="stat-card tehsil-stat">
    <div className="stat-icon">📍</div>

    <div>
      <span>Tehsils</span>
      <strong>
        {getCount(data.tehsils)}
      </strong>
    </div>
  </div>

  <div className="stat-card village-stat">
    <div className="stat-icon">🏘️</div>

    <div>
      <span>Villages</span>
      <strong>
        {getCount(data.villages)}
      </strong>
    </div>
  </div>

  <div className="stat-card panchayat-stat">
    <div className="stat-icon">🏛️</div>

    <div>
      <span>Gram Panchayats</span>
      <strong>
        {getCount(data.gramPanchayats)}
      </strong>
    </div>
  </div>

</section>
        {/* =========================================
            MAIN GRID
        ========================================= */}

        <div className="district-main-grid">

          {/* =======================================
              LEFT COLUMN
          ======================================= */}

          <div className="district-left-column">

            {/* ABOUT */}

            <section className="district-card about-card">

              <div className="card-heading">
                <div>
                  <span>OVERVIEW</span>
                  <h2>About District</h2>
                </div>

                <div className="heading-icon">
                  ℹ️
                </div>
              </div>

              <p className="about-text">
                {displayValue(
                  data.about,
                  "District information is currently not available."
                )}
              </p>

            </section>

            {/* ADMINISTRATION */}

            <section className="district-card administration-card">

              <div className="card-heading">
                <div>
                  <span>ADMINISTRATION</span>
                  <h2>District Administration</h2>
                </div>

                <div className="heading-icon">
                  🏛️
                </div>
              </div>

              <div className="admin-table">

                <div className="admin-row">
                  <span>👤 Collector</span>
                  <strong>
                    {displayValue(
                      data.collector?.name ||
                        data.collectorName
                    )}
                  </strong>
                </div>

                <div className="admin-row">
                  <span>💼 Designation</span>
                  <strong>
                    {displayValue(
                      data.collector?.designation
                    )}
                  </strong>
                </div>

                <div className="admin-row">
                  <span>☎️ Phone</span>
                  <strong>
                    {displayValue(
                      data.collector?.phone ||
                        data.collectorPhone
                    )}
                  </strong>
                </div>

                <div className="admin-row">
                  <span>✉️ Email</span>
                  <strong>
                    {displayValue(
                      data.collector?.email ||
                        data.collectorEmail
                    )}
                  </strong>
                </div>

                <div className="admin-row">
                  <span>📍 Address</span>
                  <strong>
                    {displayValue(
                      data.collector?.address
                    )}
                  </strong>
                </div>

              </div>

              {data.officialWebsite && (
                <a
                  href={normalizeWebsite(
                    data.officialWebsite
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="official-website"
                >
                  <span className="official-icon">
                    🌐
                  </span>

                  <span>
                    <strong>
                      Official District Website
                    </strong>

                    <small>
                      Visit official government website
                    </small>
                  </span>

                  <b>Visit ↗</b>
                </a>
              )}

            </section>

            {/* GALLERY */}

            {photos.length > 0 && (
              <section className="district-card gallery-section">

                <div className="card-heading">
                  <div>
                    <span>PHOTOS</span>
                    <h2>District Gallery</h2>
                  </div>

                  <div className="heading-icon">
                    🖼️
                  </div>
                </div>

                <div className="district-gallery">

                  {photos.map((photo, index) => {
                    const image =
                      getPhotoImage(photo);

                    if (!image) {
                      return null;
                    }

                    return (
                      <figure
                        className="gallery-photo-card"
                        key={`${getPhotoName(
                          photo,
                          index
                        )}-${index}`}
                      >
                        <img
                          src={image}
                          alt={getPhotoName(
                            photo,
                            index
                          )}
                          loading="lazy"
                        />

                        <figcaption>
                          {getPhotoName(
                            photo,
                            index
                          )}
                        </figcaption>
                      </figure>
                    );
                  })}

                </div>

              </section>
            )}

            {/* EDUCATION */}

            <section className="district-card education-card">

              <div className="card-heading">
                <div>
                  <span>EDUCATION</span>
                  <h2>Education Infrastructure</h2>
                </div>

                <div className="heading-icon">
                  🎓
                </div>
              </div>

              <div className="education-summary">

                <div className="education-stat school-stat">
                  <div className="education-stat-icon">
                    🏫
                  </div>

                  <div>
                    <span>Government Schools</span>
                    <strong>
                      {governmentSchools}
                    </strong>
                  </div>
                </div>

                <div className="education-stat private-school-stat">
                  <div className="education-stat-icon">
                    🏫
                  </div>

                  <div>
                    <span>Private Schools</span>
                    <strong>
                      {privateSchools}
                    </strong>
                  </div>
                </div>

                <div className="education-stat college-stat">
                  <div className="education-stat-icon">
                    🎓
                  </div>

                  <div>
                    <span>Colleges</span>
                    <strong>
                      {getCount(data.colleges)}
                    </strong>
                  </div>
                </div>

                <div className="education-stat university-stat">
                  <div className="education-stat-icon">
                    🏛️
                  </div>

                  <div>
                    <span>Universities</span>
                    <strong>
                      {getCount(data.universities)}
                    </strong>
                  </div>
                </div>

              </div>

              <div className="education-list-grid">

                {/* COLLEGES */}

                <div className="list-box blue-list">

                  <div className="list-box-heading">
                    <h4>
                      🎓 Colleges
                    </h4>

                    <span>
                      {getCount(data.colleges)}
                    </span>
                  </div>

                  <ul>
                    {colleges.length > 0 ? (
                      renderCollegeList(colleges)
                    ) : (
                      <li className="no-data">
                        No college data available.
                      </li>
                    )}
                  </ul>

                </div>

                {/* UNIVERSITIES */}

                <div className="list-box purple-list">

                  <div className="list-box-heading">
                    <h4>
                      🏛️ Universities
                    </h4>

                    <span>
                      {getCount(data.universities)}
                    </span>
                  </div>

                  <ul>
                    {universities.length > 0 ? (
                      renderUniversityList(
                        universities
                      )
                    ) : (
                      <li className="no-data">
                        No university data available.
                      </li>
                    )}
                  </ul>

                </div>

              </div>

            </section>

            {/* BLOCKS + TEHSILS */}

            <section className="district-card administrative-units-card">

              <div className="card-heading">
                <div>
                  <span>ADMINISTRATIVE UNITS</span>
                  <h2>Blocks & Tehsils</h2>
                </div>

                <div className="heading-icon">
                  🗂️
                </div>
              </div>

              <div className="blocks-tehsils-grid">

                <div className="data-list-card green-list">

                  <div className="data-list-heading">
                    <h3>
                      🏘️ Blocks
                    </h3>

                    <span>
                      {blocks.length}
                    </span>
                  </div>

                  <ul>
                    {blocks.length > 0 ? (
                      renderSimpleList(blocks)
                    ) : (
                      <li className="no-data">
                        No block data available.
                      </li>
                    )}
                  </ul>

                </div>

                <div className="data-list-card orange-list">

                  <div className="data-list-heading">
                    <h3>
                      📍 Tehsils
                    </h3>

                    <span>
                      {tehsils.length}
                    </span>
                  </div>

                  <ul>
                    {tehsils.length > 0 ? (
                      renderSimpleList(tehsils)
                    ) : (
                      <li className="no-data">
                        No tehsil data available.
                      </li>
                    )}
                  </ul>

                </div>

              </div>

            </section>

            {/* HEALTHCARE */}

            <section className="district-card healthcare-card">

  <div className="card-heading">
    <div>
      <span>HEALTHCARE</span>
      <h2>Health Infrastructure</h2>
    </div>

    <div className="heading-icon">
      🏥
    </div>
  </div>


  {/* Main Health Statistics */}
  <div className="health-stats-grid">

    <div className="health-stat hospital-stat">
      <span>🏥 Hospitals</span>
      <strong>
        {hospitalCount}
      </strong>
    </div>

    <div className="health-stat medical-stat">
      <span>🩺 Medical Colleges</span>
      <strong>
        {medicalCollegeCount}
      </strong>
    </div>

    <div className="health-stat chc-stat">
      <span>➕ CHC</span>
      <strong>
        {chcCount}
      </strong>
    </div>

    <div className="health-stat">
      <span>🏥 Sub Health Centers</span>
      <strong>
        {health.subHealthCenters ?? "N/A"}
      </strong>
    </div>

    <div className="health-stat">
      <span>🤝 Jeevan Deep Samitis</span>
      <strong>
        {health.jeevanDeepSamitis ?? "N/A"}
      </strong>
    </div>

    <div className="health-stat">
      <span>👩‍⚕️ Mitanin</span>
      <strong>
        {health.mitanin ?? "N/A"}
      </strong>
    </div>

    <div className="health-stat">
      <span>❤️ Red Cross</span>
      <strong>
        {health.redCross ?? "N/A"}
      </strong>
    </div>

    <div className="health-stat">
      <span>💊 Mass Drug Centers</span>
      <strong>
        {health.massDrugCenters ?? "N/A"}
      </strong>
    </div>

  </div>


  {/* Hospital & Medical College Lists */}
  <div className="health-lists">

    <div className="health-list">

      <h4>
        🏥 Hospitals ({hospitalCount})
      </h4>

      <ul>
        {hospitals.length > 0 ? (
          renderSimpleList(hospitals)
        ) : (
          <li className="no-data">
            Hospital names not available.
          </li>
        )}
      </ul>

    </div>


    <div className="health-list">

      <h4>
        🩺 Medical Colleges ({medicalCollegeCount})
      </h4>

      <ul>
        {medicalColleges.length > 0 ? (
          renderSimpleList(
            medicalColleges
          )
        ) : (
          <li className="no-data">
            Medical college names not
            available.
          </li>
        )}
      </ul>

    </div>

  </div>

</section>
  
            {/* DEMOGRAPHY */}
  
     {Object.keys(demography).length > 0 && (
  <section className="district-section additional-details-section demography-section">
    <div className="section-title">
      <span className="section-icon">👥</span>
      <div>
        <h2>Demography</h2>
        <p>Population and demographic information</p>
      </div>
    </div>

    <div className="detail-card-grid">

      <div className="info-detail-card">
        <span className="detail-card-icon">👨</span>
        <span>Male Population</span>
        <strong>{demography.malePopulation?.toLocaleString()}</strong>
      </div>

      <div className="info-detail-card">
        <span className="detail-card-icon">👩</span>
        <span>Female Population</span>
        <strong>{demography.femalePopulation?.toLocaleString()}</strong>
      </div>

      <div className="info-detail-card">
        <span className="detail-card-icon">📚</span>
        <span>Literacy Rate</span>
        <strong>{demography.literacyRate || "N/A"}</strong>
      </div>

      <div className="info-detail-card">
        <span className="detail-card-icon">👨‍🎓</span>
        <span>Male Literacy</span>
        <strong>{demography.maleLiteracyRate || "N/A"}</strong>
      </div>

      <div className="info-detail-card">
        <span className="detail-card-icon">👩‍🎓</span>
        <span>Female Literacy</span>
        <strong>{demography.femaleLiteracyRate || "N/A"}</strong>
      </div>

      <div className="info-detail-card">
        <span className="detail-card-icon">🏘️</span>
        <span>SC Population</span>
        <strong>{demography.scPopulation?.toLocaleString()}</strong>
      </div>

      <div className="info-detail-card">
        <span className="detail-card-icon">🌳</span>
        <span>ST Population</span>
        <strong>{demography.stPopulation?.toLocaleString()}</strong>
      </div>
      <div className="info-detail-card">
  <span className="detail-card-icon">👥</span>
  <span>OBC Population</span>
  <strong>{demography.obcPopulation?.toLocaleString() || "N/A"}</strong>
</div>

<div className="info-detail-card">
  <span className="detail-card-icon">🏠</span>
  <span>General Population</span>
  <strong>{demography.generalPopulation?.toLocaleString() || "N/A"}</strong>
</div>

    </div>
  </section>
)}

  {/* AGRICULTURE */}
{Object.keys(agriculture).length > 0 && (
<section className="district-section additional-details-section agriculture-section">    <div className="section-title">
      <span className="section-icon">🌾</span>
      <div>
        <h2>Agriculture</h2>
        <p>Major agricultural activities and farmer initiatives</p>
      </div>
    </div>

    <div className="two-column-detail-grid">

      <div className="detail-list-box">
        <h3>🌾 Major Activities</h3>

        <div className="vertical-detail-list">
          {agriculture.majorActivities?.map((activity, index) => (
            <div className="detail-list-item" key={index}>
              <span>✓</span>
              {activity}
            </div>
          ))}
        </div>
      </div>

      <div className="detail-list-box">
        <h3>👨‍🌾 Farmer Initiatives</h3>

        <div className="vertical-detail-list">
          {agriculture.farmerInitiatives?.map((initiative, index) => (
            <div className="detail-list-item" key={index}>
              <span>✓</span>
              {initiative}
            </div>
          ))}
        </div>
      </div>

    </div>
  </section>
)}
 {/* CULTURE & HERITAGE */}
{Object.keys(culture).length > 0 && (
  <section className="district-section additional-details-section">
    <div className="section-title">
      <span className="section-icon">🎭</span>
      <div>
        <h2>Culture & Heritage</h2>
        <p>Tribal culture, dance, festivals and heritage</p>
      </div>
    </div>

    <div className="culture-grid">

      <div className="culture-card">
        <div className="culture-card-icon">🌳</div>
        <h3>Tribal Culture</h3>

        {culture.tribalCulture?.map((item, index) => (
          <span key={index}>{item}</span>
        ))}
      </div>

      <div className="culture-card">
        <div className="culture-card-icon">💃</div>
        <h3>Traditional Dance</h3>

        {culture.traditionalDance?.map((item, index) => (
          <span key={index}>{item}</span>
        ))}
      </div>

      <div className="culture-card">
        <div className="culture-card-icon">🎉</div>
        <h3>Festivals</h3>

        {culture.festivals?.map((item, index) => (
          <span key={index}>{item}</span>
        ))}
      </div>

      <div className="culture-card">
        <div className="culture-card-icon">🏛️</div>
        <h3>Heritage Places</h3>

        {culture.heritagePlaces?.map((item, index) => (
          <span key={index}>{item}</span>
        ))}
      </div>

    </div>
  </section>
)}
 {/* PUCLICUTILITY */}

{Object.keys(publicUtilities).length > 0 && (
<section className="district-section additional-details-section public-utilities-section">    <div className="section-title">
      <span className="section-icon">🏢</span>
      <div>
        <h2>Public Utilities</h2>
        <p>Important public services available in the district</p>
      </div>
    </div>

    <div className="utility-card-grid">

      <div className="utility-card">
        <span>🏦</span>
        <div>
          <small>Banks</small>
          <strong>{publicUtilities.banks ?? 0}</strong>
        </div>
      </div>
      

      <div className="utility-card">
        <span>🛒</span>
        <div>
          <small>PDS</small>
          <strong>{publicUtilities.pds ?? 0}</strong>
        </div>
      </div>

      <div className="utility-card">
        <span>⚡</span>
        <div>
          <small>Electricity</small>
          <strong>{publicUtilities.electricity ?? 0}</strong>
        </div>
      </div>

      <div className="utility-card">
        <span>🏥</span>
        <div>
          <small>Hospitals</small>
          <strong>{publicUtilities.hospitals ?? 0}</strong>
        </div>
      </div>

      <div className="utility-card">
        <span>🏛️</span>
        <div>
          <small>Municipalities</small>
          <strong>{publicUtilities.municipalities ?? 0}</strong>
        </div>
      </div>

      <div className="utility-card">
        <span>🤝</span>
        <div>
          <small>NGOs</small>
          <strong>{publicUtilities.ngos ?? 0}</strong>
        </div>
      </div>

      <div className="utility-card">
  <span>📮</span>
  <div>
    <small>Post Offices</small>
    <strong>{publicUtilities.postOffices ?? 0}</strong>
  </div>
</div>

     

    </div>
  </section>
)}
          </div>
          
          

          {/* =======================================
              RIGHT COLUMN
          ======================================= */}

          <aside className="district-right-column">

            {/* TOURIST PLACES */}

            <section className="district-card tourist-card">

              <div className="card-heading">
                <div>
                  <span>EXPLORE</span>
                  <h2>Tourist Places</h2>
                </div>

                <div className="heading-icon">
                  📸
                </div>
              </div>

              <div className="tourist-list">

                {touristPlaces.length > 0 ? (
                  touristPlaces.map(
                    (place, index) => (
                      <div
                        className="tourist-item"
                        key={`${getName(
                          place
                        )}-${index}`}
                      >

                        <div className="tourist-number">
                          {index + 1}
                        </div>

                        <div className="tourist-info">

                          <strong>
                            {getName(place)}
                          </strong>

                          {typeof place ===
                            "object" && (
                            <span>
                              {displayValue(
                                place.location ||
                                  place.description ||
                                  place.type,
                                ""
                              )}
                            </span>
                          )}

                        </div>

                      </div>
                    )
                  )
                ) : (
                  <p className="no-data">
                    No tourist place data available.
                  </p>
                )}

              </div>

            </section>

            {/* CITIES */}

            <section className="district-card cities-card">

              <div className="card-heading">
                <div>
                  <span>LOCALITIES</span>
                  <h2>Cities & Towns</h2>
                </div>

                <div className="heading-icon">
                  🏙️
                </div>
              </div>

              <div className="city-grid">

                {cities.length > 0 ? (
                  cities.map((city, index) => {

                    const cityName =
                      getName(city);

                    const cityPopulation =
                      typeof city === "object"
                        ? city.population
                        : "";

                    const cityType =
                      typeof city === "object"
                        ? city.type
                        : "Locality";

                    return (
                      <button
                        type="button"
                        className={`city-card ${
                          selectedCity === city
                            ? "active"
                            : ""
                        }`}
                        key={`${cityName}-${index}`}
                        onClick={() =>
                          handleCityClick(city)
                        }
                      >

                        <div className="city-icon">
                          🏙️
                        </div>

                        <div className="city-info">

                          <strong>
                            {cityName}
                          </strong>

                          <span>
                            {displayValue(
                              cityType,
                              "City"
                            )}
                          </span>

                          {cityPopulation && (
                            <small>
                              Population:{" "}
                              {cityPopulation}
                            </small>
                          )}

                        </div>

                        <b>→</b>

                      </button>
                    );
                  })
                ) : (
                  <p className="no-data">
                    No city data available.
                  </p>
                )}

              </div>

            </section>

            {/* POLICE */}

            <section className="district-card police-card">

              <div className="card-heading">
                <div>
                  <span>SECURITY</span>
                  <h2>Police Stations</h2>
                </div>

                <div className="count-badge">
                  🚓 {policeCount}
                </div>
              </div>

              <ul className="scroll-data-list">

                {policeStations.length > 0 ? (
                  renderSimpleList(policeStations)
                ) : (
                  <li className="no-data">
                    Police station names not available.
                  </li>
                )}

              </ul>

            </section>

            {/* RAILWAY */}

            <section className="district-card railway-card">

              <div className="card-heading">
                <div>
                  <span>TRANSPORT</span>
                  <h2>Railway Stations</h2>
                </div>

                <div className="count-badge">
                  🚆 {railwayCount}
                </div>
              </div>

              <ul className="scroll-data-list">

                {railwayStations.length > 0 ? (
                  renderSimpleList(
                    railwayStations
                  )
                ) : (
                  <li className="no-data">
                    Railway station names not
                    available.
                  </li>
                )}

              </ul>

            </section>

            {/* CONTACT */}

            <section className="district-card contact-card">

              <div className="card-heading">
                <div>
                  <span>CONTACT</span>
                  <h2>Important Contacts</h2>
                </div>

                <div className="heading-icon">
                  ☎️
                </div>
              </div>

              <div className="contact-list">

                <div className="contact-item">
                  <span>☎️</span>

                  <div>
                    <strong>
                      Collector Office
                    </strong>

                    <small>
                      {displayValue(
                        data.collector?.phone ||
                          data.collectorPhone
                      )}
                    </small>
                  </div>
                </div>

                <div className="contact-item">
                  <span>✉️</span>

                  <div>
                    <strong>Email</strong>

                    <small>
                      {displayValue(
                        data.collector?.email ||
                          data.collectorEmail
                      )}
                    </small>
                  </div>
                </div>

                <div className="contact-item">
                  <span>📍</span>

                  <div>
                    <strong>Address</strong>

                    <small>
                      {displayValue(
                        data.collector?.address
                      )}
                    </small>
                  </div>
                </div>

              </div>

            </section>
            {/* Important Places */}
{data.importantPlaces?.length > 0 && (
  <section className="district-section important-places-section">
    <div className="section-title-row">
      <div>
        <span className="section-label">EXPLORE</span>
        <h2>Important Places</h2>
        <p>Important offices, institutions and facilities of the district.</p>
      </div>
      <span className="section-count">
        {data.importantPlaces.length} Places
      </span>
    </div>

    <div className="important-places-grid">
      {data.importantPlaces.map((place, index) => (
        <div className="important-place-card" key={index}>
          <div className="important-place-icon">
            {place.icon || "📍"}
          </div>

          <div className="important-place-content">
            <h3>{place.name}</h3>
            <p>{place.value || "—"}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
)}

            {/* HELPLINES */}

            {/* HELPLINES */}

<section className="district-card helpline-card">

  <div className="card-heading">
    <div>
      <span>EMERGENCY & SUPPORT</span>
      <h2>Helplines</h2>
    </div>

    <div className="heading-icon">
      🚨
    </div>
  </div>

  <div className="helpline-category-grid">

    {/* Emergency */}
    {data.helplines?.emergency?.length > 0 && (
      <div className="helpline-category emergency-category">

        <div className="helpline-category-title">
          <span>🚨</span>
          <div>
            <h3>Emergency</h3>
            <p>Emergency assistance numbers</p>
          </div>
        </div>

        <div className="helpline-list">
          {data.helplines.emergency.map((item, index) => (
            <div className="helpline-item" key={index}>

              <span className="helpline-icon">
                {index === 0
                  ? "🚓"
                  : index === 1
                  ? "🚑"
                  : index === 2
                  ? "🔥"
                  : "🆘"}
              </span>

              <div>
                <strong>{item.name}</strong>
                <b>{item.number}</b>
              </div>

            </div>
          ))}
        </div>

      </div>
    )}

    {/* Social */}
    {data.helplines?.social?.length > 0 && (
      <div className="helpline-category social-category">

        <div className="helpline-category-title">
          <span>🤝</span>
          <div>
            <h3>Social Support</h3>
            <p>Women, child and public support</p>
          </div>
        </div>

        <div className="helpline-list">
          {data.helplines.social.map((item, index) => (
            <div className="helpline-item" key={index}>

              <span className="helpline-icon">
                {index === 0
                  ? "👩"
                  : index === 1
                  ? "👶"
                  : index === 2
                  ? "🛡️"
                  : "☎️"}
              </span>

              <div>
                <strong>{item.name}</strong>
                <b>{item.number}</b>
              </div>

            </div>
          ))}
        </div>

      </div>
    )}

    {/* Administrative */}
    {data.helplines?.administrative?.length > 0 && (
      <div className="helpline-category administrative-category">

        <div className="helpline-category-title">
          <span>🏛️</span>
          <div>
            <h3>Administrative</h3>
            <p>Government and district services</p>
          </div>
        </div>

        <div className="helpline-list">
          {data.helplines.administrative.map((item, index) => (
            <div className="helpline-item" key={index}>

              <span className="helpline-icon">
                {index === 0
                  ? "☎️"
                  : index === 1
                  ? "🏛️"
                  : index === 2
                  ? "⚡"
                  : "📮"}
              </span>

              <div>
                <strong>{item.name}</strong>
                <b>{item.number}</b>
              </div>

            </div>
          ))}
        </div>

      </div>
    )}

  </div>

</section>

            {languages.length > 0 && (
  <section className="district-section additional-details-section">
    <div className="section-title">
      <span className="section-icon">🗣️</span>
      <div>
        <h2>Languages & Dialects</h2>
        <p>Languages and dialects spoken in the district</p>
      </div>
    </div>

    <div className="detail-tag-grid">
      {languages.map((language, index) => (
        <div className="language-card" key={index}>
          <span className="language-icon">🗣️</span>
          <strong>{language}</strong>
        </div>
      ))}
    </div>
  </section>
)}
{/* ECONOMY */}
{Object.keys(economy).length > 0 && (
  <section className="district-section additional-details-section economy-section">
    <div className="section-title">
      <span className="section-icon">💰</span>
      <div>
        <h2>Economy</h2>
        <p>Major economic sectors and mineral resources</p>
      </div>
    </div>

    <div className="highlight-detail-card">
      <div className="highlight-item">
        <span>⛏️ Major Mineral</span>
        <strong>{economy.majorMineral || "N/A"}</strong>
      </div>

      <div className="highlight-item">
        <span>⛰️ Major Mining Area</span>
        <strong>{economy.majorMiningArea || "N/A"}</strong>
      </div>
    </div>

    {economy.majorSectors?.length > 0 && (
      <div className="detail-list-box">
        <h3>Major Economic Sectors</h3>

        <div className="detail-tag-grid">
          {economy.majorSectors.map((sector, index) => (
            <span className="detail-tag" key={index}>
              {sector}
            </span>
          ))}
        </div>
      </div>
    )}
  </section>
)}
{/* Transport */}

{Object.keys(transport).length > 0 && (
<section className="district-section additional-details-section transport-section">    <div className="section-title">
      <span className="section-icon">🚍</span>
      <div>
        <h2>Transport & Connectivity</h2>
        <p>Road, railway and air connectivity</p>
      </div>
    </div>

    <div className="two-column-detail-grid">

      <div className="detail-list-box">
        <h3>🛣️ Road Connectivity</h3>

        <div className="detail-tag-grid">
          {transport.road?.connectedCities?.map((city, index) => (
            <span className="detail-tag" key={index}>
              {city}
            </span>
          ))}
        </div>
      </div>

      <div className="detail-list-box">
        <h3>🚆 Railway Connectivity</h3>

        <div className="detail-tag-grid">
          {transport.railway?.connectedTo?.map((city, index) => (
            <span className="detail-tag" key={index}>
              {city}
            </span>
          ))}
        </div>
      </div>

    </div>

    {transport.nearestAirport && (
      <div className="airport-card">
        <span className="airport-icon">✈️</span>

        <div>
          <span>Nearest Airport</span>
          <h3>{transport.nearestAirport.name}</h3>
          <p>{transport.nearestAirport.distance}</p>
        </div>
      </div>
    )}
  </section>
)}

          </aside>
          
        </div>
        
      </main>
      

      {/* =========================================
          FOOTER
      ========================================= */}

      <footer className="district-footer">

        <div>
          <strong>
            {decodedDistrictName}
          </strong>

          <span>
            Chhattisgarh District Information
          </span>
        </div>

        {data.officialWebsite && (
          <a
            href={normalizeWebsite(
              data.officialWebsite
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            Official Website ↗
          </a>
        )}

      </footer>

    </div>
  );
}

export default DistrictPage;