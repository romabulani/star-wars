import React from "react";
import { Character as CharacterType } from "../../types";
import Avatar from "../atoms/Avatar";
import FilmIcon from "../icons/FilmIcon";
import RocketIcon from "../icons/RocketIcon";
import PersonIcon from "../icons/PersonIcon";
import WorldIcon from "../icons/WorldIcon";
import { Link } from "react-router-dom";
import Pill from "../atoms/Pill";
import FavoriteButton from "./FavoriteButton";
import HeartFilledIcon from "../icons/HeartFilledIcon";
import { useStarWars } from "../../store";
import Planet from "./Planet";
interface CharacterProps {
  data: CharacterType;
  showFavoriteIcon?: boolean;
}
const CharacterCard: React.FC<CharacterProps> = ({ data, showFavoriteIcon }) => {
  const { editedFields } = useStarWars();
  return (
    <Link
      to={`/character/${data.url.split("/").filter(Boolean).pop()}`}
      className="max-w-xs bg-white rounded-xl shadow-md overflow-hidden mx-4 my-4 w-[320px] cursor-pointer"
      state={{ character: data }}
    >
      <div className="bg-gray-100 p-6 rounded-t-xl flex justify-center items-center relative">
        <Avatar name={data.name} />
        {showFavoriteIcon && (
          <div className="absolute top-4 right-4">
            <HeartFilledIcon color="#ef4444" />
          </div>
        )}
      </div>
      <div className="p-6 text-center">
        <h2 className="text-xl font-bold text-gray-800">{data.name}</h2>
        <p className="text-gray-500 mt-1">
          {data.birth_year} -{" "}
          {(
            (editedFields[data.url]?.gender ?? data.gender) as string
          ).toUpperCase()}
        </p>
        <div className="flex items-center space-x-1 text-sm justify-center pt-2">
          <WorldIcon color="#808080" />
          <span className="text-gray-500 mt-1">
            <Planet url={data.homeworld} />
          </span>
        </div>
        <div className="flex justify-center space-x-2 mt-4">
          <Pill
            value={`Height: ${
              editedFields[data.url]?.height ?? data.height
            } cm`}
          />
          <Pill value={`Mass: ${data.mass} ${isNaN(Number(data.mass)) ? "" : "kg"}`} />
        </div>
      </div>
      <div className="border-t border-gray-200 p-4 flex justify-center space-x-6">
        {!showFavoriteIcon ? (
          <>
            {data.films.length > 0 && (
              <div className="flex items-center space-x-1 text-sm" data-testid="film-count">
                <FilmIcon color="#2a5a97" />
                <span>{data.films.length}</span>
              </div>
            )}
            {data.starships.length > 0 && (
              <div className="flex items-center space-x-1 text-sm" data-testid="starship-count">
                <RocketIcon color="#ec944b" />
                <span>{data.starships.length}</span>
              </div>
            )}
            {data.species.length > 0 && (
              <div className="flex items-center space-x-1 text-sm" data-testid="species-count">
                <PersonIcon color="#94a4b3" />
                <span>{data.species.length}</span>
              </div>
            )}
          </>
        ) : (
          <FavoriteButton character={data} removeFromFavorites />
        )}
      </div>
    </Link>
  );
};

export default CharacterCard;
