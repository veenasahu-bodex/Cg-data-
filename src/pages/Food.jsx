import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import foodData from "../data/foodData";
import "./Food.css";

function Food() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    ...new Set(foodData.map((food) => food.category)),
  ];

  const filteredFoods = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return foodData.filter((food) => {
      const matchesSearch =
        food.name.toLowerCase().includes(searchValue) ||
        food.category.toLowerCase().includes(searchValue) ||
        food.description.toLowerCase().includes(searchValue);

      const matchesCategory =
        category === "All" || food.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  return (
    <div className="food-page">

      {/* Back Button */}
      <button
        type="button"
        className="food-back-button"
        onClick={() => navigate(-1)}
      >
        <span>←</span>
        <span>Back</span>
      </button>

      {/* Hero Section */}
      <section className="food-hero">
        <div className="food-hero-overlay"></div>

        <div className="food-hero-content">
          <span className="food-kicker">CHHATTISGARH</span>

          <h1>Traditional Food &amp; Dishes</h1>

          <p>
            Explore the traditional flavours, local dishes and
            delicious food culture of Chhattisgarh.
          </p>
        </div>

        <div className="food-hero-symbol">🍚</div>
      </section>

      {/* Intro Section */}
      <section className="food-intro">
        <div>
          <span className="food-section-label">
            LOCAL CUISINE
          </span>

          <h2>Taste of Chhattisgarh</h2>

          <p>
            Discover popular Chhattisgarhi dishes made with
            rice, lentils, vegetables and traditional ingredients.
          </p>
        </div>

        <div className="food-count-box">
          <strong>{foodData.length}</strong>
          <span>Foods</span>
        </div>
      </section>

      {/* Search and Categories */}
      <section className="food-controls">

        <div className="food-search">
          <span>🔍</span>

          <input
            type="text"
            placeholder="Search food or dish..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="food-categories">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              className={category === item ? "active" : ""}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

      </section>

      {/* Food Cards */}
      <section className="food-grid">

        {filteredFoods.map((food) => (
          <article
            className="food-card"
            key={food.id}
          >

            <div className="food-image-wrapper">

              <img
                src={food.image}
                alt={food.name}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80";
                }}
              />

              <span className="food-category">
                {food.category}
              </span>

            </div>

            <div className="food-card-content">

              <h3>{food.name}</h3>

              <p>{food.description}</p>

              <div className="food-card-footer">

                <span>
                  Traditional Cuisine
                </span>

                {food.source && (
                  <a
                    href={food.source}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Source ↗
                  </a>
                )}

              </div>

            </div>

          </article>
        ))}

      </section>

      {/* Empty State */}
      {filteredFoods.length === 0 && (
        <div className="food-empty">

          <div>🍽️</div>

          <h3>Food not found</h3>

          <p>
            Try searching with another food name.
          </p>

          <button
            type="button"
            onClick={() => {
              setSearch("");
              setCategory("All");
            }}
          >
            Show All Foods
          </button>

        </div>
      )}

    </div>
  );
}

export default Food;