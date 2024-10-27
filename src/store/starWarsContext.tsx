import React, { useCallback, useContext, useReducer } from "react";
import { Character, Film, StarWarsContextType, Starship } from "../types";
import {
  CharacterResponse,
  getCharacters,
  getFilm,
  getPlanet,
  getStarship,
} from "../services";
import { initialState, starWarsReducer } from "./reducer";

const StarWarsContext = React.createContext<StarWarsContextType | null>(null);

const StarWarsContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(starWarsReducer, initialState);

  const getPlanetName = useCallback(
    async (url: string) => {
      if (state.planetNames[url]) {
        return state.planetNames[url];
      } else {
        const planetName = (await getPlanet(url)) as string;
        dispatch({
          type: "SET_PLANET_NAME",
          payload: { url, name: planetName },
        });
        return planetName;
      }
    },
    [state.planetNames]
  );

  const getFilmDetails = useCallback(
    async (url: string) => {
      if (state.filmDetails[url]) {
        return state.filmDetails[url];
      } else {
        const film = (await getFilm(url)) as Film;
        dispatch({ type: "SET_FILM_DETAILS", payload: { url, film } });
        return film;
      }
    },
    [state.filmDetails]
  );

  const getStarshipDetails = useCallback(
    async (url: string) => {
      if (state.starships[url]) {
        return state.starships[url];
      } else {
        const starship = (await getStarship(url)) as Starship;
        dispatch({ type: "SET_STARSHIP_DETAILS", payload: { url, starship } });
        return starship;
      }
    },
    [state.starships]
  );

  const isFavorite = useCallback(
    (url: string) =>
      !!state.favoriteCharacters.find((char) => char.url === url),
    [state.favoriteCharacters]
  );

  const getCharacterDetails = useCallback(async (currentPage: number, searchQuery: string) => {
    const { count, results } = (await getCharacters(
     currentPage,
     searchQuery
    )) as CharacterResponse;
    dispatch({ type: "SET_CHARACTERS", payload: results });
    dispatch({ type: "SET_CURRENT_PAGE", payload: currentPage });
    dispatch({ type: "SET_SEARCH_QUERY", payload: searchQuery });
    dispatch({ type: "SET_COUNT", payload: count });
  }, [])

  return (
    <StarWarsContext.Provider
      value={{
        ...state,
        setCharacters: (characters: Character[]) =>
          dispatch({ type: "SET_CHARACTERS", payload: characters }),
        setCurrentPage: (page: number) =>
          dispatch({ type: "SET_CURRENT_PAGE", payload: page }),
        setFavoriteCharacters: (characters: Character[]) =>
          dispatch({ type: "SET_FAVORITE_CHARACTERS", payload: characters }),
        getPlanetName,
        getFilmDetails,
        getCharacterDetails,
        getStarshipDetails,
        isFavorite,
        setSearchQuery: (query: string) =>
          dispatch({ type: "SET_SEARCH_QUERY", payload: query }),
        setEditedFields: (
          url: string,
          fields: Record<string, string | number>
        ) => dispatch({ type: "SET_EDITED_FIELDS", payload: { url, fields } }),
      }}
    >
      {children}
    </StarWarsContext.Provider>
  );
};

const useStarWars = () => useContext(StarWarsContext) as StarWarsContextType;

export { StarWarsContextProvider, useStarWars };
