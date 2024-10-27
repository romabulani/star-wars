import React, { useEffect, useMemo, useState } from "react";
import { Film } from "../../types";
import Shimmer from "../atoms/Shimmer";
import { useStarWars } from "../../store";

type FilmProps = {
  url: string;
};
const FilmCard: React.FC<FilmProps> = ({ url }) => {
  const [film, setFilm] = useState<Film>();
  const { getFilmDetails } = useStarWars();

  useEffect(() => {
    (async () => {
      const response = (await getFilmDetails(url)) as Film;
      setFilm(response);
    })();
  // eslint-disable-next-line
  }, []);

  const ShimmerUI = useMemo(() => <Shimmer className="w-full h-20 my-2" />, []);

  if (!film) {
    return ShimmerUI;
  }

  return (
    <li className="py-2">
      <span className="text-gray-700 font-semibold">{`${film?.title}: `}</span>
      <span className="text-sm">{film?.opening_crawl}</span>
    </li>
  );
};

export default FilmCard;
