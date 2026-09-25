import { useEffect, useMemo, useState } from "react";
import "./CGMap.css";

const COLORS = [
  "#F6C85F",
  "#F28E8E",
  "#8FD694",
  "#F4A261",
  "#A8DADC",
  "#B8A9E8",
  "#FFB4A2",
  "#90DBF4",
  "#C3F584",
  "#F7A072",
  "#BDE0FE",
  "#FFC6FF",
  "#FFD166",
  "#B5E48C",
  "#A9DEF9",
  "#E4C1F9",
  "#F8AD9D",
  "#CDE8B5",
  "#9BF6FF",
  "#FDFFB6",
  "#CAFFBF",
  "#FFC8DD",
  "#CDB4DB",
  "#FFAFCC",
  "#D9ED92",
  "#F9C74F",
  "#90BE6D",
  "#F9844A",
  "#43AA8B",
  "#F8961E",
  "#F94144",
  "#7BDFF2",
];

/* =========================================
   NORMALIZE DISTRICT NAME
========================================= */

function normalizeName(name) {
  if (!name) return "";

  return String(name)
    .trim()
    .toLowerCase()
    .replace(/district/g, "")
    .replace(/[^a-z0-9]/g, "");
}

/* =========================================
   CONVERT GEOJSON NAME TO APP NAME

   These names MUST match the keys used
   inside districtData.js
========================================= */

function getAppDistrictName(name) {
  if (!name) return "";

  const normalized = normalizeName(name);

  const aliases = {
    /* Balrampur */
    balrampur: "Balrampur-Ramanujganj",
    balrampurramanujganj: "Balrampur-Ramanujganj",

    /* Gariaband */
    gariaband: "Gariaband",
    gariyaband: "Gariaband",
    gariyabandh: "Gariaband",

    /* Koriya */
    korea: "Koriya",
    koriya: "Koriya",

    /* Gaurela-Pendra-Marwahi */
    gpm: "Gaurela-Pendra-Marwahi",
    gaurelapendramarwahi: "Gaurela-Pendra-Marwahi",

    /* Khairagarh-Chhuikhadan-Gandai */
    kcg: "Khairagarh-Chhuikhadan-Gandai",
    kcgdistrict: "Khairagarh-Chhuikhadan-Gandai",
    khairagarhchhuikhadangandai:
      "Khairagarh-Chhuikhadan-Gandai",

    /* Manendragarh-Chirmiri-Bharatpur */
    mcb: "Manendragarh-Chirmiri-Bharatpur",
    mcbdistrict: "Manendragarh-Chirmiri-Bharatpur",
    manendragarhchirmiribharatpur:
      "Manendragarh-Chirmiri-Bharatpur",

    /* Mohla-Manpur-Ambagarh Chowki */
    mohla: "Mohla-Manpur-Ambagarh Chowki",
    mohlamanpur: "Mohla-Manpur-Ambagarh Chowki",
    mohlamanpurambagarhchowki:
      "Mohla-Manpur-Ambagarh Chowki",

    /* Sarangarh-Bilaigarh */
    sarangarh: "Sarangarh-Bilaigarh",
    sarangarhbilaigarh:
      "Sarangarh-Bilaigarh",

    /* Baloda Bazar */
    balodabazar: "Baloda Bazar",
    balodabazarbhatapara:
      "Baloda Bazar-Bhatapara",

    /* Janjgir-Champa */
    janjgir: "Janjgir-Champa",
    janjgirchampa: "Janjgir-Champa",

    /* Kanker */
    kanker: "Kanker",
    uttarbastarkanker: "Kanker",

    /* Dantewada */
    dantewada: "Dantewada",
    dakshinbastardantewada: "Dantewada",
  };

  return aliases[normalized] || String(name).trim();
}

/* =========================================
   GET DISTRICT NAME FROM GEOJSON FEATURE
========================================= */

function getDistrictName(feature) {
  const properties = feature?.properties || {};

  return (
    properties.name ||
    properties.NAME ||
    properties.Name ||
    properties.district ||
    properties.DISTRICT ||
    properties.District ||
    properties.lgd_districtname ||
    properties.LGD_DISTRICTNAME ||
    properties.censusname ||
    properties.NAME_2 ||
    properties.Dist ||
    properties.dtname ||
    "Unknown District"
  );
}

/* =========================================
   DISPLAY NAME ON MAP
========================================= */

function displayDistrictName(name) {
  const shortNames = {
    "Balrampur-Ramanujganj": "BALRAMPUR",

    "Gaurela-Pendra-Marwahi": "GPM",

    "Khairagarh-Chhuikhadan-Gandai": "KCG",

    "Manendragarh-Chirmiri-Bharatpur": "MCB",

    "Mohla-Manpur-Ambagarh Chowki":
      "MOHLA-MANPUR",

    "Sarangarh-Bilaigarh":
      "SARANGARH",

    "Baloda Bazar-Bhatapara":
      "BALODA BAZAR",

    "Baloda Bazar":
      "BALODA BAZAR",

    "Janjgir-Champa":
      "JANJGIR\nCHAMPA",

    Balod: "BALOD",
    Bastar: "BASTAR",
    Bemetara: "BEMETARA",
    Bijapur: "BIJAPUR",
    Bilaspur: "BILASPUR",
    Dhamtari: "DHAMTARI",
    Dantewada: "DANTEWADA",
    Durg: "DURG",
    Gariaband: "GARIABAND",
    Jashpur: "JASHPUR",
    Kanker: "KANKER",
    Kabirdham: "KABIRDHAM",
    Kondagaon: "KONDAGAON",
    Koriya: "KORIYA",
    Korba: "KORBA",
    Mahasamund: "MAHASAMUND",
    Mungeli: "MUNGELI",
    Narayanpur: "NARAYANPUR",
    Raigarh: "RAIGARH",
    Raipur: "RAIPUR",
    Rajnandgaon: "RAJNANDGAON",
    Sakti: "SAKTI",
    Sukma: "SUKMA",
    Surajpur: "SURAJPUR",
    Surguja: "SURGUJA",
  };

  return shortNames[name] || String(name).toUpperCase();
}

/* =========================================
   EXTRACT ALL COORDINATES
========================================= */

function extractCoordinates(coordinates, result = []) {
  if (!Array.isArray(coordinates)) {
    return result;
  }

  if (
    coordinates.length >= 2 &&
    typeof coordinates[0] === "number" &&
    typeof coordinates[1] === "number"
  ) {
    result.push([
      coordinates[0],
      coordinates[1],
    ]);

    return result;
  }

  coordinates.forEach((item) => {
    extractCoordinates(item, result);
  });

  return result;
}

/* =========================================
   CREATE SVG PATH FROM GEOJSON
========================================= */

function createSvgPath(geometry, projectPoint) {
  if (!geometry) {
    return "";
  }

  const { type, coordinates } = geometry;

  if (type === "Polygon") {
    return coordinates
      .map((ring) => {
        return (
          ring
            .map((point, index) => {
              const [x, y] = projectPoint(point);

              return `${index === 0 ? "M" : "L"} ${x.toFixed(
                2
              )} ${y.toFixed(2)}`;
            })
            .join(" ") + " Z"
        );
      })
      .join(" ");
  }

  if (type === "MultiPolygon") {
    return coordinates
      .map((polygon) => {
        return polygon
          .map((ring) => {
            return (
              ring
                .map((point, index) => {
                  const [x, y] = projectPoint(point);

                  return `${index === 0 ? "M" : "L"} ${x.toFixed(
                    2
                  )} ${y.toFixed(2)}`;
                })
                .join(" ") + " Z"
            );
          })
          .join(" ");
      })
      .join(" ");
  }

  return "";
}

/* =========================================
   CG MAP COMPONENT
========================================= */

function CGMap({
  selectedDistrict,
  onDistrictClick,
}) {
  const [geoData, setGeoData] = useState(null);
  const [hoveredDistrict, setHoveredDistrict] =
    useState(null);
  const [error, setError] = useState("");

  /* =========================================
     LOAD GEOJSON
  ========================================= */

  useEffect(() => {
    let mounted = true;

    async function loadGeoJSON() {
      try {
        setError("");

        const response = await fetch(
          "/chhattisgarh-districts.geojson",
          {
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error(
            `GeoJSON loading failed: ${response.status}`
          );
        }

        const data = await response.json();

        if (
          data?.type !== "FeatureCollection" ||
          !Array.isArray(data.features) ||
          data.features.length === 0
        ) {
          throw new Error(
            "Invalid Chhattisgarh GeoJSON"
          );
        }

        if (!mounted) {
          return;
        }

        console.log(
          "CHHATTISGARH DISTRICT COUNT:",
          data.features.length
        );

        console.log(
          "RAW DISTRICT NAMES:",
          data.features.map(getDistrictName)
        );

        console.log(
          "APP DISTRICT NAMES:",
          data.features.map((feature) =>
            getAppDistrictName(
              getDistrictName(feature)
            )
          )
        );

        setGeoData(data);
      } catch (err) {
        console.error(
          "Chhattisgarh map error:",
          err
        );

        if (mounted) {
          setError(
            "Unable to load Chhattisgarh district map."
          );
        }
      }
    }

    loadGeoJSON();

    return () => {
      mounted = false;
    };
  }, []);

  /* =========================================
     FILTER VALID FEATURES
  ========================================= */

  const features = useMemo(() => {
    if (!geoData?.features) {
      return [];
    }

    return geoData.features.filter((feature) => {
      const name = getDistrictName(feature);

      return (
        name &&
        name !== "Unknown District" &&
        feature?.geometry
      );
    });
  }, [geoData]);

  /* =========================================
     CALCULATE MAP
  ========================================= */

  const mapData = useMemo(() => {
    if (!features.length) {
      return null;
    }

    const allCoordinates = [];

    features.forEach((feature) => {
      extractCoordinates(
        feature.geometry?.coordinates,
        allCoordinates
      );
    });

    if (!allCoordinates.length) {
      return null;
    }

    let minLon = Infinity;
    let maxLon = -Infinity;
    let minLat = Infinity;
    let maxLat = -Infinity;

    allCoordinates.forEach(([lon, lat]) => {
      if (lon < minLon) {
        minLon = lon;
      }

      if (lon > maxLon) {
        maxLon = lon;
      }

      if (lat < minLat) {
        minLat = lat;
      }

      if (lat > maxLat) {
        maxLat = lat;
      }
    });

    const SVG_WIDTH = 620;
    const SVG_HEIGHT = 680;
    const PADDING = 45;

    const mapWidth =
      SVG_WIDTH - PADDING * 2;

    const mapHeight =
      SVG_HEIGHT - PADDING * 2;

    const lonRange = maxLon - minLon;
    const latRange = maxLat - minLat;

    if (
      !Number.isFinite(lonRange) ||
      !Number.isFinite(latRange) ||
      lonRange <= 0 ||
      latRange <= 0
    ) {
      return null;
    }

    const scaleX =
      mapWidth / lonRange;

    const scaleY =
      mapHeight / latRange;

    const scale = Math.min(
      scaleX,
      scaleY
    );

    const actualWidth =
      lonRange * scale;

    const actualHeight =
      latRange * scale;

    const offsetX =
      (SVG_WIDTH - actualWidth) / 2;

    const offsetY =
      (SVG_HEIGHT - actualHeight) / 2;

    const projectPoint = (point) => {
      const [lon, lat] = point;

      const x =
        offsetX +
        (lon - minLon) * scale;

      const y =
        offsetY +
        (maxLat - lat) * scale;

      return [x, y];
    };

    const projectedFeatures =
      features.map((feature, index) => {
        const path = createSvgPath(
          feature.geometry,
          projectPoint
        );

        const coords = extractCoordinates(
          feature.geometry?.coordinates,
          []
        );

        let centerX = 0;
        let centerY = 0;

        if (coords.length) {
          coords.forEach(([lon, lat]) => {
            const [x, y] =
              projectPoint([
                lon,
                lat,
              ]);

            centerX += x;
            centerY += y;
          });

          centerX =
            centerX / coords.length;

          centerY =
            centerY / coords.length;
        }

        return {
          feature,
          path,
          center: [
            centerX,
            centerY,
          ],
          index,
        };
      });

    return {
      projectedFeatures,
      bounds: {
        minLon,
        maxLon,
        minLat,
        maxLat,
      },
    };
  }, [features]);

  /* =========================================
     ERROR UI
  ========================================= */

  if (error) {
    return (
      <div className="cg-map-container">
        <div className="cg-map-error">
          <div className="cg-error-icon">
            !
          </div>

          <h3>Map Loading Error</h3>

          <p>{error}</p>

          <small>
            Please check the GeoJSON file.
          </small>
        </div>
      </div>
    );
  }

  /* =========================================
     LOADING UI
  ========================================= */

  if (
    !geoData ||
    !features.length ||
    !mapData
  ) {
    return (
      <div className="cg-map-container">
        <div className="cg-map-loading">
          <div className="cg-loader"></div>

          <span>
            Loading Chhattisgarh districts...
          </span>
        </div>
      </div>
    );
  }

  /* =========================================
     HANDLE DISTRICT CLICK
  ========================================= */

  const handleDistrictClick = (districtName) => {
  console.log("DISTRICT CLICKED:", districtName);

  const appDistrictName =
    districtNameMap[districtName] || districtName;

  console.log("APP DISTRICT NAME:", appDistrictName);

  onDistrictClick(appDistrictName);
};
const districtNameMap = {
  "Khairgarh Chhuikhadan Gandai":
    "Khairagarh-Chhuikhadan-Gandai",

  "Gaurella Pendra Marwahi":
    "Gaurela-Pendra-Marwahi",

  "Manendragarh Chirimiri Bharatpur":
    "Manendragarh-Chirmiri-Bharatpur",

  "Mohla Manpur Ambagarh Chouki":
    "Mohla-Manpur-Ambagarh Chowki",

  "Sarangarh Bilaigarh":
    "Sarangarh-Bilaigarh",

  "Balrampur":
    "Balrampur-Ramanujganj",

  "Korea":
    "Koriya",
  "Gariyaband": "Gariaband",
};
  /* =========================================
     RENDER
  ========================================= */

  return (
    <div className="cg-map-container">

      {/* HEADER */}

      <div className="cg-map-heading">
        <div className="cg-map-title">

          <div className="cg-map-logo">
            CG
          </div>

          <div>
            <span className="cg-map-label">
              THE DHAN KA KATORA
            </span>

            <h3>
              Chhattisgarh
            </h3>

            <p>
              छत्तीसगढ़ के 33 जिले
            </p>
          </div>

        </div>

        <div className="cg-map-count">
          {features.length} DISTRICTS
        </div>
      </div>

      {/* MAP AREA */}

      <div className="cg-map-area">

        <div className="cg-map-watermark">
          CG
        </div>

        <svg
          className="cg-map-svg"
          viewBox="0 0 620 680"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Interactive map of Chhattisgarh districts"
        >

          <g className="cg-district-layer">

            {mapData.projectedFeatures.map(
              ({
                feature,
                path,
                center,
                index,
              }) => {

                const rawName =
                  getDistrictName(
                    feature
                  );

                const districtName =
                  getAppDistrictName(
                    rawName
                  );

                const normalized =
                  normalizeName(
                    districtName
                  );

                const isSelected =
                  normalized ===
                  normalizeName(
                    selectedDistrict || ""
                  );

                const isHovered =
                  normalized ===
                  normalizeName(
                    hoveredDistrict || ""
                  );

                return (
                  <g
                    key={`${normalized}-${index}`}
                    className={`cg-district ${
                      isSelected
                        ? "is-selected"
                        : ""
                    } ${
                      isHovered
                        ? "is-hovered"
                        : ""
                    }`}
                    onMouseEnter={() =>
                      setHoveredDistrict(
                        districtName
                      )
                    }
                    onMouseLeave={() =>
                      setHoveredDistrict(
                        null
                      )
                    }
                    onClick={() =>
                      handleDistrictClick(
                        rawName
                      )
                    }
                    onKeyDown={(event) => {
                      if (
                        event.key === "Enter" ||
                        event.key === " "
                      ) {
                        event.preventDefault();

                        handleDistrictClick(
                          rawName
                        );
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`View ${districtName} details`}
                  >

                    <path
                      d={path}
                      className="cg-district-path"
                      fill={
                        isSelected
                          ? "#2563EB"
                          : isHovered
                          ? "#70C968"
                          : COLORS[
                              index %
                                COLORS.length
                            ]
                      }
                    />

                    <text
                      x={center[0]}
                      y={center[1]}
                      className={`cg-district-name ${
                        isSelected
                          ? "selected-label"
                          : ""
                      }`}
                      textAnchor="middle"
                    >
                      {displayDistrictName(
                        districtName
                      )
                        .split("\n")
                        .map(
                          (
                            line,
                            lineIndex
                          ) => (
                            <tspan
                              key={lineIndex}
                              x={center[0]}
                              dy={
                                lineIndex === 0
                                  ? 0
                                  : 11
                              }
                            >
                              {line}
                            </tspan>
                          )
                        )}
                    </text>

                  </g>
                );
              }
            )}

          </g>

        </svg>

        {/* NORTH ARROW */}

        <div className="cg-north">
          <span>N</span>

          <div className="north-arrow">
            ▲
          </div>
        </div>

        {/* TOOLTIP */}

        {hoveredDistrict && (
          <div className="cg-map-tooltip">
            <span>
              DISTRICT
            </span>

            <strong>
              {hoveredDistrict}
            </strong>

            <small>
              Click to view details
            </small>
          </div>
        )}

      </div>

      {/* FOOTER */}

      <div className="cg-map-footer">

        <div className="cg-map-hint">
          <span className="cg-map-dot"></span>

          <span>
            Click a district to
            explore details
          </span>
        </div>

        <div className="cg-map-footer-right">

          <span>
            🌾 छत्तीसगढ़
          </span>

          <strong>
            {features.length} Districts
          </strong>

        </div>

      </div>

    </div>
  );
}

export default CGMap;