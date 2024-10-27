import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ErrorState from "../../components/atoms/ErrorState";
import userEvent from "@testing-library/user-event";

describe("ErrorState Component", () => {
  const renderWithRouter = (component: React.ReactNode) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
  };

  test("renders ErrorState component correctly", () => {
    renderWithRouter(<ErrorState />);
    expect(screen.getByText("Oops!")).toBeInTheDocument();
    expect(screen.getByText("Something went wrong.")).toBeInTheDocument();
    expect(screen.getByText("Please try again later.")).toBeInTheDocument();
  });

  test("displays 'Go to Home Page' link", () => {
    renderWithRouter(<ErrorState />);
    const homeLink = screen.getByText("Go to Home Page");
    expect(homeLink).toBeInTheDocument();
    expect(homeLink.closest("a")).toHaveAttribute("href", "/");
  });

  test("clicking 'Go to Home Page' link navigates to '/'", async () => {
    renderWithRouter(<ErrorState />);
    const homeLink = screen.getByText("Go to Home Page");
    userEvent.click(homeLink);
    expect(window.location.pathname).toBe("/");
  });
});
