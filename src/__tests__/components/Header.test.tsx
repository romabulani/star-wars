import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "../../components/molecules/Header";
import { useStarWars } from "../../store";

jest.mock("../../store", () => ({
  useStarWars: jest.fn(),
}));

describe("Header Component", () => {
  const mockSetSearchQuery = jest.fn();
  const mockSetCurrentPage = jest.fn();
  const mockGetCharacterDetails = jest.fn();

  beforeEach(() => {
    (useStarWars as jest.Mock).mockReturnValue({
      setSearchQuery: mockSetSearchQuery,
      setCurrentPage: mockSetCurrentPage,
      getCharacterDetails: mockGetCharacterDetails,
      searchQuery: ""
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders Header component with correct links", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(screen.getByText("Star Wars")).toBeInTheDocument();
    expect(screen.getByText("Favorites")).toBeInTheDocument();
  });

  test("renders Search component in desktop view", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(screen.getByTestId("desktop-search")).toBeInTheDocument();
  });

  test("does not change state when search param exists", () => {
    render(
      <MemoryRouter initialEntries={["/?search=test"]}>
        <Header />
      </MemoryRouter>
    );
    expect(mockSetSearchQuery).toHaveBeenCalled();
    expect(mockSetCurrentPage).not.toHaveBeenCalled();
  });
});
