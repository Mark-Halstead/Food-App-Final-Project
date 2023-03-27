import React from "react";

import './styles.css'

import NutritionistStars from "../NutritionistStars";

function NutritionistCard({ nutritionist, handleClick }) {


    return (
        <div 
            className="nutritionist-card"
            onClick={() => handleClick(nutritionist)}
        >
            <h4>{nutritionist.first_name} {nutritionist.last_name} {nutritionist.credentials}</h4>
            <p>{nutritionist.area_of_expertise}</p>
            <p>Average rating: { <NutritionistStars rating={nutritionist.average_rating}/> }</p>
        </div>
    );
}



export default NutritionistCard;
