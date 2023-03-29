import React, { useEffect } from 'react'

import './styles.css'

import Wrapper from '../../../assets/wrappers/MealContainer'
import FoodItem from '../FoodItem'

function MealContainer({ mealName, mealItems, totals, setMealItems, mealPlanItems, setMealPlanItems, openSearchPopup, handleFoodItemClick, handleDeleteFood }) {


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
                    <div className={`food-item-container`}>
                        <div>
                            <h3>Food</h3>
                        </div>
                        <div>
                            <h3>Kcal</h3>
                        </div>
                        <div>
                            <h3>Serving Size</h3>
                        </div>
                        <div>

                        </div>
                    </div>
                    {
                        mealPlanItems ?
                        (mealPlanItems[mealName].map((item) => (<FoodItem mealPlanItem={true} handleDeleteFood={handleDeleteFood} handleFoodItemClick={handleFoodItemClick} item={item} meal={mealName} mealItems={mealItems} setMealItems={setMealPlanItems}/> )))
                        : null
                    }  
                    {
                        mealItems ?
                            (mealItems[mealName].map((item) => (<FoodItem  handleDeleteFood={handleDeleteFood} handleFoodItemClick={handleFoodItemClick} item={item} meal={mealName} mealItems={mealItems} setMealItems={setMealItems}/> )))
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
