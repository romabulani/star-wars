import React from "react";

type PillProps = {
  value: string;
};
const Pill: React.FC<PillProps> = ({ value }) => {
  return (
    <span className="px-4 py-1 border border-gray-200 rounded-full text-gray-700 text-sm">
      {value}
    </span>
  );
};

export default Pill;
