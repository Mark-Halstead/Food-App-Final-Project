import React from 'react';
import { Landing, PricingCards, Hamburger, SocialMediaNavbar, Landinglogo, About } from '../../components';
import Wrapper from '../../assets/wrappers/HomePage';

const HomePage = () => {

  const scrollToComponent = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const position = element.offsetTop - 80;
      window.scrollTo({
        top: position,
        behavior: 'smooth',
      });
    }
  };

  return (
    <Wrapper>
      {/* <Hamburger /> */}
      <Landinglogo />
      <Landing />
      <button onClick={() => scrollToComponent('landing')}>Go to Landing</button>
      <button onClick={() => scrollToComponent('about')}>Go to About</button>
      <button onClick={() => scrollToComponent('pricing')}>Go to Pricing</button>
      <About />
      <PricingCards />
      <SocialMediaNavbar />
    </Wrapper>
  );
};

export default HomePage;

