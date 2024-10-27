import React, { useEffect, useState } from "react";
import { useStarWars } from "../../store";
type PlanetProps = {
  url: string;
};
const Planet: React.FC<PlanetProps> = ({ url }) => {
  const [planetName, setPlanetName] = useState("");
  const { getPlanetName } = useStarWars();

  useEffect(() => {
    (async () => {
      const response = await getPlanetName(url) as string;
      setPlanetName(response);
    })();
    // eslint-disable-next-line
  }, []);

  return <>{planetName}</>;
};

export default Planet;
