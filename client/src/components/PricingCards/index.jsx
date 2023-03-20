import React from 'react'

const PricingCards = () => {
    return (
        <div class="card-container">
            <div class="cards-wrapper">
                <div class="card">
                    <div class="card-header">
                        <h3>Free</h3>
                        <h1><sup>$</sup> 0</h1>
                    </div>
                    <div class="card-body">
                        <ul>
                            <li><i class="fas fa-check"></i>Some Feature Text</li>
                            <li><i class="fas fa-check"></i>Some Feature Text</li>
                            <li><i class="fas fa-times"></i>Some Feature Text</li>
                            <li><i class="fas fa-times"></i>Some Feature Text</li>
                            <li><i class="fas fa-times"></i>Some Feature Text</li>
                            <li><i class="fas fa-times"></i>Some Feature Text</li>
                        </ul>
                    </div>
                    <div class="card-footer">
                        <button type="button">Subscribe</button>
                    </div>
                </div>
                <div class="card">
                    <div class="card-header">
                        <h3>Standard</h3>
                        <h1><sup>$</sup> 49 /<span>Month</span></h1>
                    </div>
                    <div class="card-body">
                        <ul>
                            <li><i class="fas fa-check"></i>Some Feature Text</li>
                            <li><i class="fas fa-check"></i>Some Feature Text</li>
                            <li><i class="fas fa-check"></i>Some Feature Text</li>
                            <li><i class="fas fa-check"></i>Some Feature Text</li>
                            <li><i class="fas fa-times"></i>Some Feature Text</li>
                            <li><i class="fas fa-times"></i>Some Feature Text</li>
                        </ul>
                    </div>
                    <div class="card-footer">
                        <button type="button">Subscribe</button>
                    </div>
                </div>
                <div class="card">
                    <div class="card-header">
                        <h3>Premium</h3>
                        <h1><sup>$</sup> 99 /<span>Month</span></h1>
                    </div>
                    <div class="card-body">
                        <ul>
                            <li><i class="fas fa-check"></i>Some Feature Text</li>
                            <li><i class="fas fa-check"></i>Some Feature Text</li>
                            <li><i class="fas fa-check"></i>Some Feature Text</li>
                            <li><i class="fas fa-check"></i>Some Feature Text</li>
                            <li><i class="fas fa-check"></i>Some Feature Text</li>
                            <li><i class="fas fa-check"></i>Some Feature Text</li>
                        </ul>
                    </div>
                    <div class="card-footer">
                        <button type="button">Subscribe</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PricingCards
