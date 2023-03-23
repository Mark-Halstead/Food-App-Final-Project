import React, { useState } from 'react';
import axios from 'axios';

import './styles.css'
import ProductItem from './ProductItem';

function SearchPopup(props) {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [servingMultiplier, setServingMultiplier] = useState(1)

    const handleSearchQueryChange = (event) => {
        setSearchQuery(event.target.value);
    }

    const handleSearch = async () => {
        const params = {
            categories_tags: searchQuery,
            page_size: 10,
            json: true,
            sort_by: 'popularity_key',
            fields:'brands,allergens_tags,nutriments,product_name_en,serving_quantity,id',
            countries_tags_en: 'united-kingdom'
        };
        const config = {
            params: params
        };
        const response = await axios.get('https://world.openfoodfacts.org/api/v2/search', config);
        console.log('response.data', response.data)
        setSearchResults(response.data.products);
    }

    async function addFoodItem(entryId, meal, data) {
      try {
        const response = await axios.post(`http://127.0.0.1:5000/diary_entries/${entryId}/foods/${meal}`, data);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    }

    const handleItemClick = (result) => {
        setServingMultiplier(1)
        setSelectedItem(result);
        console.log('result', result)
    }

    const handleBackClick = () => {
        setSelectedItem(null);
    }

    const handleAddFood = async () => {
        const data = {serving_multiplier:servingMultiplier, ...selectedItem }
        addFoodItem(props.diaryEntry._id, props.meal, data)
    }

    return (
        <div className='popup-background'>
            <div className="popup">
                <div className="search-popup-header">
                    <h2>{props.meal}</h2>
                    <h2>Search for food</h2>
                    <button onClick={props.onClose}>Close</button>
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
                                <li>Calories: {(selectedItem.nutriments["energy-kcal_serving"] * servingMultiplier).toFixed(1) || (selectedItem.nutriments["energy-kcal_100g"]  * servingMultiplier).toFixed(1)} kcal</li>
                                <li>Serving Size: {selectedItem.serving_quantity} </li>
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
                                        onClick={handleAddFood}
                                    >Add Food</button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <div>
                            <input type="text" value={searchQuery} onChange={handleSearchQueryChange} />
                            <button onClick={handleSearch}>Search</button>
                            <ul>
                            {searchResults.map((result) => (
                                <li key={result.id} onClick={() => handleItemClick(result)}>
                                    <ProductItem result={result} />
                                </li>
                            ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default SearchPopup;