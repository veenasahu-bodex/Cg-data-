const districtMapPaths = {
  "Balrampur-Ramanujganj": {
    path: "M250 55 L325 35 L390 55 L410 105 L380 145 L315 145 L275 125 L235 135 L220 100 Z",
    labelX: 285,
    labelY: 95,
  },

  Surguja: {
    path: "M190 125 L235 135 L275 125 L315 145 L380 145 L390 195 L350 225 L295 215 L250 230 L205 205 L175 175 Z",
    labelX: 275,
    labelY: 180,
  },

  Jashpur: {
    path: "M380 145 L440 125 L500 145 L525 195 L500 240 L450 250 L415 220 L350 225 L390 195 Z",
    labelX: 445,
    labelY: 190,
  },

  Surajpur: {
    path: "M150 105 L220 100 L235 135 L205 205 L165 195 L125 160 Z",
    labelX: 165,
    labelY: 155,
  },

  Koriya: {
    path: "M65 95 L150 75 L190 105 L150 155 L125 160 L85 145 L55 120 Z",
    labelX: 105,
    labelY: 115,
  },

  "Gaurela-Pendra-Marwahi": {
    path: "M65 155 L125 160 L165 195 L150 245 L100 255 L55 225 L45 185 Z",
    labelX: 92,
    labelY: 210,
  },

  Korba: {
    path: "M165 195 L205 205 L250 230 L295 215 L320 255 L285 300 L230 290 L195 315 L150 275 L150 245 Z",
    labelX: 225,
    labelY: 255,
  },

  Raigarh: {
    path: "M320 255 L350 225 L415 220 L450 250 L440 305 L400 330 L345 315 L285 300 Z",
    labelX: 370,
    labelY: 280,
  },

  Mungeli: {
    path: "M100 255 L150 245 L150 275 L195 315 L175 355 L120 345 L85 315 Z",
    labelX: 125,
    labelY: 305,
  },

  Bilaspur: {
    path: "M175 355 L195 315 L230 290 L285 300 L320 330 L300 380 L255 405 L205 390 Z",
    labelX: 240,
    labelY: 350,
  },

  "Janjgir-Champa": {
    path: "M300 380 L320 330 L345 315 L400 330 L415 380 L390 420 L340 425 L305 410 Z",
    labelX: 350,
    labelY: 385,
  },

  "Baloda Bazar": {
    path: "M205 390 L255 405 L305 410 L340 425 L320 470 L270 490 L225 465 L185 435 Z",
    labelX: 255,
    labelY: 440,
  },

  "Sarangarh-Bilaigarh": {
    path: "M390 420 L415 380 L455 395 L490 430 L475 480 L430 495 L395 470 Z",
    labelX: 435,
    labelY: 450,
  },

  "Khairagarh-Chhuikhadan-Gandai": {
    path: "M75 390 L120 375 L160 395 L185 435 L170 475 L120 480 L80 450 Z",
    labelX: 120,
    labelY: 430,
  },

  Kabirdham: {
    path: "M85 315 L120 345 L175 355 L205 390 L185 435 L160 395 L120 375 L75 390 L55 350 Z",
    labelX: 115,
    labelY: 365,
  },

  Bemetara: {
    path: "M170 475 L185 435 L225 465 L270 490 L250 530 L205 535 L170 515 Z",
    labelX: 210,
    labelY: 495,
  },

  Rajnandgaon: {
    path: "M55 450 L80 450 L120 480 L170 475 L170 515 L145 555 L95 550 L55 520 Z",
    labelX: 105,
    labelY: 505,
  },

  Durg: {
    path: "M170 515 L205 535 L250 530 L275 560 L250 600 L195 600 L145 555 Z",
    labelX: 205,
    labelY: 565,
  },

  Raipur: {
    path: "M250 530 L270 490 L320 470 L350 500 L345 545 L315 575 L275 560 Z",
    labelX: 300,
    labelY: 525,
  },

  Mahasamund: {
    path: "M350 500 L395 470 L430 495 L455 535 L430 575 L380 575 L345 545 Z",
    labelX: 395,
    labelY: 530,
  },

  Balod: {
    path: "M95 550 L145 555 L195 600 L175 645 L130 650 L90 615 Z",
    labelX: 130,
    labelY: 605,
  },

  Dhamtari: {
    path: "M195 600 L250 600 L275 560 L315 575 L300 625 L265 660 L215 650 L175 645 Z",
    labelX: 230,
    labelY: 620,
  },

  Gariyaband: {
    path: "M315 575 L345 545 L380 575 L390 625 L360 665 L315 650 L300 625 Z",
    labelX: 345,
    labelY: 610,
  },

  "Mohla-Manpur-Ambagarh Chowki": {
    path: "M40 600 L90 615 L130 650 L115 700 L70 720 L30 685 L25 640 Z",
    labelX: 70,
    labelY: 665,
  },

  Kanker: {
    path: "M115 700 L130 650 L175 645 L215 650 L220 700 L190 745 L140 750 Z",
    labelX: 165,
    labelY: 700,
  },

  Narayanpur: {
    path: "M30 685 L70 720 L115 700 L140 750 L125 795 L75 800 L35 760 Z",
    labelX: 80,
    labelY: 750,
  },

  Bastar: {
    path: "M140 750 L190 745 L220 700 L260 720 L270 775 L240 820 L185 825 L125 795 Z",
    labelX: 195,
    labelY: 775,
  },

  Kondagaon: {
    path: "M220 700 L260 720 L300 700 L330 735 L310 780 L270 775 L240 820 L270 850 L230 860 L205 825 L240 820 L270 775 Z",
    labelX: 275,
    labelY: 750,
  },

  Dantewada: {
    path: "M125 795 L185 825 L205 825 L230 860 L210 900 L160 915 L120 875 Z",
    labelX: 165,
    labelY: 855,
  },

  Bijapur: {
    path: "M35 760 L75 800 L125 795 L120 875 L80 890 L35 850 L20 805 Z",
    labelX: 65,
    labelY: 825,
  },

  Sukma: {
    path: "M120 875 L160 915 L210 900 L240 925 L215 975 L165 985 L120 950 Z",
    labelX: 165,
    labelY: 945,
  },

  MCB: {
    path: "M140 25 L210 20 L250 55 L235 100 L190 105 L150 75 Z",
    labelX: 180,
    labelY: 65,
  },

  Sakti: {
    path: "M415 380 L455 395 L490 430 L475 480 L430 495 L400 470 L390 420 Z",
    labelX: 430,
    labelY: 415,
  },
};

export default districtMapPaths;