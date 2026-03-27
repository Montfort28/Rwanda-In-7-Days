import { useLanguage } from '../context/LanguageContext';

export default function Itinerary() {
  const { t } = useLanguage();

  const daysConfig = [
    { dayKey: 'day0', image: 'images/kigali cultural.png' },
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
            <div key={index} className="day" style={{ background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 50%, #0369a1 100%)' }}>
              <img src={item.image} alt={item.title} className="day-image" style={{ height: '240px', objectFit: 'cover' }} />
              <div style={{ padding: '20px' }}>
                <div className="day-label" style={{ background: 'rgba(255, 255, 255, 0.95)', color: '#0369a1', border: '2px solid rgba(255, 255, 255, 1)', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)', textTransform: 'uppercase' }}>{index === 0 ? 'SUNDAY • NIGHT 1' : `${item.day} ${item.dayNumber ? `• ${item.dayNumber}` : ''}`}</div>
                <h4 style={{ fontSize: '0.85rem', fontWeight: '800', color: '#fff', margin: '8px 0 4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{item.label}</h4>
                <h3 style={{ fontSize: '1.05rem', margin: '0 0 10px', color: '#fff' }}>{item.title}</h3>
                {item.subtitle && <p style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.9)', margin: '0 0 8px', fontWeight: '600' }}>{item.subtitle}</p>}
                <p style={{ fontSize: '0.88rem', lineHeight: '1.55', margin: '0 0 10px', color: 'rgba(255, 255, 255, 0.95)' }}>{item.description}</p>
                <p style={{ fontSize: '0.8rem', color: '#fff', fontWeight: '600', margin: '0 0 6px', lineHeight: '1.5' }}>{item.timing}</p>
                {item.addon && <p style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.85)', fontStyle: 'italic', margin: '6px 0 0' }}>{item.addon}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
