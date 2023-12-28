import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import { expect, it } from "vitest";
import App from "./App";

it("should render the BrowserRouter component", () => {
  render(<App />);

  expect(screen.getByRole("navigation")).toBeCalled();
});
