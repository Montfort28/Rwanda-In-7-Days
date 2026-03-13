export default function Hero() {
  return (
    <section className="hero" id="overview">
      <div className="container">
        <div className="hero-card" style={{
          backgroundImage: 'url("public/images/placeholder.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '48px'
        }}>
          <div className="hero-grid">
            <div>
              <div className="eyebrow">Rwanda Premium Signature Circuit</div>
              <h1>Rwanda in 7 Days — Signature Circuit (Premium)</h1>
              <p className="lead">
                A premium Rwanda journey designed for travelers who want the country's most iconic wildlife, landscapes, and cultural experiences in one elegant, professionally curated circuit.
              </p>

              <div className="hero-pills">
                <span className="hero-pill">Gorilla Trekking</span>
                <span className="hero-pill">Chimpanzee Trekking</span>
                <span className="hero-pill">Akagera Safari</span>
                <span className="hero-pill">Luxury Stays</span>
                <span className="hero-pill">24/7 FYT Support</span>
              </div>

              <div className="hero-actions">
                <a className="btn btn-primary" href="#book">Book This Trip</a>
                <a className="btn btn-secondary" href="#itinerary">See the Day-by-Day Journey</a>
              </div>
            </div>

            <div>
              <div className="hero-panel">
                <h3>Tour Snapshot</h3>
                <div className="panel-row">
                  <span className="panel-label">Destination</span>
                  <span className="panel-value">Rwanda</span>
                </div>
                <div className="panel-row">
                  <span className="panel-label">Travel Style</span>
                  <span className="panel-value">Premium Guided Circuit</span>
                </div>
                <div className="panel-row">
                  <span className="panel-label">Best For</span>
                  <span className="panel-value">Adventure, Wildlife, Culture</span>
                </div>
                <div className="panel-row">
                  <span className="panel-label">Inclusions</span>
                  <span className="panel-value">Permits, Lodging, Transport</span>
                </div>
                <div className="panel-row">
                  <span className="panel-label">Support</span>
                  <span className="panel-value">24/7 FYT Operations</span>
                </div>
                <div className="panel-row">
                  <span className="panel-label">Booking Type</span>
                  <span className="panel-value">Scheduled or Private</span>
                </div>
                <div style={{ marginTop: '18px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <a className="btn btn-primary" href="#book" style={{ flex: 1 }}>Reserve Your Seat</a>
                  <a className="btn btn-secondary" href="#pricing" style={{ flex: 1 }}>Price & Inclusions</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
