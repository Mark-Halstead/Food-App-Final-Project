import React, { useEffect } from 'react'

import './styles.css'

import Wrapper from '../../../assets/wrappers/MealContainer'
import FoodItem from '../FoodItem'

function MealContainer({ mealName, diaryEntry, onFoodItemConfirm, onFoodItemDelete }) {

    return (
            <div className='meal-container'>
                <div className='title-section'>
                    <h2 className='meal-title'>{mealName}</h2>
                    <h2>
                        {
                            diaryEntry ?
                                diaryEntry.totals[mealName].calories
                                : null
                        }
                    </h2>
                </div>
                <div className='food-items-container'>
                    {
                        diaryEntry ?
                            (diaryEntry[mealName].map((item) => (<FoodItem item={item} meal={mealName} onFoodItemConfirm={onFoodItemConfirm} onFoodItemDelete={onFoodItemDelete} /> )))
                            : null
                    }

                </div>
                <button className='add-food-item'>Add Item</button>
            </div>
    )
}

export default MealContainer