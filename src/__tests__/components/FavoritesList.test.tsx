import React from "react";
import { render, screen } from "@testing-library/react";
import FavoritesList from "../../components/FavoritesList";
import { useStarWars } from "../../store";
import { mockCharacter } from "../../testData/constants";
import { MemoryRouter } from "react-router-dom";
const mockEditedFields = {
    "https://swapi.dev/api/people/1/": {
      gender: "male",
      height: "172",
    },
  };
  const mockGetPlanetName = jest.fn();

jest.mock("../../store", () => ({
  ...jest.requireActual("../../store"),
  useStarWars: jest.fn(),
}));

describe("FavoritesList", () => {
  beforeEach(() => {
    (useStarWars as jest.Mock).mockReturnValue({
    editedFields: mockEditedFields,
    getPlanetName: mockGetPlanetName,
    characters: [mockCharacter],
  });
  });

  it("displays 'No characters added to Favorites' when favoriteCharacters is empty", () => {
    (useStarWars as jest.Mock).mockReturnValue({
      favoriteCharacters: [],
    });

    render(
      <MemoryRouter>
        <FavoritesList />
      </MemoryRouter>
    );

    expect(screen.getByText("No characters added to Favorites")).toBeInTheDocument();
  });

  it("renders favorite character cards when favoriteCharacters is populated", () => {
    const mockFavorites = [mockCharacter, { ...mockCharacter, name: "Leia Organa" }];
    (useStarWars as jest.Mock).mockReturnValue({
      favoriteCharacters: mockFavorites,
      editedFields: mockEditedFields,
      getPlanetName: mockGetPlanetName,
      isFavorite: jest.fn().mockReturnValue(false)
    });

    render(
      <MemoryRouter>
        <FavoritesList />
      </MemoryRouter>
    );

    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    expect(screen.getByText("Leia Organa")).toBeInTheDocument();
  });
});
