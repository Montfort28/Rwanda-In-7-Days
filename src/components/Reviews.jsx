import { useLanguage } from '../context/LanguageContext';

export default function Reviews() {
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
    <section className="section" id="reviews">
      <div className="container">
        <div className="section-head">
          <h2>{t('reviews.title')}</h2>
          <p>
            {t('reviews.subtitle')}
          </p>
        </div>

        <div className="cards cards-3">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial">
              <div className="stars">{'★'.repeat(testimonial.stars)}</div>
              <blockquote>{testimonial.quote}</blockquote>
              <div>
                <strong>{testimonial.author}</strong>
                <br />
                <span style={{ color: 'var(--muted)' }}>{testimonial.type}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
