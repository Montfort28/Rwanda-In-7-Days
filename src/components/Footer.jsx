import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const context = useLanguage();
  const t = context?.t || ((key) => key);

  const exploreLinks = [
    { href: '#overview', label: t('nav.overview') },
    { href: '#highlights', label: t('nav.highlights') },
    { href: '#itinerary', label: t('nav.itinerary') },
    { href: '#pricing', label: t('nav.pricing') },
    { href: '#reviews', label: t('nav.reviews') }
  ];

  const tourLinks = [
    { href: '#', label: t('footer.adventureTours') },
    { href: '#', label: t('footer.agroTours') },
    { href: '#', label: t('footer.cityBreaks') },
    { href: '#', label: t('footer.cruises') },
    { href: '#', label: t('footer.culturalExchanges') },
    { href: '#', label: t('footer.motorcoachTours') },
    { href: '#', label: t('footer.railTours') },
    { href: '#contact', label: t('footer.bookATrip') }
  ];

  const communityLinks = [
    { href: '#', label: t('footer.becomeAMember') },
    { href: '#', label: t('footer.becomeAnAdvisor') },
    { href: '#', label: t('footer.createOwnTour') },
    { href: '#', label: t('footer.resources') }
  ];

  const legalLinks = [
    { href: '#', label: t('footer.privacyPolicy') },
    { href: '#', label: t('footer.termsConditions') },
    { href: '#', label: t('footer.disclaimers') },
    { href: '#', label: t('footer.contact') }
  ];

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-first">
          <div className="footer-logo-box" style={{ width: '140px', height: '140px', marginBottom: '16px' }}>
            <img src="images/logo-1.png?v=2" alt="Forever Young Tours" style={{ width: '140px', height: '140px', objectFit: 'contain' }} />
          </div>
          <div className="footer-content">
            <p>{t('footer.description')}</p>
          </div>
        </div>

        <div>
          <h4>{t('footer.explore')}</h4>
          {exploreLinks.map((link, index) => (
            <a key={index} href={link.href}>{link.label}</a>
          ))}
        </div>
        
        <div>
          <h4>{t('footer.legal')}</h4>
          {legalLinks.map((link, index) => (
            <a key={index} href={link.href}>{link.label}</a>
          ))}
        </div>
        
        <div>
          <h4>{t('footer.community')}</h4>
          {communityLinks.map((link, index) => (
            <a key={index} href={link.href}>{link.label}</a>
          ))}
        </div>

        <div>
          <h4>Contact Us</h4>
          <p style={{ margin: '8px 0', fontSize: '0.9rem' }}><strong>NORRSKEN HOUSE</strong></p>
          <p style={{ margin: '4px 0', fontSize: '0.85rem' }}>KN 78 ST., Kigali, Rwanda</p>
          <a href="mailto:booking@iforeveryoungtours.com" style={{ margin: '8px 0', fontSize: '0.85rem' }}>booking@iforeveryoungtours.com</a>
          <p style={{ margin: '8px 0 4px', fontSize: '0.85rem' }}>Rwanda: +250 794 004 336</p>
          <p style={{ margin: '4px 0', fontSize: '0.85rem' }}>US: +1 678 701 7785</p>
        </div>

        <div>
          <h4>{t('footer.tours')}</h4>
          {tourLinks.map((link, index) => (
            <a key={index} href={link.href}>{link.label}</a>
          ))}
        </div>
      </div>

      <div className="container footer-bottom">
        <div className="footer-bottom-left">
          <p>{t('footer.memberODIECLOUD')}</p>
          <p>{t('footer.trademark')}</p>
          <p>{t('footer.copyright')}</p>
        </div>
        <div className="footer-bottom-right">
          <img src="public/images/Powered_By_ODIEBOARD.png" alt="Powered by ODIEBOARD" style={{ height: '140px', width: 'auto', objectFit: 'contain' }} />
        </div>
      </div>
    </footer>
  );
}
