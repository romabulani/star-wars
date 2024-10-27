import React, { useState, useEffect } from "react";

const colors = ["bg-blue-500", "bg-purple-500", "bg-indigo-500", "bg-gray-500"];

const getRandomColor = (letter: string): string => {
  return colors[(letter.charCodeAt(0) - 65) % colors.length];
};
const Avatar: React.FC<{ name: string }> = ({ name }) => {
  const [bgColor, setBgColor] = useState<string>("");

  useEffect(() => {
    setBgColor(getRandomColor(name.charAt(0).toUpperCase()));
    // eslint-disable-next-line
  }, []);

  return (
    <div
      data-testid="avatar"
      className={`${bgColor} w-12 h-12 rounded-full flex items-center justify-center text-white font-bold`}
    >
      {name.charAt(0).toUpperCase()}
    </div>
  );
};

export default Avatar;
