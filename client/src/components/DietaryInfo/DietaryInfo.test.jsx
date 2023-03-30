
import React from 'react';
import { describe, it, expect, test } from 'vitest';
import { render } from '@testing-library/react';
import { JSDOM } from 'jsdom';
import { MemoryRouter } from 'react-router-dom';

import matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import DietaryInfo from './index';

// Set up JSDOM environment
const { window } = new JSDOM('<!doctype html><html><body></body></html>');
global.window = window;
global.document = window.document;

it('DietaryInfo renders without crashing', () => {
    const props = {
      dietaryRestrictions: [],
      setDietaryRestrictions: '',
      allergies: [],
      setAllergies: '',
      foodPreferences: '',
      setFoodPreferences: '',
      mealComplexity: '',
      setMealComplexity: '',
      prevPage: '',
      nextPage: '',
    };
  
    render(
      <MemoryRouter>
        <DietaryInfo {...props} />
      </MemoryRouter>
    );
  });
  
