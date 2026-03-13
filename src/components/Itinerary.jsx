export default function Itinerary() {
  const days = [
    {
      day: 1,
      title: 'Arrival in Kigali',
      description: 'Airport reception, hotel transfer, rest, and optional light city orientation depending on arrival time. The journey begins with comfort, calm arrival handling, and briefing for the week ahead.',
      image: 'public/images/city break.jpg'
    },
    {
      day: 2,
      title: 'Kigali City Experience & Transfer North',
      description: 'Curated Kigali experience including selected cultural and historical stops, followed by transfer to the Volcanoes region for the primate segment of the circuit.',
      image: 'public/images/city break 1.jpg'
    },
    {
      day: 3,
      title: 'Gorilla Trekking in Volcanoes National Park',
      description: 'The signature wildlife moment of the journey. Morning briefing, guided trek, gorilla encounter, and return for rest and reflection at the lodge.',
      image: 'public/images/placeholder.jpg'
    },
    {
      day: 4,
      title: 'Transfer to Nyungwe / Scenic Rwanda Drive',
      description: 'A scenic cross-country route through Rwanda\'s landscapes, with selected stops and premium pacing that turns the transfer itself into part of the experience.',
      image: 'public/images/Virunga Mountains.jpg'
    },
    {
      day: 5,
      title: 'Chimpanzee Trekking & Canopy Walk',
      description: 'Early primate experience in Nyungwe, followed by one of Rwanda\'s most memorable forest perspectives through the canopy walk.',
      image: 'public/images/canopy.jpg'
    },
    {
      day: 6,
      title: 'Transfer to Akagera National Park',
      description: 'Transition from rainforest and mountains into savannah and safari country, preparing for the circuit\'s final wildlife chapter.',
      image: 'public/images/akagera.jpg'
    },
    {
      day: 7,
      title: 'Akagera Safari & Departure / Overnight Extension',
      description: 'Game drive and optional boat safari depending on timing, followed by return to Kigali for departure or extension planning.',
      image: 'public/images/akagera extension.jpg'
    }
  ];

  return (
    <section className="section" id="itinerary">
      <div className="container">
        <div className="section-head">
          <h2>Day-by-day itinerary</h2>
          <p>
            Structured for flow, comfort, and narrative progression — from arrival and city orientation to deep wildlife immersion and premium safari closure.
          </p>
        </div>

        <div className="itinerary">
          {days.map((item) => (
            <div key={item.day} className="day">
              <img src={item.image} alt={item.title} className="day-image" />
              <div>
                <div className="day-label">Day {item.day}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
