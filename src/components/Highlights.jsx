import { useLanguage } from '../context/LanguageContext';

export default function Highlights() {
  const { t } = useLanguage();

  const highlights = [
    {
      number: 1,
      title: t('highlights.benefit1Title'),
      description: t('highlights.benefit1Desc')
    },
    {
      number: 2,
      title: t('highlights.benefit2Title'),
      description: t('highlights.benefit2Desc')
    },
    {
      number: 3,
      title: t('highlights.benefit3Title'),
      description: t('highlights.benefit3Desc')
    },
    {
      number: 4,
      title: t('highlights.benefit4Title'),
      description: t('highlights.benefit4Desc')
    }
  ];

  const cards = [
    {
      image: 'images/chimpanzee.jpg',
      pill: t('highlights.pillWildlife'),
      title: t('highlights.gorillaTitle'),
      description: t('highlights.gorillaDesc')
    },
    {
      image: 'images/Akagera-Safari4.jpg',
      pill: t('highlights.pillSafari'),
      title: t('highlights.safariTitle'),
      description: t('highlights.safariDesc')
    },
    {
      image: 'images/Kigali & Cultural Moments.jpg',
      pill: t('highlights.pillCulture'),
      title: t('highlights.kigaliTitle'),
      description: t('highlights.kigaliDesc')
    },
    {
      image: 'images/lodging.jpg',
      pill: t('highlights.pillComfort'),
      title: t('highlights.lodgingTitle'),
      description: t('highlights.lodgingDesc')
    }
  ];

  return (
    <section className="section" id="highlights">
      <div className="container">
        <div className="section-head">
          <h2>{t('highlights.title')}</h2>
          <p>
            {t('highlights.subtitle')}
          </p>
        </div>

        <div className="tour-highlights">
          <div className="highlight-panel" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '16px' }}>{t('highlights.benefitsTitle')}</h3>
            <div className="highlight-list" style={{ gap: '10px' }}>
              {highlights.map((item) => (
                <div key={item.number} className="highlight-item" style={{ padding: '10px 0', gap: '12px' }}>
                  <span className="index-dot" style={{ width: '32px', height: '32px', fontSize: '0.9rem' }}>{item.number}</span>
                  <div>
                    <strong style={{ fontSize: '0.95rem', display: 'block', marginBottom: '4px' }}>{item.title}</strong>
                    <span style={{ fontSize: '0.88rem', lineHeight: '1.5', color: 'var(--muted)' }}>{item.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="cards cards-2" style={{ gap: '18px' }}>
            {cards.map((card, index) => (
              <div key={index} className="card" style={{ minHeight: 'auto' }}>
                <img src={card.image} alt={card.title} className="card-image" style={{ height: '180px' }} />
                <div className="card-body" style={{ padding: '20px', gap: '10px' }}>
                  <span className="pill">{card.pill}</span>
                  <h3 style={{ fontSize: '1.1rem', margin: '0 0 8px' }}>{card.title}</h3>
                  <p style={{ fontSize: '0.9rem', margin: 0, lineHeight: '1.55' }}>{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
