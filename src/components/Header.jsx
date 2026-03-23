import { useState, useEffect, useRef } from 'react';
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
    { code: 'sw', name: 'Kiswahili', flag: '🇰🇪' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
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

  const handleLanguageChange = (code) => {
    changeLanguage(code);
    // Trigger Google Translate for the selected language
    if (code === 'en') {
      window.location.reload();
    } else {
      const langMap = { 
        fr: 'fr', 
        es: 'es', 
        sw: 'sw',
        de: 'de',
        it: 'it',
        pt: 'pt',
        nl: 'nl',
        ru: 'ru',
        ja: 'ja',
        zh: 'zh-CN',
        ar: 'ar',
        hi: 'hi'
      };
      const googleLang = langMap[code];
      if (googleLang && window.google && window.google.translate) {
        setTimeout(() => {
          const select = document.querySelector('.goog-te-combo');
          if (select) {
            select.value = googleLang;
            select.dispatchEvent(new Event('change'));
          }
        }, 100);
      }
    }
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

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langMenuOpen && !e.target.closest('.lang-switcher') && !e.target.closest('.lang-menu') && !e.target.closest('.lang-menu-fixed')) {
        setLangMenuOpen(false);
      }
    };
    if (langMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [langMenuOpen]);

  // Initialize Google Translate Widget after component mounts
  useEffect(() => {
    const initGoogleTranslate = () => {
      if (window.google && window.google.translate && window.google.translate.TranslateElement) {
        try {
          // Initialize desktop version
          new window.google.translate.TranslateElement(
            { pageLanguage: 'en', includedLanguages: 'en,fr,es,sw,de,it,pt,nl,ru,ja,zh-CN,ar,hi' },
            'google_translate_element'
          );
          
          // Initialize mobile version
          new window.google.translate.TranslateElement(
            { pageLanguage: 'en', includedLanguages: 'en,fr,es,sw,de,it,pt,nl,ru,ja,zh-CN,ar,hi' },
            'google_translate_element_mobile'
          );
        } catch (err) {
          console.log('Google Translate already initialized or error:', err);
        }
      } else if (window.google?.translate?.TranslateElement) {
        // Alternative check for the translate element
        try {
          new window.google.translate.TranslateElement(
            { pageLanguage: 'en', includedLanguages: 'en,fr,es,sw,de,it,pt,nl,ru,ja,zh-CN,ar,hi' },
            'google_translate_element'
          );
          
          new window.google.translate.TranslateElement(
            { pageLanguage: 'en', includedLanguages: 'en,fr,es,sw,de,it,pt,nl,ru,ja,zh-CN,ar,hi' },
            'google_translate_element_mobile'
          );
        } catch (err) {
          console.log('Google Translate already initialized or error:', err);
        }
      }
    };
    
    // Wait a bit for Google Translate to load, then initialize
    const timer = setTimeout(initGoogleTranslate, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <header>
        <div className="container nav-row">
          <a href="#overview" className="brand" onClick={handleNavClick}>
            <img src="images/logo 1.png?v=2" alt="Forever Young Tours" style={{ width: '46px', height: '46px', background: 'transparent', boxShadow: 'none', borderRadius: '0' }} />
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
              {/* Google Translate Widget - Compact Selector */}
              <div id="google_translate_element" className="gt-navbar-compact"></div>
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
          </div>
          <div className="mobile-translate">
            <div id="google_translate_element_mobile"></div>
          </div>
        </nav>
      )}

      {menuOpen && <div className="menu-overlay" onClick={() => { setMenuOpen(false); setLangMenuOpen(false); }}></div>}
    </>
  );
}
