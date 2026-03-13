export default function CTA() {
  return (
    <section className="section" id="book">
      <div className="container">
        <div className="cta-band">
          <div className="cta-content">
            <h2 style={{ margin: '12px 0 12px', fontSize: 'clamp(1.9rem, 3vw, 3rem)', lineHeight: 1.04, letterSpacing: '-.04em' }}>
              Ready to secure your Rwanda in 7 Days journey?
            </h2>
            <p style={{ margin: '0 0 20px', color: 'var(--muted)', fontSize: '1.02rem', maxWidth: '700px' }}>
              Reserve your seat, request a private departure, or speak with our team about premium customization, extensions, and future East Africa combinations.
            </p>
            <div className="cta-buttons">
              <a className="btn btn-primary" href="#">Book Now</a>
              <a className="btn btn-secondary" href="#">Request a Private Departure</a>
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <img src="public/images/news letter 2.JPG" alt="Newsletter" className="cta-image" />
          </div>
        </div>
      </div>
    </section>
  );
}
