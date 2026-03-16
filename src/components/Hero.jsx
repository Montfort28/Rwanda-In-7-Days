import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="hero" id="overview">
      <div className="container">
        <div className="hero-card" style={{
          backgroundImage: 'url("images/placeholder.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'darken',
          borderRadius: '48px',
        }}>
          <div className="hero-grid">
            <div>
              <div className="eyebrow">{t('hero.eyebrow')}</div>
              <h1>{t('hero.title')}</h1>
              <p className="lead">
                {t('hero.description')}
              </p>

              <div className="hero-pills">
                <span className="hero-pill">{t('hero.gorillaTrekking')}</span>
                <span className="hero-pill">{t('hero.chimpanzeeTrekking')}</span>
                <span className="hero-pill">{t('hero.akageraSafari')}</span>
                <span className="hero-pill">{t('hero.luxuryStays')}</span>
                <span className="hero-pill">{t('hero.support')}</span>
              </div>

              <div className="hero-actions">
                <a className="btn btn-primary" href="#contact">{t('hero.bookButton')}</a>
                <a className="btn btn-secondary" href="#itinerary">{t('hero.seeJourney')}</a>
              </div>
            </div>

            <div>
              <div className="hero-panel">
                <h3>{t('hero.snapshot')}</h3>
                <div className="panel-row">
                  <span className="panel-label">{t('hero.destination')}</span>
                  <span className="panel-value">{t('hero.destinationValue')}</span>
                </div>
                <div className="panel-row">
                  <span className="panel-label">{t('hero.travelStyle')}</span>
                  <span className="panel-value">{t('hero.travelStyleValue')}</span>
                </div>
                <div className="panel-row">
                  <span className="panel-label">{t('hero.bestFor')}</span>
                  <span className="panel-value">{t('hero.bestForValue')}</span>
                </div>
                <div className="panel-row">
                  <span className="panel-label">{t('hero.inclusions')}</span>
                  <span className="panel-value">{t('hero.inclusionsValue')}</span>
                </div>
                <div className="panel-row">
                  <span className="panel-label">{t('hero.supportLabel')}</span>
                  <span className="panel-value">{t('hero.supportValue')}</span>
                </div>
                <div className="panel-row">
                  <span className="panel-label">{t('hero.bookingType')}</span>
                  <span className="panel-value">{t('hero.bookingTypeValue')}</span>
                </div>
                <div style={{ marginTop: '18px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <a className="btn btn-primary" href="#contact" style={{ flex: 1 }}>{t('hero.reserveSeat')}</a>
                  <a className="btn btn-secondary" href="#pricing" style={{ flex: 1 }}>{t('hero.priceInclusions')}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
