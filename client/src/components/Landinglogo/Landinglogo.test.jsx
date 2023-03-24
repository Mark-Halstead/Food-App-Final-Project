import React from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import { JSDOM } from 'jsdom';

import matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import Landinglogo from './index';

// Set up JSDOM environment
const { window } = new JSDOM('<!doctype html><html><body></body></html>');
global.window = window;
global.document = window.document;


it('Landing renders without crashing', () => {
    render(<Landinglogo />);
});
