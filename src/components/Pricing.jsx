export default function Pricing() {
  const included = [
    'Private 4×4 safari vehicle with licensed driver-guide',
    'Gorilla permit',
    'Chimpanzee trekking permit',
    'Akagera National Park entry',
    'Lake / safari experience where scheduled',
    'Premium accommodation',
    'Meals as per itinerary',
    '24/7 FYT operational support',
  ];

  const notIncluded = [
    'International flights',
    'Visa fees',
    'Personal travel insurance',
    'Laundry and personal expenses',
    'Alcoholic beverages unless stated',
    'Optional add-ons and extensions',
  ];

  return (
    <section className="section" id="pricing">
      <div className="container">
        <div className="section-head">
          <h2>Premium pricing and inclusions</h2>
          <p>
            Positioned as a premium signature circuit with high-value permits, private logistics, strong accommodation standards, and curated support.
          </p>
        </div>

        <div className="pricing-band">
          <div className="pricing-grid">
            <div className="pricing-cell">
              <span className="pill" style={{ background: 'rgba(255,255,255,.12)', borderColor: 'rgba(255,255,255,.18)', color: '#fff' }}>From</span>
              <div className="pricing-price">US$ 3,995 pp</div>
              <p>Indicative starting price based on premium shared departure structure. Private departures and customization may vary.</p>
            </div>

            <div className="pricing-cell">
              <h3>What's included</h3>
              <ul>
                {included.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="pricing-cell">
              <h3>Not included</h3>
              <ul>
                {notIncluded.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
