import React from 'react'

import './styles.css'
import { StatContainer } from '../../FoodDiary'

function ProductItem({result}) {
    let value;
    if (result.nutriments["energy-kcal_serving"]) {
      value = `${result.nutriments["energy-kcal_serving"]} kcal`;
    } else if (result.nutriments["energy-kcal_100g"]) {
      value = `${result.nutriments["energy-kcal_100g"]} kcal`;
    } else {
      value = "";
    }
    return (
        <li className='product-item-container' key={result.code}>
            <h3>{result.product_name_en}</h3>
            <div className='product-item-stats'>
                
                    {(
                        <>
                            <StatContainer title={"Calories"} value={value} />
                            <StatContainer
                                title={"Serving Size"}
                                value={value === `${result.nutriments["energy-kcal_serving"]} kcal` ? `${result.serving_quantity} g` : `100 g`}
                            />
                        </>
                    )}
                
            </div>
        </li>
    )
}

export default ProductItem