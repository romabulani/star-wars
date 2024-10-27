import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useStarWars } from "../../store";
import FavoriteButton from "../../components/molecules/FavoriteButton";
import { mockCharacter } from "../../testData/constants";

jest.mock("../../store", () => ({
  useStarWars: jest.fn(),
}));


describe("FavoriteButton Component", () => {
  const mockSetFavoriteCharacters = jest.fn();

  beforeEach(() => {
    (useStarWars as jest.Mock).mockReturnValue({
      favoriteCharacters: [],
      setFavoriteCharacters: mockSetFavoriteCharacters,
      isFavorite: jest.fn().mockReturnValue(false),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders Add to Favorites button when not a favorite", () => {
    render(<FavoriteButton character={mockCharacter} />);
    expect(screen.getByText("Add to Favorites")).toBeInTheDocument();
    expect(screen.getByText("Add to Favorites")).toHaveClass("text-red-500");
  });

  test("renders Added to Favorites button when character is a favorite", () => {
    (useStarWars as jest.Mock).mockReturnValueOnce({
      favoriteCharacters: [mockCharacter],
      setFavoriteCharacters: mockSetFavoriteCharacters,
      isFavorite: jest.fn().mockReturnValue(true),
    });

    render(<FavoriteButton character={mockCharacter} />);
    expect(screen.getByText("Added to Favorites")).toBeInTheDocument();
    expect(screen.getByText("Added to Favorites")).toHaveClass("text-white");
  });

  test("adds character to favorites when clicked", () => {
    render(<FavoriteButton character={mockCharacter} />);
    fireEvent.click(screen.getByText("Add to Favorites"));
    expect(mockSetFavoriteCharacters).toHaveBeenCalledWith([mockCharacter]);
  });

  test("removes character from favorites when removeFromFavorites is true", () => {
    (useStarWars as jest.Mock).mockReturnValueOnce({
      favoriteCharacters: [mockCharacter],
      setFavoriteCharacters: mockSetFavoriteCharacters,
      isFavorite: jest.fn().mockReturnValue(true),
    });

    render(<FavoriteButton character={mockCharacter} removeFromFavorites />);
    fireEvent.click(screen.getByText("Remove from Favorites"));
    expect(mockSetFavoriteCharacters).toHaveBeenCalledWith([]);
  });

  test("disables button when character is a favorite", () => {
    (useStarWars as jest.Mock).mockReturnValueOnce({
      favoriteCharacters: [mockCharacter],
      setFavoriteCharacters: mockSetFavoriteCharacters,
      isFavorite: jest.fn().mockReturnValue(true),
    });

    render(<FavoriteButton character={mockCharacter} />);
    const button = screen.getByText("Added to Favorites");
    expect(button).toBeDisabled();
  });

  test("changes icon and text on hover", () => {
    render(<FavoriteButton character={mockCharacter} />);
    const button = screen.getByText("Add to Favorites");
    fireEvent.mouseEnter(button);
    expect(screen.getByText("Add to Favorites")).toBeInTheDocument();
    fireEvent.mouseLeave(button);
    expect(screen.getByText("Add to Favorites")).toBeInTheDocument();
  });
});
