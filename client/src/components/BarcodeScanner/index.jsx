import React, { useEffect, useState } from 'react';
import Quagga from 'quagga';

const BarcodeScanner = () => {
    const [product, setProduct] = useState(null);
    const [scannedCode, setScannedCode] = useState(null);
    const [productName, setProductName] = useState(null);
    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
        Quagga.init({
            inputStream: {
                name: "Live",
                type: "LiveStream",
                constraints: {
                    facingMode: "environment"
                },
                target: document.querySelector('#scanner-container')
            },
            decoder: {
                readers: ["ean_reader"]
            }
        }, function (err) {
            if (err) {
                console.log(err);
                return
            }
            Quagga.start();
        });

        Quagga.onDetected((result) => {
            const code = result.codeResult.code;
            console.log(`Scanned barcode: ${code}`);
            setScannedCode(code);

            fetch(`https://world.openfoodfacts.org/api/v0/product/${code}.json`)
                .then(response => response.json())
                .then(data => {
                    console.log(`Retrieved product data: ${JSON.stringify(data)}`);
                    if (data.status === 1) {
                        setProductName(data.product.product_name);
                        setProduct(data.product);
                    } else {
                        setProductName('Product not found');
                    }
                })
                .catch(error => {
                    console.error('Error retrieving product data:', error);
                    setProductName('Error retrieving product data');
                });
        });

        return () => {
            Quagga.stop();
        };
    }, []);

    const addToFoodDiary = () => {
        console.log(`Added ${scannedCode} to food diary.`);
    };

    const viewDetails = () => {
        setShowDetails(true);
    };

    const closeDetails = () => {
        setShowDetails(false);
    };

    return (
        <div>
            <div id="scanner-container"></div>
            {scannedCode && (
                <div id="popup">
                    <p>Scanned barcode: {scannedCode}</p>
                    {productName && <p>Product name: {productName}</p>}
                    <button onClick={addToFoodDiary}>Add to food diary</button>
                    <button onClick={viewDetails}>View details</button>
                </div>
            )}
            {product && showDetails && (
                <div id="popup-details">
                    <button onClick={closeDetails}>Close details</button>
                    <h2>{product.product_name}</h2>
                    <img src={product.image_front_url} alt={product.product_name} />
                    <p>{product.ingredients_text}</p>
                    <p>Nutrition facts:</p>
                    <ul>
                        {product.nutriments && product.nutriments.energy && (
                            <li>Energy: {product.nutriments.energy} kJ</li>
                        )}
                        {product.nutriments && product.nutriments.sugars && (
                            <li>Sugar: {product.nutriments.sugars} g</li>
                        )}
                    </ul>
                </div>
            )}
            <style>
                {`
          #scanner-container {
            width: 50%;
            height: 50%;
            position: fixed;
            top: 30%;
            left: 36%;
            z-index: 999;
          }

          #popup {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 1000;
            background-color: white;
            padding: 20px;
            border: 1px solid black;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
          }

          #popup-details {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 1001;
            background-color: white;
            padding: 20px;
            border: 1px solid black;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
            max-width: 80%;
            max-height: 80%;
            overflow-y: auto;
          }

          #popup p {
            margin: 0;
          }

          #popup button {
            margin-top: 10px;
          }
        `}
            </style>
        </div>
    );
};

export default BarcodeScanner;




