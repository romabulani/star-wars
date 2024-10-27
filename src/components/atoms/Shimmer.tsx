import React from "react";
type ShimmerProps = {
  className: string;
};
const Shimmer: React.FC<ShimmerProps> = ({ className }) => {
  return (
    <div
      data-testid="shimmer"
      className={`${className} bg-gray-200 rounded-md animate-pulse`}
    />
  );
};

export default Shimmer;
