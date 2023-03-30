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
                    <h3>What we do</h3>
                    <p>
                    PlatePal is a nutritionist app that provides personalized meal recommendations based on the user's dietary preferences and health goals. The app offers a wide range of meal plans, recipes, and grocery lists, making it easy for users to plan and prepare healthy meals. PlatePal also has employed nutritionists to track the user's nutrient intake and offer tips on how to make healthier food choices. With PlatePal, users can achieve their health and wellness goals while enjoying delicious and nutritious meals.
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
