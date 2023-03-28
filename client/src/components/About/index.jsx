import React from 'react'
import AboutTitle from '../AboutTitle'

const About = () => {
    const scrollToComponent = (id) => {
        const element = document.getElementById(id);
        if (element) {
          const position = element.offsetTop;
          window.scrollTo({
            top: position,
            behavior: 'smooth',
          });
        }
      };
    return (
        <section className='about-section' id='about'>
            <AboutTitle title='about' subTitle='platepal' />

            <div className='about-section-center about-center'>
                <div className='about-img'>
                    <img src="https://media.istockphoto.com/id/1402004971/photo/healthy-heart-food-high-in-flavonoids-and-polyphenols.jpg?b=1&s=170667a&w=0&k=20&c=QevKY1TYe-TigCs5ypIp0fp9LYTBMk3W6tGHE6De-A8=" className='about-photo' alt='awesome beach' />
                </div>
                <article className='about-info'>
                    <h3>Lorem ipsum</h3>
                    <p>
                        An e-learning app with a quiz and revision planner is an excellent tool for learners of all ages and abilities. The quiz feature allows users to test their knowledge and comprehension of the subject matter, providing immediate feedback and helping to reinforce learning.
                    </p>
                    <p>
                        The revision planner feature enables users to schedule and plan their study time effectively.
                    </p>
                    <a href='#activities' className='btn btn-activities' onClick={() => scrollToComponent('pricing')}>
                        Pricing
                    </a>
                </article>
            </div>
        </section>
    )
}

export default About
