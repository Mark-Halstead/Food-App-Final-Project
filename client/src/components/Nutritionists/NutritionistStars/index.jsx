import React from 'react'

function NutritionistStars({ rating }) {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;

    function renderStars(fullStars, halfStar) {
        const stars = [];
    
        for (let i = 0; i < fullStars; i++) {
        stars.push(<i key={i} className="fa fa-star"></i>);
        }
    
        if (halfStar) {
        stars.push(<i key="half" className="fa fa-star-half"></i>);
        }
    
        return stars;
    }
    return (
        renderStars(fullStars, halfStar)
    )
}

export default NutritionistStars