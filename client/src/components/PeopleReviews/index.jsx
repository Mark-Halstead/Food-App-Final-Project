import React from 'react';
import ReviewsTitle from '../ReviewsTitle';

function PeopleReviews() {
  return (
    <section className="stories">
      <ReviewsTitle title='our' subTitle='reviews' />
      <div className="stories-wrapper">
        <div className="story-bg">
          <div className="story">
            {/* <img
              src="images/story-img-1.jpg"
              alt="Customer image"
              className="story-image"
            /> */}
            <div className="story-text">
              <h1 className="story-heading">
                Sadik Islam
              </h1>
              <p className="story-paragraph">
                One of the standout features of the Nutritionist app is its user-friendly interface. The app is incredibly easy to use, even for those who aren't particularly tech-savvy. With a few taps of your finger, you can input your daily meals, snacks, and beverages, and the app will provide you with detailed nutritional information about everything you've consumed. You can even scan barcodes to quickly add products to your food diary. Give it a try, and you won't be disappointed!
              </p>
            </div>
          </div>
        </div>
        <div className="story-bg">
          <div className="story">
            {/* <img
              src="images/story-img-2.jpg"
              alt="Customer image"
              className="story-image"
            /> */}
            <div className="story-text">
              <h1 className="story-heading">
                Mark Halstead
              </h1>
              <p className="story-paragraph">
              What really sets PlatePal apart is the personalized recommendations it provides. The app will provide you with personalized meal plans and recipe suggestions that will help you achieve your goals. And if you're someone who struggles with staying motivated, PlatePal has you covered. It provides daily reminders to log your food intake and track your progress, and you can earn badges and rewards for meeting your goals.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PeopleReviews;



