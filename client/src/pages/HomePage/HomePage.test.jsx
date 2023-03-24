import React from "react";
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen, render, cleanup, getByRole } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { BrowserRouter } from "react-router-dom";

import matchers from '@testing-library/jest-dom/matchers';
expect.extend(matchers);

import HomePage from "./index";

describe('HomePage', () => {
    beforeEach(() => {
        render(
            <BrowserRouter>
                <HomePage />
            </BrowserRouter>
        );
    });

    afterEach(() => {
        cleanup();
    })

    it('take user to about page when clicked', async() => {
        const link = screen.getByLabelText("about");
        await userEvent.click();
        expect(window.location.pathname).toBe('/about');
    });
})