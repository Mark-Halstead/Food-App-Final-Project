import React from 'react'

const PricingCards = () => {
    return (
        <div className="card-container">
            <div className="cards-wrapper">
                <div className="card">
                    <div className="card-header">
                        <h3>Free</h3>
                        <h1><sup>$</sup> 0</h1>
                    </div>
                    <div className="card-body">
                        <ul>
                            <li><i className="fas fa-check"></i>Some Feature Text</li>
                            <li><i className="fas fa-check"></i>Some Feature Text</li>
                            <li><i className="fas fa-times"></i>Some Feature Text</li>
                            <li><i className="fas fa-times"></i>Some Feature Text</li>
                            <li><i className="fas fa-times"></i>Some Feature Text</li>
                            <li><i className="fas fa-times"></i>Some Feature Text</li>
                        </ul>
                    </div>
                    <div className="card-footer">
                        <button type="button">Subscribe</button>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">
                        <h3>Standard</h3>
                        <h1><sup>$</sup> 49 /<span>Month</span></h1>
                    </div>
                    <div className="card-body">
                        <ul>
                            <li><i className="fas fa-check"></i>Some Feature Text</li>
                            <li><i className="fas fa-check"></i>Some Feature Text</li>
                            <li><i className="fas fa-check"></i>Some Feature Text</li>
                            <li><i className="fas fa-check"></i>Some Feature Text</li>
                            <li><i className="fas fa-times"></i>Some Feature Text</li>
                            <li><i className="fas fa-times"></i>Some Feature Text</li>
                        </ul>
                    </div>
                    <div className="card-footer">
                        <button type="button">Subscribe</button>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">
                        <h3>Premium</h3>
                        <h1><sup>$</sup> 99 /<span>Month</span></h1>
                    </div>
                    <div className="card-body">
                        <ul>
                            <li><i className="fas fa-check"></i>Some Feature Text</li>
                            <li><i className="fas fa-check"></i>Some Feature Text</li>
                            <li><i className="fas fa-check"></i>Some Feature Text</li>
                            <li><i className="fas fa-check"></i>Some Feature Text</li>
                            <li><i className="fas fa-check"></i>Some Feature Text</li>
                            <li><i className="fas fa-check"></i>Some Feature Text</li>
                        </ul>
                    </div>
                    <div className="card-footer">
                        <button type="button">Subscribe</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PricingCards
