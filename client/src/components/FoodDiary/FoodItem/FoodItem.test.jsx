
import React from 'react';
import { describe, it, expect, test } from 'vitest';
import { render } from '@testing-library/react';
import { JSDOM } from 'jsdom';
import { MemoryRouter } from 'react-router-dom';

import matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import FoodItem from './index';

// Set up JSDOM environment
const { window } = new JSDOM('<!doctype html><html><body></body></html>');
global.window = window;
global.document = window.document;

it('DietaryInfo renders without crashing', () => {
    const item = { 
      product: { 
        product_name_en: 'Test Product',
        nutriments: { "energy-kcal_100g": 100 }
      },
      confirmed: true,
      user_serving_size: 50,
      serving_multiplier: 1
    };
    
    render(
      <MemoryRouter>
        <FoodItem item={item} />
      </MemoryRouter>
    );
  });
  
