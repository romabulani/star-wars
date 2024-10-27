export type Character = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
};

export type StarWarsContextType = {
  characters: Character[];
  setCharacters: (characters: Character[]) => void;
  currentPage: number;
  editedFields: Record<string, Record<string, string | number>>;
  setCurrentPage: (n: number) => void;
  count: number;
  getPlanetName: (url: string) => Promise<string | undefined>;
  getFilmDetails: (url: string) => Promise<Film | undefined>
  favoriteCharacters: Character[];
  setFavoriteCharacters: (url: Character[]) => void;
  isFavorite: (url: string) => boolean;
  getStarshipDetails: (url: string) => Promise<Starship | undefined>;
  getCharacterDetails: (currentPage: number, searchQuery: string) => Promise<void>;
  searchQuery: string;
  setSearchQuery: (s: string) => void;
  setEditedFields: (url: string, fields: Record<string, string | number>) => void;
};

export type Planet = {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
};

export type IconProps = {
    color?: string;
    size?: number;
  };

export type Film = {
    title: string;
    opening_crawl: string
}

export type Starship = {
  name: string;
  manufacturer: string
}
