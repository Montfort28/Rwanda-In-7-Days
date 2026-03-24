import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { HiGlobeAlt, HiMail } from 'react-icons/hi';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');
  const [translateReady, setTranslateReady] = useState(false);
  const mobileLangBtnRef = useRef(null);
  const desktopLangBtnRef = useRef(null);
  const [mobileLangPos, setMobileLangPos] = useState({ top: 0, left: 0 });
  const [desktopLangPos, setDesktopLangPos] = useState({ top: 0, left: 0 });
  const { language, changeLanguage, t } = useLanguage();

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'sw', name: 'Kiswahili', flag: '🇹🇿' },
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

  const handleMobileLangToggle = (e) => {
    e.stopPropagation();
    if (!langMenuOpen && mobileLangBtnRef.current) {
      const rect = mobileLangBtnRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const menuWidth = 180;
      let leftPos = rect.left;
      
      // Adjust if menu would go off-screen on the right
      if (leftPos + menuWidth > viewportWidth) {
        leftPos = Math.max(16, viewportWidth - menuWidth - 16);
      }
      
      setMobileLangPos({ top: rect.bottom + 8, left: leftPos });
    }
    setLangMenuOpen(!langMenuOpen);
  };

  const handleDesktopLangToggle = (e) => {
    e.stopPropagation();
    if (!langMenuOpen && desktopLangBtnRef.current) {
      const rect = desktopLangBtnRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const menuWidth = 180;
      let leftPos = rect.left;
      
      // Adjust if menu would go off-screen on the right
      if (leftPos + menuWidth > viewportWidth) {
        leftPos = Math.max(16, viewportWidth - menuWidth - 16);
      }
      
      setDesktopLangPos({ top: rect.bottom + 8, left: leftPos });
    }
    setLangMenuOpen(!langMenuOpen);
  };

  const handleMobileLanguageChange = (e, code) => {
    e.stopPropagation();
    setCurrentLang(code);
    changeLanguage(code);
    setLangMenuOpen(false);
    setMenuOpen(false);
    
    // Trigger Google Translate immediately
    triggerGoogleTranslate(code);
  };

  const triggerGoogleTranslate = (langCode) => {
    const langMap = { 
      en: 'en', fr: 'fr', es: 'es', sw: 'sw', de: 'de',
      it: 'it', pt: 'pt', nl: 'nl', ru: 'ru', ja: 'ja',
      zh: 'zh-CN', ar: 'ar', hi: 'hi'
    };
    
    const googleLangCode = langMap[langCode] || langCode;
    
    console.log('Triggering translation to:', googleLangCode);
    
    try {
      // Set the googtrans cookie to trigger translation
      const translationPair = `/en/${googleLangCode}`;
      document.cookie = `googtrans=${translationPair}; path=/; SameSite=Lax`;
      
      // Reload the page to apply the translation via the cookie
      setTimeout(() => {
        window.location.reload();
      }, 300);
      
      return true;
    } catch (e) {
      console.error('Translation trigger error:', e);
      return false;
    }
  };

  const handleLanguageChange = (code) => {
    setCurrentLang(code);
    changeLanguage(code);
    setLangMenuOpen(false);
    
    // Trigger Google Translate immediately
    triggerGoogleTranslate(code);
  };

  // Close language menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langMenuOpen && !event.target.closest('.lang-switcher') && !event.target.closest('.lang-menu-fixed')) {
        setLangMenuOpen(false);
      }
    };
    
    if (langMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [langMenuOpen]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setLangMenuOpen(false);
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [menuOpen]);

  // Initialize Google Translate
  useEffect(() => {
    // Define the callback function globally
    window.googleTranslateElementInit = function() {
      try {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'en,fr,es,sw,de,it,pt,nl,ru,ja,zh-CN,ar,hi',
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false
          },
          'google_translate_element'
        );
        
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'en,fr,es,sw,de,it,pt,nl,ru,ja,zh-CN,ar,hi',
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false
          },
          'google_translate_element_mobile'
        );
        
        setTranslateReady(true);
        
        // Only hide the banner that appears (not the select element)
        setTimeout(() => {
          const banner = document.querySelector('.goog-te-banner-frame');
          if (banner) {
            banner.style.display = 'none';
          }
          document.body.style.top = '0';
          document.body.style.position = 'static';
        }, 500);
      } catch (err) {
        console.log('Google Translate initialization error:', err);
      }
    };

    // Check if Google Translate script is loaded
    const checkGoogleTranslate = () => {
      if (window.google && window.google.translate && window.google.translate.TranslateElement) {
        window.googleTranslateElementInit();
      } else {
        setTimeout(checkGoogleTranslate, 500);
      }
    };

    checkGoogleTranslate();

    // Cleanup
    return () => {
      delete window.googleTranslateElementInit;
    };
  }, []);

  // Monitor and hide Google Translate banner if it appears
  useEffect(() => {
    const hideGoogleTranslateBanner = () => {
      try {
        const banner = document.querySelector('.goog-te-banner-frame');
        if (banner && banner.style.display !== 'none') {
          banner.style.display = 'none';
          document.body.style.top = '0';
        }
      } catch (e) {
        // Silently fail
      }
    };

    const observer = new MutationObserver(() => {
      hideGoogleTranslateBanner();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: false
    });

    // Initial check
    hideGoogleTranslateBanner();

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header>
        <div className="container nav-row">
          <a href="#overview" className="brand" onClick={handleNavClick}>
            <img src="public/images/logo 1.png" alt="Forever Young Tours" style={{ width: '46px', height: '46px', background: 'transparent', boxShadow: 'none', borderRadius: '0' }} />
            <div>
              <strong>{t('nav.brand')}</strong>
              <span>{t('nav.tagline')}</span>
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
                <button ref={desktopLangBtnRef} className="lang-toggle" onClick={handleDesktopLangToggle} title="Change Language">
                  <HiGlobeAlt size={20} />
                </button>
              </div>
              <div id="google_translate_element" style={{ display: 'none', visibility: 'hidden', position: 'absolute', left: '-9999px' }}></div>
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
          <div id="google_translate_element_mobile" style={{ display: 'none', visibility: 'hidden', position: 'absolute', left: '-9999px' }}></div>
        </nav>
      )}

      {langMenuOpen && !menuOpen && (
        <div
          className="lang-menu lang-menu-fixed"
          style={{ 
            top: desktopLangPos.top, 
            left: desktopLangPos.left,
            maxHeight: '60vh',
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {languages.map((lang) => (
            <button key={lang.code} className={`lang-option ${currentLang === lang.code ? 'active' : ''}`}
              onClick={() => handleLanguageChange(lang.code)}>
              <span>{lang.flag}</span>{lang.name}
            </button>
          ))}
        </div>
      )}

      {langMenuOpen && menuOpen && (
        <div
          className="lang-menu lang-menu-fixed"
          style={{ 
            top: mobileLangPos.top, 
            left: mobileLangPos.left,
            maxHeight: '60vh',
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {languages.map((lang) => (
            <button key={lang.code} className={`lang-option ${currentLang === lang.code ? 'active' : ''}`}
              onClick={(e) => handleMobileLanguageChange(e, lang.code)}>
              <span>{lang.flag}</span>{lang.name}
            </button>
          ))}
        </div>
      )}

      {menuOpen && <div className="menu-overlay" onClick={() => { setMenuOpen(false); setLangMenuOpen(false); }}></div>}
    </>
  );
}
