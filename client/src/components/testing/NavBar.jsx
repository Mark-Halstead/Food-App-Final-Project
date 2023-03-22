import React from "react";
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';

import { BrowserRouter } from "react-router-dom";

import NavBar from "..";

describe("NavBar Component", () => {
    beforeEach(() => {
        render(
            <BrowserRouter>
                <NavBar />
            </BrowserRouter>
        );
    });

    afterEach(() => {
        cleanup();
    });
});