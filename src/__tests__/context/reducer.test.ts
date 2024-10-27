import { initialState, starWarsReducer } from "../../store/reducer";
import { mockCharacter } from "../../testData/constants";
import { Character, Film, Starship } from "../../types";

describe("starWarsReducer", () => {
  it("should set characters when action type is SET_CHARACTERS", () => {
    const mockCharacters: Character[] = [mockCharacter];
    const newState = starWarsReducer(initialState, { type: "SET_CHARACTERS", payload: mockCharacters });
    
    expect(newState.characters).toEqual(mockCharacters);
  });

  it("should set edited fields when action type is SET_EDITED_FIELDS", () => {
    const newState = starWarsReducer(initialState, {
      type: "SET_EDITED_FIELDS",
      payload: { url: "1", fields: { name: "Edited Luke", age: 53 } },
    });
    
    expect(newState.editedFields["1"]).toEqual({ name: "Edited Luke", age: 53 });
  });

  it("should set current page when action type is SET_CURRENT_PAGE", () => {
    const newState = starWarsReducer(initialState, { type: "SET_CURRENT_PAGE", payload: 2 });
    
    expect(newState.currentPage).toBe(2);
  });

  it("should set count when action type is SET_COUNT", () => {
    const newState = starWarsReducer(initialState, { type: "SET_COUNT", payload: 42 });
    
    expect(newState.count).toBe(42);
  });

  it("should set favorite characters when action type is SET_FAVORITE_CHARACTERS", () => {
    const mockFavoriteCharacters: Character[] = [mockCharacter];
    const newState = starWarsReducer(initialState, { type: "SET_FAVORITE_CHARACTERS", payload: mockFavoriteCharacters });
    
    expect(newState.favoriteCharacters).toEqual(mockFavoriteCharacters);
  });

  it("should set planet name when action type is SET_PLANET_NAME", () => {
    const newState = starWarsReducer(initialState, {
      type: "SET_PLANET_NAME",
      payload: { url: "planet1", name: "Tatooine" },
    });
    
    expect(newState.planetNames["planet1"]).toBe("Tatooine");
  });

  it("should set film details when action type is SET_FILM_DETAILS", () => {
    const mockFilm: Film = { title: "A New Hope", opening_crawl: "It is a period of civil war..." };
    const newState = starWarsReducer(initialState, {
      type: "SET_FILM_DETAILS",
      payload: { url: "film1", film: mockFilm },
    });
    
    expect(newState.filmDetails["film1"]).toEqual(mockFilm);
  });

  it("should set starship details when action type is SET_STARSHIP_DETAILS", () => {
    const mockStarship: Starship = { name: "Millennium Falcon", manufacturer: "Corellian Engineering Corporation" };
    const newState = starWarsReducer(initialState, {
      type: "SET_STARSHIP_DETAILS",
      payload: { url: "starship1", starship: mockStarship },
    });
    
    expect(newState.starships["starship1"]).toEqual(mockStarship);
  });

  it("should set search query when action type is SET_SEARCH_QUERY", () => {
    const newState = starWarsReducer(initialState, { type: "SET_SEARCH_QUERY", payload: "Luke" });
    
    expect(newState.searchQuery).toBe("Luke");
  });

  it("should return the initial state when action type is unknown", () => {
    const newState = starWarsReducer(initialState, { type: "UNKNOWN_ACTION" } as any);
    
    expect(newState).toEqual(initialState);
  });
});
