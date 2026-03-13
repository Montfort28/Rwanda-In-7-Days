import { useState, useEffect } from 'react';

export default function Topbar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const desktopMessages = [
    'Premium departures available for curated small groups and private custom travel.',
    'Join the travel community for priority access, member pricing, and future East Africa circuits.',
  ];

  const mobileMessages = [
    'Premium Rwanda Tours',
    'Join Travel Community',
  ];

  const messages = isMobile ? mobileMessages : desktopMessages;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 4200);

    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="topbar">
      <div className="container topbar-inner">
        <div className="ticker">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`ticker-item ${index === activeIndex ? 'active' : ''}`}
            >
              {message}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
