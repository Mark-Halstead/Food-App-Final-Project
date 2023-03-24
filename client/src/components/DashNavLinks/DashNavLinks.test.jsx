import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { JSDOM } from 'jsdom';
import { MemoryRouter } from 'react-router-dom';

import matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import DashNavLinks from './index';

// Set up JSDOM environment
const { window } = new JSDOM('<!doctype html><html><body></body></html>');
global.window = window;
global.document = window.document;

it('DashNavLinks renders without crashing', () => {
  render(
    <MemoryRouter>
      <DashNavLinks />
    </MemoryRouter>
  );
});
