import React, { useEffect, useMemo, useState } from "react";
import { Starship } from "../../types";
import Shimmer from "../atoms/Shimmer";
import { useStarWars } from "../../store";

type StarshipCardProps = {
  url: string;
};

const StarshipCard: React.FC<StarshipCardProps> = ({ url }) => {
  const [starship, setStarship] = useState<Starship>();
  const { getStarshipDetails } = useStarWars();

  useEffect(() => {
    (async () => {
      const response = await getStarshipDetails(url);
      setStarship(response);
    })();
  // eslint-disable-next-line
  }, []);
  const ShimmerUI = useMemo(() => <Shimmer className="w-full h-10 my-2" />, []);

  if (!starship) {
    return ShimmerUI;
  }

  return (
    <li className="py-[2px]">
      <span className="text-gray-700 font-semibold">{`${starship?.name}, `}</span>
      <span className="text-sm italic">{`manufactured by ${starship?.manufacturer}`}</span>
    </li>
  );
};

export default StarshipCard;
