import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    whatsapp: '',
    arrivalDate: '',
    groupSize: '',
    rooming: '',
    language: '',
    airportService: '',
    dietary: '',
    notes: ''
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
    console.log('Booking submitted:', formData);
    setSubmitted(true);
    
    setTimeout(() => {
      setFormData({
        fullName: '',
        email: '',
        whatsapp: '',
        arrivalDate: '',
        groupSize: '',
        rooming: '',
        language: '',
        airportService: '',
        dietary: '',
        notes: ''
      });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <div className="section-head">
          <h2>Book Your Rwanda in 7 Days Experience</h2>
          <p>
            Sunday Arrival Intake • Permits Bundled • Premium Lodges
          </p>
        </div>

        <div className="contact-grid">
          {/* Booking Form */}
          <div className="contact-form-wrapper">
            <form className="contact-form" onSubmit={handleSubmit}>
              {submitted && (
                <div className="form-success">
                  <div className="success-icon">✓</div>
                  <h4>Booking Received!</h4>
                  <p>We'll confirm availability and send your invoice within 24 hours.</p>
                </div>
              )}

              <div className={`form-content ${submitted ? 'hidden' : ''}`}>
                <div className="form-group">
                  <label htmlFor="fullName">Full Name (Passport) *</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g., Jane Marie Doe"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@email.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="whatsapp">WhatsApp Number *</label>
                  <input
                    type="tel"
                    id="whatsapp"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    placeholder="+250..."
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="arrivalDate">Preferred Arrival Sunday *</label>
                  <input
                    type="date"
                    id="arrivalDate"
                    name="arrivalDate"
                    value={formData.arrivalDate}
                    onChange={handleChange}
                    placeholder="YYYY-MM-DD (Sunday arrival)"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="groupSize">Group Size *</label>
                  <select
                    id="groupSize"
                    name="groupSize"
                    value={formData.groupSize}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select</option>
                    <option value="1">1 Person</option>
                    <option value="2">2 People</option>
                    <option value="3">3 People</option>
                    <option value="4">4 People</option>
                    <option value="5">5 People</option>
                    <option value="6+">6+ People</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="rooming">Rooming *</label>
                  <select
                    id="rooming"
                    name="rooming"
                    value={formData.rooming}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select</option>
                    <option value="single">Single Room</option>
                    <option value="double">Double/Twin Room</option>
                    <option value="triple">Triple Room</option>
                    <option value="mixed">Mixed (specify in notes)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="language">Language *</label>
                  <select
                    id="language"
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select</option>
                    <option value="english">English</option>
                    <option value="french">French</option>
                    <option value="spanish">Spanish</option>
                    <option value="german">German</option>
                    <option value="other">Other (specify in notes)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="airportService">Sunday Airport Intake Service (Optional)</label>
                  <select
                    id="airportService"
                    name="airportService"
                    value={formData.airportService}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="yes">Yes, include airport pickup</option>
                    <option value="no">No, I'll arrange my own transport</option>
                  </select>
                </div>

                <div className="form-group full-width">
                  <label htmlFor="dietary">Dietary Requirements (Optional)</label>
                  <input
                    type="text"
                    id="dietary"
                    name="dietary"
                    value={formData.dietary}
                    onChange={handleChange}
                    placeholder="e.g., Vegetarian, vegan, allergies..."
                  />
                </div>

                <div className="form-group full-width">
                  <label htmlFor="notes">Notes / Questions (Optional)</label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Tell us your goals, fitness level, special requests..."
                    rows="4"
                  ></textarea>
                </div>

                <div className="form-policy">
                  <p><strong>Policy:</strong> Deposit locks permits and confirms your seat. Permit issuance is time-specific and may be non-refundable once issued.</p>
                </div>

                <button type="submit" className="btn btn-primary form-submit">
                  Submit Booking Request
                </button>
              </div>
            </form>
          </div>

          {/* Info Card */}
          <div className="contact-card">
            <div className="card-header">
              <h3>What happens after you submit</h3>
            </div>
            <div className="card-content">
              <div className="info-item">
                <div className="info-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <div>
                  <p>FYT confirms availability for your preferred Sunday arrival cycle.</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                  </svg>
                </div>
                <div>
                  <p>We issue your invoice and deposit instructions.</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <div>
                  <p>Upon deposit, permits are allocated and your booking is confirmed.</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div>
                  <p>You receive your guest briefing + packing list + final itinerary.</p>
                </div>
              </div>

              <div className="contact-info-section">
                <h4>Contact</h4>
                <p><strong>NORRSKEN HOUSE</strong><br />KN 78 ST., Kigali, Rwanda</p>
                <p><a href="mailto:booking@iforeveryoungtours.com">booking@iforeveryoungtours.com</a></p>
                <p>
                  Rwanda: <a href="tel:+250794004336">+250 794 004 336</a><br />
                  US: <a href="tel:+16787017785">+1 678 701 7785</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
