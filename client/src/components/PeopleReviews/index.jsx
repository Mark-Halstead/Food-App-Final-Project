import React from 'react';
import ReviewsTitle from '../ReviewsTitle';

function PeopleReviews() {
  return (
    <section className="stories">
    <ReviewsTitle title='our' subTitle='reviews' />
      <div className="stories-wrapper">
        <div className="story-bg">
          <div className="story">
            <img
              src="images/story-img-1.jpg"
              alt="Customer image"
              className="story-image"
            />
            <div className="story-text">
              <h1 className="story-heading">
                Sadik Islam
              </h1>
              <p className="story-paragraph">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Architecto quas, repudiandae veritatis nam mollitia cumque
                distinctio, quia aperiam aliquid at consequuntur libero
                quisquam facilis laborum inventore repellat perspiciatis vel
                fugiat molestias recusandae eum necessitatibus quo possimus
                aspernatur? Nobis, architecto eaque.
              </p>
            </div>
          </div>
        </div>
        <div className="story-bg">
          <div className="story">
            <img
              src="images/story-img-2.jpg"
              alt="Customer image"
              className="story-image"
            />
            <div className="story-text">
              <h1 className="story-heading">
                Sadik Islam
              </h1>
              <p className="story-paragraph">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Architecto quas, repudiandae veritatis nam mollitia cumque
                distinctio, quia aperiam aliquid at consequuntur libero
                quisquam facilis laborum inventore repellat perspiciatis vel
                fugiat molestias recusandae eum necessitatibus quo possimus
                aspernatur? Nobis, architecto eaque.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PeopleReviews;



