import React from "react";
import { Link } from "react-router-dom";

const ErroeState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-3xl font-bold mb-4">Oops!</h1>
      <p className="text-xl">Something went wrong.</p>
      <p className="text-md">Please try again later.</p>
      <Link to="/">
        <p className="font-semibold text-xl mt-2">Go to Home Page</p>
      </Link>
    </div>
  );
};

export default ErroeState;
