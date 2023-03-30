import React, { useState } from 'react';
import axios from 'axios';

import './styles.css'
import ProductItem from './ProductItem';
import Loader from '../Loader';
import BarcodeScanner from '../BarcodeScanner';

function SearchPopup({handleAddFood, meal, onClose, servingMultiplier, setServingMultiplier, loadingAddingFood}) {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [searchLoading, setSearchLoading] = useState(false)
    const [barcodeScanner, setBarcodeScanner] = useState(false)

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
        setSearchLoading(false)

    }

    const renderBarcodeScanner = () => {

    }

    const handleItemClick = (result) => {
        setServingMultiplier(1)
        setSelectedItem(result);
        setSearchLoading(false)
        console.log('setSelectedItem', result)
    }

    const handleBackClick = () => {
        setSelectedItem(null);
        setSearchLoading(false)
    }

    return (
        <div className='popup-background'>
            <div className="popup">
                <div className='popup-close-button-container'>
                    <button className='popup-close-button' onClick={onClose}>&#215;</button>
                </div>
                <div className="search-popup-header">
                    <h2>{meal}</h2>
                    <h2>Search for food</h2>
                </div>
                <div className="search-popup-body">
                    { selectedItem ? (
                        <div>
                            <h3>{selectedItem.product_name}</h3>
                            <div className='back-button-container'>
                                <button className='btn' onClick={handleBackClick}>Back to results</button>
                            </div>
                            { loadingAddingFood ? (
                                <h4>Adding food...</h4>
                            ) : (
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
                                    <div className='back-button-container'>
                                        <button
                                            className='btn'
                                            style={{marginTop: '20px'}}
                                            onClick={() => handleAddFood(meal, selectedItem)}
                                        >Add Food</button>
                                    </div>
                                </li>
                            </ul>
                            )
                        
                            }
                            
                        </div>
                    ) : (
                        <div>
                            <div className='search-container'>
                                <input type="text" value={searchQuery} onChange={handleSearchQueryChange} />
                                <button
                                    onClick={handleSearch}
                                    className='btn'
                                >Search</button>
                                {
                                    barcodeScanner ?
                                    <button
                                        onClick={() => setBarcodeScanner(false)}
                                        className='btn'
                                    >Close Scanner</button>
                                    :
                                    <button
                                        onClick={() => setBarcodeScanner(true)}
                                        className='btn'
                                    >Scan Barcode</button>
                                }

                            </div>
                            {
                                barcodeScanner ?
                                    <BarcodeScanner />
                                : searchLoading ?
                                (
                                    <Loader />
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