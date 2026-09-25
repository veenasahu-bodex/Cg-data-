const foodData = [
  {
    id: 1,
    name: "Chila",
    category: "Breakfast",
    image:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/CHILA%28THE%20DOSA%20OF%20CHHATTISGARH%29.jpg",
    description:
      "Chila is a popular Chhattisgarhi breakfast made from rice batter and urad dal, usually served with green chutney.",
    source:
      "https://commons.wikimedia.org/wiki/File:CHILA(THE_DOSA_OF_CHHATTISGARH).jpg"
  },
  {
  id: 2,
  name: "Fara",
  category: "Traditional",
  image:"/food/fara.png",
  description:
    "Fara is a traditional Chhattisgarhi rice-based steamed dish, commonly enjoyed with chutney.",
  source:
    "https://commons.wikimedia.org/wiki/File:चीला_फररा_चटनी_छत्तीसगढ़_का_व्यंजन.jpg"
},
  {
    id: 3,
    name: "Muthia",
    category: "Breakfast",
    image:"/food/muthia.png",
    description:
      "Muthia is a traditional steamed dumpling prepared from rice batter and spices.",
    source: ""
  },
  {
    id: 4,
    name: "Aamat",
    category: "Main Dish",
    image:"/food/aamat.png",
    description:
      "Aamat is a traditional Bastar dish made with vegetables and spices. Traditionally, it is associated with cooking in bamboo.",
    source: ""
  },
  {
    id: 5,
    name: "Bafauri",
    category: "Snack",
    image:"/food/bafauri.png",
    description:
      "Bafauri is a steamed snack prepared using chana dal flour, vegetables and spices.",
    source: ""
  },
  {
    id: 6,
    name: "Bara",
    category: "Snack",
    image:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Bara%20and%20Ghuguni.JPG",
    description:
      "Bara is a traditional lentil-based snack that is especially popular during festivals and local celebrations.",
    source:
      "https://commons.wikimedia.org/wiki/File:Bara_and_Ghuguni.JPG"
  },
  {
    id: 7,
    name: "Angakar Roti",
    category: "Traditional",
    image:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Angakar%20roti%20%2C%20Chhattisgarhi%20Cuisine.jpg",
    description:
      "Angakar Roti is a traditional rice-flour flatbread from Chhattisgarh, commonly enjoyed with vegetables and chutney.",
    source:
      "https://commons.wikimedia.org/wiki/File:Angakar_roti_,_Chhattisgarhi_Cuisine.jpg"
  },
 {
  id: 8,
  name: "Chousela",
  category: "Traditional",
  image: "/food/chausela.png",
  description:
    "Chousela is a traditional Chhattisgarhi rice-flour poori, usually served with chutney, curry or local vegetables.",
  source: ""
},

{
  id: 9,
  name: "Dubki Kadhi",
  category: "Main Dish",
  image: "/food/kadhi.png",
  description:
    "Dubki Kadhi is a traditional Chhattisgarhi kadhi prepared with small gram-flour dumplings cooked in a tangy curd-based gravy.",
  source: ""
},
  {
    id: 10,
    name: "Bhajia",
    category: "Street Food",
    image:"/food/bhajia.png",
    description:
      "Bhajia is a popular Chhattisgarhi street snack prepared with gram flour and different vegetables or chillies.",
    source: ""
  },
  {
    id: 11,
    name: "Khurmi",
    category: "Sweet",
    image:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Khurmi%2C%20Chhattisgarhi%20Cuisine.jpg",
    description:
      "Khurmi is a traditional sweet delicacy of Chhattisgarh and is prepared especially for festive and special occasions.",
    source:
      "https://commons.wikimedia.org/wiki/File:Khurmi,_Chhattisgarhi_Cuisine.jpg"
  },
  {
    id: 12,
    name: "Tilgur",
    category: "Sweet",
    image:"/food/tilgur.png",
    description:
      "Tilgur is a sesame and jaggery sweet, traditionally associated with festivals such as Makar Sankranti.",
    source: ""
  },
  {
    id: 13,
    name: "Thethri",
    category: "Snack",
    image:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/%E0%A4%A0%E0%A5%87%E0%A4%A0%E0%A4%B0%E0%A5%80%2C%20%E0%A4%96%E0%A5%81%E0%A4%B0%E0%A4%AE%E0%A5%80%2C%20%E0%A4%86%E0%A4%87%E0%A4%B0%E0%A4%B8%E0%A4%BE%2C%20%E0%A4%B6%E0%A5%81%E0%A4%B9%E0%A4%BE%E0%A4%B0%E0%A5%80%20%E0%A4%B0%E0%A5%8B%E0%A4%9F%E0%A5%80.jpg",
    description:
      "Thethri is a traditional festive snack from Chhattisgarh, often prepared during celebrations.",
    source:
      "https://commons.wikimedia.org/wiki/Category:Cuisine_of_Chhattisgarh"
  },
  {
    id: 14,
    name: "Airsa",
    category: "Sweet",
    image:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Airsha.jpg",
    description:
      "Airsa is a traditional sweet preparation associated with Chhattisgarhi food culture.",
    source:
      "https://commons.wikimedia.org/wiki/Category:Cuisine_of_Chhattisgarh"
  },
  {
    id: 15,
    name: "Ropa Bhaji",
    category: "Vegetarian",
    image:
      "https://commons.wikimedia.org/wiki/Special:Redirect/file/Ropa%20Bhaji%2C%20%28%E0%A4%B0%E0%A5%8B%E0%A4%AA%E0%A4%BE%20%E0%A4%AD%E0%A4%BE%E0%A4%9C%E0%A5%80%29%20Chhattisgarhi%20Dish%20%28%20%E0%A4%9B%E0%A4%A4%E0%A5%8D%E0%A4%A4%E0%A5%80%E0%A4%B8%E0%A4%97%E0%A4%A2%E0%A4%BC%E0%A5%80%20%E0%A4%B5%E0%A5%8D%E0%A4%AF%E0%A4%82%E0%A4%9C%E0%A4%A8%29.jpg",
    description:
      "Ropa Bhaji is a regional Chhattisgarhi vegetable preparation made using locally available ingredients.",
    source:
      "https://commons.wikimedia.org/wiki/Category:Cuisine_of_Chhattisgarh"
  },
  {
    id: 16,
    name: "Pej",
    category: "Traditional",
    image:"/food/pej.png",
    description:
      "Pej is a simple rice-based gruel traditionally consumed in rural parts of Chhattisgarh.",
    source: ""
  },
  {
    id: 17,
    name: "Chousela Roti",
    category: "Traditional",
    image:"/food/chausela.png",
    description:
      "Chousela Roti is a traditional rice-based bread enjoyed with local vegetables, curries and chutneys.",
    source: ""
  },
  {
    id: 18,
    name: "Rice Pakora",
    category: "Snack",
    image:"/food/pakoda.png",
    description:
      "Rice-based snacks are an important part of Chhattisgarh's food culture because rice is a major staple of the region.",
    source: ""
  },
  {
  id: 19,
  name: "Bore Basi",
  category: "Traditional",
  image:
    "https://cf-img-a-in.tosshub.com/sites/visualstory/chhattisgarhtak/uploads/2023/08/bore-baasi-5-Copy.jpg?size=%2A%3A900",
  description:
    "Bore Basi is a traditional Chhattisgarhi dish made by soaking cooked rice in water and enjoyed with onion, green chilli, chutney and local accompaniments.",
  source:
    "https://www.newstak.in/visualstories/chhattisgarh/chhattisgarh-popular-state-food-bore-basi-you-will-be-surprised-know-its-health-benefits-112621-26-08-2023"
},
{
  id: 20,
  name: "Kari Laddu",
  category: "Sweet",
  image:"/food/kari-laddu.png",
  description:
    "Kari Laddu is a traditional Chhattisgarhi sweet made from gram-flour sev (kari) and jaggery syrup, then shaped into round laddus.",
  source:
    "https://www.myindianproducts.com/travel/chhattisgarh/gariaband/experiences/private-anthropological-tour-of-the-bastar-tribal-markets"
},
];

export default foodData;