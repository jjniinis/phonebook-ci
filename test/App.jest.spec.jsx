/**
 * @jest-environment jsdom
 */

import React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import App from "../src/App"

describe("<App />", () => {
    test("loads the page", async () => {
        render(<App />)
        expect(screen.getByText("Numbers")).toBeVisible()
        expect(screen.getByText("filter shown names with:")).toBeDefined()
    })

})
