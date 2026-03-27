import { useLanguage } from '../context/LanguageContext';
import { Star } from 'lucide-react'

export default function Testimonials() {
  const { t } = useLanguage();

  const testimonials = [
    {
      rating: 5,
      quote: t('reviews.quote1'),
      author: t('reviews.author1'),
      type: t('reviews.type1')
    },
    {
      rating: 5,
      quote: t('reviews.quote2'),
      author: t('reviews.author2'),
      type: t('reviews.type2')
    },
    {
      rating: 5,
      quote: t('reviews.quote3'),
      author: t('reviews.author3'),
      type: t('reviews.type3')
    }
  ];

  return (
    <section className="section" id="testimonials" style={{ background: 'linear-gradient(180deg, #cffafe 0%, #e0f2fe 100%)' }}>
      <div className="container">
        <div className="section-head">
          <h2>{t('reviews.title')}</h2>
          <p>{t('reviews.subtitle')}</p>
        </div>

        <div className="cards cards-3">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial">
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, j) => (
                  <Star
                    key={j}
                    style={{ width: '20px', height: '20px', color: '#facc15', fill: '#facc15' }}
                  />
                ))}
              </div>
              <blockquote>{testimonial.quote}</blockquote>
              <p><strong>{testimonial.author}</strong></p>
              <p style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>{testimonial.type}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
