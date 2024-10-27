import React from "react";
import { render, screen } from "@testing-library/react";
import CharacterList from "../../components/CharacterList";
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

beforeEach(() => {
  (useStarWars as jest.Mock).mockReturnValue({
    editedFields: mockEditedFields,
    getPlanetName: mockGetPlanetName,
    characters: [mockCharacter],
    searhQuery: ""
  });
});

describe("CharacterList", () => {
  it("renders character cards when characters are available", () => {
    const mockCharacters = [mockCharacter];
    (useStarWars as jest.Mock).mockReturnValue({
      characters: mockCharacters,
      editedFields: mockEditedFields,
      getPlanetName: mockGetPlanetName,
      searchQuery: "",
    });

    render(
      <MemoryRouter>
        <CharacterList />
      </MemoryRouter>
    );
    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
  });

  it("renders shimmer UI when no characters are available", () => {
    (useStarWars as jest.Mock).mockReturnValue({
      characters: [],
      searchQuery: ""
    });

    render(
      <MemoryRouter>
        <CharacterList />
      </MemoryRouter>
    );
    const shimmerComponents = screen.getAllByTestId("shimmer");
    expect(shimmerComponents.length).toBe(9);
  });
});
