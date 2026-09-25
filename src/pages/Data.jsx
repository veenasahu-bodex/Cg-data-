import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import data from "../data/data";
import "./Data.css";

function Data() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const searchValue = search.toLowerCase().trim();

  const matchesSearch = (title) => {
    if (!searchValue) return true;

    return title.toLowerCase().includes(searchValue);
  };

  const formatValue = (value) => {
  if (value === null || value === undefined || value === "") {
    return "—";
  }

  if (typeof value === "string") {
    return value;
  }

  if (typeof value === "number") {
    return value.toLocaleString("en-IN");
  }

  return String(value);
};

  const quickStats = [
    {
      icon: "🏛️",
      value: data.overview?.districts,
      label: "Districts",
      color: "green",
    },
    {
      icon: "🗺️",
      value: data.overview?.divisions,
      label: "Divisions",
      color: "blue",
    },
    {
      icon: "👥",
      value: data.overview?.population,
      label: "Population",
      color: "purple",
    },
    {
      icon: "📐",
      value: data.overview?.area,
      label: "Area",
      color: "orange",
    },
    {
      icon: "🏘️",
      value: data.overview?.blocks,
      label: "Development Blocks",
      color: "pink",
    },
    {
      icon: "📍",
      value: data.overview?.tehsils,
      label: "Tehsils",
      color: "teal",
    },
    {
      icon: "🏡",
      value: data.overview?.villages,
      label: "Villages",
      color: "yellow",
    },
    {
      icon: "🌾",
      value: data.overview?.gramPanchayats,
      label: "Gram Panchayats",
      color: "red",
    },
  ];

  const demographicData = [
    {
      icon: "👥",
      title: "Total Population",
      value: data.population?.total,
      note: "Population",
    },
    {
      icon: "👨",
      title: "Male Population",
      value: data.population?.male,
      note: "Male population",
    },
    {
      icon: "👩",
      title: "Female Population",
      value: data.population?.female,
      note: "Female population",
    },
    {
      icon: "🏘️",
      title: "Rural Population",
      value: data.population?.rural,
      note: "Rural population",
    },
    {
      icon: "🏙️",
      title: "Urban Population",
      value: data.population?.urban,
      note: "Urban population",
    },
    {
      icon: "📚",
      title: "Literacy Rate",
      value: data.population?.literacyRate,
      note: "Literacy",
    },
    {
      icon: "⚖️",
      title: "Sex Ratio",
      value: data.population?.sexRatio,
      note: "Females per 1,000 males",
    },
    {
      icon: "📊",
      title: "Population Density",
      value: data.population?.populationDensity,
      note: "Persons / sq. km",
    },
  ];

  const administrationData = [
    {
      icon: "🏛️",
      title: "Districts",
      value: data.administration?.districts,
    },
    {
      icon: "🗺️",
      title: "Divisions",
      value: data.administration?.divisions,
    },
    {
      icon: "📍",
      title: "Sub-Divisions",
      value: data.administration?.subDivisions,
    },
    {
      icon: "📌",
      title: "Tehsils",
      value: data.administration?.tehsils,
    },
    {
      icon: "🏘️",
      title: "Development Blocks",
      value: data.administration?.blocks,
    },
    {
      icon: "🏡",
      title: "Villages",
      value: data.administration?.villages,
    },
    {
      icon: "📋",
      title: "Revenue Inspector Circles",
      value: data.administration?.revenueInspectorCircles,
    },
    {
      icon: "📝",
      title: "Patwari Halka",
      value: data.administration?.patwariHalka,
    },
    {
      icon: "🌾",
      title: "Gram Panchayats",
      value: data.administration?.gramPanchayats,
    },
    {
      icon: "🏢",
      title: "District Panchayats",
      value: data.administration?.districtPanchayats,
    },
    {
      icon: "🏘️",
      title: "Janpad Panchayats",
      value: data.administration?.janpadPanchayats,
    },
    {
      icon: "🏙️",
      title: "Municipalities",
      value: data.administration?.municipalities,
    },
  ];

  const transportData = [
    {
      icon: "✈️",
      title: "Airports",
      value: data.transport?.airports,
      description: "Air connectivity across Chhattisgarh",
    },
    {
      icon: "🚆",
      title: "Railway Stations",
      value: data.transport?.railwayStations,
      description: "Railway stations across the state",
    },
    {
      icon: "🛣️",
      title: "National Highways",
      value: data.transport?.nationalHighways,
      description: "National highway network",
    },
    {
      icon: "🛤️",
      title: "State Highways",
      value: data.transport?.stateHighways,
      description: "State highway network",
    },
    {
      icon: "🚌",
      title: "Bus Terminals",
      value: data.transport?.busTerminals,
      description: "Major bus terminals",
    },
  ];

  const publicData = [
    {
      icon: "👮",
      title: "Police Stations",
      value: data.police?.policeStations,
    },
    {
      icon: "🚨",
      title: "Police Chowkis",
      value: data.police?.policeChowkis,
    },
    {
      icon: "🚒",
      title: "Fire Stations",
      value: data.police?.fireStations,
    },
    {
      icon: "🏦",
      title: "Banks",
      value: data.banking?.banks,
    },
    {
      icon: "🏧",
      title: "Bank Branches",
      value: data.banking?.bankBranches,
    },
    {
      icon: "💳",
      title: "ATMs",
      value: data.banking?.atms,
    },
    {
      icon: "📮",
      title: "Post Offices",
      value: data.banking?.postOffices,
    },
  ];

  const educationData = [
    {
      icon: "🎓",
      title: "Universities",
      value: data.education?.universities,
    },
    {
      icon: "🏫",
      title: "Colleges",
      value: data.education?.colleges,
    },
    {
      icon: "🏥",
      title: "Medical Colleges",
      value: data.education?.medicalColleges,
    },
    {
      icon: "⚙️",
      title: "Engineering Colleges",
      value: data.education?.engineeringColleges,
    },
    {
      icon: "🔧",
      title: "Polytechnic",
      value: data.education?.polytechnics,
    },
    {
      icon: "🛠️",
      title: "ITI",
      value: data.education?.iti,
    },
    {
      icon: "📖",
      title: "Government Schools",
      value: data.education?.governmentSchools,
    },
    {
      icon: "🏫",
      title: "Private Schools",
      value: data.education?.privateSchools,
    },
  ];

  const healthcareData = [
    {
      icon: "🏥",
      title: "Government Hospitals",
      value: data.healthcare?.governmentHospitals,
    },
    {
      icon: "🏨",
      title: "Private Hospitals",
      value: data.healthcare?.privateHospitals,
    },
    {
      icon: "🩺",
      title: "Primary Health Centres",
      value: data.healthcare?.phc,
    },
    {
      icon: "➕",
      title: "Community Health Centres",
      value: data.healthcare?.chc,
    },
    {
      icon: "🏥",
      title: "Medical Colleges",
      value: data.healthcare?.medicalColleges,
    },
    {
      icon: "🚑",
      title: "Sub Health Centres",
      value: data.healthcare?.subHealthCentres,
    },
  ];

  const agricultureData = [
    {
      icon: "🚜",
      title: "Agricultural Area",
      value: data.agriculture?.agriculturalArea,
    },
    {
      icon: "💧",
      title: "Irrigated Area",
      value: data.agriculture?.irrigatedArea,
    },
    {
      icon: "🌾",
      title: "Paddy",
      value: data.agriculture?.paddy,
    },
    {
      icon: "🌱",
      title: "Wheat",
      value: data.agriculture?.wheat,
    },
    {
      icon: "🌽",
      title: "Maize",
      value: data.agriculture?.maize,
    },
    {
      icon: "🫘",
      title: "Pulses",
      value: data.agriculture?.pulses,
    },
  ];

  const mineralData = [
    {
      icon: "⛏️",
      title: "Coal",
      value: data.minerals?.coal,
    },
    {
      icon: "🪨",
      title: "Iron Ore",
      value: data.minerals?.ironOre,
    },
    {
      icon: "🏔️",
      title: "Limestone",
      value: data.minerals?.limestone,
    },
    {
      icon: "🪨",
      title: "Bauxite",
      value: data.minerals?.bauxite,
    },
    {
      icon: "🔩",
      title: "Dolomite",
      value: data.minerals?.dolomite,
    },
    {
      icon: "⚒️",
      title: "Tin",
      value: data.minerals?.tin,
    },
  ];

  const economyData = [
    {
      icon: "🏭",
      title: "Industries",
      value: data.economy?.industries,
    },
    {
      icon: "🏗️",
      title: "Industrial Areas",
      value: data.economy?.industrialAreas,
    },
    {
      icon: "⚡",
      title: "Power Plants",
      value: data.economy?.powerPlants,
    },
    {
      icon: "💼",
      title: "MSMEs",
      value: data.economy?.msmes,
    },
    {
      icon: "📈",
      title: "GSDP",
      value: data.economy?.gsdp,
    },
    {
      icon: "💰",
      title: "Per Capita Income",
      value: data.economy?.perCapitaIncome,
    },
  ];

  const environmentData = [
    {
      icon: "🌳",
      title: "Forest Area",
      value: data.environment?.forestArea,
    },
    {
      icon: "🌲",
      title: "Forest Cover",
      value: data.environment?.forestCover,
    },
    {
      icon: "🏞️",
      title: "National Parks",
      value: data.environment?.nationalParks,
    },
    {
      icon: "🦌",
      title: "Wildlife Sanctuaries",
      value: data.environment?.wildlifeSanctuaries,
    },
    {
      icon: "🐅",
      title: "Tiger Reserves",
      value: data.environment?.tigerReserves,
    },
    {
      icon: "🌿",
      title: "Protected Areas",
      value: data.environment?.protectedAreas,
    },
  ];

  const tourismData = [
    {
      icon: "🏞️",
      title: "Tourist Places",
      value: data.tourism?.touristPlaces,
    },
    {
      icon: "💦",
      title: "Waterfalls",
      value: data.tourism?.waterfalls,
    },
    {
      icon: "🛕",
      title: "Temples",
      value: data.tourism?.temples,
    },
    {
      icon: "🦁",
      title: "Wildlife Places",
      value: data.tourism?.wildlifePlaces,
    },
    {
      icon: "🕳️",
      title: "Caves",
      value: data.tourism?.caves,
    },
    {
      icon: "🌊",
      title: "Dams & Reservoirs",
      value: data.tourism?.dams,
    },
  ];

  const allSearchItems = useMemo(
    () => [
      ...demographicData,
      ...administrationData,
      ...transportData,
      ...publicData,
      ...educationData,
      ...healthcareData,
      ...agricultureData,
      ...mineralData,
      ...economyData,
      ...environmentData,
      ...tourismData,
    ],
    []
  );

  const hasSearchResult =
    !searchValue ||
    allSearchItems.some((item) =>
      item.title.toLowerCase().includes(searchValue)
    );

  return (
    <div className="data-page">

      {/* Back Button */}
      <button
        type="button"
        className="data-back-button"
        onClick={() => navigate(-1)}
      >
        <span>←</span>
        <span>Back</span>
      </button>

      {/* Hero */}
      <section className="data-hero">
        <div className="data-hero-overlay"></div>

        <div className="data-hero-content">
          <span className="data-kicker">
            CHHATTISGARH
          </span>

          <h1>State Data &amp; Statistics</h1>

          <p>
            Explore complete demographic, administrative,
            infrastructure, education, healthcare, agriculture,
            mineral, economy, environment and tourism data
            of Chhattisgarh.
          </p>
        </div>

        <div className="data-hero-symbol">
          📊
        </div>
      </section>

      {/* Search */}
      <section className="data-search-section">
        <div className="data-search-box">
          <span>🔍</span>

          <input
            type="text"
            placeholder="Search data..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {search && (
            <button
              type="button"
              className="data-search-clear"
              onClick={() => setSearch("")}
            >
              ×
            </button>
          )}
        </div>

        {search && !hasSearchResult && (
          <p className="data-search-message">
            No matching data category found.
          </p>
        )}
      </section>

      {/* Quick Statistics */}
      <section className="data-section">
        <div className="data-section-heading">
          <div>
            <span className="data-section-label">
              AT A GLANCE
            </span>

            <h2>Chhattisgarh in Numbers</h2>

            <p>
              Key state-level statistics and information.
            </p>
          </div>
        </div>

        <div className="quick-stats-grid">
          {quickStats.map((item) => (
            <article
              className={`quick-stat-card ${item.color}`}
              key={item.label}
            >
              <div className="quick-stat-icon">
                {item.icon}
              </div>

              <div>
                <strong>
                  {formatValue(item.value)}
                </strong>

                <span>{item.label}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Demography */}
      <section className="data-section">
        <SectionHeading
          label="POPULATION"
          title="Demography"
          description="Population and demographic information of Chhattisgarh."
        />

        <div className="data-card-grid">
          {demographicData
            .filter((item) => matchesSearch(item.title))
            .map((item) => (
              <InfoCard
                key={item.title}
                item={item}
                formatValue={formatValue}
              />
            ))}
        </div>

        {/* Population & Literacy Charts */}
        <div className="charts-grid">

          {/* Population Chart */}
          <div className="chart-card">
            <div className="chart-card-header">
              <div>
                <h3>Population by Gender</h3>
                <p>Chhattisgarh Population Census 2011</p>
              </div>
              <span>👥</span>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={[
                  {
                    category: "Population",
                    Male: data.population?.male || 0,
                    Female: data.population?.female || 0,
                  },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />

                <Bar
  dataKey="Male"
  name="Male Population"
  fill="#4F86F7"
  radius={[8, 8, 0, 0]}
/>

<Bar
  dataKey="Female"
  name="Female Population"
  fill="#F56B8A"
  radius={[8, 8, 0, 0]}
/>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Literacy Chart */}
          <div className="chart-card">
            <div className="chart-card-header">
              <div>
                <h3>Literacy Rate by Gender</h3>
                <p>Literacy rate of population aged 7+</p>
              </div>
              <span>📚</span>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={[
                  {
                    category: "Literacy Rate",
                    Male: data.population?.maleLiteracyRate || 0,
                    Female: data.population?.femaleLiteracyRate || 0,
                  },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />

                <YAxis
                  domain={[0, 100]}
                  tickFormatter={(value) => `${value}%`}
                />

                <Tooltip
                  formatter={(value) => `${value}%`}
                />

                <Legend />

                <Bar
  dataKey="Male"
  name="Male Literacy"
  fill="#22B573"
  radius={[8, 8, 0, 0]}
/>

<Bar
  dataKey="Female"
  name="Female Literacy"
  fill="#F5A623"
  radius={[8, 8, 0, 0]}
/>
              </BarChart>
            </ResponsiveContainer>
          </div>

        </div>
      </section>

      {/* Administration */}
      <section className="data-section">
        <SectionHeading
          label="GOVERNANCE"
          title="Administrative Structure"
          description="Major administrative units of Chhattisgarh."
        />

        <div className="admin-grid">
          {administrationData
            .filter((item) => matchesSearch(item.title))
            .map((item) => (
              <article className="admin-card" key={item.title}>
                <div className="admin-icon">
                  {item.icon}
                </div>

                <div>
                  <strong>
                    {formatValue(item.value)}
                  </strong>

                  <span>{item.title}</span>
                </div>

                <b>→</b>
              </article>
            ))}
        </div>
      </section>

      {/* Transport */}
      <section className="data-section">
        <SectionHeading
          label="CONNECTIVITY"
          title="Transport & Infrastructure"
          description="Important transportation and connectivity information."
        />

        <div className="data-card-grid">
          {transportData
            .filter((item) => matchesSearch(item.title))
            .map((item) => (
              <article
                className="large-info-card"
                key={item.title}
              >
                <div className="large-info-icon">
                  {item.icon}
                </div>

                <div>
                  <h3>{item.title}</h3>

                  <strong>
                    {formatValue(item.value)}
                  </strong>

                  <p>{item.description}</p>
                </div>
              </article>
            ))}
        </div>
      </section>

      {/* Public Services */}
      <section className="data-section">
        <SectionHeading
          label="PUBLIC SERVICES"
          title="Police, Banks & Public Utilities"
          description="Important public service infrastructure."
        />

        <div className="small-stat-grid">
          {publicData
            .filter((item) => matchesSearch(item.title))
            .map((item) => (
              <SmallStatCard
                key={item.title}
                item={item}
                formatValue={formatValue}
              />
            ))}
        </div>
      </section>

      {/* Education */}
      <section className="data-section">
        <SectionHeading
          label="EDUCATION"
          title="Education Infrastructure"
          description="Schools, colleges, universities and technical education."
        />

        <div className="small-stat-grid">
          {educationData
            .filter((item) => matchesSearch(item.title))
            .map((item) => (
              <SmallStatCard
                key={item.title}
                item={item}
                formatValue={formatValue}
              />
            ))}
        </div>
      </section>

      {/* Healthcare */}
      <section className="data-section">
        <SectionHeading
          label="HEALTHCARE"
          title="Healthcare Infrastructure"
          description="Hospitals and healthcare facilities."
        />

        <div className="small-stat-grid">
          {healthcareData
            .filter((item) => matchesSearch(item.title))
            .map((item) => (
              <SmallStatCard
                key={item.title}
                item={item}
                formatValue={formatValue}
              />
            ))}
        </div>
      </section>

      {/* Agriculture */}
<section className="data-section agriculture-section">
  <SectionHeading
    label="AGRICULTURE"
    title="Agriculture & Major Crops"
    description="Important agricultural crops and farming information."
  />

  <div className="small-stat-grid">
    {agricultureData
      .filter((item) => matchesSearch(item.title))
      .map((item) => (
        <SmallStatCard
          key={item.title}
          item={item}
          formatValue={formatValue}
          className="agriculture-card"
        />
      ))}
  </div>
</section>

      {/* Minerals */}
      <section className="data-section mineral-section">
        <SectionHeading
          label="NATURAL RESOURCES"
          title="Minerals & Mining"
          description="Major mineral resources found in Chhattisgarh."
        />

        <div className="small-stat-grid">
          {mineralData
            .filter((item) => matchesSearch(item.title))
            .map((item) => (
              <SmallStatCard
                key={item.title}
                item={item}
                formatValue={formatValue}
                className="mineral-card"
              />
            ))}
        </div>
      </section>

      {/* Economy */}
      <section className="data-section">
        <SectionHeading
          label="ECONOMY"
          title="Industry & Economy"
          description="Important economic and industrial indicators."
        />

        <div className="small-stat-grid">
          {economyData
            .filter((item) => matchesSearch(item.title))
            .map((item) => (
              <SmallStatCard
                key={item.title}
                item={item}
                formatValue={formatValue}
              />
            ))}
        </div>
      </section>

      {/* Environment */}
      <section className="data-section">
        <SectionHeading
          label="ENVIRONMENT"
          title="Forest & Wildlife"
          description="Forest, wildlife and protected-area information."
        />

        <div className="small-stat-grid">
          {environmentData
            .filter((item) => matchesSearch(item.title))
            .map((item) => (
              <SmallStatCard
                key={item.title}
                item={item}
                formatValue={formatValue}
              />
            ))}
        </div>
      </section>

      {/* Tourism */}
      <section className="data-section tourism-data-section">
        <div className="data-section-heading">
          <div>
            <span className="data-section-label">
              TOURISM
            </span>

            <h2>Tourism & Destinations</h2>

            <p>
              Natural, cultural, historical and religious
              attractions of Chhattisgarh.
            </p>
          </div>

          <button
            type="button"
            className="explore-button"
            onClick={() => navigate("/tourism")}
          >
            Explore Tourism
            <span>→</span>
          </button>
        </div>

        <div className="small-stat-grid">
          {tourismData
            .filter((item) => matchesSearch(item.title))
            .map((item) => (
              <SmallStatCard
                key={item.title}
                item={item}
                formatValue={formatValue}
                className="tourism-card"
              />
            ))}
        </div>
      </section>

      {/* Data Information */}
      <section className="data-note-section">
        <div className="data-note-icon">
          ℹ️
        </div>

        <div>
          <h3>About this data</h3>

          <p>
            State statistics can change when government
            departments update their records. Each figure
            should therefore be maintained in data.js along
            with its relevant source and data year.
          </p>
        </div>
      </section>

      {/* Sources */}
      <footer className="data-sources">
        <span className="data-section-label">
          DATA SOURCES
        </span>

        <h2>Official Government Sources</h2>

        <div className="source-list">
          <span>Government of Chhattisgarh</span>
          <span>Revenue & Disaster Management Department</span>
          <span>Census of India</span>
          <span>District Administration</span>
          <span>Chhattisgarh Economic Survey</span>
          <span>Chhattisgarh Tourism Board</span>
        </div>
      </footer>
    </div>
  );
}


/* =========================================
   REUSABLE COMPONENTS
========================================= */

function SectionHeading({
  label,
  title,
  description,
}) {
  return (
    <div className="data-section-heading">
      <div>
        <span className="data-section-label">
          {label}
        </span>

        <h2>{title}</h2>

        <p>{description}</p>
      </div>
    </div>
  );
}


function InfoCard({
  item,
  formatValue,
}) {
  return (
    <article className="info-card">
      <div className="info-card-icon">
        {item.icon}
      </div>

      <div className="info-card-content">
        <span>{item.title}</span>

        <strong>
          {formatValue(item.value)}
        </strong>

        {item.note && (
          <small>{item.note}</small>
        )}
      </div>
    </article>
  );
}


function SmallStatCard({
  item,
  formatValue,
  className = "",
}) {
  return (
    <article
      className={`small-stat-card ${className}`}
    >
      <div>{item.icon}</div>

      <span>{item.title}</span>

      <strong>
        {formatValue(item.value)}
      </strong>
    </article>
  );
}

export default Data;