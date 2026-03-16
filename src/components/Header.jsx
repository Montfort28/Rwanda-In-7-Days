import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { HiGlobeAlt, HiMail } from 'react-icons/hi';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [mobileLangPos, setMobileLangPos] = useState({ top: 0, left: 0 });
  const mobileLangBtnRef = useRef(null);
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
    setLangMenuOpen(false);
  };

  const handleMobileLangToggle = () => {
    if (!langMenuOpen && mobileLangBtnRef.current) {
      const rect = mobileLangBtnRef.current.getBoundingClientRect();
      setMobileLangPos({ top: rect.bottom + 8, left: rect.left });
    }
    setLangMenuOpen(!langMenuOpen);
  };

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'unset';
      setLangMenuOpen(false);
    }
    return () => { document.body.style.overflowY = 'unset'; };
  }, [menuOpen]);

  return (
    <>
      <header>
        <div className="container nav-row">
          <a href="#overview" className="brand" onClick={handleNavClick}>
            <img src="public/images/logo.png" alt="Forever Young Tours" style={{ width: '46px', height: '46px', background: 'transparent', boxShadow: 'none', borderRadius: '0' }} />
            <div>
              <strong>{t('nav.brand')}</strong>
              <span className="brand-tagline-desktop">{t('nav.tagline')}</span>
            </div>
          </a>

          <nav className="nav-links desktop-nav">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={handleNavClick}>{link.label}</a>
            ))}
          </nav>

          <div className="nav-actions">
            <a className="btn btn-primary" href="#contact" onClick={handleNavClick}>{t('nav.bookTrip')}</a>
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
            <a key={link.href} href={link.href} onClick={handleNavClick}>{link.label}</a>
          ))}
          <div className="mobile-menu-footer">
            <a className="mobile-mail-btn" href="#contact" title="Send Email" onClick={handleNavClick}>
              <HiMail size={28} />
            </a>
            <div className="lang-switcher">
              <button ref={mobileLangBtnRef} className="lang-toggle" onClick={handleMobileLangToggle} title="Change Language">
                <HiGlobeAlt size={24} />
              </button>
            </div>
          </div>
        </nav>
      )}

      {langMenuOpen && menuOpen && (
        <div
          className="lang-menu lang-menu-fixed"
          style={{ top: mobileLangPos.top, left: mobileLangPos.left }}
        >
          {languages.map((lang) => (
            <button key={lang.code} className={`lang-option ${language === lang.code ? 'active' : ''}`}
              onClick={() => { changeLanguage(lang.code); setLangMenuOpen(false); }}>
              <span>{lang.flag}</span>{lang.name}
            </button>
          ))}
        </div>
      )}

      {menuOpen && <div className="menu-overlay" onClick={() => { setMenuOpen(false); setLangMenuOpen(false); }}></div>}
    </>
  );
}
