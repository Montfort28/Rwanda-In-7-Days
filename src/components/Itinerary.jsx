import { useLanguage } from '../context/LanguageContext';

export default function Itinerary() {
  const { t } = useLanguage();

  const days = [
    {
      day: 'Sunday',
      label: 'Arrival Intake',
      title: 'Meet & greet + briefing',
      subtitle: 'Arrivals • Airport Meet & Greet • Check-in • Briefing',
      description: 'Arrive Kigali on or before Sunday. FYT team meet-and-greet, baggage handling, hotel transfer, room assignments, tour briefing.',
      timing: 'Arrivals window: 09:00–15:00 • Check-in: ~15:00 • Briefing: 18:00–19:00',
      addon: 'Optional add-on: Airport intake + briefing service USD $50/guest.',
      image: 'kigali-nightfall.jpg'
    },
    {
      day: 'Monday',
      dayNumber: 'Day 1',
      label: 'Kigali heritage',
      title: 'Kigali Heritage + Transfer Toward Akagera',
      description: 'Kigali city orientation with a key heritage stop (Kigali Genocide Memorial) and disciplined transfer routing.',
      timing: 'Breakfast: 07:30 • Memorial: 10:00–12:00 • Transfer: 13:00–17:00',
      image: 'Kigali-Genocide-Memorial.jpg'
    },
    {
      day: 'Tuesday',
      dayNumber: 'Day 2',
      label: 'Big Five safari',
      title: 'Akagera Safari + Lake Ihema Boat',
      description: 'Classic savannah day: game drive plus Lake Ihema boat safari for hippos, crocodiles, and birdlife.',
      timing: 'Depart: 06:00 • Game: 09:30–14:30 • Boat: 16:30–17:30',
      image: 'images/Akagera-Safari1.jpg'
    },
    {
      day: 'Wednesday',
      dayNumber: 'Day 3',
      label: 'Scenic transfer',
      title: 'Transfer to Volcanoes Region',
      description: 'Cross-country drive to Musanze/Volcanoes with controlled timing. Evening cultural moment + Dinner & Show rotation.',
      timing: 'Depart: 08:00 • Arrive: 15:30–17:00 • Dinner & Show: 19:00–21:00',
      image: 'gorilla-village-dance7.jpg'
    },
    {
      day: 'Thursday',
      dayNumber: 'Day 4',
      label: 'Gorilla trekking',
      title: 'Gorilla Trekking + Transfer to Lake Kivu',
      description: 'Early briefing, gorilla encounter, recovery and logistics, then transfer to Lake Kivu for a lakeside reset.',
      timing: 'Briefing: 07:00 • Trek: 08:00–13:00 • Kivu: 16:00–18:00',
      image: 'images/gorilla-trekking-volcanoes.jpg'
    },
    {
      day: 'Friday',
      dayNumber: 'Day 5',
      label: 'Kivu leisure',
      title: 'Lake Kivu Leisure + Sunset Dinner',
      description: 'Downtime, optional kayaking, curated lakeside moments, then a signature sunset dinner experience.',
      timing: 'Leisure: 10:00–16:30 • Optional Kayak: 14:00–16:00 • Sunset Dinner: 18:00–21:00',
      image: 'Lake-Kivu-Kayaking.jpg'
    },
    {
      day: 'Saturday',
      dayNumber: 'Day 6',
      label: 'Rainforest + canopy',
      title: 'Nyungwe Canopy Walk + Forest Experiences',
      description: 'Transfer through tea country and execute Nyungwe canopy walk with controlled timing and guest pacing.',
      timing: 'Depart: 08:00 • Arrive: 12:30–14:00 • Canopy: 15:00–17:00',
      image: 'nyungwe-canopy-walk.jpg'
    },
    {
      day: 'Sunday',
      dayNumber: 'Day 7',
      label: 'Chimp + King\'s Palace',
      title: 'Chimp Trek + King\'s Palace → Kigali Departure',
      description: 'Finale day: chimp trekking, visit King\'s Palace Museum, then transfer to Kigali for farewell lunch and airport drop-off. End of FYT Services.',
      timing: 'Breakfast: 07:00 • Chimp Trek: 05:30–11:00 • King\'s Palace: 11:00 • Airport Drop: 17:00',
      image: 'Kings-palace-museum.jpg'
    }
  ];

  return (
    <section className="section" id="itinerary">
      <div className="container">
        <div className="section-head">
          <h2>{t('itinerary.title')}</h2>
          <p>
            {t('itinerary.subtitle')}
          </p>
        </div>

        <div className="itinerary" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {days.map((item, index) => (
            <div key={index} className="day">
              <img src={item.image} alt={item.title} className="day-image" style={{ height: '240px', objectFit: 'cover' }} />
              <div style={{ padding: '20px' }}>
                <div className="day-label">{item.day} {item.dayNumber && `• ${item.dayNumber}`}</div>
                <h4 style={{ fontSize: '0.85rem', fontWeight: '800', color: '#0284c7', margin: '8px 0 4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{item.label}</h4>
                <h3 style={{ fontSize: '1.05rem', margin: '0 0 10px' }}>{item.title}</h3>
                {item.subtitle && <p style={{ fontSize: '0.85rem', color: 'var(--muted)', margin: '0 0 8px', fontWeight: '600' }}>{item.subtitle}</p>}
                <p style={{ fontSize: '0.88rem', lineHeight: '1.55', margin: '0 0 10px' }}>{item.description}</p>
                <p style={{ fontSize: '0.8rem', color: '#0284c7', fontWeight: '600', margin: '0 0 6px', lineHeight: '1.5' }}>{item.timing}</p>
                {item.addon && <p style={{ fontSize: '0.78rem', color: 'var(--muted)', fontStyle: 'italic', margin: '6px 0 0' }}>{item.addon}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
