import React, { useState } from 'react'
import NutritionistStars from '../NutritionistStars'

import './styles.css'

function NutritionistProfile({selectedNutritionist, handleClosePopup, handleSendRequest}) {
    const [ selectedReviewIndex, setSelectedReviewIndex ] = useState(0)
    const [ message, setMessage ] = useState("")

    const handleNextReview = () => {
        setSelectedReviewIndex(prev => prev + 1)
    }

    const handlePrevReview = () => {
        setSelectedReviewIndex(prev => prev - 1)
    }

    const reviewsLength = selectedNutritionist.reviews.length;
    const hasNextReview = selectedReviewIndex < reviewsLength - 1;
    const hasPrevReview = selectedReviewIndex > 0;

    return (
        <div className="popup-background">
            <div className="popup">
                <div className="popup-header">
                    <h4>{selectedNutritionist.first_name} {selectedNutritionist.last_name}</h4>
                    <button className="close-button" onClick={handleClosePopup}>X</button>
                </div>
                <div className="popup-content">
                    <div className="popup-left">
                        <p><strong>Credentials:</strong> {selectedNutritionist.credentials}</p>
                        <p><strong>Area of Expertise:</strong> {selectedNutritionist.area_of_expertise}</p>
                        <p><strong>Education/Training:</strong> {selectedNutritionist.education_training.join(", ")}</p>
                    </div>
                    <div className="popup-right">
                        {reviewsLength > 0 &&
                            <div className="popup-review">
                                { <NutritionistStars rating={selectedNutritionist.reviews[selectedReviewIndex].rating}/> }
                                <p className="popup-review-content">{selectedNutritionist.reviews[selectedReviewIndex].review_message}</p>
                                <div className="popup-review-arrows">
                                    {hasPrevReview && <button className="popup-arrow-button" onClick={handlePrevReview}>{"<"}</button>}
                                    {hasNextReview && <button className="popup-arrow-button" onClick={handleNextReview}>{">"}</button>}
                                </div>
                            </div>
                        }
                        <div className="request-nutritionist">
                            <h5>Request Nutritionist</h5>
                            <textarea name="" id="" cols="50" rows="10" placeholder="Enter your message" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                            <button onClick={() => handleSendRequest(selectedNutritionist, message)}>Request</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NutritionistProfile;
