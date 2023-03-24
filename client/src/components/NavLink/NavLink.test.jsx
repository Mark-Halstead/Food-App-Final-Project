import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { JSDOM } from 'jsdom';
import { MemoryRouter } from 'react-router-dom';

import matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import NavLink from './index';

// Set up JSDOM environment
const { window } = new JSDOM('<!doctype html><html><body></body></html>');
global.window = window;
global.document = window.document;

it('NavLink renders without crashing', () => {
  render(
    <MemoryRouter>
      <NavLink link={{ id: 1, href: '/', text: 'Home' }} itemClass="nav-item" />
    </MemoryRouter>
  );
});

