import React from 'react'

import './styles.css'

function FoodItem({ item, meal, onFoodItemConfirm, onFoodItemDelete }) {
	return (
		<div className={`food-item-container${item.confirmed ? ' confirmed' : ''}`}>
			<h3>{item.name}</h3>
			<h3>{item.calories}</h3>
			<div className='button-containers'>
				<button
					onClick={() => onFoodItemConfirm(meal, item.item_id, !item.confirmed)}
				
				>&#10004;</button>
				<button
					onClick={() => onFoodItemDelete(meal, item.item_id)}
				>&#x2716;</button>

			</div>
		</div>
	)
}

export default FoodItem