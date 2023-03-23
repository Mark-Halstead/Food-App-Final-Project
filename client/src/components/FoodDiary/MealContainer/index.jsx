import React, { useEffect } from 'react'

import './styles.css'

import Wrapper from '../../../assets/wrappers/MealContainer'
import FoodItem from '../FoodItem'

function MealContainer({ mealName, diaryEntry, totals, setDiaryEntry, openSearchPopup }) {

    return (
            <div className='meal-container'>
                <div className='title-section'>
                    <h2 className='meal-title'>{mealName}</h2>
                    <h2>
                        {
                            totals && 
                                totals[mealName].calories
                        }
                    </h2>
                </div>
                <div className='food-items-container'>
                    {
                        diaryEntry ?
                            (diaryEntry[mealName].map((item) => (<FoodItem item={item} meal={mealName} diaryEntry={diaryEntry} setDiaryEntry={setDiaryEntry}/> )))
                            : null
                    }

                </div>
                <div className='add-food-item-container'>
                    <button 
                        className='add-food-item'
                        onClick={() => openSearchPopup(mealName)}
                        
                    >Add Item</button>
                </div>
            </div>
    )
}

export default MealContainer