import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Contact() {
  const context = useLanguage();
  const t = context?.t || ((key) => key);

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
          <h2>{t('contact.title')}</h2>
          <p>
            {t('contact.subtitle')}
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
                  <label htmlFor="fullName">{t('contact.fullName')} *</label>
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
                  <label htmlFor="email">{t('contact.email')} *</label>
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
                  <label htmlFor="whatsapp">{t('contact.whatsapp')} *</label>
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
                  <label htmlFor="arrivalDate">{t('contact.arrivalDate')} *</label>
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
                  <label htmlFor="groupSize">{t('contact.groupSize')} *</label>
                  <select
                    id="groupSize"
                    name="groupSize"
                    value={formData.groupSize}
                    onChange={handleChange}
                    required
                  >
                    <option value="">{t('contact.selectPlaceholder')}</option>
                    <option value="1">{t('contact.groupSizeOpt1')}</option>
                    <option value="2">{t('contact.groupSizeOpt2')}</option>
                    <option value="3">{t('contact.groupSizeOpt3')}</option>
                    <option value="4">{t('contact.groupSizeOpt4')}</option>
                    <option value="5">{t('contact.groupSizeOpt5')}</option>
                    <option value="6+">{t('contact.groupSizeOpt6')}</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="rooming">{t('contact.rooming')} *</label>
                  <select
                    id="rooming"
                    name="rooming"
                    value={formData.rooming}
                    onChange={handleChange}
                    required
                  >
                    <option value="">{t('contact.selectPlaceholder')}</option>
                    <option value="single">{t('contact.roomingOpt1')}</option>
                    <option value="double">{t('contact.roomingOpt2')}</option>
                    <option value="triple">{t('contact.roomingOpt3')}</option>
                    <option value="mixed">{t('contact.roomingOpt4')}</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="language">{t('contact.language')} *</label>
                  <select
                    id="language"
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                    required
                  >
                    <option value="">{t('contact.selectPlaceholder')}</option>
                    <option value="english">{t('contact.languageOpt1')}</option>
                    <option value="french">{t('contact.languageOpt2')}</option>
                    <option value="spanish">{t('contact.languageOpt3')}</option>
                    <option value="german">{t('contact.languageOpt4')}</option>
                    <option value="other">{t('contact.languageOpt5')}</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="airportService">{t('contact.airportService')}</label>
                  <select
                    id="airportService"
                    name="airportService"
                    value={formData.airportService}
                    onChange={handleChange}
                  >
                    <option value="">{t('contact.selectPlaceholder')}</option>
                    <option value="yes">{t('contact.airportOpt1')}</option>
                    <option value="no">{t('contact.airportOpt2')}</option>
                  </select>
                </div>

                <div className="form-group full-width">
                  <label htmlFor="dietary">{t('contact.dietary')}</label>
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
                  <label htmlFor="notes">{t('contact.notes')}</label>
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
                  {t('contact.submit')}
                </button>
              </div>
            </form>
          </div>

          {/* Info Card */}
          <div className="contact-card">
            <div className="card-header">
              <h3>{t('contact.cardTitle')}</h3>
            </div>
            <div className="card-content">
              <div className="info-item">
                <div className="info-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <div>
                  <p>{t('contact.step1')}</p>
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
                  <p>{t('contact.step2')}</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <div>
                  <p>{t('contact.step3')}</p>
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
                  <p>{t('contact.step4')}</p>
                </div>
              </div>

              <div className="contact-info-section">
                <h4>{t('contact.contactTitle')}</h4>
                <p><strong>NORRSKEN HOUSE</strong><br />{t('contact.address')}</p>
                <p><a href="mailto:booking@iforeveryoungtours.com">{t('contact.emailValue')}</a></p>
                <p>
                  {t('contact.rwandaPhone')}<br />
                  {t('contact.usPhone')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
