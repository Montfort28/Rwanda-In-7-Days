import { useLanguage } from '../context/LanguageContext';

export default function Itinerary() {
  const { t } = useLanguage();

  const daysConfig = [
    { dayKey: 'day0', image: 'kigali-nightfall.jpg' },
    { dayKey: 'day1', image: 'Kigali-Genocide-Memorial.jpg' },
    { dayKey: 'day2', image: 'images/Akagera-Safari1.jpg' },
    { dayKey: 'day3', image: 'gorilla-village-dance7.jpg' },
    { dayKey: 'day4', image: 'images/gorilla-trekking-volcanoes.jpg' },
    { dayKey: 'day5', image: 'Lake-Kivu-Kayaking.jpg' },
    { dayKey: 'day6', image: 'nyungwe-canopy-walk.jpg' },
    { dayKey: 'day7', image: 'Kings-palace-museum.jpg' }
  ];

  const days = daysConfig.map(config => ({
    ...t(`itinerary.${config.dayKey}`),
    image: config.image
  }));

  return (
    <section className="section" id="itinerary">
      <div className="container">
        <div className="section-head">
          <h2>{t('itinerary.title')}</h2>
          <p>
            {t('itinerary.subtitle')}
          </p>
        </div>

        <div className="itinerary grid cards-3" style={{ gap: '20px' }}>
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
