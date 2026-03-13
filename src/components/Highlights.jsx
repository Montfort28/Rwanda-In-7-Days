export default function Highlights() {
  const highlights = [
    {
      number: 1,
      title: 'See Rwanda\'s iconic pillars in one journey',
      description: 'Gorillas, chimpanzees, safari, Kigali, and curated cultural moments without fragmented planning.'
    },
    {
      number: 2,
      title: 'Travel with premium operational flow',
      description: 'Private 4×4 transport, guided sequencing, strong timing discipline, and 24/7 support.'
    },
    {
      number: 3,
      title: 'Balance adventure with comfort',
      description: 'Luxury-minded lodging, strong pacing, and a route designed for enjoyment rather than exhaustion.'
    },
    {
      number: 4,
      title: 'Built for meaningful storytelling',
      description: 'Culture, cuisine, local engagement, and unforgettable wildlife moments in a single curated narrative.'
    }
  ];

  const cards = [
    {
      image: 'public/images/chimpanzee.jpg',
      pill: 'Wildlife',
      title: 'Gorilla & Chimpanzee Encounters',
      description: 'Includes the high-value primate experiences that make Rwanda globally distinctive.'
    },
    {
      image: 'public/images/national park.jpg',
      pill: 'Safari',
      title: 'Akagera National Park',
      description: 'Classic East African game viewing with structured access, scenic landscapes, and boat safari potential.'
    },
    {
      image: 'public/images/Kigali & Cultural Moments.jpg',
      pill: 'Culture',
      title: 'Kigali & Cultural Moments',
      description: 'Balanced city immersion with carefully selected experiences that deepen the journey.'
    },
    {
      image: 'public/images/lodging.jpg',
      pill: 'Comfort',
      title: 'Premium Lodging & Guided Support',
      description: 'Designed for travelers who value excellent execution as much as the destination itself.'
    }
  ];

  return (
    <section className="section" id="highlights">
      <div className="container">
        <div className="section-head">
          <h2>Why this circuit stands apart</h2>
          <p>
            This itinerary is designed as the premium signature introduction to Rwanda: immersive, efficient, and emotionally memorable, without sacrificing comfort, timing discipline, or logistical excellence.
          </p>
        </div>

        <div className="tour-highlights">
          <div className="highlight-panel">
            <h3>Signature experience benefits</h3>
            <div className="highlight-list">
              {highlights.map((item) => (
                <div key={item.number} className="highlight-item">
                  <span className="index-dot">{item.number}</span>
                  <div>
                    <strong>{item.title}</strong>
                    <br />
                    <span>{item.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="cards cards-2">
            {cards.map((card, index) => (
              <div key={index} className="card">
                <img src={card.image} alt={card.title} className="card-image" />
                <div className="card-body">
                  <span className="pill">{card.pill}</span>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
