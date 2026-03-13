export default function Reviews() {
  const testimonials = [
    {
      stars: 5,
      quote: '"This was the most complete way to experience Rwanda in one journey — beautifully organized, emotionally powerful, and extremely well paced."',
      author: 'Premium Wildlife Traveler',
      type: 'Signature Circuit Guest'
    },
    {
      stars: 5,
      quote: '"From gorillas to the safari finish, every segment felt purposeful. We never felt rushed, but we saw so much."',
      author: 'Luxury Group Traveler',
      type: 'Private Departure Guest'
    },
    {
      stars: 5,
      quote: '"The logistics were excellent. You could feel that the route had been designed by people who care about both detail and experience."',
      author: 'Adventure Couple',
      type: 'East Africa Circuit Traveler'
    }
  ];

  return (
    <section className="section" id="reviews">
      <div className="container">
        <div className="section-head">
          <h2>What travelers remember most</h2>
          <p>
            The strongest premium travel experiences create both emotional impact and operational confidence. This circuit is designed to do both.
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
