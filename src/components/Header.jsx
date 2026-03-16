import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { HiGlobeAlt, HiMail } from 'react-icons/hi';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const { language, changeLanguage, t } = useLanguage();

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'sw', name: 'Kiswahili', flag: '🇹🇿' },
  ];

  const navLinks = [
    { href: '#overview', label: t('nav.overview') },
    { href: '#highlights', label: t('nav.highlights') },
    { href: '#itinerary', label: t('nav.itinerary') },
    { href: '#pricing', label: t('nav.pricing') },
    { href: '#reviews', label: t('nav.reviews') },
  ];

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuOpen && e.target.closest('.menu-overlay')) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [menuOpen]);

  return (
    <>
      <header className={menuOpen ? 'menu-active' : ''}>
        <div className="container nav-row">
          <a href="#overview" className="brand">
            <img src="public/images/logo.png" alt="Forever Young Tours" style={{ width: '46px', height: '46px', background: 'transparent', boxShadow: 'none', borderRadius: '0' }} />
            <div>
              <strong>Forever Young Tours</strong>
              <span>Live Bold. Stay Forever Young.</span>
            </div>
          </a>

          <nav className="nav-links desktop-nav">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={handleNavClick}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className="nav-actions">
            <a className="btn btn-primary" href="#book">Book This Trip</a>
            <div className="icon-group desktop-icons">
              <div className="lang-switcher">
                <button className="lang-toggle" onClick={() => setLangMenuOpen(!langMenuOpen)} title="Change Language">
                  <HiGlobeAlt size={20} />
                </button>
                {langMenuOpen && (
                  <div className="lang-menu">
                    {languages.map((lang) => (
                      <button key={lang.code} className={`lang-option ${language === lang.code ? 'active' : ''}`}
                        onClick={() => { changeLanguage(lang.code); setLangMenuOpen(false); }}>
                        <span>{lang.flag}</span>{lang.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <a className="nav-icon-btn" href="#contact" title="Send Email"><HiMail size={20} /></a>
            </div>
          </div>

          <button className="hamburger" aria-label="Open menu" onClick={() => setMenuOpen(!menuOpen)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: '#000' }}>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </header>

      {menuOpen && (
        <nav className="nav-links mobile-nav active">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={handleNavClick}>
              {link.label}
            </a>
          ))}
          <div className="mobile-menu-footer">
            <a className="nav-icon-btn mobile-email-icon" href="#contact" title="Send Email" onClick={handleNavClick}><HiMail size={28} /></a>
            <div className="lang-switcher mobile-lang-switcher">
              <button className="lang-toggle" onClick={() => setLangMenuOpen(!langMenuOpen)} title="Change Language">
                <HiGlobeAlt size={28} />
              </button>
              {langMenuOpen && (
                <div className="lang-menu mobile-lang-dropdown">
                  {languages.map((lang) => (
                    <button key={lang.code} className={`lang-option ${language === lang.code ? 'active' : ''}`}
                      onClick={() => { changeLanguage(lang.code); setLangMenuOpen(false); }}>
                      <span>{lang.flag}</span>{lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </nav>
      )}
      {menuOpen && <div className="menu-overlay" onClick={() => setMenuOpen(false)}></div>}
    </>
  );
}
