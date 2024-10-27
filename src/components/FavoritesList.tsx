import React from "react";
import { useStarWars } from "../store";
import CharacterCard from "./molecules/CharacterCard";

const FavoritesList = () => {
  const { favoriteCharacters } = useStarWars();
  return favoriteCharacters.length === 0 ? (
    <p className="mx-auto my-4 text-center">No characters added to Favorites</p>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center max-w-full md:max-w-[768px] lg:max-w-[1024px] mx-auto">
      {favoriteCharacters.map((character) => (
        <CharacterCard data={character} key={character.url} showFavoriteIcon />
      ))}
    </div>
  );
};

export default FavoritesList;
