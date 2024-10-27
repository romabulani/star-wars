import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Search from "../../components/molecules/Search";
import { useStarWars } from "../../store";

jest.mock("../../store", () => ({
  useStarWars: jest.fn(),
}));

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

describe("Search Component", () => {
  const mockSetSearchQuery = jest.fn();

  beforeEach(() => {
    (useStarWars as jest.Mock).mockReturnValue({
      setSearchQuery: mockSetSearchQuery,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the search input and button", () => {
    render(<Search />);
    expect(
      screen.getByPlaceholderText("Search characters...")
    ).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("updates search text on input change", () => {
    render(<Search />);

    const input = screen.getByPlaceholderText("Search characters...");
    fireEvent.change(input, { target: { value: "Luke" } });
    expect(input).toHaveValue("Luke");
  });

  test("submits the search query and navigates", () => {
    const mockNavigate = jest.fn();
    jest.mock("react-router-dom", () => ({
      useNavigate: () => mockNavigate,
    }));

    render(<Search />);

    const input = screen.getByPlaceholderText("Search characters...");
    const form = screen.getByTestId("search-form");
    fireEvent.change(input, { target: { value: "Leia" } });
    fireEvent.submit(form);

    expect(mockSetSearchQuery).toHaveBeenCalledWith("Leia");
    expect(mockedUsedNavigate).toHaveBeenCalledWith("/?search=Leia");
  });

  test("does not navigate when input is empty", () => {
    const mockNavigate = jest.fn();
    jest.mock("react-router-dom", () => ({
      useNavigate: () => mockNavigate,
    }));

    render(<Search />);
    const form = screen.getByTestId("search-form");
    fireEvent.submit(form);
    expect(mockSetSearchQuery).not.toHaveBeenCalled();
    expect(mockedUsedNavigate).toHaveBeenCalledWith("/");
  });
});
