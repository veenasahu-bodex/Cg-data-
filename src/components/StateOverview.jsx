import "./StateOverview.css";

function StateOverview() {
  return (
    <div className="state-overview">

      {/* Background Rice Decoration */}
      <div className="state-rice rice-one">🌾</div>
      <div className="state-rice rice-two">🌾</div>

      {/* Hero */}
      <section className="state-hero">

        <div className="state-hero-left">

          <span className="state-kicker">
            🌾 THE DHAN KA KATORA
          </span>

          <h2>Chhattisgarh</h2>

          <p>
            Explore the heart of Central India,
            its districts, people, places and
            important information.
          </p>

          <div className="state-hero-tags">
            <span>🌾 Paddy State</span>
            <span>33 Districts</span>
            <span>Central India</span>
          </div>

        </div>

        <div className="state-hero-badge">

          <div className="hero-badge-circle">
            <strong>CG</strong>
            <span>33</span>
            <small>DISTRICTS</small>
          </div>

        </div>

      </section>


      {/* Main State Stats */}
      <section className="state-stats">

        <div className="state-stat stat-green">
          <div className="state-stat-icon">▦</div>

          <div>
            <span>Total Districts</span>
            <strong>33</strong>
          </div>
        </div>


        <div className="state-stat stat-yellow">
          <div className="state-stat-icon">📍</div>

          <div>
            <span>Capital</span>
            <strong>Raipur</strong>
          </div>
        </div>


        <div className="state-stat stat-blue">
          <div className="state-stat-icon">CG</div>

          <div>
            <span>State Code</span>
            <strong>CG</strong>
          </div>
        </div>


        <div className="state-stat stat-orange">
          <div className="state-stat-icon">2000</div>

          <div>
            <span>Formation</span>
            <strong>2000</strong>
          </div>
        </div>

      </section>


      {/* Leadership */}
      <section className="state-leadership">

        <div className="leadership-heading">
          <div className="leadership-icon">
            🏛️
          </div>

          <div>
            <span>CHHATTISGARH STATE</span>
            <h3>State Leadership</h3>
          </div>
        </div>


        <div className="leadership-cards">

          <div className="leader-card">

            <div className="leader-icon">
              👤
            </div>

            <div className="leader-info">
              <span>Chief Minister</span>
              <strong>
                Vishnu Deo Sai
              </strong>
            </div>

          </div>


          <div className="leader-card">

            <div className="leader-icon">
              🏛️
            </div>

            <div className="leader-info">
              <span>Governor</span>
              <strong>
                Ramen Deka
              </strong>
            </div>

          </div>

        </div>

      </section>


      {/* About */}
      <section className="state-about">

        <div className="state-section-title">

          <div className="section-title-icon">
            📖
          </div>

          <div>
            <span>ABOUT THE STATE</span>

            <h3>
              Discover Chhattisgarh
            </h3>
          </div>

        </div>

        <p>
          Chhattisgarh is located in Central India
          and is known for its forests, agriculture,
          mineral resources, waterfalls and rich
          cultural heritage. The state is also known
          as the “Dhan Ka Katora” because of its
          strong association with rice cultivation.
        </p>


        <div className="state-tags">

          <span>🌾 Agriculture</span>
          <span>🌳 Forests</span>
          <span>⛰️ Nature</span>
          <span>🏛️ Heritage</span>

        </div>

      </section>


      {/* Quick Information */}
      <section className="state-information">

        <div className="state-section-title">

          <div className="section-title-icon">
            ℹ️
          </div>

          <div>
            <span>QUICK INFORMATION</span>

            <h3>
              State Information
            </h3>
          </div>

        </div>


        <div className="state-info-grid">

          <div>
            <span>State</span>
            <strong>Chhattisgarh</strong>
          </div>

          <div>
            <span>Capital</span>
            <strong>Raipur</strong>
          </div>

          <div>
            <span>Region</span>
            <strong>Central India</strong>
          </div>

          <div>
            <span>Districts</span>
            <strong>33</strong>
          </div>

          <div>
            <span>State Code</span>
            <strong>CG</strong>
          </div>

          <div>
            <span>Formation Year</span>
            <strong>2000</strong>
          </div>

        </div>

      </section>


      {/* Official Website */}
      <a
        href="https://cgstate.gov.in/"
        target="_blank"
        rel="noreferrer"
        className="state-official-link"
      >

        <div className="official-link-left">
          <span>🌐</span>

          <div>
            <strong>
              Visit Official Chhattisgarh Website
            </strong>

            <small>
              View complete state information
            </small>
          </div>
        </div>

        <strong className="official-arrow">
          →
        </strong>

      </a>

    </div>
  );
}

export default StateOverview;