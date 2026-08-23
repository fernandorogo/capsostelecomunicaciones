import React, { useEffect } from 'react';
import '../css/HomeRedesign.css';

import HeroSliderSection from '../components/HeroSliderSection';
import ServicesSection from '../components/ServicesSection';
import ChannelsSection from '../components/ChannelsSection';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';

import PopupPublicidad from '../components/PopupPublicidad';
import CapsosImageWall from '../components/CapsosImageWall';
import FacebookFeed from '../components/FacebookFeed';

const HomeCorporate = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="home-corporate">

      <PopupPublicidad />

      <main>
        <HeroSliderSection />
        <ServicesSection />

      <FacebookFeed />
        <ChannelsSection />
        <AboutSection />
        <CapsosImageWall/>
        <ContactSection />
      </main>


    </div>
  );
};

export default HomeCorporate;