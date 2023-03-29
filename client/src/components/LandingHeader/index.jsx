import React from 'react';

function LandingHeader() {
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
      <div className="banner">
        <h1 className="banner-heading">
          <span className="banner-heading-1">Health</span>
          <span className="banner-heading-2">Wellness</span>
          <span className="banner-heading-3">Nutrition</span>
          <span className="banner-heading-4">Lifestyle</span>
        </h1>
        <button className="banner-btn" onClick={() => scrollToComponent('about')}>Discover Now</button>
      </div>
  );
}

export default LandingHeader;

