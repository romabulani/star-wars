import React, { useCallback, useEffect, useState } from "react";
import HeartIcon from "../icons/HeartIcon";
import HeartFilledIcon from "../icons/HeartFilledIcon";
import { useStarWars } from "../../store";
import { Character } from "../../types";

interface FavoriteButtonProps {
  character: Character;
  removeFromFavorites?: boolean;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  character,
  removeFromFavorites,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [checkForFavorite, setCheckForFavorite] = useState(false);
  const { favoriteCharacters, setFavoriteCharacters, isFavorite } =
    useStarWars();

  useEffect(() => {
    setCheckForFavorite(isFavorite(character.url));
  // eslint-disable-next-line
  }, []);

  const updateFavorites = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();

      if (removeFromFavorites) {
        const newFavoritesList = favoriteCharacters.filter(
          (c) => c.url !== character.url
        );
        setFavoriteCharacters(newFavoritesList);
        setCheckForFavorite(false);
      } else {
        setCheckForFavorite(true);
        setFavoriteCharacters([...favoriteCharacters, character]);
      }
    },
    // eslint-disable-next-line
    [favoriteCharacters]
  );

  if (removeFromFavorites) {
    return (
      <button
        onClick={(e) => updateFavorites(e)}
        className="text-gray-600 font-semibold text-md"
      >
        Remove from Favorites
      </button>
    );
  }

  return (
    <button
      className={`h-10 p-2 rounded-md flex gap-x-1 items-center justify-center max-w-60 sm:max-w-none mx-auto sm:mx-0 sm:max-h-none ${
        checkForFavorite
          ? "bg-red-500 text-white cursor-not-allowed"
          : "border border-red-500 text-red-500 cursor-pointer"
      } font-semibold hover:bg-red-500 transition-colors duration-300 hover:text-white`}
      onClick={updateFavorites}
      disabled={checkForFavorite}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered || checkForFavorite ? (
        <HeartIcon color={"#ffffff"} />
      ) : (
        <HeartFilledIcon color={"#ef4444"} />
      )}
      {checkForFavorite ? "Added to Favorites" : "Add to Favorites"}
    </button>
  );
};

export default FavoriteButton;
