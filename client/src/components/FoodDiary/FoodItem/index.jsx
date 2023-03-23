import React from 'react'

import './styles.css'

function FoodItem({ item, meal, diaryEntry, setDiaryEntry}) {
    async function handleFoodItemConfirm(meal, productId, confirmed) {
		try {
            const options = {
                method:"PUT",
                body:JSON.stringify({confirmed})
            }
			const url = `http://127.0.0.1:5000/diary_entries/${diaryEntry._id}/foods/${meal}/${productId}`
			console.log('url', url)
            const response = await fetch(url , 
                options
            )
			console.log('response', response)
            const data = await response.json()
            console.log('data', data)
            setDiaryEntry(data)
        } catch (error) {

        }
    } 
    
    async function handleFoodItemDelete(meal, productId) {
        try {
            const response = await fetch(`http://127.0.0.1:5000/diary_entries/${diaryEntry._id}/foods/${meal}/${productId}`,
                {method:"DELETE"}
            )
            const data = await response.json()
            setDiaryEntry(data)
        } catch (error) {
        }
    }

	return (
		<div className={`food-item-container${item.confirmed ? ' confirmed' : ''}`}>
			<div>
				<h3>{item.product.product_name_en}</h3>
			</div>
			<div>
				<h3>{item.product.nutriments["energy-kcal"]}</h3>
			</div>
			<div className='button-containers'>
				<button
					onClick={() => handleFoodItemConfirm(meal, item.product._id, !item.confirmed)}
				
				>&#10004;</button>
				<button
					onClick={() => handleFoodItemDelete(meal, item.product._id)}
				>&#x2716;</button>

			</div>
		</div>
	)
}

export default FoodItem