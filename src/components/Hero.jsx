import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="hero" id="overview">
      <div className="container">
        <div className="hero-card" style={{
          backgroundImage: 'linear-gradient(135deg, rgba(15, 52, 96, 0.48) 0%, rgba(26, 84, 144, 0.48) 50%, rgba(6, 182, 212, 0.48) 100%), url("images/placeholder.png")',
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

        {/* Limited Permits Card */}
        <div style={{
          marginTop: '32px',
          padding: '28px',
          background: 'var(--surface)',
          border: '1px solid var(--line)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow)',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px',
            flexWrap: 'wrap'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              minWidth: '0',
              flex: '1 1 auto'
            }}>
              <div style={{
                fontSize: '1.5rem',
                color: 'var(--blue-700)',
                minWidth: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              </div>
              <p style={{
                fontSize: '1rem',
                lineHeight: '1.6',
                color: 'var(--text)',
                marginBottom: 0,
                minWidth: '0'
              }}>
                <strong style={{ color: 'var(--blue-700)' }}>Limited weekly permits:</strong> <span style={{ color: 'var(--muted)' }}>Deposit secures allocation immediately. Arrive Kigali on or before Sunday for check-in and briefing.</span>
              </p>
            </div>
            <div style={{
              display: 'flex',
              gap: '12px',
              flexWrap: 'wrap',
              flex: '0 0 auto',
              justifyContent: 'center',
              width: '100%'
            }}>
              <a className="btn btn-primary" href="#contact" style={{ whiteSpace: 'nowrap' }}>CHECK AVAILABILITY</a>
              <a className="btn btn-secondary" href="/FYT_Rwanda_7_Days_Signature_Circuit_Premium.pdf" target="_blank" rel="noopener noreferrer" style={{ whiteSpace: 'nowrap' }}>VIEW PDF</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
