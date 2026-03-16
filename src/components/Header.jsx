import { useState, useEffect } from 'react';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: '#overview', label: 'Overview' },
    { href: '#highlights', label: 'Highlights' },
    { href: '#itinerary', label: 'Itinerary' },
    { href: '#pricing', label: 'Pricing' },
    { href: '#reviews', label: 'Reviews' },
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
            <a className="btn btn-primary" href="#contact">Book This Trip</a>
          </div>

          <button
            className="hamburger"
            aria-label="Open menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
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
        </nav>
      )}
      {menuOpen && <div className="menu-overlay" onClick={() => setMenuOpen(false)}></div>}
    </>
  );
}
