import { useLanguage } from '../context/LanguageContext';

export default function Pricing() {
  const { t } = useLanguage();

  const included = [
    t('pricing.include1'),
    t('pricing.include2'),
    t('pricing.include3'),
    t('pricing.include4'),
    t('pricing.include5'),
    t('pricing.include6'),
    t('pricing.include7'),
    t('pricing.include8'),
  ];

  const notIncluded = [
    t('pricing.exclude1'),
    t('pricing.exclude2'),
    t('pricing.exclude3'),
    t('pricing.exclude4'),
    t('pricing.exclude5'),
    t('pricing.exclude6'),
  ];

  return (
    <section className="section" id="pricing">
      <div className="container">
        <div className="section-head">
          <h2>{t('pricing.title')}</h2>
          <p>
            {t('pricing.subtitle')}
          </p>
        </div>

        <div className="pricing-band">
          <div className="pricing-grid">
            <div className="pricing-cell">
              <span className="pill" style={{ background: 'rgba(255,255,255,.12)', borderColor: 'rgba(255,255,255,.18)', color: '#fff' }}>{t('pricing.from')}</span>
              <div className="pricing-price">{t('pricing.price')}</div>
              <p>{t('pricing.priceNote')}</p>
            </div>

            <div className="pricing-cell">
              <h3>{t('pricing.included')}</h3>
              <ul>
                {included.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="pricing-cell">
              <h3>{t('pricing.notIncluded')}</h3>
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
