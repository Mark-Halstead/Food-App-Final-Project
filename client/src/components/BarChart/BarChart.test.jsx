
import React from 'react';
import { describe, it, expect, test } from 'vitest';
import { render } from '@testing-library/react';
import { JSDOM } from 'jsdom';
import { MemoryRouter } from 'react-router-dom';

import matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import { BarChart } from 'recharts';
import { data } from './barData';

// Set up JSDOM environment
const { window } = new JSDOM('<!doctype html><html><body></body></html>');
global.window = window;
global.document = window.document;

it('BarChart renders without crashing', () => {
  render(
    <MemoryRouter>
      <BarChart />
    </MemoryRouter>
  );
});

it('BarChart renders with data', () => {
  render(
    <MemoryRouter>
      <BarChart data={data} />
    </MemoryRouter>
  );
  const bars = document.querySelectorAll('.recharts-bar-rectangle');
  expect(bars.length).toBe(data.length);
})