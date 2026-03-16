import { useLanguage } from '../context/LanguageContext';

export default function Itinerary() {
  const { t } = useLanguage();

  const days = [
    {
      day: 1,
      title: t('itinerary.day1Title'),
      description: t('itinerary.day1Desc'),
      image: 'public/images/city break.jpg'
    },
    {
      day: 2,
      title: t('itinerary.day2Title'),
      description: t('itinerary.day2Desc'),
      image: 'public/images/city break 1.jpg'
    },
    {
      day: 3,
      title: t('itinerary.day3Title'),
      description: t('itinerary.day3Desc'),
      image: 'public/images/placeholder.jpg'
    },
    {
      day: 4,
      title: t('itinerary.day4Title'),
      description: t('itinerary.day4Desc'),
      image: 'public/images/Virunga Mountains.jpg'
    },
    {
      day: 5,
      title: t('itinerary.day5Title'),
      description: t('itinerary.day5Desc'),
      image: 'public/images/canopy.jpg'
    },
    {
      day: 6,
      title: t('itinerary.day6Title'),
      description: t('itinerary.day6Desc'),
      image: 'public/images/akagera.jpg'
    },
    {
      day: 7,
      title: t('itinerary.day7Title'),
      description: t('itinerary.day7Desc'),
      image: 'public/images/akagera extension.jpg'
    }
  ];

  return (
    <section className="section" id="itinerary">
      <div className="container">
        <div className="section-head">
          <h2>{t('itinerary.title')}</h2>
          <p>
            {t('itinerary.subtitle')}
          </p>
        </div>

        <div className="itinerary">
          {days.map((item) => (
            <div key={item.day} className="day">
              <img src={item.image} alt={item.title} className="day-image" />
              <div>
                <div className="day-label">Day {item.day}</div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
