import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import '@testing-library/jest-dom'
import { Home } from "./Home";

describe("Home Compontent", () => {
    it("should render the title", () => {
        render(<Home />)
        const title = screen.getByText("WEATHER")
        expect(title).toBeInTheDocument();
    });
    
    it("should render the city", async () => {
        render(<Home />);
        const input = screen.getByRole("link");
        userEvent.type(input, "Dallol");
        await waitFor(() => {
        expect(screen.getByText("Dallol")).toBeInTheDocument();
        });
    });
});
