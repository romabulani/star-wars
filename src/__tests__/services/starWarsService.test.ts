import { API_URL } from "../../constants";
import { CharacterResponse, getCharacters, getFilm, getPlanet, getStarship } from "../../services";
import { Character, Film, Starship } from "../../types";


global.fetch = jest.fn();

describe("API Functions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getCharacters", () => {
    it("fetches characters with the correct URL when page and query are provided", async () => {
      const mockResponse: CharacterResponse = {
        count: 1,
        next: `${API_URL}/people?page=2`,
        results: [{ name: "Luke Skywalker", url: `${API_URL}/people/1/` }] as Character[],
      };
      
      (fetch as jest.Mock).mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockResponse),
      });

      const result = await getCharacters(1, "Luke");

      expect(fetch).toHaveBeenCalledWith(`${API_URL}/people?page=1&search=Luke`);
      expect(result).toEqual({
        next: "2",
        results: mockResponse.results,
        count: mockResponse.count,
      });
    });

    it("handles an error and logs an error message when fetch fails", async () => {
      console.error = jest.fn();
      (fetch as jest.Mock).mockRejectedValue(new Error("API Error"));

      const result = await getCharacters();

      expect(result).toBeUndefined();
      expect(console.error).toHaveBeenCalledWith("Error in fetching star wars character: ", expect.any(Error));
    });
  });

  describe("getPlanet", () => {
    it("fetches planet data and returns the planet name", async () => {
      const mockPlanet = { name: "Tatooine" };
      (fetch as jest.Mock).mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockPlanet),
      });

      const planetName = await getPlanet(`${API_URL}/planets/1/`);

      expect(fetch).toHaveBeenCalledWith(`${API_URL}/planets/1/`);
      expect(planetName).toBe("Tatooine");
    });

    it("handles an error and logs an error message when fetch fails", async () => {
      console.error = jest.fn();
      (fetch as jest.Mock).mockRejectedValue(new Error("API Error"));

      const result = await getPlanet(`${API_URL}/planets/1/`);

      expect(result).toBeUndefined();
      expect(console.error).toHaveBeenCalledWith("Error in fetching star wars character: ", expect.any(Error));
    });
  });

  describe("getFilm", () => {
    it("fetches film data and returns title and opening crawl", async () => {
      const mockFilm: Film = {
        title: "A New Hope",
        opening_crawl: "It is a period of civil war...",
      };
      (fetch as jest.Mock).mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockFilm),
      });

      const filmData = await getFilm(`${API_URL}/films/1/`);

      expect(fetch).toHaveBeenCalledWith(`${API_URL}/films/1/`);
      expect(filmData).toEqual({
        title: "A New Hope",
        opening_crawl: "It is a period of civil war...",
      });
    });

    it("handles an error and logs an error message when fetch fails", async () => {
      console.error = jest.fn();
      (fetch as jest.Mock).mockRejectedValue(new Error("API Error"));

      const result = await getFilm(`${API_URL}/films/1/`);

      expect(result).toBeUndefined();
      expect(console.error).toHaveBeenCalledWith("Error in fetching star wars character: ", expect.any(Error));
    });
  });

  describe("getStarship", () => {
    it("fetches starship data and returns name and manufacturer", async () => {
      const mockStarship: Starship = {
        name: "Millennium Falcon",
        manufacturer: "Corellian Engineering Corporation",
      };
      (fetch as jest.Mock).mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockStarship),
      });

      const starshipData = await getStarship(`${API_URL}/starships/1/`);

      expect(fetch).toHaveBeenCalledWith(`${API_URL}/starships/1/`);
      expect(starshipData).toEqual({
        name: "Millennium Falcon",
        manufacturer: "Corellian Engineering Corporation",
      });
    });

    it("handles an error and logs an error message when fetch fails", async () => {
      console.error = jest.fn();
      (fetch as jest.Mock).mockRejectedValue(new Error("API Error"));

      const result = await getStarship(`${API_URL}/starships/1/`);

      expect(result).toBeUndefined();
      expect(console.error).toHaveBeenCalledWith("Error in fetching star wars character: ", expect.any(Error));
    });
  });
});
