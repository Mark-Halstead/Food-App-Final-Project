import React from "react";
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';

import { BrowserRouter } from 'react-router-dom';

import HomePage from "../HomePage";

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

    it("navigates user to the login page when clicked", async() => {
        const link = screen.getByLabelText("Login")
        await userEvent.click(link);
        expect(window.location.pathname).toBe("/login");
    })
})