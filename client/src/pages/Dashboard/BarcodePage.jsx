import React from 'react';
import { BarcodeScanner } from '../../components';

const BarcodePage = () => {
  return (
    <div>
      <h1>Scan a product barcode to retrieve product details:</h1>
      <BarcodeScanner />
    </div>
  );
};

export default BarcodePage;
