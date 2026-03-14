export default function Footer() {
  const footerLinks = {
    explore: [
      { href: '#overview', label: 'Overview' },
      { href: '#highlights', label: 'Highlights' },
      { href: '#itinerary', label: 'Itinerary' },
      { href: '#pricing', label: 'Pricing' },
      { href: '#reviews', label: 'Reviews' }
    ],
    tours: [
      { href: '#', label: 'Adventure Tours' },
      { href: '#', label: 'Agro Tours' },
      { href: '#', label: 'City Breaks' },
      { href: '#', label: 'Cruises' },
      { href: '#', label: 'Cultural Exchanges' },
      { href: '#', label: 'Motorcoach Tours' },
      { href: '#', label: 'Rail Tours' },
      { href: '#contact', label: 'Book a Trip' }
    ],
    community: [
      { href: '#', label: 'Become a Member' },
      { href: '#', label: 'Become an Advisor' },
      { href: '#', label: 'Create Your Own Tour' },
      { href: '#', label: 'Resources' }
    ],
    legal: [
      { href: '#', label: 'Privacy Policy' },
      { href: '#', label: 'Terms & Conditions' },
      { href: '#', label: 'Disclaimers' },
      { href: '#', label: 'Contact' }
    ]
  };

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-first">
          <div className="footer-logo-box">
            <img src="public/images/logo.png" alt="Forever Young Tours" />
          </div>
          <div className="footer-content">
            <h4>Forever Young Tours</h4>
            <p className="footer-slogan">Live Bold. Stay Forever Young.</p>
            <p>Curated global tours, cultural discovery, premium travel experiences, and systems-driven execution for travelers who live bold.</p>
          </div>
        </div>

        <div>
          <h4>Explore</h4>
          {footerLinks.explore.map((link, index) => (
            <a key={index} href={link.href}>{link.label}</a>
          ))}
        </div>
        
        <div>
          <h4>Legal</h4>
          {footerLinks.legal.map((link, index) => (
            <a key={index} href={link.href}>{link.label}</a>
          ))}
        </div>
        
        <div>
          <h4>Travel Community</h4>
          {footerLinks.community.map((link, index) => (
            <a key={index} href={link.href}>{link.label}</a>
          ))}
        </div>

        <div>
          <h4>Tours</h4>
          {footerLinks.tours.map((link, index) => (
            <a key={index} href={link.href}>{link.label}</a>
          ))}
        </div>
      </div>

      <div className="container footer-bottom">
        <div className="footer-bottom-left">
          <p>Member of ODIECLOUD²π Ecosystem.</p>
          <p>ODIECLOUD²π, ODIEBOARD, Oπ, ODIEXA, and AUREX are Registered Trademark<br />and Service Marks of Oderson Holdings Ltd.</p>
          <p>© Copyright Forever Young Tours. All Rights Reserved.</p>
        </div>
        <div className="footer-bottom-right">
          <strong>Powered by ODIEBOARD</strong>
        </div>
      </div>
    </footer>
  );
}
