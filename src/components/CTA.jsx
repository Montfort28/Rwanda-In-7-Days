import { useLanguage } from '../context/LanguageContext';

export default function CTA() {
  const { t } = useLanguage();

  return (
    <section className="section" id="book" style={{
        background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(14, 165, 233, 0.08) 50%, rgba(30, 64, 175, 0.08) 100%)'
      }}>
      <div className="container">
        <div className="cta-band">
          <div className="cta-content">
            <h2 style={{ margin: '12px 0 12px', fontSize: 'clamp(1.9rem, 3vw, 3rem)', lineHeight: 1.04, letterSpacing: '-.04em' }}>
              {t('cta.title')}
            </h2>
            <p style={{ margin: '0 0 20px', color: 'var(--muted)', fontSize: '1.02rem', maxWidth: '700px' }}>
              Limited weekly permits: Deposit secures allocation immediately.<br />
              Arrive Kigali on or before Sunday for check-in and briefing.
            </p>
            <div className="cta-buttons">
              <a className="btn btn-primary" href="#contact">{t('cta.bookNow')}</a>
              <a className="btn btn-secondary" href="#contact">{t('cta.privateRequest')}</a>
            </div>
          </div>
          <div style={{ textAlign: 'center', width: '100%', flex: '1', minWidth: '280px', maxWidth: '100%', height: 'auto', minHeight: '320px', overflow: 'hidden', borderRadius: '20px', alignSelf: 'stretch' }}>
            <img src="images/lake-kivu-sunset.jpg" alt="Newsletter" className="cta-image" style={{ objectPosition: 'center 30%', width: '100%', height: '100%', minHeight: '320px', objectFit: 'cover' }} />
          </div>
        </div>
      </div>
    </section>
  );
}
