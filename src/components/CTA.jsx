import { useLanguage } from '../context/LanguageContext';

export default function CTA() {
  const { t } = useLanguage();

  return (
    <section className="section" id="book">
      <div className="container">
        <div className="cta-band">
          <div className="cta-content">
            <h2 style={{ margin: '12px 0 12px', fontSize: 'clamp(1.9rem, 3vw, 3rem)', lineHeight: 1.04, letterSpacing: '-.04em' }}>
              {t('cta.title')}
            </h2>
            <p style={{ margin: '0 0 20px', color: 'var(--muted)', fontSize: '1.02rem', maxWidth: '700px' }}>
              {t('cta.subtitle')}
            </p>
            <div className="cta-buttons">
              <a className="btn btn-primary" href="#contact">{t('cta.bookNow')}</a>
              <a className="btn btn-secondary" href="#contact">{t('cta.privateRequest')}</a>
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <img src="images/news letter 2.jpg" alt="Newsletter" className="cta-image" />
          </div>
        </div>
      </div>
    </section>
  );
}
