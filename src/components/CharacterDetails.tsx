import React from "react";
import { Character } from "../types";
import { useLocation } from "react-router-dom";
import Avatar from "./atoms/Avatar";
import FilmIcon from "./icons/FilmIcon";
import FilmCard from "./molecules/FilmCard";
import Planet from "./molecules/Planet";
import WorldIcon from "./icons/WorldIcon";
import Pill from "./atoms/Pill";
import RocketIcon from "./icons/RocketIcon";
import StarshipCard from "./molecules/StarshipCard";
import FavoriteButton from "./molecules/FavoriteButton";
import EditableFields from "./molecules/EditableFields";

interface CharacterProps {}

const CharacterDetails: React.FC<CharacterProps> = () => {
  const location = useLocation();
  const { character } = location.state as { character: Character };

  return (
    <div className="p-6 mx-auto w-full">
      <div className="flex flex-col sm:flex-row justify-between">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3 mb-2 sm:mb-3 md:gap-4 md:mb-4">
          <Avatar name={character.name} />
          <div className="flex items-center sm:items-start flex-col gap-y-[2px]">
            <h2 className="text-xl font-bold">{character.name}</h2>
            <div className="text-gray-500 text-sm flex items-center">
              <div className="flex items-center space-x-1 text-sm">
                <WorldIcon color="#808080" />
                <span className="text-gray-500">
                  <Planet url={character.homeworld} />
                </span>
              </div>
              <span className="pl-1 text-gray-500">{character.birth_year}</span>
            </div>
            <EditableFields characterUrl={character.url} originalValue={character.gender.toUpperCase()} isGender key="gender" />
            <EditableFields characterUrl={character.url} originalValue={character.height} key="height" />
          </div>
        </div>
        <FavoriteButton character={character} />
      </div>

      <div className="flex space-x-2 my-4 flex-wrap gap-2">
        <Pill value={`Mass: ${character.mass} kg`} />
        <Pill value={`Hair Color: ${character.hair_color.toUpperCase()}`} />
        <Pill value={`Eye Color: ${character.eye_color.toUpperCase()}`} />
      </div>

      {character.films.length > 0 && (
        <>
          <h3 className="font-semibold text-lg mt-2 flex gap-x-2 items-center">
            <FilmIcon color="#2a5a97" />
            Films
          </h3>
          <ul className="list-disc pl-5 mb-4">
            {character.films.map((film) => (
              <FilmCard key={film} url={film} />
            ))}
          </ul>
        </>
      )}

      {character.starships.length > 0 && (
        <>
          <h3 className="font-semibold text-lg mt-2 flex gap-x-2 items-center">
            <RocketIcon color="#ec944b" />
            Starships
          </h3>
          <ul className="list-disc pl-5 mb-4">
            {character.starships.map((starship) => (
              <StarshipCard key={starship} url={starship} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default CharacterDetails;
