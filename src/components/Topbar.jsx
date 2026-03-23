import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Topbar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const { t } = useLanguage();

  const desktopMessages = [
    t('topbar.premium') || 'Premium departures available for curated small groups and private custom travel.',
    t('topbar.community') || 'Join the travel community for priority access, member pricing, and future East Africa circuits.',
  ];

  const mobileMessages = [
    t('topbar.premiumShort') || 'Premium Rwanda Tours',
    t('topbar.communityShort') || 'Join Travel Community',
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

  useEffect(() => {
    const topbar = document.querySelector('.topbar');
    const header = document.querySelector('header');
    const main = document.querySelector('main');
    
    const onScroll = () => {
      if (!topbar || !header || !main) return;
      
      const mobileNav = document.querySelector('.nav-links.mobile-nav');
      
      if (window.scrollY > 10) {
        topbar.classList.add('hide-on-scroll');
        header.classList.remove('topbar-visible');
        header.classList.add('topbar-hidden');
        main.classList.remove('topbar-visible');
        if (mobileNav && mobileNav.classList.contains('active')) {
          mobileNav.style.top = '76px';
        }
      } else {
        topbar.classList.remove('hide-on-scroll');
        header.classList.add('topbar-visible');
        header.classList.remove('topbar-hidden');
        main.classList.add('topbar-visible');
        if (mobileNav && mobileNav.classList.contains('active')) {
          mobileNav.style.top = '118px';
        }
      }
    };
    
    if (window.scrollY <= 10) {
      header.classList.add('topbar-visible');
      main.classList.add('topbar-visible');
    }
    
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
