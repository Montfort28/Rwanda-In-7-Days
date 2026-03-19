import { useLanguage } from '../context/LanguageContext';

export default function Pricing() {
  const { t } = useLanguage();

  return (
    <section className="section" id="pricing">
      <div className="container">
        <div className="section-head">
          <h2>Premium Pricing</h2>
          <p>Pricing shown per person (USD). Permits bundled. Weekly cycle (Sunday–Sunday). Original pricing preserved.</p>
        </div>

        <div className="cards cards-3" style={{ marginTop: '40px' }}>
          {/* Premium 15 Guests Card */}
          <div className="card">
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <h3 style={{ marginTop: 0, marginBottom: '8px' }}>Premium (15 Guests)</h3>
              <p style={{ color: 'var(--muted)', marginBottom: '20px', fontSize: '0.95rem', margin: 0 }}>Best value per person for weekly departures.</p>
              
              <div style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: 'var(--blue-700)',
                marginBottom: '4px',
                marginTop: '12px'
              }}>$6,695</div>
              <p style={{ color: 'var(--muted)', marginBottom: '24px', fontSize: '0.9rem', margin: 0 }}>per person • permits included</p>
              
              <ul style={{ flex: 1, marginBottom: '24px', listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'flex-start', color: 'var(--text)' }}>
                  <span style={{ marginRight: '8px', color: 'var(--blue-700)', fontWeight: 'bold' }}>✓</span>
                  <span>7 nights premium accommodation</span>
                </li>
                <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'flex-start', color: 'var(--text)' }}>
                  <span style={{ marginRight: '8px', color: 'var(--blue-700)', fontWeight: 'bold' }}>✓</span>
                  <span>Gorillas + Chimps + Canopy + Safari + Boat</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', color: 'var(--text)' }}>
                  <span style={{ marginRight: '8px', color: 'var(--blue-700)', fontWeight: 'bold' }}>✓</span>
                  <span>Emergency Evacuation Plan included</span>
                </li>
              </ul>

              <a className="btn btn-primary" href="#contact" style={{ width: '100%', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                BOOK PREMIUM (15)
              </a>
            </div>
          </div>

          {/* Premium 12 Guests Card */}
          <div className="card">
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <h3 style={{ marginTop: 0, marginBottom: '8px' }}>Premium (12 Guests)</h3>
              <p style={{ color: 'var(--muted)', marginBottom: '20px', fontSize: '0.95rem', margin: 0 }}>More space and upgraded comfort.</p>
              
              <div style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: 'var(--blue-700)',
                marginBottom: '4px',
                marginTop: '12px'
              }}>$6,845</div>
              <p style={{ color: 'var(--muted)', marginBottom: '24px', fontSize: '0.9rem', margin: 0 }}>per person • permits included</p>
              
              <ul style={{ flex: 1, marginBottom: '24px', listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'flex-start', color: 'var(--text)' }}>
                  <span style={{ marginRight: '8px', color: 'var(--blue-700)', fontWeight: 'bold' }}>✓</span>
                  <span>7 nights premium accommodation</span>
                </li>
                <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'flex-start', color: 'var(--text)' }}>
                  <span style={{ marginRight: '8px', color: 'var(--blue-700)', fontWeight: 'bold' }}>✓</span>
                  <span>Small group pacing (12 guests)</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', color: 'var(--text)' }}>
                  <span style={{ marginRight: '8px', color: 'var(--blue-700)', fontWeight: 'bold' }}>✓</span>
                  <span>Dedicated ops oversight</span>
                </li>
              </ul>

              <a className="btn btn-primary" href="#contact" style={{ width: '100%', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                BOOK PREMIUM (12)
              </a>
            </div>
          </div>

          {/* Notes Card */}
          <div className="card">
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <h3 style={{ marginTop: 0, marginBottom: '24px' }}>Notes</h3>
              
              <ul style={{ flex: 1, marginBottom: '24px', listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '16px', display: 'flex', alignItems: 'flex-start', color: 'var(--text)' }}>
                  <span style={{ marginRight: '8px', color: 'var(--blue-700)', fontWeight: 'bold', minWidth: '20px' }}>•</span>
                  <span><strong style={{ color: 'var(--text)' }}>Single supplement:</strong> <span style={{ color: 'var(--muted)' }}>USD $720</span></span>
                </li>
                <li style={{ marginBottom: '16px', display: 'flex', alignItems: 'flex-start', color: 'var(--text)' }}>
                  <span style={{ marginRight: '8px', color: 'var(--blue-700)', fontWeight: 'bold', minWidth: '20px' }}>•</span>
                  <span><strong style={{ color: 'var(--text)' }}>Optional add-on:</strong> <span style={{ color: 'var(--muted)' }}>Sunday airport intake + briefing service USD $50/guest</span></span>
                </li>
                <li style={{ marginBottom: '16px', display: 'flex', alignItems: 'flex-start', color: 'var(--text)' }}>
                  <span style={{ marginRight: '8px', color: 'var(--blue-700)', fontWeight: 'bold', minWidth: '20px' }}>•</span>
                  <span><strong style={{ color: 'var(--text)' }}>Deposit:</strong> <span style={{ color: 'var(--muted)' }}>locks permits and confirms seat</span></span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', color: 'var(--text)' }}>
                  <span style={{ marginRight: '8px', color: 'var(--blue-700)', fontWeight: 'bold', minWidth: '20px' }}>•</span>
                  <span><strong style={{ color: 'var(--text)' }}>Timings:</strong> <span style={{ color: 'var(--muted)' }}>can shift due to weather, park regulations, and safety</span></span>
                </li>
              </ul>

              <a className="btn btn-secondary" href="#contact" style={{ width: '100%', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                REQUEST ADD-ONS
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
