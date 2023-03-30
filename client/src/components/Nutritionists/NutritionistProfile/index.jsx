import React, { useState } from 'react'
import NutritionistStars from '../NutritionistStars'
import Loader from '../../Loader'

import './styles.css'

function NutritionistProfile({selectedNutritionist, handleClosePopup, handleSendRequest, sendingRequest, requestSent}) {
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
                <div>
                    <button className='popup-close-button' onClick={handleClosePopup}>&#215;</button>
                </div>
                <div className="popup-header">
                    <h4>{selectedNutritionist.first_name} {selectedNutritionist.last_name}</h4>
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
                                <p className="popup-review-content">
                                    <div className='stars-container'>
                                        { <NutritionistStars rating={selectedNutritionist.reviews[selectedReviewIndex].rating}/> }
                                    </div>
                                    {selectedNutritionist.reviews[selectedReviewIndex].review_message}
                                </p>
                                <div className="popup-review-arrows">
                                    {hasPrevReview ? <button className="popup-arrow-button btn" onClick={handlePrevReview}>{"<"}</button> : <div/>}
                                    {hasNextReview ? <button className="popup-arrow-button btn" onClick={handleNextReview}>{">"}</button> : <div/>}
                                </div>
                            </div>
                        }
                        <div className="request-nutritionist">
                            <h5>Request Nutritionist</h5>
                            { requestSent 
                                ? <div>Request Sent!</div> 
                                : sendingRequest ? <Loader />
                                : <div className='request-message-container'>
                                    <textarea name="" id="" cols="60" rows="5" placeholder="Enter your message" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                                    <button className='btn' style={{marginTop: '10px'}} disabled={sendingRequest} onClick={() => handleSendRequest(selectedNutritionist, message)}>
                                        { sendingRequest ? "Sending Request" : "Request" }
                                    </button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NutritionistProfile;
