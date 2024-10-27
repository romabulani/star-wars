import React, { useMemo } from "react";
import { useStarWars } from "../../store";
const CHARACTERS_ON_ONE_PAGE = 10;
const Pagination = () => {
  const { count, currentPage, setCurrentPage } = useStarWars();
  const totalButtons = Math.ceil(count / CHARACTERS_ON_ONE_PAGE);
  const buttons = useMemo(
    () =>
      currentPage === 1
        ? [1, 2, 3]
        : currentPage === totalButtons
        ? [totalButtons - 2, totalButtons - 1, totalButtons]
        : [currentPage - 1, currentPage, currentPage + 1],
    [currentPage, totalButtons]
  );

  if (totalButtons <= 1) {
    return <></>;
  }
  return (
    <div className="mx-auto pb-4 w-full text-center">
      <button
        className={`px-3 py-1 border border-gray-500 mx-2 rounded-lg mt-2 ${
          currentPage === 1 ? "cursor-not-allowed bg-gray-200" : ""
        }`}
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >{`<< Prev`}</button>
      {buttons.map((i) => (
        <button
          key={i}
          className={`px-3 py-1 border border-gray-400 mx-2 rounded-lg mt-2 ${
            currentPage === i ? "bg-gray-100" : ""
          }`}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </button>
      ))}
      <button
        className={`px-3 py-1 border border-gray-500 mx-2 rounded-lg mt-2 ${
          currentPage === totalButtons ? "cursor-not-allowed bg-gray-200" : ""
        }`}
        disabled={currentPage === totalButtons}
        onClick={() => setCurrentPage(currentPage + 1)}
      >{`Next >>`}</button>
      <button></button>
    </div>
  );
};

export default Pagination;
