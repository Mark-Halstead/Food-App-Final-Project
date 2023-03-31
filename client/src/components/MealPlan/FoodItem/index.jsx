import React from 'react'

function FoodItem({ item, meal, mealItems, setMealItems, handleFoodItemClick,  handleDeleteFood }) {
    console.log('item', item)
    async function handleFoodItemConfirm(meal, productId, confirmed) {
		try {
            const options = {
                method:"PUT",
                body:JSON.stringify({confirmed})
            }
			const url = `https://plate-perfect.onrender.com/diary_entries/${mealItems._id}/foods/${meal}/${productId}`
			console.log('url', url)
            const response = await fetch(url , 
                options
            )
			console.log('response', response)
            const data = await response.json()
            console.log('data', data)
            setMealItems(data)
        } catch (error) {

        }
    } 
    
	return (
		<div 
            className={`food-item-container`}
            onClick={handleFoodItemClick}
        >
			<div>
				<h3>{item.product.product_name_en}</h3>
			</div>
			<div>
				<h4>{(item.product.nutriments["energy-kcal_100g"] * item["user_serving_size"] / 100).toFixed() }</h4>
			</div>
            <div>
				<h4>{(item.serving_multiplier * item.user_serving_size).toFixed(1)}</h4>g
            </div>
			<div className='button-containers'>
				<button
					onClick={() => handleDeleteFood(meal, item.product.id)}
				>&#x2716;</button>

			</div>
		</div>
	)
}

export default FoodItem
