import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import FilmCard from "../../components/molecules/FilmCard";
import { useStarWars } from "../../store";

jest.mock("../../store", () => ({
  useStarWars: jest.fn(),
}));

describe("FilmCard Component", () => {
  const mockGetFilmDetails = jest.fn();

  beforeEach(() => {
    (useStarWars as jest.Mock).mockReturnValue({
      getFilmDetails: mockGetFilmDetails,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders shimmer while loading film details", () => {
    mockGetFilmDetails.mockResolvedValueOnce(undefined);

    render(
      <MemoryRouter>
        <FilmCard url="http://example.com/film/1/" />
      </MemoryRouter>
    );
    expect(screen.getByTestId("shimmer")).toBeInTheDocument();
  });

  test("renders film details once fetched", async () => {
    const mockFilm = {
      title: "ABC",
      opening_crawl: "XYZ...",
    };

    mockGetFilmDetails.mockResolvedValueOnce(mockFilm);

    render(
      <MemoryRouter>
        <FilmCard url="http://example.com/film/1/" />
      </MemoryRouter>
    );
    await waitFor(() => expect(screen.getByText(/ABC/)));
    expect(screen.getByText(/XYZ.../)).toBeInTheDocument();
  });

  test("handles empty film response gracefully", async () => {
    mockGetFilmDetails.mockResolvedValueOnce(null);

    render(
      <MemoryRouter>
        <FilmCard url="http://example.com/film/1/" />
      </MemoryRouter>
    );
    expect(screen.getByTestId("shimmer")).toBeInTheDocument();
  });
});
