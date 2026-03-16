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
          <div className="footer-logo-box">
            <img src="public/images/logo.png" alt="Forever Young Tours" />
          </div>
          <div className="footer-content">
            <h4>{t('footer.company')}</h4>
            <p className="footer-slogan">{t('footer.slogan')}</p>
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
          <strong>{t('footer.poweredBy')}</strong>
        </div>
      </div>
    </footer>
  );
}
