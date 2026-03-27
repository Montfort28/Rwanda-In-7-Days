import { useLanguage } from '../context/LanguageContext';

export default function Pricing() {
  const { t } = useLanguage();

  return (
    <section className="section" id="pricing" style={{background: 'linear-gradient(180deg, #cffafe 0%, #e0f2fe 100%)'
      }}>
      <div className="container">
        <div className="section-head">
          <h2>{t('pricing.pageTitle')}</h2>
          <p>{t('pricing.pageSubtitle')}</p>
        </div>

        <div className="cards cards-3" style={{ marginTop: '40px' }}>
          {/* Premium 15 Guests Card */}
          <div className="card">
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <h3 style={{ marginTop: 0, marginBottom: '8px' }}>{t('pricing.premium15Title')}</h3>
              <p style={{ color: 'var(--muted)', marginBottom: '20px', fontSize: '0.95rem', margin: 0 }}>{t('pricing.premium15Desc')}</p>
              
              <div style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: 'var(--blue-700)',
                marginBottom: '4px',
                marginTop: '12px'
              }}>{t('pricing.premium15Price')}</div>
              <p style={{ color: 'var(--muted)', marginBottom: '24px', fontSize: '0.9rem', margin: 0 }}>{t('pricing.premium15PriceNote')}</p>
              
              <ul style={{ flex: 1, marginBottom: '24px', listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'flex-start', color: 'var(--text)' }}>
                  <span style={{ marginRight: '8px', color: 'var(--blue-700)', fontWeight: 'bold' }}>✓</span>
                  <span>{t('pricing.premium15Feature1')}</span>
                </li>
                <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'flex-start', color: 'var(--text)' }}>
                  <span style={{ marginRight: '8px', color: 'var(--blue-700)', fontWeight: 'bold' }}>✓</span>
                  <span>{t('pricing.premium15Feature2')}</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', color: 'var(--text)' }}>
                  <span style={{ marginRight: '8px', color: 'var(--blue-700)', fontWeight: 'bold' }}>✓</span>
                  <span>{t('pricing.premium15Feature3')}</span>
                </li>
              </ul>

              <a className="btn btn-primary" href="#contact" style={{ width: '100%', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {t('pricing.premium15Button')}
              </a>
            </div>
          </div>

          {/* Premium 12 Guests Card */}
          <div className="card">
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <h3 style={{ marginTop: 0, marginBottom: '8px' }}>{t('pricing.premium12Title')}</h3>
              <p style={{ color: 'var(--muted)', marginBottom: '20px', fontSize: '0.95rem', margin: 0 }}>{t('pricing.premium12Desc')}</p>
              
              <div style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: 'var(--blue-700)',
                marginBottom: '4px',
                marginTop: '12px'
              }}>{t('pricing.premium12Price')}</div>
              <p style={{ color: 'var(--muted)', marginBottom: '24px', fontSize: '0.9rem', margin: 0 }}>{t('pricing.premium12PriceNote')}</p>
              
              <ul style={{ flex: 1, marginBottom: '24px', listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'flex-start', color: 'var(--text)' }}>
                  <span style={{ marginRight: '8px', color: 'var(--blue-700)', fontWeight: 'bold' }}>✓</span>
                  <span>{t('pricing.premium12Feature1')}</span>
                </li>
                <li style={{ marginBottom: '12px', display: 'flex', alignItems: 'flex-start', color: 'var(--text)' }}>
                  <span style={{ marginRight: '8px', color: 'var(--blue-700)', fontWeight: 'bold' }}>✓</span>
                  <span>{t('pricing.premium12Feature2')}</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', color: 'var(--text)' }}>
                  <span style={{ marginRight: '8px', color: 'var(--blue-700)', fontWeight: 'bold' }}>✓</span>
                  <span>{t('pricing.premium12Feature3')}</span>
                </li>
              </ul>

              <a className="btn btn-primary" href="#contact" style={{ width: '100%', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {t('pricing.premium12Button')}
              </a>
            </div>
          </div>

          {/* Notes Card */}
          <div className="card">
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <h3 style={{ marginTop: 0, marginBottom: '24px' }}>{t('pricing.notesTitle')}</h3>
              
              <ul style={{ flex: 1, marginBottom: '24px', listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '16px', display: 'flex', alignItems: 'flex-start', color: 'var(--text)' }}>
                  <span style={{ marginRight: '8px', color: 'var(--blue-700)', fontWeight: 'bold', minWidth: '20px' }}>•</span>
                  <span><strong style={{ color: 'var(--text)' }}>{t('pricing.singleSupplement')}</strong> <span style={{ color: 'var(--muted)' }}>{t('pricing.singleSupplementPrice')}</span></span>
                </li>
                <li style={{ marginBottom: '16px', display: 'flex', alignItems: 'flex-start', color: 'var(--text)' }}>
                  <span style={{ marginRight: '8px', color: 'var(--blue-700)', fontWeight: 'bold', minWidth: '20px' }}>•</span>
                  <span><strong style={{ color: 'var(--text)' }}>{t('pricing.optionalAddon')}</strong> <span style={{ color: 'var(--muted)' }}>{t('pricing.optionalAddonDesc')}</span></span>
                </li>
                <li style={{ marginBottom: '16px', display: 'flex', alignItems: 'flex-start', color: 'var(--text)' }}>
                  <span style={{ marginRight: '8px', color: 'var(--blue-700)', fontWeight: 'bold', minWidth: '20px' }}>•</span>
                  <span><strong style={{ color: 'var(--text)' }}>{t('pricing.deposit')}</strong> <span style={{ color: 'var(--muted)' }}>{t('pricing.depositDesc')}</span></span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', color: 'var(--text)' }}>
                  <span style={{ marginRight: '8px', color: 'var(--blue-700)', fontWeight: 'bold', minWidth: '20px' }}>•</span>
                  <span><strong style={{ color: 'var(--text)' }}>{t('pricing.timings')}</strong> <span style={{ color: 'var(--muted)' }}>{t('pricing.timingsDesc')}</span></span>
                </li>
              </ul>

              <a className="btn btn-secondary" href="#contact" style={{ width: '100%', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {t('pricing.requestAddonsButton')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
