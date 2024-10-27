import { API_URL } from "../constants";
import { Character, Film, Planet, Starship } from "../types";

export type CharacterResponse = {
  count: number;
  next: string | null;
  results: Character[];
};

export const getCharacters = async (page: number = 1, query: string = "") => {
  try {
    const url = `${API_URL}/people?page=${page}${query ? "&search=" + query : ""}`;
    const response = await fetch(url);
    const jsonResponse: CharacterResponse = await response.json();
    return {
      next: jsonResponse?.next?.split("=")[1] ?? null,
      results: jsonResponse?.results,
      count: jsonResponse.count,
    };
  } catch (e) {
    console.error("Error in fetching star wars character: ", e);
  }
};

export const getPlanet = async (url: string) => {
  try {
    const response = await fetch(url);
    const jsonResponse: Planet = await response.json();
    return jsonResponse.name;
  } catch (e) {
    console.error("Error in fetching star wars character: ", e);
  }
};

export const getFilm = async (url: string) => {
  try {
    const response = await fetch(url);
    const jsonResponse: Film = await response.json();
    return {
      title: jsonResponse.title,
      opening_crawl: jsonResponse.opening_crawl,
    } as Film;
  } catch (e) {
    console.error("Error in fetching star wars character: ", e);
  }
};

export const getStarship = async (url: string) => {
  try {
    const response = await fetch(url);
    const jsonResponse: Starship = await response.json();
    return {
      name: jsonResponse.name,
      manufacturer: jsonResponse.manufacturer,
    } as Starship;
  } catch (e) {
    console.error("Error in fetching star wars character: ", e);
  }
};
