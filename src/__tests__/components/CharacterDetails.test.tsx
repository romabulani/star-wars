import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import CharacterDetails from "../../components/CharacterDetails";
import { mockCharacter } from "../../testData/constants";
import { Character } from "../../types";

jest.mock("../../components/atoms/Avatar", () => () => (
  <div>Avatar Component</div>
));
jest.mock("../../components/icons/FilmIcon", () => () => (
  <div>FilmIcon Component</div>
));
jest.mock("../../components/icons/WorldIcon", () => () => (
  <div>WorldIcon Component</div>
));
jest.mock("../../components/icons/RocketIcon", () => () => (
  <div>RocketIcon Component</div>
));
jest.mock("../../components/molecules/Planet", () => () => (
  <span>Planet Component</span>
));
jest.mock(
  "../../components/molecules/FilmCard",
  () =>
    ({ url }: { url: string }) =>
      <li>{`FilmCard ${url}`}</li>
);
jest.mock(
  "../../components/molecules/StarshipCard",
  () =>
    ({ url }: { url: string }) =>
      <li>{`StarshipCard ${url}`}</li>
);
jest.mock("../../components/molecules/FavoriteButton", () => () => (
  <button>FavoriteButton</button>
));
jest.mock(
  "../../components/molecules/EditableFields",
  () =>
    ({ originalValue }: { originalValue: string }) =>
      <div>{`Editable: ${originalValue}`}</div>
);

describe("CharacterDetails", () => {
  const renderComponent = (characterData: Character) => {
    render(
      <MemoryRouter initialEntries={[{ state: { character: characterData } }]}>
        <Routes>
          <Route path="/" element={<CharacterDetails />} />
        </Routes>
      </MemoryRouter>
    );
  };

  it("renders character name, birth year, and avatar", () => {
    renderComponent(mockCharacter);

    expect(screen.getByText(mockCharacter.name)).toBeInTheDocument();
    expect(screen.getByText(mockCharacter.birth_year)).toBeInTheDocument();
    expect(screen.getByText("Avatar Component")).toBeInTheDocument();
  });

  it("renders editable fields for gender and height", () => {
    renderComponent(mockCharacter);

    expect(
      screen.getByText(`Editable: ${mockCharacter.gender.toUpperCase()}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Editable: ${mockCharacter.height}`)
    ).toBeInTheDocument();
  });

  it("renders favorite button", () => {
    renderComponent(mockCharacter);

    expect(screen.getByText("FavoriteButton")).toBeInTheDocument();
  });

  it("renders pills for mass, hair color, and eye color", () => {
    renderComponent(mockCharacter);

    expect(
      screen.getByText(`Mass: ${mockCharacter.mass} kg`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Hair Color: ${mockCharacter.hair_color.toUpperCase()}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Eye Color: ${mockCharacter.eye_color.toUpperCase()}`)
    ).toBeInTheDocument();
  });

  it("renders film list if character has films", () => {
    const characterWithFilms = {
      ...mockCharacter,
      films: ["Film 1", "Film 2"],
    };
    renderComponent(characterWithFilms);

    expect(screen.getByText("Films")).toBeInTheDocument();
    expect(screen.getByText("FilmCard Film 1")).toBeInTheDocument();
    expect(screen.getByText("FilmCard Film 2")).toBeInTheDocument();
  });

  it("does not render film list if character has no films", () => {
    const characterWithoutFilms = { ...mockCharacter, films: [] };
    renderComponent(characterWithoutFilms);

    expect(screen.queryByText("Films")).not.toBeInTheDocument();
  });

  it("renders starship list if character has starships", () => {
    const characterWithStarships = {
      ...mockCharacter,
      starships: ["Starship 1"],
    };
    renderComponent(characterWithStarships);

    expect(screen.getByText("Starships")).toBeInTheDocument();
    expect(screen.getByText("StarshipCard Starship 1")).toBeInTheDocument();
  });

  it("does not render starship list if character has no starships", () => {
    const characterWithoutStarships = { ...mockCharacter, starships: [] };
    renderComponent(characterWithoutStarships);

    expect(screen.queryByText("Starships")).not.toBeInTheDocument();
  });
});
