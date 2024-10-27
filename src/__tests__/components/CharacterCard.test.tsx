import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CharacterCard from "../../components/molecules/CharacterCard";
import { useStarWars } from "../../store";
import { mockCharacter } from "../../testData/constants";

jest.mock("../../store", () => ({
    useStarWars: jest.fn(),
}));

describe("CharacterCard Component", () => {
  const mockEditedFields = {
    "https://swapi.dev/api/people/1/": {
      gender: "female",
      height: "160",
    },
  };

  beforeEach(() => {
    (useStarWars as jest.Mock).mockReturnValue({
      editedFields: mockEditedFields,
      getPlanetName: jest.fn(() => 'Mocked Planet'),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders character details correctly", () => {
    render(
      <MemoryRouter>
        <CharacterCard data={mockCharacter} />
      </MemoryRouter>
    );

    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    expect(screen.getByText("Mass: 77 kg")).toBeInTheDocument();
  });

  test("renders edited gender if available", () => {
    render(
      <MemoryRouter>
        <CharacterCard data={mockCharacter} />
      </MemoryRouter>
    );

    expect(screen.getByText(/19BBY - FEMALE/i)).toBeInTheDocument();
  });

  test("does not render favorite icon when showFavoriteIcon is false", () => {
    render(
      <MemoryRouter>
        <CharacterCard data={mockCharacter} showFavoriteIcon={false} />
      </MemoryRouter>
    );

    expect(screen.queryByRole("img", { name: /heart filled/i })).not.toBeInTheDocument();
  });

  test("renders film, starship, and species icons correctly", () => {
    render(
      <MemoryRouter>
        <CharacterCard data={mockCharacter} />
      </MemoryRouter>
    );
    expect(screen.getByTestId("film-count")).toBeInTheDocument();
    expect(screen.getByTestId("starship-count")).toBeInTheDocument();
  });

  test("navigates to character detail page when clicked", () => {
    const { container } = render(
      <MemoryRouter>
        <CharacterCard data={mockCharacter} />
      </MemoryRouter>
    );

    const link = container.querySelector("a");
    expect(link).toHaveAttribute("href", "/character/1");
  });
});
