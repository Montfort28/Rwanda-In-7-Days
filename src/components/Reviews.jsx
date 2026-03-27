import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Reviews() {
  const { t, language } = useLanguage();
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

  return (
    <section className="section" id="reviews" style={{
      background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(14, 165, 233, 0.08) 50%, rgba(30, 64, 175, 0.08) 100%)'
    }}>
      <div className="container" >
        <div style={{ marginTop: '80px' }}>
          <div className="section-head">
            <h2>{t('reviews.rateTitle')}</h2>
            <p>{t('reviews.rateSubtitle')}</p>
          </div>

          <div className="cta-band" style={{ marginTop: '40px', alignItems: 'start' }}>
            <div className="cta-content" style={{ border: '2px solid rgba(14, 165, 233, 0.5)', borderRadius: 'var(--radius-xl)', padding: '34px', background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(14, 165, 233, 0.08) 50%, rgba(30, 64, 175, 0.08) 100%)', boxShadow: '0 8px 32px rgba(14, 165, 233, 0.2)', maxWidth: '100%', overflow: 'hidden' }}>
              <div className="reviews-tab-nav">
                <button
                  key="rate-btn"
                  onClick={() => setActiveTab('rate')}
                  type="button"
                  className={`reviews-tab-btn${activeTab === 'rate' ? ' active' : ''}`}
                >
                  {t('reviews.tabRate')}
                </button>
                <button
                  key="testimonial-btn"
                  onClick={() => setActiveTab('testimonial')}
                  type="button"
                  className={`reviews-tab-btn${activeTab === 'testimonial' ? ' active' : ''}`}
                >
                  {t('reviews.tabTestimonial')}
                </button>
                <button
                  key="refer-btn"
                  onClick={() => setActiveTab('refer')}
                  type="button"
                  className={`reviews-tab-btn${activeTab === 'refer' ? ' active' : ''}`}
                >
                  {t('reviews.tabRefer')}
                </button>
              </div>

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

              <form key={`form-${language}-${activeTab}`} onSubmit={handleSubmit} style={{ display: submitted ? 'none' : 'block' }}>
                {activeTab === 'rate' && (
                  <div style={{ marginBottom: '32px', border: '2px solid rgba(14, 165, 233, 0.3)', borderRadius: 'var(--radius-md)', padding: '20px', background: 'rgba(255, 255, 255, 0.7)' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                      <div className="form-group">
                        <label style={{ display: 'flex', alignItems: 'center', minHeight: '40px', marginBottom: '8px', color: 'var(--text)', fontSize: '0.9rem', fontWeight: '600' }}>
                          {t('reviews.bookingRef')} *
                        </label>
                        <input
                          type="text"
                          name="bookingReference"
                          value={formData.bookingReference}
                          onChange={handleChange}
                          placeholder="FYT-RW7D-2026-0001"
                          required
                          style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}
                        />
                      </div>

                      <div className="form-group">
                        <label style={{ display: 'flex', alignItems: 'center', minHeight: '40px', marginBottom: '8px', color: 'var(--text)', fontSize: '0.9rem', fontWeight: '600' }}>
                          {t('reviews.tourDate')}
                        </label>
                        <input
                          type="date"
                          name="tourStartDate"
                          value={formData.tourStartDate}
                          onChange={handleChange}
                          style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}
                        />
                      </div>

                      <div className="form-group">
                        <label style={{ display: 'flex', alignItems: 'center', minHeight: '40px', marginBottom: '8px', color: 'var(--text)', fontSize: '0.9rem', fontWeight: '600' }}>
                          {t('reviews.overallRating')}
                        </label>
                        <select
                          name="overallRating"
                          value={formData.overallRating}
                          onChange={handleChange}
                          style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}
                        >
                          <option value="">{t('reviews.select')}</option>
                          <option value="5">5 - {t('reviews.excellent')}</option>
                          <option value="4">4 - {t('reviews.veryGood')}</option>
                          <option value="3">3 - {t('reviews.good')}</option>
                          <option value="2">2 - {t('reviews.fair')}</option>
                          <option value="1">1 - {t('reviews.poor')}</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label style={{ display: 'flex', alignItems: 'center', minHeight: '40px', marginBottom: '8px', color: 'var(--text)', fontSize: '0.9rem', fontWeight: '600' }}>
                          {t('reviews.recommend')}
                        </label>
                        <select
                          name="recommendation"
                          value={formData.recommendation}
                          onChange={handleChange}
                          style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}
                        >
                          <option value="">{t('reviews.select')}</option>
                          <option value="yes">{t('reviews.recommendYes')}</option>
                          <option value="no">{t('reviews.recommendNo')}</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'testimonial' && (
                  <div style={{ marginBottom: '32px', border: '2px solid rgba(14, 165, 233, 0.3)', borderRadius: 'var(--radius-md)', padding: '20px', background: 'rgba(255, 255, 255, 0.7)' }}>
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
                        style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}
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
                        style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}
                      />
                    </div>

                    <div className="form-group" style={{ marginBottom: '20px' }}>
                      <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text)', fontSize: '0.9rem', fontWeight: '600' }}>
                        {t('reviews.bestDay')}
                      </label>
                      <select
                        name="bestDay"
                        value={formData.bestDay}
                        onChange={handleChange}
                        style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}
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
                    </div>

                    <div className="form-group">
                      <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text)', fontSize: '0.9rem', fontWeight: '600' }}>
                        {t('reviews.publish')}
                      </label>
                      <select
                        name="publishPermission"
                        value={formData.publishPermission}
                        onChange={handleChange}
                        style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}
                      >
                        <option value="">{t('reviews.select')}</option>
                        <option value="named">{t('reviews.publishNamed')}</option>
                        <option value="anonymous">{t('reviews.publishAnon')}</option>
                        <option value="no">{t('reviews.publishNo')}</option>
                      </select>
                    </div>
                  </div>
                )}

                {activeTab === 'refer' && (
                  <div style={{ marginBottom: '32px', border: '2px solid rgba(14, 165, 233, 0.3)', borderRadius: 'var(--radius-md)', padding: '20px', background: 'rgba(255, 255, 255, 0.7)' }}>
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
                        style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}
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
                        style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}
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
                        style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}
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
                        style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}
                      />
                    </div>
                  </div>
                )}

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
