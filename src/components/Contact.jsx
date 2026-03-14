import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'general',
    tourInterest: 'Rwanda 7 Days',
    travelDates: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    console.log('Form submitted:', formData);
    setSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        inquiryType: 'general',
        tourInterest: 'Rwanda 7 Days',
        travelDates: '',
        message: ''
      });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <div className="section-head">
          <h2>Get In Touch With Forever Young Tours</h2>
          <p>
            Have questions about your Rwanda adventure? Our dedicated team is ready to help you plan the perfect journey. We respond within 24 hours.
          </p>
        </div>

        <div className="contact-grid">
          {/* Info Card */}
          <div className="contact-card">
            <div className="card-header">
              <h3>Why Contact Us?</h3>
            </div>
            <div className="card-content">
              <div className="info-item">
                <div className="info-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                </div>
                <div>
                  <h4>Personalized Consultation</h4>
                  <p>Get expert guidance tailored to your travel style, preferences, and budget.</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <div>
                  <h4>After You Submit</h4>
                  <p>Our team confirms receipt and schedules a call within 24 hours to discuss your vision.</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <div>
                  <h4>Premium Support</h4>
                  <p>24/7 operations support during your journey and dedicated pre-trip planning assistance.</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                  </svg>
                </div>
                <div>
                  <h4>Customization Options</h4>
                  <p>Extend your stay, combine tours, add private experiences, or create a bespoke itinerary.</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2">
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="12" cy="5" r="1"></circle>
                    <circle cx="12" cy="19" r="1"></circle>
                    <circle cx="5" cy="12" r="1"></circle>
                    <circle cx="19" cy="12" r="1"></circle>
                    <path d="M10 14l-2 2M14 10l2-2M10 10l-2-2M14 14l2 2M12 7v10M7 12h10"></path>
                  </svg>
                </div>
                <div>
                  <h4>Exclusive Partnerships</h4>
                  <p>Access to premium lodges, expert guides, and VIP permits through our curated network.</p>
                </div>
              </div>

              <div className="contact-quick-info">
                <div className="quick-stat">
                  <strong>24-Hour</strong>
                  <span>Response Time</span>
                </div>
                <div className="quick-stat">
                  <strong>100%</strong>
                  <span>Satisfaction Guarantee</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-wrapper">
            <form className="contact-form" onSubmit={handleSubmit}>
              {submitted && (
                <div className="form-success">
                  <div className="success-icon">✓</div>
                  <h4>Thank You!</h4>
                  <p>We've received your message and will contact you within 24 hours.</p>
                </div>
              )}

              <div className={`form-content ${submitted ? 'hidden' : ''}`}>
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567 or +250 7XX XXX XXX"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="tourInterest">Which Tour Interests You? *</label>
                  <select
                    id="tourInterest"
                    name="tourInterest"
                    value={formData.tourInterest}
                    onChange={handleChange}
                  >
                    <option>Rwanda 7 Days - Signature Circuit</option>
                    <option>Rwanda 10 Days - Extended Adventure</option>
                    <option>Gorilla Trekking Only</option>
                    <option>Private Custom Tour</option>
                    <option>East Africa Multi-Country</option>
                    <option>Other - I'll explain below</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="inquiryType">Type of Inquiry *</label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleChange}
                  >
                    <option value="general">General Information</option>
                    <option value="booking">Ready to Book</option>
                    <option value="customization">Customization Request</option>
                    <option value="group">Group Tour Inquiry</option>
                    <option value="corporate">Corporate/Team Event</option>
                    <option value="other">Other Question</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="travelDates">Preferred Travel Dates</label>
                  <input
                    type="text"
                    id="travelDates"
                    name="travelDates"
                    value={formData.travelDates}
                    onChange={handleChange}
                    placeholder="e.g., May 15-22, 2026"
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor="message">Your Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your travel dreams, questions, or special requests..."
                    rows="5"
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary form-submit">
                  Send My Inquiry
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
