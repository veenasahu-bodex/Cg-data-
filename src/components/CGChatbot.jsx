import { useState } from "react";

import * as districtModule from "../data/districtData";
import * as stateModule from "../data/data";
import * as foodModule from "../data/foodData";
import * as tourismModule from "../data/tourismData";

import "./CGChatbot.css";

/* =========================================================
   DATA LOADERS
========================================================= */

function getModuleData(module) {
  if (!module) return {};

  if (module.default) {
    return module.default;
  }

  const keys = Object.keys(module);

  if (keys.length === 1) {
    return module[keys[0]];
  }

  return module;
}

const districtData = getModuleData(districtModule);
const stateData = getModuleData(stateModule);
const foodData = getModuleData(foodModule);
const tourismData = getModuleData(tourismModule);

/* =========================================================
   HELPERS
========================================================= */

function normalizeText(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9\u0900-\u097f\s-]/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function compactText(value) {
  return normalizeText(value).replace(/[\s-]/g, "");
}

function safeStringify(value) {
  try {
    return JSON.stringify(value);
  } catch {
    return "";
  }
}

function hasAnyWord(question, words) {
  const q = normalizeText(question);

  return words.some((word) => {
    const w = normalizeText(word);

    if (!w) return false;

    return q.includes(w);
  });
}

/* =========================================================
   DISTRICT ALIASES
========================================================= */

const districtAliases = {
  balod: "Balod",

  durg: "Durg",

  raipur: "Raipur",

  bilaspur: "Bilaspur",

  rajnandgaon: "Rajnandgaon",

  dhamtari: "Dhamtari",

  korba: "Korba",

  kanker: "Kanker",

  bastar: "Bastar",

  kabirdham: "Kabirdham",

  kawardha: "Kabirdham",

  raigarh: "Raigarh",

  janjgir: "Janjgir-Champa",

  "janjgir champa": "Janjgir-Champa",

  "janjgir-champa": "Janjgir-Champa",

  koriya: "Koriya",

  surguja: "Surguja",

  mahasamund: "Mahasamund",

  "baloda bazar": "Baloda Bazar",

  balodabazar: "Baloda Bazar",

  bemetara: "Bemetara",

  jashpur: "Jashpur",

  narayanpur: "Narayanpur",

  dantewada: "Dantewada",

  bijapur: "Bijapur",

  kondagaon: "Kondagaon",

  balrampur: "Balrampur-Ramanujganj",

  "balrampur ramanujganj": "Balrampur-Ramanujganj",

  "balrampur-ramanujganj": "Balrampur-Ramanujganj",

  surajpur: "Surajpur",

  mungeli: "Mungeli",

  gariaband: "Gariaband",

  sukma: "Sukma",

  "khairagarh chhuikhadan gandai":
    "Khairagarh-Chhuikhadan-Gandai",

  "khairagarh-chhuikhadan-gandai":
    "Khairagarh-Chhuikhadan-Gandai",

  khairagarh: "Khairagarh-Chhuikhadan-Gandai",

  sakti: "Sakti",

  "sarangarh bilaigarh": "Sarangarh-Bilaigarh",

  "sarangarh-bilaigarh": "Sarangarh-Bilaigarh",

  "mohla manpur ambagarh chowki":
    "Mohla-Manpur-Ambagarh Chowki",

  "mohla-manpur-ambagarh chowki":
    "Mohla-Manpur-Ambagarh Chowki",

  mohalla: "Mohla-Manpur-Ambagarh Chowki",

  "gaurela pendra marwahi":
    "Gaurela-Pendra-Marwahi",

  "gaurela-pendra-marwahi":
    "Gaurela-Pendra-Marwahi",

  gpm: "Gaurela-Pendra-Marwahi",

  "manendragarh chirmiri bharatpur":
    "Manendragarh-Chirmiri-Bharatpur",

  "manendragarh-chirmiri-bharatpur":
    "Manendragarh-Chirmiri-Bharatpur",

  mcb: "Manendragarh-Chirmiri-Bharatpur",
};

function findDistrict(question) {
  const q = normalizeText(question);

  const compactQuestion = compactText(question);

  const aliases = Object.keys(districtAliases).sort(
    (a, b) => b.length - a.length
  );

  for (const alias of aliases) {
    const normalAlias = normalizeText(alias);

    const compactAlias = compactText(alias);

    if (
      q.includes(normalAlias) ||
      compactQuestion.includes(compactAlias)
    ) {
      return districtAliases[alias];
    }
  }

  const districtKeys = Object.keys(districtData || {});

  for (const key of districtKeys) {
    const normalKey = normalizeText(key);

    const compactKey = compactText(key);

    if (
      q.includes(normalKey) ||
      compactQuestion.includes(compactKey)
    ) {
      return key;
    }
  }

  return null;
}

/* =========================================================
   LANGUAGE DETECTION
========================================================= */

function detectLanguage(question) {
  const q = normalizeText(question);

  if (/[\u0900-\u097f]/.test(question)) {
    return "hindi";
  }

  const chhattisgarhiWords = [
    "katka",
    "katek",
    "havay",
    "haway",
    "haw",
    "hav",
    "bar",
    "karath",
    "karathe",
    "karat",
    "mor",
    "tor",
    "hamar",
    "tumhan",
    "mola",
    "tola",
    "kabar",
    "bataw",
    "ghume",
    "ghumey",
    "dekhe",
    "nai",
    "hae",
  ];

  const hindiWords = [
    "kitna",
    "kitne",
    "kitni",
    "kahan",
    "kahaan",
    "kaun",
    "kab",
    "kyun",
    "kyon",
    "kya",
    "mein",
    "me",
    "hai",
    "hain",
    "jila",
    "jile",
    "gaon",
    "gaav",
    "jansankhya",
    "aspatal",
    "school",
    "college",
    "police",
    "batao",
    "bataiye",
    "naam",
    "name",
  ];

  const cgScore = chhattisgarhiWords.filter((word) =>
    q.includes(word)
  ).length;

  const hindiScore = hindiWords.filter((word) =>
    q.includes(word)
  ).length;

  if (cgScore > hindiScore && cgScore > 0) {
    return "chhattisgarhi";
  }

  if (hindiScore > 0) {
    return "hindi";
  }

  return "english";
}

/* =========================================================
   QUESTION TYPES
========================================================= */

function asksTehsil(question) {
  return hasAnyWord(question, [
    "tehsil",
    "tehsils",
    "तहसील",
  ]);
}

function asksVillage(question) {
  return hasAnyWord(question, [
    "village",
    "villages",
    "gaon",
    "gaav",
    "गांव",
    "गाँव",
  ]);
}

function asksBlock(question) {
  return hasAnyWord(question, [
    "block",
    "blocks",
    "vikas khand",
    "ब्लॉक",
    "विकासखंड",
  ]);
}

function asksGramPanchayat(question) {
  return hasAnyWord(question, [
    "gram panchayat",
    "gram panchayats",
    "panchayat",
    "panchayats",
    "ग्राम पंचायत",
    "पंचायत",
  ]);
}

function asksCity(question) {
  return hasAnyWord(question, [
    "city",
    "cities",
    "city name",
    "cities name",
    "शहर",
  ]);
}

function asksPolice(question) {
  return hasAnyWord(question, [
    "police station",
    "police stations",
    "police",
    "thana",
    "thanas",
    "थाना",
    "पुलिस स्टेशन",
  ]);
}

function asksCollege(question) {
  return hasAnyWord(question, [
    "college",
    "colleges",
    "महाविद्यालय",
    "कॉलेज",
  ]);
}

function asksUniversity(question) {
  return hasAnyWord(question, [
    "university",
    "universities",
    "विश्वविद्यालय",
  ]);
}

function asksRailway(question) {
  return hasAnyWord(question, [
    "railway",
    "railway station",
    "railway stations",
    "रेलवे",
    "रेलवे स्टेशन",
  ]);
}

function asksHospital(question) {
  return hasAnyWord(question, [
    "hospital",
    "hospitals",
    "अस्पताल",
  ]);
}

function asksMedicalCollege(question) {
  return hasAnyWord(question, [
    "medical college",
    "medical colleges",
    "मेडिकल कॉलेज",
  ]);
}

function asksSchool(question) {
  return hasAnyWord(question, [
    "school",
    "schools",
    "विद्यालय",
    "स्कूल",
  ]);
}

function asksTourism(question) {
  return hasAnyWord(question, [
    "tourism",
    "tourist",
    "tourist place",
    "tourist places",
    "tourism place",
    "tourism places",
    "places to visit",
    "places to see",
    "tourist spot",
    "tourist spots",
    "ghumne",
    "ghumney",
    "ghumne ki jagah",
    "ghumey ke jagah",
    "घूमने",
    "पर्यटन",
    "पर्यटन स्थल",
  ]);
}

function asksFood(question) {
  return hasAnyWord(question, [
    "food",
    "foods",
    "famous food",
    "famous foods",
    "dish",
    "dishes",
    "खाना",
    "भोजन",
    "व्यंजन",
  ]);
}

/* =========================================================
   STATE LEVEL QUESTION
========================================================= */

function isStateLevelQuestion(question) {
  const q = normalizeText(question);
  const compact = compactText(question);

  /*
    Different spellings of Chhattisgarh
  */

  const stateNames = [
    "chhattisgarh",
    "chhatisgarh",
    "chattisgarh",
    "chhattis garh",
    "chhatis garh",
    "chattis garh",
    "छत्तीसगढ़",
    "छत्तीसगढ़",
    "cg",
  ];

  const hasStateName = stateNames.some((name) => {
    const normalName = normalizeText(name);
    const compactName = compactText(name);

    return (
      q.includes(normalName) ||
      compact.includes(compactName)
    );
  });

  /*
    State-level tourism phrases
  */

  const stateTourismPhrases = [
    "tourism places",
    "tourist places",
    "tourism place",
    "tourist place",
    "tourist spots",
    "tourist spot",
    "tourism",
    "tourist",
    "places to visit",
    "places to see",
    "ghumne ki jagah",
    "ghumney ki jagah",
    "ghumey ke jagah",
    "ghumne ke jagah",
    "पर्यटन",
    "पर्यटन स्थल",
    "घूमने की जगह",
  ];

  const hasTourismPhrase = stateTourismPhrases.some(
    (phrase) => q.includes(normalizeText(phrase))
  );

  /*
    State-level food phrases
  */

  const stateFoodPhrases = [
    "famous food",
    "famous foods",
    "food in cg",
    "food of cg",
    "cg food",
    "food in chhattisgarh",
    "food of chhattisgarh",
    "छत्तीसगढ़ का खाना",
    "छत्तीसगढ़ के व्यंजन",
  ];

  const hasFoodPhrase = stateFoodPhrases.some(
    (phrase) => q.includes(normalizeText(phrase))
  );

  /*
    Exact generic queries
  */

  const genericStateQueries = [
    "tourism places",
    "tourist places",
    "tourism place",
    "tourist place",
    "famous food",
    "famous foods",
    "food in cg",
    "famous food in cg",
    "cg tourism",
    "cg tourist places",
    "cg tourism places",
  ];

  const isGenericStateQuery =
    genericStateQueries.includes(q);

  return (
    hasStateName ||
    (hasTourismPhrase && !findDistrict(question)) ||
    (hasFoodPhrase && !findDistrict(question)) ||
    isGenericStateQuery
  );
}

/* =========================================================
   OBJECT DISPLAY NAME
========================================================= */

function looksLikeImageOrFile(value) {
  const text = String(value || "").toLowerCase();

  return (
    text.includes("%20") ||
    text.includes("%28") ||
    text.includes("%29") ||
    text.includes("file:") ||
    text.endsWith(".jpg") ||
    text.endsWith(".jpeg") ||
    text.endsWith(".png") ||
    text.endsWith(".webp") ||
    text.endsWith(".gif") ||
    text.includes("image/")
  );
}

function getObjectDisplayName(item) {
  if (item === null || item === undefined) {
    return null;
  }

  if (
    typeof item === "string" ||
    typeof item === "number"
  ) {
    const value = String(item).trim();

    if (
      !value ||
      looksLikeImageOrFile(value)
    ) {
      return null;
    }

    return value;
  }

  if (typeof item !== "object") {
    return null;
  }

  const possibleKeys = [
    "name",
    "title",
    "placeName",
    "place",
    "foodName",
    "food",
    "dish",
    "dishName",
    "touristPlace",
    "touristPlaceName",
    "location",
    "label",
  ];

  for (const key of possibleKeys) {
    if (
      item[key] !== undefined &&
      item[key] !== null
    ) {
      const value = String(item[key]).trim();

      if (
        value &&
        !looksLikeImageOrFile(value)
      ) {
        return value;
      }
    }
  }

  return null;
}

/* =========================================================
   LIST FORMATTER
========================================================= */

function formatListValues(values) {
  if (!Array.isArray(values)) {
    return [];
  }

  return values
    .map((item) => getObjectDisplayName(item))
    .filter(Boolean);
}

/* =========================================================
   FOOD EXTRACTION
========================================================= */

function extractFoodItems(data) {
  const results = [];

  function addArray(arr) {
    if (!Array.isArray(arr)) return;

    arr.forEach((item) => {
      const name = getObjectDisplayName(item);

      if (name) {
        results.push(name);
      }
    });
  }

  if (Array.isArray(data)) {
    addArray(data);
  }

  if (
    data &&
    typeof data === "object"
  ) {
    const keys = [
      "foods",
      "food",
      "famousFoods",
      "famousFood",
      "dishes",
      "items",
      "foodItems",
      "traditionalFoods",
    ];

    keys.forEach((key) => {
      if (Array.isArray(data[key])) {
        addArray(data[key]);
      }
    });

    Object.values(data).forEach((value) => {
      if (Array.isArray(value)) {
        addArray(value);
      }
    });
  }

  return [...new Set(results)];
}

/* =========================================================
   TOURISM EXTRACTION
========================================================= */

function extractTouristNames(data) {
  const results = [];

  function addArray(arr) {
    if (!Array.isArray(arr)) return;

    arr.forEach((item) => {
      const name = getObjectDisplayName(item);

      if (name) {
        results.push(name);
      }
    });
  }

  if (Array.isArray(data)) {
    addArray(data);
  }

  if (
    data &&
    typeof data === "object"
  ) {
    const keys = [
      "tourism",
      "touristPlaces",
      "touristplaces",
      "tourist",
      "places",
      "placesToVisit",
      "destinations",
      "attractions",
    ];

    keys.forEach((key) => {
      if (Array.isArray(data[key])) {
        addArray(data[key]);
      }
    });

    Object.values(data).forEach((value) => {
      if (Array.isArray(value)) {
        addArray(value);
      }
    });
  }

  return [...new Set(results)];
}

/* =========================================================
   DIRECT DISTRICT FACTS
========================================================= */

function getDirectDistrictFacts(district) {
  const data = districtData?.[district];

  if (!data) {
    return {};
  }

  const facts = {};

  if (asksTehsil) {
    if (Array.isArray(data.tehsils)) {
      facts.tehsils = data.tehsils;
      facts.totalTehsils = data.tehsils.length;
    }
  }

  if (asksVillage) {
    if (data.villages !== undefined) {
      facts.villages = data.villages;
    }
  }

  if (asksBlock) {
    if (Array.isArray(data.blocks)) {
      facts.blocks = data.blocks;
      facts.totalBlocks = data.blocks.length;
    }
  }

  if (asksGramPanchayat) {
    if (data.gramPanchayats !== undefined) {
      facts.gramPanchayats =
        data.gramPanchayats;
    }
  }

  if (asksCity) {
    if (Array.isArray(data.cities)) {
      facts.cities = data.cities;
      facts.totalCities = data.cities.length;
    }
  }

  if (asksPolice) {
    if (
      Array.isArray(
        data.policeStationNames
      )
    ) {
      facts.policeStationNames =
        data.policeStationNames;
    }

    if (
      data.policeStations !== undefined
    ) {
      facts.policeStations =
        data.policeStations;
    }
  }

  if (asksCollege) {
    if (Array.isArray(data.colleges)) {
      facts.colleges = data.colleges;
      facts.totalColleges =
        data.colleges.length;
    }

    if (data.collegeCount !== undefined) {
      facts.collegeCount =
        data.collegeCount;
    }
  }

  if (asksUniversity) {
    if (
      Array.isArray(data.universities)
    ) {
      facts.universities =
        data.universities;

      facts.totalUniversities =
        data.universities.length;
    }
  }

  if (asksRailway) {
    if (
      Array.isArray(
        data.railwayStations
      )
    ) {
      facts.railwayStations =
        data.railwayStations;

      facts.totalRailwayStations =
        data.railwayStations.length;
    }
  }

  if (asksHospital) {
    if (Array.isArray(data.hospitals)) {
      facts.hospitals =
        data.hospitals;
    }
  }

  if (asksMedicalCollege) {
    if (
      Array.isArray(
        data.medicalColleges
      )
    ) {
      facts.medicalColleges =
        data.medicalColleges;
    }
  }

  if (asksSchool) {
    if (
      data.governmentSchools !==
      undefined
    ) {
      facts.governmentSchools =
        data.governmentSchools;
    }

    if (
      data.privateSchools !==
      undefined
    ) {
      facts.privateSchools =
        data.privateSchools;
    }
  }

  if (asksTourism) {
    if (
      Array.isArray(
        data.touristPlaces
      )
    ) {
      facts.touristPlaces =
        data.touristPlaces;

      facts.totalTouristPlaces =
        data.touristPlaces.length;
    }
  }

  if (data.headquarters !== undefined) {
    facts.headquarters =
      data.headquarters;
  }

  if (data.population !== undefined) {
    facts.population =
      data.population;
  }

  if (data.area !== undefined) {
    facts.area =
      data.area;
  }

  if (data.collector !== undefined) {
    facts.collector =
      data.collector;
  }

  if (
    data.officialWebsite !==
    undefined
  ) {
    facts.officialWebsite =
      data.officialWebsite;
  }

  return facts;
}

/* =========================================================
   DIRECT DISTRICT ANSWER
========================================================= */

function getDirectDistrictAnswer(
  question,
  district,
  language
) {
  if (!district) {
    return null;
  }

  const data =
    districtData?.[district];

  if (!data) {
    return null;
  }

  const isHindi =
    language === "hindi";

  const isCG =
    language === "chhattisgarhi";

  /* TEHSIL */

  if (asksTehsil(question)) {
    const tehsils =
      Array.isArray(data.tehsils)
        ? data.tehsils
        : [];

    if (tehsils.length > 0) {
      if (isCG) {
        return `${district} jila ke tehsil:\n- ${tehsils.join(
          "\n- "
        )}`;
      }

      if (isHindi) {
        return `${district} जिले में ${tehsils.length} तहसील हैं:\n- ${tehsils.join(
          "\n- "
        )}`;
      }

      return `${district} has ${tehsils.length} tehsils:\n- ${tehsils.join(
        "\n- "
      )}`;
    }

    return isHindi
      ? `${district} जिले की तहसील की जानकारी उपलब्ध नहीं है।`
      : `${district} tehsil information is not available.`;
  }

  /* VILLAGES */

  if (asksVillage(question)) {
    if (data.villages !== undefined) {
      if (isCG) {
        return `${district} ma ${data.villages} gaon hae.`;
      }

      if (isHindi) {
        return `${district} में ${data.villages} गाँव हैं।`;
      }

      return `There are ${data.villages} villages in ${district}.`;
    }

    return isHindi
      ? `${district} जिले के गाँवों की जानकारी उपलब्ध नहीं है।`
      : `${district} village information is not available.`;
  }

  /* GRAM PANCHAYAT */

  if (asksGramPanchayat(question)) {
    if (
      data.gramPanchayats !==
      undefined
    ) {
      if (isCG) {
        return `${district} ma ${data.gramPanchayats} gram panchayat hae.`;
      }

      if (isHindi) {
        return `${district} में ${data.gramPanchayats} ग्राम पंचायतें हैं।`;
      }

      return `${district} has ${data.gramPanchayats} gram panchayats.`;
    }

    return isHindi
      ? `${district} जिले की ग्राम पंचायत की जानकारी उपलब्ध नहीं है।`
      : `${district} gram panchayat information is not available.`;
  }

  /* BLOCK */

  if (asksBlock(question)) {
    const blocks =
      Array.isArray(data.blocks)
        ? data.blocks
        : [];

    if (blocks.length > 0) {
      if (isCG) {
        return `${district} jila ke block:\n- ${blocks.join(
          "\n- "
        )}`;
      }

      if (isHindi) {
        return `${district} जिले में ${blocks.length} ब्लॉक हैं:\n- ${blocks.join(
          "\n- "
        )}`;
      }

      return `${district} has ${blocks.length} blocks:\n- ${blocks.join(
        "\n- "
      )}`;
    }

    return isHindi
      ? `${district} जिले के ब्लॉक की जानकारी उपलब्ध नहीं है।`
      : `${district} block information is not available.`;
  }

  /* CITIES */

  if (asksCity(question)) {
    const cities =
      Array.isArray(data.cities)
        ? data.cities
        : [];

    if (cities.length > 0) {
      if (isCG) {
        return `${district} jila ke city:\n- ${cities.join(
          "\n- "
        )}`;
      }

      if (isHindi) {
        return `${district} जिले के शहर:\n- ${cities.join(
          "\n- "
        )}`;
      }

      return `${district} has ${cities.length} cities:\n- ${cities.join(
        "\n- "
      )}`;
    }

    return isHindi
      ? `${district} जिले के शहरों की जानकारी उपलब्ध नहीं है।`
      : `${district} city information is not available.`;
  }

  /* POLICE */

  if (asksPolice(question)) {
    const names =
      formatListValues(
        data.policeStationNames
      );

    if (names.length > 0) {
      if (isHindi) {
        return `${district} जिले के पुलिस स्टेशन:\n- ${names.join(
          "\n- "
        )}`;
      }

      return `Police stations in ${district}:\n- ${names.join(
        "\n- "
      )}`;
    }

    if (
      data.policeStations !==
      undefined
    ) {
      if (isHindi) {
        return `${district} जिले में ${data.policeStations} पुलिस स्टेशन हैं।`;
      }

      return `${district} has ${data.policeStations} police stations.`;
    }

    return null;
  }

  /* COLLEGES */

  if (asksCollege(question)) {
    const colleges =
      formatListValues(
        data.colleges
      );

    if (colleges.length > 0) {
      if (isHindi) {
        return `${district} जिले के कॉलेज:\n- ${colleges.join(
          "\n- "
        )}`;
      }

      return `Colleges in ${district}:\n- ${colleges.join(
        "\n- "
      )}`;
    }

    if (
      data.collegeCount !==
      undefined
    ) {
      if (isHindi) {
        return `${district} जिले में ${data.collegeCount} कॉलेज हैं।`;
      }

      return `${district} has ${data.collegeCount} colleges.`;
    }

    return null;
  }

  /* UNIVERSITIES */

  if (asksUniversity(question)) {
    const universities =
      formatListValues(
        data.universities
      );

    if (universities.length > 0) {
      if (isHindi) {
        return `${district} जिले के विश्वविद्यालय:\n- ${universities.join(
          "\n- "
        )}`;
      }

      return `Universities in ${district}:\n- ${universities.join(
        "\n- "
      )}`;
    }

    return isHindi
      ? `${district} जिले के विश्वविद्यालय की जानकारी उपलब्ध नहीं है।`
      : `${district} university information is not available.`;
  }

  /* RAILWAY */

  if (asksRailway(question)) {
    const stations =
      formatListValues(
        data.railwayStations
      );

    if (stations.length > 0) {
      if (isHindi) {
        return `${district} जिले के रेलवे स्टेशन:\n- ${stations.join(
          "\n- "
        )}`;
      }

      return `Railway stations in ${district}:\n- ${stations.join(
        "\n- "
      )}`;
    }

    return isHindi
      ? `${district} जिले के रेलवे स्टेशन की जानकारी उपलब्ध नहीं है।`
      : `${district} railway station information is not available.`;
  }

  /* HOSPITAL */

  if (asksHospital(question)) {
    const hospitals =
      formatListValues(
        data.hospitals
      );

    if (hospitals.length > 0) {
      if (isHindi) {
        return `${district} जिले के अस्पताल:\n- ${hospitals.join(
          "\n- "
        )}`;
      }

      return `Hospitals in ${district}:\n- ${hospitals.join(
        "\n- "
      )}`;
    }

    return null;
  }

  /* MEDICAL COLLEGE */

  if (asksMedicalCollege(question)) {
    const colleges =
      formatListValues(
        data.medicalColleges
      );

    if (colleges.length > 0) {
      if (isHindi) {
        return `${district} जिले के मेडिकल कॉलेज:\n- ${colleges.join(
          "\n- "
        )}`;
      }

      return `Medical colleges in ${district}:\n- ${colleges.join(
        "\n- "
      )}`;
    }

    return null;
  }

  /* SCHOOL */

  if (asksSchool(question)) {
    const result = [];

    if (
      data.governmentSchools !==
      undefined
    ) {
      result.push(
        `Government Schools: ${data.governmentSchools}`
      );
    }

    if (
      data.privateSchools !==
      undefined
    ) {
      result.push(
        `Private Schools: ${data.privateSchools}`
      );
    }

    if (result.length > 0) {
      return result.join("\n");
    }

    return null;
  }

  /* TOURISM */

  if (asksTourism(question)) {
    const places =
      formatListValues(
        data.touristPlaces
      );

    if (places.length > 0) {
      if (isHindi) {
        return `${district} जिले के पर्यटन स्थल:\n- ${places.join(
          "\n- "
        )}`;
      }

      return `Tourist places in ${district}:\n- ${places.join(
        "\n- "
      )}`;
    }

    return null;
  }

  return null;
}

/* =========================================================
   STATE FOOD ANSWER
========================================================= */

function getDirectFoodAnswer(
  question,
  language
) {
  if (!asksFood(question)) {
    return null;
  }

  const foods =
    extractFoodItems(foodData);

  if (foods.length === 0) {
    return null;
  }

  const uniqueFoods =
    [...new Set(foods)].slice(0, 20);

  if (language === "hindi") {
    return `छत्तीसगढ़ के प्रसिद्ध खाद्य पदार्थ:\n- ${uniqueFoods.join(
      "\n- "
    )}`;
  }

  if (
    language ===
    "chhattisgarhi"
  ) {
    return `Chhattisgarh ke famous food:\n- ${uniqueFoods.join(
      "\n- "
    )}`;
  }

  return `Famous foods of Chhattisgarh:\n- ${uniqueFoods.join(
    "\n- "
  )}`;
}

/* =========================================================
   STATE TOURISM ANSWER
========================================================= */

function getDirectStateTourismAnswer(
  question,
  language
) {
  if (!asksTourism(question)) {
    return null;
  }

  /*
    IMPORTANT:
    This always reads tourismData.js
    for state-level tourism questions.
  */

  const places =
    extractTouristNames(
      tourismData
    );

  if (places.length === 0) {
    return null;
  }

  const uniquePlaces =
    [...new Set(places)].slice(
      0,
      30
    );

  if (language === "hindi") {
    return `छत्तीसगढ़ के प्रमुख पर्यटन स्थल:\n- ${uniquePlaces.join(
      "\n- "
    )}`;
  }

  if (
    language ===
    "chhattisgarhi"
  ) {
    return `Chhattisgarh ke ghumey ke jagah:\n- ${uniquePlaces.join(
      "\n- "
    )}`;
  }

  return `Tourist places in Chhattisgarh:\n- ${uniquePlaces.join(
    "\n- "
  )}`;
}

/* =========================================================
   DATA SEARCH
========================================================= */

function searchDataset(question) {
  const q =
    normalizeText(question);

  const results = [];

  function searchObject(
    obj,
    sourceName
  ) {
    if (!obj) return;

    const text =
      safeStringify(obj);

    if (
      text
        .toLowerCase()
        .includes(q)
    ) {
      results.push({
        source: sourceName,
        data: obj,
      });
    }
  }

  searchObject(
    stateData,
    "state"
  );

  searchObject(
    foodData,
    "food"
  );

  searchObject(
    tourismData,
    "tourism"
  );

  return results.slice(0, 5);
}

/* =========================================================
   RELEVANT DISTRICT CONTEXT
========================================================= */

function buildDistrictContext(
  question,
  district
) {
  if (
    !district ||
    !districtData?.[district]
  ) {
    return {};
  }

  const data =
    districtData[district];

  const context = {
    district,
  };

  if (asksTehsil(question)) {
    context.tehsils =
      data.tehsils || [];
  }

  if (asksVillage(question)) {
    context.villages =
      data.villages;
  }

  if (asksBlock(question)) {
    context.blocks =
      data.blocks || [];
  }

  if (
    asksGramPanchayat(question)
  ) {
    context.gramPanchayats =
      data.gramPanchayats;
  }

  if (asksCity(question)) {
    context.cities =
      data.cities || [];
  }

  if (asksPolice(question)) {
    context.policeStations =
      data.policeStations;

    context.policeStationNames =
      data.policeStationNames ||
      [];
  }

  if (asksCollege(question)) {
    context.colleges =
      data.colleges || [];

    context.collegeCount =
      data.collegeCount;
  }

  if (asksUniversity(question)) {
    context.universities =
      data.universities || [];
  }

  if (asksRailway(question)) {
    context.railwayStations =
      data.railwayStations || [];
  }

  if (asksHospital(question)) {
    context.hospitals =
      data.hospitals || [];
  }

  if (
    asksMedicalCollege(question)
  ) {
    context.medicalColleges =
      data.medicalColleges || [];
  }

  if (asksSchool(question)) {
    context.governmentSchools =
      data.governmentSchools;

    context.privateSchools =
      data.privateSchools;
  }

  if (asksTourism(question)) {
    context.touristPlaces =
      data.touristPlaces || [];
  }

  context.headquarters =
    data.headquarters;

  context.population =
    data.population;

  context.area =
    data.area;

  context.collector =
    data.collector;

  context.officialWebsite =
    data.officialWebsite;

  return context;
}

/* =========================================================
   CLEAN AI RESPONSE
========================================================= */

function cleanAIResponse(text) {
  if (!text) return "";

  return String(text)
    .replace(/\*\*\*/g, "")
    .replace(/\*\*/g, "")
    .replace(/\*/g, "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/\[object Object\]/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/* =========================================================
   COMPONENT
========================================================= */

export default function CGChatbot() {
  const [open, setOpen] =
    useState(false);

  const [messages, setMessages] =
    useState([
      {
        role: "bot",
        text:
          "Hello! Ask me anything about Chhattisgarh districts, tourism, food and other available data.",
      },
    ]);

  const [input, setInput] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [activeDistrict, setActiveDistrict] =
    useState(null);

  /* =====================================================
     SEND MESSAGE
  ===================================================== */

  const sendMessage = async () => {
    const question =
      input.trim();

    if (!question || loading) {
      return;
    }

    setInput("");

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: question,
      },
    ]);

    setLoading(true);

    try {
      const language =
        detectLanguage(question);

      const detectedDistrict =
        findDistrict(question);

      const stateLevel =
        isStateLevelQuestion(
          question
        );

      /*
        District selection

        If user asks state-level question,
        don't use previous active district.
      */

      let district =
        detectedDistrict ||
        activeDistrict;

      if (
        stateLevel &&
        !detectedDistrict
      ) {
        district = null;
      }

      /*
        Save district only when
        user actually mentioned one.
      */

      if (detectedDistrict) {
        setActiveDistrict(
          detectedDistrict
        );
      }

      /* ===============================================
         STATE TOURISM
      =============================================== */

      /*
        IMPORTANT ORDER:

        State tourism is checked BEFORE
        district tourism.

        Therefore:
        "chhatisgarh ka tourism place"

        will NEVER use Baloda Bazar
        just because Baloda Bazar was
        the previous active district.
      */

      if (
        asksTourism(question) &&
        stateLevel
      ) {
        const tourismAnswer =
          getDirectStateTourismAnswer(
            question,
            language
          );

        if (tourismAnswer) {
          setMessages((prev) => [
            ...prev,
            {
              role: "bot",
              text: tourismAnswer,
            },
          ]);

          setLoading(false);

          return;
        }
      }

      /* ===============================================
         DIRECT FOOD
      =============================================== */

      if (asksFood(question)) {
        const foodAnswer =
          getDirectFoodAnswer(
            question,
            language
          );

        if (foodAnswer) {
          setMessages((prev) => [
            ...prev,
            {
              role: "bot",
              text: foodAnswer,
            },
          ]);

          setLoading(false);

          return;
        }
      }

      /* ===============================================
         DIRECT DISTRICT ANSWER
      =============================================== */

      if (district) {
        const directAnswer =
          getDirectDistrictAnswer(
            question,
            district,
            language
          );

        if (directAnswer) {
          setMessages((prev) => [
            ...prev,
            {
              role: "bot",
              text: directAnswer,
            },
          ]);

          setLoading(false);

          return;
        }
      }

      /* ===============================================
         BACKEND FALLBACK
      =============================================== */

      const districtContext =
        district
          ? buildDistrictContext(
              question,
              district
            )
          : {};

      /*
        For state-level tourism,
        send tourismData instead of
        previous district context.
      */

      const context = {
        districtData:
          districtContext,

        tourismData:
          stateLevel &&
          asksTourism(question)
            ? tourismData
            : undefined,

        foodData:
          asksFood(question)
            ? foodData
            : undefined,

        searchResults:
          searchDataset(question),
      };

      const response =
        await fetch(
          "http://127.0.0.1:8000/api/chat",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              question,

              context:
                JSON.stringify(
                  context
                ),

              language,
            }),
          }
        );

      if (!response.ok) {
        throw new Error(
          `HTTP Error: ${response.status}`
        );
      }

      const result =
        await response.json();

      const answer =
        cleanAIResponse(
          result?.answer
        );

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text:
            answer ||
            "Sorry, I could not find the required information.",
        },
      ]);
    } catch (error) {
      console.error(
        "CHATBOT ERROR:",
        error
      );

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text:
            "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     ENTER KEY
  ===================================================== */

  const handleKeyDown = (
    event
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  };

  /* =====================================================
     CLEAR CHAT
  ===================================================== */

  const clearChat = () => {
    setMessages([
      {
        role: "bot",
        text:
          "Hello! Ask me anything about Chhattisgarh districts, tourism, food and other available data.",
      },
    ]);

    setActiveDistrict(null);

    setInput("");
  };

  /* =====================================================
     UI
  ===================================================== */

  return (
    <>
      <button
        className="cg-chatbot-button"
        onClick={() =>
          setOpen(!open)
        }
        aria-label="Open Chhattisgarh AI Chatbot"
      >
        💬
      </button>

      {open && (
        <div className="cg-chatbot-panel">

          <div className="cg-chat-header">

            <div className="cg-chat-title">

              <span>🌾</span>

              <div>
                <h3>
                  CG AI Assistant
                </h3>

                <small>
                  Chhattisgarh District Data
                </small>
              </div>

            </div>

            <div className="cg-chat-actions">

              <button
                onClick={clearChat}
                title="Clear Chat"
              >
                🗑️
              </button>

              <button
                onClick={() =>
                  setOpen(false)
                }
                title="Close"
              >
                ✕
              </button>

            </div>

          </div>

          <div className="cg-chat-messages">

            {messages.map(
              (
                message,
                index
              ) => (
                <div
                  key={index}
                  className={`cg-chat-message ${message.role}`}
                >

                  <div className="cg-chat-bubble">

                    {message.text
                      .split("\n")
                      .map(
                        (
                          line,
                          lineIndex
                        ) => (
                          <div
                            key={
                              lineIndex
                            }
                          >
                            {line}
                          </div>
                        )
                      )}

                  </div>

                </div>
              )
            )}

            {loading && (
              <div className="cg-chat-message bot">

                <div className="cg-chat-bubble cg-chat-typing">

                  <span>●</span>
                  <span>●</span>
                  <span>●</span>

                </div>

              </div>
            )}

          </div>

          <div className="cg-chat-input-area">

            <input
              type="text"
              value={input}
              onChange={(e) =>
                setInput(
                  e.target.value
                )
              }
              onKeyDown={
                handleKeyDown
              }
              placeholder="Ask about Chhattisgarh..."
              disabled={loading}
            />

            <button
              className="cg-chat-send"
              onClick={
                sendMessage
              }
              disabled={
                loading ||
                !input.trim()
              }
            >
              ➤
            </button>

          </div>

          <div className="cg-chat-footer">

            {activeDistrict
              ? `Current district: ${activeDistrict}`
              : "Ask about any Chhattisgarh district"}

          </div>

        </div>
      )}
    </>
  );
}