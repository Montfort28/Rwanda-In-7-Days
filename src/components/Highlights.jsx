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
      image: 'public/images/chimpanzee.jpg',
      pill: t('highlights.pillWildlife'),
      title: t('highlights.gorillaTitle'),
      description: t('highlights.gorillaDesc')
    },
    {
      image: 'public/images/national park.jpg',
      pill: t('highlights.pillSafari'),
      title: t('highlights.safariTitle'),
      description: t('highlights.safariDesc')
    },
    {
      image: 'public/images/Kigali & Cultural Moments.jpg',
      pill: t('highlights.pillCulture'),
      title: t('highlights.kigaliTitle'),
      description: t('highlights.kigaliDesc')
    },
    {
      image: 'public/images/lodging.jpg',
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
          <div className="highlight-panel">
            <h3>{t('highlights.benefitsTitle')}</h3>
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
