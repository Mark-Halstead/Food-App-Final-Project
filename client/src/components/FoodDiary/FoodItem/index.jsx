import React from 'react'

import './styles.css'

function FoodItem({ item, meal, mealItems, setMealItems, handleFoodItemClick,  handleDeleteFood, mealPlanItem }) {
    

    async function handleFoodItemConfirm(meal, productId, confirmed) {
		try {
			
            const options = {
                method:"PUT",
                body:JSON.stringify({confirmed}),
				headers:{
					Authorization:localStorage.token
				}
            }
			const url = mealPlanItem ? `https://plate-perfect.onrender.com/meal_plan_entries/${mealItems.date}/foods/${meal}/${productId}`
								: `https://plate-perfect.onrender.com/diary_entries/${mealItems.date}/foods/${meal}/${productId}`
            const response = await fetch(url , 
                options
            )
            const data = await response.json()

            setMealItems(data)
        } catch (error) {
			console.log('error', error)

        }
    } 

	const icon = item.confirmed ? "fa-solid fa-circle-check" : "fa-regular fa-circle"

    
	return (
		<div 
            className={`food-item-container${mealPlanItem ? " meal-plan-item" : ""} ${item.confirmed ? "confirmed" : ""}`}
            onClick={handleFoodItemClick}
        >
			<div>
				<h3>{mealPlanItem ? <i class="fa-solid fa-utensils"></i> : ""} {item.product.product_name_en}</h3>
			</div>
			<div>
				<h4>{(item.product.nutriments["energy-kcal_100g"] * item["user_serving_size"] / 100).toFixed() }</h4>
			</div>
            <div>
				<h4>{(item.serving_multiplier * item.user_serving_size).toFixed(1)}</h4>g
            </div>
			<div className='button-containers'>
				<div>
					<i 
						className={`${icon} icon-btn`}
						onClick={() => handleFoodItemConfirm(meal, item.product.id, !item.confirmed)}
					></i>
				</div>
				<div>
					{
						!mealPlanItem ?
							<i 
								className="fa-solid fa-trash icon-btn"
								onClick={() => handleDeleteFood(meal, item.product.id)}
							></i>
							: null
					}
				</div>
			</div>	
		</div>
	)
}

export default FoodItem
