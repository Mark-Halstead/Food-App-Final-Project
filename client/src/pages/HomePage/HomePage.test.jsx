import React from "react";
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';

import HomePage from ".";

describe('Home', () => {
    beforeEach(() => {
        render(
            <BrowserRouter>
                <HomePage />
            </BrowserRouter>
        );
    })

    afterEach(() => {
        cleanup();
    })

    it("navigates user to the about page when button on navbar is clicked", async() => {
        const link = screen.getByLabelText("about page")
    })
})