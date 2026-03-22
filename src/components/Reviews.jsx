import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Reviews() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('rate');
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    bookingReference: '',
    tourStartDate: '',
    fullName: '',
    email: '',
    overallRating: '',
    recommendation: '',
    testimonial: '',
    publishPermission: '',
    bestDay: '',
    friendName: '',
    friendEmail: '',
    friendWhatsapp: '',
    friendMessage: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation based on active tab
    let isValid = false;
    let missingFields = [];
    
    if (activeTab === 'rate') {
      if (!formData.bookingReference.trim()) missingFields.push('Booking Reference');
      if (!formData.overallRating) missingFields.push('Overall Rating');
      if (!formData.recommendation) missingFields.push('Recommendation');
      isValid = missingFields.length === 0;
    } else if (activeTab === 'testimonial') {
      if (!formData.testimonial.trim()) missingFields.push('Testimonial');
      isValid = missingFields.length === 0;
    } else if (activeTab === 'refer') {
      if (!formData.friendEmail.trim()) missingFields.push('Friend Email');
      isValid = missingFields.length === 0;
    }
    
    if (!isValid) {
      alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }
    
    console.log('Review submitted:', formData);
    setSubmitted(true);
    
    setTimeout(() => {
      setFormData({
        bookingReference: '',
        tourStartDate: '',
        fullName: '',
        email: '',
        overallRating: '',
        recommendation: '',
        testimonial: '',
        publishPermission: '',
        bestDay: '',
        friendName: '',
        friendEmail: '',
        friendWhatsapp: '',
        friendMessage: ''
      });
      setSubmitted(false);
      setActiveTab('rate');
    }, 3000);
  };

  const testimonials = [
    {
      stars: 5,
      quote: t('reviews.quote1'),
      author: t('reviews.author1'),
      type: t('reviews.type1')
    },
    {
      stars: 5,
      quote: t('reviews.quote2'),
      author: t('reviews.author2'),
      type: t('reviews.type2')
    },
    {
      stars: 5,
      quote: t('reviews.quote3'),
      author: t('reviews.author3'),
      type: t('reviews.type3')
    }
  ];

  return (
    <section className="section" id="reviews">
      <div className="container">
         {/* Rate Tour Form Section */}
        <div style={{ marginTop: '80px' }}>
          <div className="section-head">
            <h2>{t('reviews.rateTitle')}</h2>
            <p>{t('reviews.rateSubtitle')}</p>
          </div>

          {/* Tabbed Interface like CTA */}
          <div className="cta-band" style={{ marginTop: '40px', alignItems: 'start' }}>
            <div className="cta-content">
              {/* Tab Navigation */}
              <div className="reviews-tab-nav" style={{
                display: 'flex',
                gap: '16px',
                marginBottom: '32px',
                borderBottom: '1px solid var(--line)',
                paddingBottom: '16px',
                flexWrap: 'wrap'
              }}>
                <button
                  onClick={() => setActiveTab('rate')}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: '12px 20px',
                    paddingBottom: '16px',
                    marginBottom: '-17px',
                    color: activeTab === 'rate' ? 'var(--blue-700)' : 'var(--muted)',
                    fontWeight: activeTab === 'rate' ? '700' : '600',
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    borderBottom: activeTab === 'rate' ? '3px solid var(--blue-700)' : 'none',
                    transition: 'all 0.2s ease',
                    fontFamily: 'inherit'
                  }}
                >
                 {t('reviews.tabRate')}
                </button>
                <button
                  onClick={() => setActiveTab('testimonial')}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: '12px 20px',
                    paddingBottom: '16px',
                    marginBottom: '-17px',
                    color: activeTab === 'testimonial' ? 'var(--blue-700)' : 'var(--muted)',
                    fontWeight: activeTab === 'testimonial' ? '700' : '600',
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    borderBottom: activeTab === 'testimonial' ? '3px solid var(--blue-700)' : 'none',
                    transition: 'all 0.2s ease',
                    fontFamily: 'inherit'
                  }}
                >
                 {t('reviews.tabTestimonial')}
                </button>
                <button
                  onClick={() => setActiveTab('refer')}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: '12px 20px',
                    paddingBottom: '16px',
                    marginBottom: '-17px',
                    color: activeTab === 'refer' ? 'var(--blue-700)' : 'var(--muted)',
                    fontWeight: activeTab === 'refer' ? '700' : '600',
                    fontSize: '0.95rem',
                    cursor: 'pointer',
                    borderBottom: activeTab === 'refer' ? '3px solid var(--blue-700)' : 'none',
                    transition: 'all 0.2s ease',
                    fontFamily: 'inherit'
                  }}
                >
                  {t('reviews.tabRefer')}
                </button>
              </div>

              {/* Form Content */}
              {submitted && (
                <div className="form-success" style={{
                  padding: '24px',
                  background: 'rgba(34, 197, 94, 0.1)',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  borderRadius: 'var(--radius-md)',
                  textAlign: 'center',
                  marginBottom: '32px',
                  color: 'var(--teal)'
                }}>
                  <div style={{ fontSize: '32px', marginBottom: '12px' }}>✓</div>
                  <h4 style={{ color: 'var(--text)', margin: '0 0 8px', fontSize: '1.2rem', fontWeight: '700' }}>{t('reviews.successTitle')}</h4>
                  <p style={{ color: 'var(--muted)', margin: 0, fontSize: '0.95rem' }}>{t('reviews.successMessage')}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: submitted ? 'none' : 'block' }}>
                {/* RATE Tab */}
                {activeTab === 'rate' && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '32px' }}>
                    <div className="form-group">
                      <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text)', fontSize: '0.9rem', fontWeight: '600' }}>
                        {t('reviews.bookingRef')} *
                      </label>
                      <input
                        type="text"
                        name="bookingReference"
                        value={formData.bookingReference}
                        onChange={handleChange}
                        placeholder="e.g., FYT-RW7D-2026-0001"
                        required
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          background: 'var(--surface)',
                          border: '1px solid var(--line)',
                          borderRadius: 'var(--radius-md)',
                          color: 'var(--text)',
                          fontSize: '0.95rem',
                          boxSizing: 'border-box',
                          fontFamily: 'inherit'
                        }}
                      />
                    </div>

                    <div className="form-group">
                      <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text)', fontSize: '0.9rem', fontWeight: '600' }}>
                        {t('reviews.tourDate')}
                      </label>
                      <input
                        type="date"
                        name="tourStartDate"
                        value={formData.tourStartDate}
                        onChange={handleChange}
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          background: 'var(--surface)',
                          border: '1px solid var(--line)',
                          borderRadius: 'var(--radius-md)',
                          color: 'var(--text)',
                          fontSize: '0.95rem',
                          boxSizing: 'border-box',
                          fontFamily: 'inherit'
                        }}
                      />
                    </div>

                    <div className="form-group">
                      <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text)', fontSize: '0.9rem', fontWeight: '600' }}>
                        {t('reviews.overallRating')}
                      </label>
                      <div style={{ position: 'relative' }}>
                        <select
                          name="overallRating"
                          value={formData.overallRating}
                          onChange={handleChange}
                          style={{
                            width: '100%',
                            padding: '12px 16px 12px 16px',
                            paddingRight: '40px',
                            background: 'var(--surface)',
                            border: '1px solid var(--line)',
                            borderRadius: 'var(--radius-md)',
                            color: 'var(--text)',
                            fontSize: '0.95rem',
                            boxSizing: 'border-box',
                            fontFamily: 'inherit',
                            cursor: 'pointer',
                            appearance: 'none',
                            transition: 'border-color 0.2s ease, background-color 0.2s ease'
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = '#0ea5e9';
                            e.target.style.boxShadow = '0 0 0 3px rgba(14, 165, 233, 0.1)';
                            const icon = e.target.nextElementSibling?.querySelector('svg');
                            if (icon) icon.style.color = '#0ea5e9';
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = 'var(--line)';
                            e.target.style.boxShadow = 'none';
                            const icon = e.target.nextElementSibling?.querySelector('svg');
                            if (icon) icon.style.color = 'var(--muted)';
                          }}
                        >
                          <option value="">{t('reviews.select')}</option>
                          <option value="5">5 - {t('reviews.excellent')}</option>
                          <option value="4">4 - {t('reviews.veryGood')}</option>
                          <option value="3">3 - {t('reviews.good')}</option>
                          <option value="2">2 - {t('reviews.fair')}</option>
                          <option value="1">1 - {t('reviews.poor')}</option>
                        </select>
                        <div style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--muted)', transition: 'color 0.2s ease' }}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text)', fontSize: '0.9rem', fontWeight: '600' }}>
                        {t('reviews.recommend')}
                      </label>
                      <div style={{ position: 'relative' }}>
                        <select
                          name="recommendation"
                          value={formData.recommendation}
                          onChange={handleChange}
                          style={{
                            width: '100%',
                            padding: '12px 16px 12px 16px',
                            paddingRight: '40px',
                            background: 'var(--surface)',
                            border: '1px solid var(--line)',
                            borderRadius: 'var(--radius-md)',
                            color: 'var(--text)',
                            fontSize: '0.95rem',
                            boxSizing: 'border-box',
                            fontFamily: 'inherit',
                            cursor: 'pointer',
                            appearance: 'none',
                            transition: 'border-color 0.2s ease, background-color 0.2s ease'
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = '#0ea5e9';
                            e.target.style.boxShadow = '0 0 0 3px rgba(14, 165, 233, 0.1)';
                            const icon = e.target.nextElementSibling?.querySelector('svg');
                            if (icon) icon.style.color = '#0ea5e9';
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = 'var(--line)';
                            e.target.style.boxShadow = 'none';
                            const icon = e.target.nextElementSibling?.querySelector('svg');
                            if (icon) icon.style.color = 'var(--muted)';
                          }}
                        >
                          <option value="">{t('reviews.select')}</option>
                          <option value="yes">{t('reviews.recommendYes')}</option>
                          <option value="no">{t('reviews.recommendNo')}</option>
                        </select>
                        <div style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--muted)', transition: 'color 0.2s ease' }}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* TESTIMONIAL Tab */}
                {activeTab === 'testimonial' && (
                  <div style={{ marginBottom: '32px' }}>
                    <div className="form-group" style={{ marginBottom: '20px' }}>
                      <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text)', fontSize: '0.9rem', fontWeight: '600' }}>
                        {t('reviews.fullName')} ({t('reviews.optional')})
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="e.g., Jane Doe"
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          background: 'var(--surface)',
                          border: '1px solid var(--line)',
                          borderRadius: 'var(--radius-md)',
                          color: 'var(--text)',
                          fontSize: '0.95rem',
                          boxSizing: 'border-box',
                          fontFamily: 'inherit'
                        }}
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: '20px' }}>
                      <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text)', fontSize: '0.9rem', fontWeight: '600' }}>
                        {t('reviews.testimonialTitle')} *
                      </label>
                      <textarea
                        name="testimonial"
                        value={formData.testimonial}
                        onChange={handleChange}
                        placeholder={t('reviews.testimonialPlaceholder')}
                        required
                        rows="5"
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          background: 'var(--surface)',
                          border: '1px solid var(--line)',
                          borderRadius: 'var(--radius-md)',
                          color: 'var(--text)',
                          fontSize: '0.95rem',
                          boxSizing: 'border-box',
                          fontFamily: 'inherit',
                          resize: 'vertical'
                        }}
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: '20px' }}>
                      <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text)', fontSize: '0.9rem', fontWeight: '600' }}>
                        {t('reviews.bestDay')}
                      </label>
                      <div style={{ position: 'relative' }}>
                        <select
                          name="bestDay"
                          value={formData.bestDay}
                          onChange={handleChange}
                          style={{
                            width: '100%',
                            padding: '12px 16px 12px 16px',
                            paddingRight: '40px',
                            background: 'var(--surface)',
                            border: '1px solid var(--line)',
                            borderRadius: 'var(--radius-md)',
                            color: 'var(--text)',
                            fontSize: '0.95rem',
                            boxSizing: 'border-box',
                            fontFamily: 'inherit',
                            cursor: 'pointer',
                            appearance: 'none',
                            transition: 'border-color 0.2s ease, background-color 0.2s ease'
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = '#0ea5e9';
                            e.target.style.boxShadow = '0 0 0 3px rgba(14, 165, 233, 0.1)';
                            const icon = e.target.nextElementSibling?.querySelector('svg');
                            if (icon) icon.style.color = '#0ea5e9';
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = 'var(--line)';
                            e.target.style.boxShadow = 'none';
                            const icon = e.target.nextElementSibling?.querySelector('svg');
                            if (icon) icon.style.color = 'var(--muted)';
                          }}
                        >
                          <option value="">{t('reviews.select')}</option>
                          <option value="day1">{t('reviews.day1')}</option>
                          <option value="day2">{t('reviews.day2')}</option>
                          <option value="day3">{t('reviews.day3')}</option>
                          <option value="day4">{t('reviews.day4')}</option>
                          <option value="day5">{t('reviews.day5')}</option>
                          <option value="day6">{t('reviews.day6')}</option>
                          <option value="day7">{t('reviews.day7')}</option>
                          <option value="day8">{t('reviews.day8')}</option>
                        </select>
                        <div style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--muted)', transition: 'color 0.2s ease' }}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text)', fontSize: '0.9rem', fontWeight: '600' }}>
                        {t('reviews.publish')}
                      </label>
                      <div style={{ position: 'relative' }}>
                        <select
                          name="publishPermission"
                          value={formData.publishPermission}
                          onChange={handleChange}
                          style={{
                            width: '100%',
                            padding: '12px 16px 12px 16px',
                            paddingRight: '40px',
                            background: 'var(--surface)',
                            border: '1px solid var(--line)',
                            borderRadius: 'var(--radius-md)',
                            color: 'var(--text)',
                            fontSize: '0.95rem',
                            boxSizing: 'border-box',
                            fontFamily: 'inherit',
                            cursor: 'pointer',
                            appearance: 'none',
                            transition: 'border-color 0.2s ease, background-color 0.2s ease'
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = '#0ea5e9';
                            e.target.style.boxShadow = '0 0 0 3px rgba(14, 165, 233, 0.1)';
                            const icon = e.target.nextElementSibling?.querySelector('svg');
                            if (icon) icon.style.color = '#0ea5e9';
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = 'var(--line)';
                            e.target.style.boxShadow = 'none';
                            const icon = e.target.nextElementSibling?.querySelector('svg');
                            if (icon) icon.style.color = 'var(--muted)';
                          }}
                        >
                          <option value="">{t('reviews.select')}</option>
                          <option value="named">{t('reviews.publishNamed')}</option>
                          <option value="anonymous">{t('reviews.publishAnon')}</option>
                          <option value="no">{t('reviews.publishNo')}</option>
                        </select>
                        <div style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--muted)', transition: 'color 0.2s ease' }}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* REFER Tab */}
                {activeTab === 'refer' && (
                  <div style={{ marginBottom: '32px' }}>
                    <div className="form-group">
                      <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text)', fontSize: '0.9rem', fontWeight: '600' }}>
                        {t('reviews.friendName')}
                      </label>
                      <input
                        type="text"
                        name="friendName"
                        value={formData.friendName}
                        onChange={handleChange}
                        placeholder="e.g., John Smith"
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          background: 'var(--surface)',
                          border: '1px solid var(--line)',
                          borderRadius: 'var(--radius-md)',
                          color: 'var(--text)',
                          fontSize: '0.95rem',
                          boxSizing: 'border-box',
                          fontFamily: 'inherit'
                        }}
                      />
                    </div>

                    <div className="form-group" style={{ marginTop: '20px' }}>
                      <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text)', fontSize: '0.9rem', fontWeight: '600' }}>
                        {t('reviews.friendEmail')} *
                      </label>
                      <input
                        type="email"
                        name="friendEmail"
                        value={formData.friendEmail}
                        onChange={handleChange}
                        placeholder="friend@email.com"
                        required
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          background: 'var(--surface)',
                          border: '1px solid var(--line)',
                          borderRadius: 'var(--radius-md)',
                          color: 'var(--text)',
                          fontSize: '0.95rem',
                          boxSizing: 'border-box',
                          fontFamily: 'inherit'
                        }}
                      />
                    </div>

                    <div className="form-group" style={{ marginTop: '20px' }}>
                      <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text)', fontSize: '0.9rem', fontWeight: '600' }}>
                        {t('reviews.friendWhatsapp')}
                      </label>
                      <input
                        type="tel"
                        name="friendWhatsapp"
                        value={formData.friendWhatsapp}
                        onChange={handleChange}
                        placeholder="+250..."
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          background: 'var(--surface)',
                          border: '1px solid var(--line)',
                          borderRadius: 'var(--radius-md)',
                          color: 'var(--text)',
                          fontSize: '0.95rem',
                          boxSizing: 'border-box',
                          fontFamily: 'inherit'
                        }}
                      />
                    </div>

                    <div className="form-group" style={{ marginTop: '20px' }}>
                      <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text)', fontSize: '0.9rem', fontWeight: '600' }}>
                        {t('reviews.friendMessage')} ({t('reviews.optional')})
                      </label>
                      <input
                        type="text"
                        name="friendMessage"
                        value={formData.friendMessage}
                        onChange={handleChange}
                        placeholder={t('reviews.friendMessagePlaceholder')}
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          background: 'var(--surface)',
                          border: '1px solid var(--line)',
                          borderRadius: 'var(--radius-md)',
                          color: 'var(--text)',
                          fontSize: '0.95rem',
                          boxSizing: 'border-box',
                          fontFamily: 'inherit'
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Verification Note */}
                <div style={{
                  padding: '16px',
                  background: 'var(--sky)',
                  border: '1px solid var(--line)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--blue-700)',
                  fontSize: '0.85rem',
                  marginBottom: '24px'
                }}>
                  <strong>{t('reviews.verificationLabel')}:</strong> {t('reviews.verificationText')}
                </div>

                {/* Submit Button */}
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '24px' }}>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{
                      padding: '14px 48px',
                      fontSize: '0.95rem',
                      fontWeight: '600'
                    }}
                  >
                    {activeTab === 'rate' && t('reviews.submitRate')}
                    {activeTab === 'testimonial' && t('reviews.submitTest')}
                    {activeTab === 'refer' && t('reviews.submitRefer')}
                  </button>
                </div>
              </form>
            </div>

            {/* QR Code Sidebar */}
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
                <h3 style={{ color: 'var(--text)', marginTop: 0, marginBottom: '16px' }}>{t('reviews.qrTitle')}</h3>
                <p style={{ color: 'var(--muted)', marginBottom: '20px', fontSize: '0.9rem' }}>
                  {t('reviews.qrSubtitle')}
                </p>

                {/* QR Code Image */}
                <img
                  src="images/QR code.png"
                  alt="QR Code"
                  style={{
                    width: '200px',
                    height: '200px',
                    borderRadius: '12px',
                    marginBottom: '20px',
                    border: '2px solid var(--line)',
                    objectFit: 'contain',
                    padding: '8px',
                    background: '#ffffff'
                  }}
                />

                <div style={{ marginBottom: '20px', width: '100%' }}>
                  <h4 style={{ color: 'var(--text)', marginBottom: '8px', fontSize: '0.95rem', fontWeight: '700' }}>
                    {t('reviews.referralURL')}
                  </h4>
                  <p style={{
                    color: 'var(--blue-700)',
                    fontSize: '0.8rem',
                    wordBreak: 'break-all',
                    padding: '12px',
                    background: 'var(--sky)',
                    border: '1px solid var(--line)',
                    borderRadius: 'var(--radius-md)',
                    margin: 0,
                    fontFamily: 'monospace'
                  }}>
                    https://api.iforeveryoungtours.com/?ref=FYT-GLOBAL
                  </p>
                </div>

                <div style={{
                  display: 'flex',
                  gap: '8px',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  marginBottom: '16px'
                }}>
                  <span className="pill">{t('reviews.pillFastShare')}</span>
                  <span className="pill">{t('reviews.pillAnyDevice')}</span>
                  <span className="pill">{t('reviews.pillAdvisorReady')}</span>
                </div>

                <p style={{
                  color: 'var(--muted)',
                  fontSize: '0.8rem',
                  fontStyle: 'italic',
                  margin: 0
                }}>
                  {t('reviews.qrTip')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
