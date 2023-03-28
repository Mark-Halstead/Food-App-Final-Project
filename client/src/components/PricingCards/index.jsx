import React from "react";
import forest from "../../assets/images/forest.jpg"
import river from "../../assets/images/river.jpg"
import sea from "../../assets/images/sea.jpg"

function PricingCards() {
    const colors = ["#6495ed", "#7fffd4", "#ffa07a", "#f08080", "#afeeee"];

    const handleNavButtonClick = (event) => {
        event.currentTarget.parentElement.parentElement.classList.toggle("change");
    };

    return (
        <section className="popular-tours">
            <div className="cards-wrapper">
                <div className="card">
                    <div className="front-side">
                        <img src="https://cdn.pixabay.com/photo/2016/12/26/17/28/spaghetti-1932466__340.jpg" alt="Forest" className="card-image" />
                        <h1 className="tour-name" id="free-plan">Free Plan</h1>
                        <ul className="card-list">
                            <li className="card-list-item"></li>
                            <li className="card-list-item">Personalized Meal Plans</li>
                            <li className="card-list-item">AI driven Meal Plans</li>
                            <li className="card-list-item">Basic nutritional information</li>
                        </ul>
                        <button className="navigation-button" onClick={handleNavButtonClick}>
                            price
                        </button>
                    </div>
                    <div className="back-side center">
                        <button className="navigation-button" onClick={handleNavButtonClick}>
                            back
                        </button>
                        <button className="card-button">Try for free now!</button>
                    </div>
                </div>
                <div className="card">
                    <div className="front-side">
                        <img src="https://media.istockphoto.com/id/1316145932/photo/table-top-view-of-spicy-food.jpg?b=1&s=170667a&w=0&k=20&c=P3jIQq8gVqlXjd4kP2OrXYyzqEXSWCwwYtwrd81psDY=" alt="River" className="card-image" />
                        <h1 className="tour-name">Premium Plan</h1>
                        <ul className="card-list">
                            <li className="card-list-item"></li>
                            <li className="card-list-item">All the features that come with the free plan</li>
                            <li className="card-list-item">Professional advice from real Nutritionists</li>
                            <li className="card-list-item">Barcode Scanning accessibility</li>
                        </ul>
                        <button className="navigation-button" onClick={handleNavButtonClick}>
                            price
                        </button>
                    </div>
                    <div className="back-side center">
                        <button className="navigation-button" onClick={handleNavButtonClick}>
                            back
                        </button>
                        <h3 className="tour-price">£499</h3>
                        <button className="card-button">Booking</button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default PricingCards;
