import { Character, Film, Starship } from "../types";

export type Action =
  | { type: "SET_CHARACTERS"; payload: Character[] }
  | { type: "SET_CURRENT_PAGE"; payload: number }
  | { type: "SET_COUNT"; payload: number }
  | { type: "SET_FAVORITE_CHARACTERS"; payload: Character[] }
  | { type: "SET_PLANET_NAME"; payload: { url: string; name: string } }
  | { type: "SET_FILM_DETAILS"; payload: { url: string; film: Film } }
  | {
      type: "SET_STARSHIP_DETAILS";
      payload: { url: string; starship: Starship };
    }
  | { type: "SET_SEARCH_QUERY"; payload: string }
  | {
      type: "SET_EDITED_FIELDS";
      payload: { url: string; fields: Record<string, string | number> };
    };

type State = {
  characters: Character[];
  editedFields: Record<string, Record<string, string | number>>;
  currentPage: number;
  count: number;
  favoriteCharacters: Character[];
  planetNames: Record<string, string>;
  filmDetails: Record<string, Film>;
  starships: Record<string, Starship>;
  searchQuery: string;
};

export const initialState: State = {
  characters: [],
  editedFields: {},
  currentPage: 1,
  count: 0,
  favoriteCharacters: [],
  planetNames: {},
  filmDetails: {},
  starships: {},
  searchQuery: "",
};

export const starWarsReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_CHARACTERS":
      return { ...state, characters: action.payload };
    case "SET_EDITED_FIELDS":
      return {
        ...state,
        editedFields: {
          ...state.editedFields,
          [action.payload.url]: {...state.editedFields[action.payload.url],...action.payload.fields},
        },
      };
    case "SET_CURRENT_PAGE":
      return { ...state, currentPage: action.payload };
    case "SET_COUNT":
      return { ...state, count: action.payload };
    case "SET_FAVORITE_CHARACTERS":
      return { ...state, favoriteCharacters: action.payload };
    case "SET_PLANET_NAME":
      return {
        ...state,
        planetNames: {
          ...state.planetNames,
          [action.payload.url]: action.payload.name,
        },
      };
    case "SET_FILM_DETAILS":
      return {
        ...state,
        filmDetails: {
          ...state.filmDetails,
          [action.payload.url]: action.payload.film,
        },
      };
    case "SET_STARSHIP_DETAILS":
      return {
        ...state,
        starships: {
          ...state.starships,
          [action.payload.url]: action.payload.starship,
        },
      };
    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload };
    default:
      return state;
  }
};
