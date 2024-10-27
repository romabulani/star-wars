import React, { useMemo } from "react";
import { useStarWars } from "../store";
import Pagination from "./molecules/Pagination";
import Shimmer from "./atoms/Shimmer";
import CharacterCard from "./molecules/CharacterCard";

const CharacterList = () => {
  const { characters, searchQuery } = useStarWars();
  const ShimmerUI = useMemo(() => {
    return Array(9)
      .fill(2)
      .map((_e, i) => (
        <Shimmer
          className="w-[320px] h-[400px] rounded-xl m-4"
          key={i + "shimmer"}
        />
      ));
  }, []);

  return (
    <>
      {searchQuery.length > 0 &&
        (characters?.length > 0 ? (
          <p className="text-center font-semibold">
            Search Results for {searchQuery}
          </p>
        ) : (
          <p className="text-center font-semibold">
            No Results found for {searchQuery}
          </p>
        ))}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center max-w-full md:max-w-[768px] lg:max-w-[1024px] mx-auto">
        {characters?.length > 0
          ? characters?.map((character) => (
              <CharacterCard data={character} key={character.url} />
            ))
          : !searchQuery && ShimmerUI}
      </div>
      <Pagination />
    </>
  );
};

export default CharacterList;
