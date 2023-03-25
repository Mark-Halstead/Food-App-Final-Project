import React, { useState } from 'react';
import axios from 'axios';

import './styles.css'
import ProductItem from './ProductItem';

function SearchPopup({handleAddFood, meal, onClose, servingMultiplier, setServingMultiplier}) {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [searchLoading, setSearchLoading] = useState(false)

    const handleSearchQueryChange = (event) => {
        setSearchQuery(event.target.value);
    }

    const handleSearch = async () => {
        const params = {
            categories_tags: searchQuery,
            page_size: 20,
            json: true,
            sort_by: 'popularity_key',
            fields:'brands,allergens_tags,nutriments,product_name_en,serving_quantity,id',
            countries_tags_en: 'united-kingdom'
        };
        const config = {
            params: params
        };

        setSearchLoading(true)
        const response = await axios.get('https://world.openfoodfacts.org/api/v2/search', config);
        if (response.status === 200) {
            let products = response.data.products.filter(p => p.nutriments["energy-kcal_100g"])
            setSearchLoading(false)
            products = products.map(p => {
                if (!p.serving_quantity) {
                    p.serving_quantity = 100
                }
                return p
            })
            console.log('products', products)
            setSearchResults(products);
        }

    }

    const handleItemClick = (result) => {
        setServingMultiplier(1)
        setSelectedItem(result);
        console.log('setSelectedItem', result)
    }

    const handleBackClick = () => {
        setSelectedItem(null);
    }

    return (
        <div className='popup-background'>
            <div className="popup">
                <div className="search-popup-header">
                    <h2>{meal}</h2>
                    <h2>Search for food</h2>
                    <button onClick={onClose}>Close</button>
                </div>
                <div className="search-popup-body">
                    { selectedItem ? (
                        <div>
                            <h3>{selectedItem.product_name}</h3>
                            <button onClick={handleBackClick}>Back to results</button>
                            <ul>
                                <li>Name: {selectedItem.product_name_en}</li>
                                <li>Brand: {selectedItem.brands}</li>
                                <li>Allergens: {selectedItem.allergens_tags ? selectedItem.allergens_tags.join(', ') : 'N/A'}</li>
                                <li>Calories: {(selectedItem.nutriments["energy-kcal_100g"]  * servingMultiplier * (selectedItem.serving_quantity / 100)).toFixed(1)} kcal</li>
                                <li>Serving Size: {selectedItem.serving_quantity}g </li>
                                <li>
                                    <label htmlFor="serving-quantity-input">Serving Quantity: </label>
                                    <input
                                        type="number"
                                        id="serving-quantity-input"
                                        min="0"
                                        step="0.1"
                                        value={servingMultiplier}
                                        onChange={(event) => setServingMultiplier(event.target.value)}
                                    />
                                    
                                </li>
                                <li>
                                    <button
                                        onClick={() => handleAddFood(selectedItem)}
                                    >Add Food</button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <div>
                            <input type="text" value={searchQuery} onChange={handleSearchQueryChange} />
                            <button onClick={handleSearch}>Search</button>
                            {
                                searchLoading ?
                                (
                                    <h4>
                                        Loading food...
                                    </h4>
                                )
                                :
                                (
                                    <ul>
                                    {searchResults.map((result) => (
                                        <li key={result.id} onClick={() => handleItemClick(result)}>
                                            <ProductItem result={result} />
                                        </li>
                                    ))}
                                    </ul>
                                )
                            }

                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SearchPopup;