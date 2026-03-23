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
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

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

  const validateStep = (step) => {
    const errors = {};
    
    if (step === 1) {
      if (!formData.fullName.trim()) errors.fullName = 'Required';
      if (!formData.email.trim()) errors.email = 'Required';
      if (!formData.whatsapp.trim()) errors.whatsapp = 'Required';
      if (!formData.nationality.trim()) errors.nationality = 'Required';
    } else if (step === 2) {
      if (!formData.departureDate) errors.departureDate = 'Required';
      if (!formData.dateOfBirth) errors.dateOfBirth = 'Required';
      if (!formData.groupSize) errors.groupSize = 'Required';
      if (!formData.tier) errors.tier = 'Required';
    } else if (step === 3) {
      if (!formData.rooming) errors.rooming = 'Required';
      if (!formData.language) errors.language = 'Required';
      if (!formData.source) errors.source = 'Required';
    } else if (step === 4) {
      if (!formData.passportConfirmed) errors.passportConfirmed = 'Required';
    }
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(currentStep)) return;
    
    setLoading(true);
    setError('');
    setFieldErrors({});

    try {
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
          setCurrentStep(1);
        }, 10000);
      } else {
        setError(result.error);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('An unexpected error occurred. Please try again.');
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

        <div className="cta-band" style={{ marginTop: '40px', alignItems: 'start' }}>
          {/* Info Card Sidebar */}
          <div style={{ textAlign: 'center', height: 'fit-content' }}>
            <div style={{
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              borderRadius: 'var(--radius-xl)',
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <h3 style={{ color: 'var(--text)', marginTop: 0, marginBottom: '16px' }}>{t('contact.cardTitle')}</h3>
              <p style={{ color: 'var(--muted)', marginBottom: '20px', fontSize: '0.9rem', borderBottom: '1px solid var(--line)', paddingBottom: '20px', width: '100%' }}>
                {t('contact.subtitle')}
              </p>

              <div style={{ width: '100%', textAlign: 'left', marginBottom: '20px' }}>
                <div className="info-item" style={{ marginBottom: '12px' }}>
                  <div style={{ fontSize: '1.5rem', color: 'var(--blue-700)', marginRight: '12px', lineHeight: '1' }}>•</div>
                  <div>
                    <p style={{ margin: 0, fontSize: '0.9rem' }}>{t('contact.step1')}</p>
                  </div>
                </div>

                <div className="info-item" style={{ marginBottom: '12px' }}>
                  <div style={{ fontSize: '1.5rem', color: 'var(--blue-700)', marginRight: '12px', lineHeight: '1' }}>•</div>
                  <div>
                    <p style={{ margin: 0, fontSize: '0.9rem' }}>{t('contact.step2')}</p>
                  </div>
                </div>

                <div className="info-item" style={{ marginBottom: '12px' }}>
                  <div style={{ fontSize: '1.5rem', color: 'var(--blue-700)', marginRight: '12px', lineHeight: '1' }}>•</div>
                  <div>
                    <p style={{ margin: 0, fontSize: '0.9rem' }}>{t('contact.step3')}</p>
                  </div>
                </div>

                <div className="info-item" style={{ marginBottom: '12px' }}>
                  <div style={{ fontSize: '1.5rem', color: 'var(--blue-700)', marginRight: '12px', lineHeight: '1' }}>•</div>
                  <div>
                    <p style={{ margin: 0, fontSize: '0.9rem' }}>{t('contact.step4')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="cta-content">
            {/* Step Progress Indicator */}
            {!submitted && (
              <div style={{
                display: 'flex',
                gap: '8px',
                marginBottom: '28px',
                justifyContent: 'center'
              }}>
                {[1, 2, 3, 4].map(step => (
                  <div
                    key={step}
                    style={{
                      flex: 1,
                      height: '4px',
                      borderRadius: '999px',
                      background: step <= currentStep ? 'linear-gradient(135deg, #0ea5e9, #0284c7)' : 'var(--line)',
                      transition: 'all 0.3s ease'
                    }}
                  />
                ))}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: submitted ? 'none' : 'block' }}>
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

              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div style={{ minHeight: '400px' }}>
                  <h3 style={{ margin: '0 0 20px', fontSize: '1.2rem', fontWeight: '800', color: '#0f3556' }}>Personal Information</h3>
                  <div className="form-group">
                    <label htmlFor="fullName">{t('contact.fullName')} *</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g., Jane Marie Doe"
                    />
                    {fieldErrors.fullName && <small style={{ color: '#0284c7', fontSize: '0.85rem' }}>{fieldErrors.fullName}</small>}
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
                    />
                    {fieldErrors.email && <small style={{ color: '#0284c7', fontSize: '0.85rem' }}>{fieldErrors.email}</small>}
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
                      pattern="\+[0-9]{10,15}"
                      title="Please enter phone number in international format (e.g., +250123456789)"
                    />
                    <small style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '4px', display: 'block' }}>
                      International format: +[country code][number]
                    </small>
                    {fieldErrors.whatsapp && <small style={{ color: '#0284c7', fontSize: '0.85rem' }}>{fieldErrors.whatsapp}</small>}
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
                    />
                    {fieldErrors.nationality && <small style={{ color: '#0284c7', fontSize: '0.85rem' }}>{fieldErrors.nationality}</small>}
                  </div>
                </div>
              )}

              {/* Step 2: Travel Details */}
              {currentStep === 2 && (
                <div style={{ minHeight: '400px' }}>
                  <h3 style={{ margin: '0 0 20px', fontSize: '1.2rem', fontWeight: '800', color: '#0f3556' }}>Travel Details</h3>

                  <div className="form-group">
                    <label htmlFor="departureDate">{t('contact.departureDate')} *</label>
                    <input
                      type="date"
                      id="departureDate"
                      name="departureDate"
                      value={formData.departureDate}
                      onChange={handleChange}
                      min={getMinDepartureDate()}
                    />
                    <small style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '4px', display: 'block' }}>
                      Minimum 30 days advance booking required
                    </small>
                    {fieldErrors.departureDate && <small style={{ color: '#0284c7', fontSize: '0.85rem' }}>{fieldErrors.departureDate}</small>}
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
                    />
                    <small style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '4px', display: 'block' }}>
                      Minimum age 15 years for gorilla trekking
                    </small>
                    {fieldErrors.dateOfBirth && <small style={{ color: '#0284c7', fontSize: '0.85rem' }}>{fieldErrors.dateOfBirth}</small>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="groupSize">{t('contact.groupSize')} *</label>
                    <select
                      id="groupSize"
                      name="groupSize"
                      value={formData.groupSize}
                      onChange={handleChange}
                    >
                      <option value="">{t('contact.selectPlaceholder')}</option>
                      <option value="1">{t('contact.groupSizeOpt1')}</option>
                      <option value="2">{t('contact.groupSizeOpt2')}</option>
                      <option value="3">{t('contact.groupSizeOpt3')}</option>
                      <option value="4">{t('contact.groupSizeOpt4')}</option>
                      <option value="5">{t('contact.groupSizeOpt5')}</option>
                      <option value="6+">{t('contact.groupSizeOpt6')}</option>
                    </select>
                    {fieldErrors.groupSize && <small style={{ color: '#0284c7', fontSize: '0.85rem' }}>{fieldErrors.groupSize}</small>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="tier">{t('contact.tier')} *</label>
                    <select
                      id="tier"
                      name="tier"
                      value={formData.tier}
                      onChange={handleChange}
                    >
                      <option value="Premium">{t('contact.tierPremium')}</option>
                      <option value="Luxury">{t('contact.tierLuxury')}</option>
                    </select>
                    {fieldErrors.tier && <small style={{ color: '#0284c7', fontSize: '0.85rem' }}>{fieldErrors.tier}</small>}
                  </div>
                </div>
              )}

              {/* Step 3: Preferences */}
              {currentStep === 3 && (
                <div style={{ minHeight: '400px' }}>
                  <h3 style={{ margin: '0 0 20px', fontSize: '1.2rem', fontWeight: '800', color: '#0f3556' }}>Preferences</h3>

                  <div className="form-group">
                    <label htmlFor="rooming">{t('contact.rooming')} *</label>
                    <select
                      id="rooming"
                      name="rooming"
                      value={formData.rooming}
                      onChange={handleChange}
                    >
                      <option value="">{t('contact.selectPlaceholder')}</option>
                      <option value="King">{t('contact.roomingKing')}</option>
                      <option value="Queen">{t('contact.roomingQueen')}</option>
                      <option value="Full / Double">{t('contact.roomingDouble')}</option>
                      <option value="Twin (or Single)">{t('contact.roomingTwin')}</option>
                    </select>
                    {fieldErrors.rooming && <small style={{ color: '#0284c7', fontSize: '0.85rem' }}>{fieldErrors.rooming}</small>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="language">{t('contact.language')} *</label>
                    <select
                      id="language"
                      name="language"
                      value={formData.language}
                      onChange={handleChange}
                    >
                      <option value="">{t('contact.selectPlaceholder')}</option>
                      <option value="English">{t('contact.languageOpt1')}</option>
                      <option value="French">{t('contact.languageOpt2')}</option>
                      <option value="Spanish">{t('contact.languageOpt3')}</option>
                      <option value="Chinese">{t('contact.languageChinese')}</option>
                    </select>
                    {fieldErrors.language && <small style={{ color: '#0284c7', fontSize: '0.85rem' }}>{fieldErrors.language}</small>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="source">{t('contact.source')} *</label>
                    <select
                      id="source"
                      name="source"
                      value={formData.source}
                      onChange={handleChange}
                    >
                      <option value="">{t('contact.selectPlaceholder')}</option>
                      <option value="Google">{t('contact.sourceGoogle')}</option>
                      <option value="Facebook">{t('contact.sourceFacebook')}</option>
                      <option value="Instagram">{t('contact.sourceInstagram')}</option>
                      <option value="Referral">{t('contact.sourceReferral')}</option>
                      <option value="Other">{t('contact.sourceOther')}</option>
                    </select>
                    {fieldErrors.source && <small style={{ color: '#0284c7', fontSize: '0.85rem' }}>{fieldErrors.source}</small>}
                  </div>

                  <div className="form-group">
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

                  <div className="form-group">
                    <label htmlFor="notes">{t('contact.notes')}</label>
                    <textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Tell us your goals, fitness level, special requests..."
                      rows="3"
                    ></textarea>
                  </div>
                </div>
              )}

              {/* Step 4: Confirmation */}
              {currentStep === 4 && (
                <div style={{ minHeight: '400px' }}>
                  <h3 style={{ margin: '0 0 20px', fontSize: '1.2rem', fontWeight: '800', color: '#0f3556' }}>Confirmation</h3>

                  <div className="form-group">
                    <label htmlFor="passportConfirmed" style={{ display: 'flex', alignItems: 'flex-start', cursor: 'pointer', gap: '10px' }}>
                      <input
                        type="checkbox"
                        id="passportConfirmed"
                        name="passportConfirmed"
                        checked={formData.passportConfirmed}
                        onChange={(e) => setFormData(prev => ({ ...prev, passportConfirmed: e.target.checked }))}
                        style={{ width: 'auto', marginTop: '4px', flexShrink: 0 }}
                      />
                      <span>{t('contact.passportConfirmed')} *</span>
                    </label>
                    {fieldErrors.passportConfirmed && <small style={{ color: '#0284c7', fontSize: '0.85rem' }}>{fieldErrors.passportConfirmed}</small>}
                  </div>

                  <div className="form-policy">
                    <p><strong>Policy:</strong> Deposit locks permits and confirms your seat. Permit issuance is time-specific and may be non-refundable once issued.</p>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={handlePrevious}
                    className="btn btn-ghost"
                    style={{ flex: 1 }}
                  >
                    Previous
                  </button>
                )}
                {currentStep < totalSteps ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="btn btn-primary"
                    style={{ flex: 1 }}
                  >
                    Next Step
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ flex: 1 }}
                    disabled={loading}
                  >
                    {loading ? t('contact.submitting') : t('contact.submit')}
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Info Card Sidebar */}
          <div style={{ textAlign: 'center', height: 'fit-content' }}>
            <div style={{
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              borderRadius: 'var(--radius-xl)',
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <h3 style={{ color: 'var(--text)', marginTop: 0, marginBottom: '16px' }}>{t('contact.cardTitle')}</h3>
              <p style={{ color: 'var(--muted)', marginBottom: '20px', fontSize: '0.9rem', borderBottom: '1px solid var(--line)', paddingBottom: '20px', width: '100%' }}>
                {t('contact.subtitle')}
              </p>

              <div style={{ width: '100%', textAlign: 'left', marginBottom: '20px' }}>
                <div className="info-item" style={{ marginBottom: '12px' }}>
                  <div style={{ fontSize: '1.5rem', color: 'var(--blue-700)', marginRight: '12px', lineHeight: '1' }}>•</div>
                  <div>
                    <p style={{ margin: 0, fontSize: '0.9rem' }}>{t('contact.step1')}</p>
                  </div>
                </div>

                <div className="info-item" style={{ marginBottom: '12px' }}>
                  <div style={{ fontSize: '1.5rem', color: 'var(--blue-700)', marginRight: '12px', lineHeight: '1' }}>•</div>
                  <div>
                    <p style={{ margin: 0, fontSize: '0.9rem' }}>{t('contact.step2')}</p>
                  </div>
                </div>

                <div className="info-item" style={{ marginBottom: '12px' }}>
                  <div style={{ fontSize: '1.5rem', color: 'var(--blue-700)', marginRight: '12px', lineHeight: '1' }}>•</div>
                  <div>
                    <p style={{ margin: 0, fontSize: '0.9rem' }}>{t('contact.step3')}</p>
                  </div>
                </div>

                <div className="info-item" style={{ marginBottom: '12px' }}>
                  <div style={{ fontSize: '1.5rem', color: 'var(--blue-700)', marginRight: '12px', lineHeight: '1' }}>•</div>
                  <div>
                    <p style={{ margin: 0, fontSize: '0.9rem' }}>{t('contact.step4')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
