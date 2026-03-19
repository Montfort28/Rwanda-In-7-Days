import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { submitBookingToBaserow } from '../services/baserowService';

export default function Contact() {
  const context = useLanguage();
  const t = context?.t || ((key) => key);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    whatsapp: '',
    departureDate: '',
    groupSize: '',
    tier: 'Premium',
    rooming: '',
    language: '',
    nationality: '',
    dateOfBirth: '',
    passportConfirmed: false,
    dietary: '',
    notes: '',
    source: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [bookingReference, setBookingReference] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  // Get minimum date (30 days from now)
  const getMinDepartureDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 30);
    return date.toISOString().split('T')[0];
  };

  // Get maximum date of birth (15 years ago)
  const getMaxDateOfBirth = () => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 15);
    return date.toISOString().split('T')[0];
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setFieldErrors({});

    const result = await submitBookingToBaserow(formData);

    if (result.success) {
      setSubmitted(true);
      setBookingReference(result.reference);
      
      // Reset form after 10 seconds (increased from 5)
      setTimeout(() => {
        setFormData({
          fullName: '',
          email: '',
          whatsapp: '',
          departureDate: '',
          groupSize: '',
          tier: 'Premium',
          rooming: '',
          language: '',
          nationality: '',
          dateOfBirth: '',
          passportConfirmed: false,
          dietary: '',
          notes: '',
          source: ''
        });
        setSubmitted(false);
        setBookingReference('');
      }, 10000);
    } else {
      setError(result.error);
    }

    setLoading(false);
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
                  <p>Your booking reference: <strong>{bookingReference}</strong></p>
                  <p>We'll confirm availability and send your invoice within 24 hours.</p>
                  <button 
                    type="button" 
                    onClick={() => navigator.clipboard.writeText(bookingReference)}
                    style={{
                      marginTop: '12px',
                      padding: '8px 16px',
                      background: 'rgba(14, 165, 233, 0.1)',
                      border: '1px solid rgba(14, 165, 233, 0.3)',
                      borderRadius: '8px',
                      color: '#0284c7',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      fontWeight: '600'
                    }}
                  >
                    📋 Copy Reference
                  </button>
                </div>
              )}

              {error && (
                <div className="form-error">
                  <div className="error-icon">✕</div>
                  <p>{error}</p>
                </div>
              )}

              <div className={`form-content ${submitted ? 'hidden' : ''}`}>
                <div className="form-row">
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
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="whatsapp">{t('contact.whatsapp')} *</label>
                    <input
                      type="tel"
                      id="whatsapp"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      placeholder="+250..."
                      pattern="\+[0-9]{10,15}"
                      title="Please enter phone number in international format (e.g., +250123456789)"
                      required
                    />
                    <small style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '4px', display: 'block' }}>
                      International format: +[country code][number]
                    </small>
                  </div>

                  <div className="form-group">
                    <label htmlFor="nationality">{t('contact.nationality')} *</label>
                    <input
                      type="text"
                      id="nationality"
                      name="nationality"
                      value={formData.nationality}
                      onChange={handleChange}
                      placeholder="e.g., American, British"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="departureDate">{t('contact.departureDate')} *</label>
                    <input
                      type="date"
                      id="departureDate"
                      name="departureDate"
                      value={formData.departureDate}
                      onChange={handleChange}
                      min={getMinDepartureDate()}
                      required
                    />
                    <small style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '4px', display: 'block' }}>
                      Minimum 30 days advance booking required
                    </small>
                  </div>

                  <div className="form-group">
                    <label htmlFor="dateOfBirth">{t('contact.dateOfBirth')} *</label>
                    <input
                      type="date"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      max={getMaxDateOfBirth()}
                      required
                    />
                    <small style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '4px', display: 'block' }}>
                      Minimum age 15 years for gorilla trekking
                    </small>
                  </div>
                </div>

                <div className="form-row">
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
                    <label htmlFor="tier">{t('contact.tier')} *</label>
                    <select
                      id="tier"
                      name="tier"
                      value={formData.tier}
                      onChange={handleChange}
                      required
                    >
                      <option value="Premium">{t('contact.tierPremium')}</option>
                      <option value="Luxury">{t('contact.tierLuxury')}</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
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
                      <option value="King">{t('contact.roomingKing')}</option>
                      <option value="Queen">{t('contact.roomingQueen')}</option>
                      <option value="Full / Double">{t('contact.roomingDouble')}</option>
                      <option value="Twin (or Single)">{t('contact.roomingTwin')}</option>
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
                      <option value="English">{t('contact.languageOpt1')}</option>
                      <option value="French">{t('contact.languageOpt2')}</option>
                      <option value="Spanish">{t('contact.languageOpt3')}</option>
                      <option value="Chinese">{t('contact.languageChinese')}</option>
                    </select>
                  </div>
                </div>

                <div className="form-group full-width">
                  <label htmlFor="source">{t('contact.source')} *</label>
                  <select
                    id="source"
                    name="source"
                    value={formData.source}
                    onChange={handleChange}
                    required
                  >
                    <option value="">{t('contact.selectPlaceholder')}</option>
                    <option value="Google">{t('contact.sourceGoogle')}</option>
                    <option value="Facebook">{t('contact.sourceFacebook')}</option>
                    <option value="Instagram">{t('contact.sourceInstagram')}</option>
                    <option value="Referral">{t('contact.sourceReferral')}</option>
                    <option value="Other">{t('contact.sourceOther')}</option>
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

                <div className="form-group full-width">
                  <label htmlFor="passportConfirmed" style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      id="passportConfirmed"
                      name="passportConfirmed"
                      checked={formData.passportConfirmed}
                      onChange={(e) => setFormData(prev => ({ ...prev, passportConfirmed: e.target.checked }))}
                      required
                      style={{ width: 'auto', marginRight: '8px' }}
                    />
                    {t('contact.passportConfirmed')} *
                  </label>
                </div>

                <div className="form-policy">
                  <p><strong>Policy:</strong> Deposit locks permits and confirms your seat. Permit issuance is time-specific and may be non-refundable once issued.</p>
                </div>

                <button type="submit" className="btn btn-primary form-submit" disabled={loading}>
                  {loading ? t('contact.submitting') : t('contact.submit')}
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
