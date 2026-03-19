import { useLanguage } from '../context/LanguageContext';

export default function Itinerary() {
  const { t } = useLanguage();

  const days = [
    {
      day: 1,
      title: t('itinerary.day1Title'),
      description: t('itinerary.day1Desc'),
      image: 'images/Kigali.png'
    },
    {
      day: 2,
      title: t('itinerary.day2Title'),
      description: t('itinerary.day2Desc'),
      image: 'images/kigali cultural.png'
    },
    {
      day: 3,
      title: t('itinerary.day3Title'),
      description: t('itinerary.day3Desc'),
      image: 'images/gorilla-trekking-volcanoes.jpg'
    },
    {
      day: 4,
      title: t('itinerary.day4Title'),
      description: t('itinerary.day4Desc'),
      image: 'images/Akagera-Safari1.jpg'
    },
    {
      day: 5,
      title: t('itinerary.day5Title'),
      description: t('itinerary.day5Desc'),
      image: 'images/Canopy-Walk-Nyungwe27.jpg'
    },
    {
      day: 6,
      title: t('itinerary.day6Title'),
      description: t('itinerary.day6Desc'),
      image: 'images/Akagera Safaris3.jpg'
    },
    {
      day: 7,
      title: t('itinerary.day7Title'),
      description: t('itinerary.day7Desc'),
      image: 'images/akagera extension.jpg'
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
