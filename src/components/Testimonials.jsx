import { useLanguage } from '../context/LanguageContext';

export default function Testimonials() {
  const { t } = useLanguage();

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
    <section className="section" id="testimonials">
      <div className="container">
        <div className="section-head">
          <h2>{t('reviews.title')}</h2>
          <p>{t('reviews.subtitle')}</p>
        </div>

        <div className="cards cards-3">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial">
              <blockquote>"{testimonial.quote}"</blockquote>
              <p><strong>{testimonial.author}</strong></p>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>{testimonial.type}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
