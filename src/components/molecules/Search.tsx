import React, { useCallback, useState } from "react";
import SearchIcon from "../icons/SearchIcon";
import { useNavigate } from "react-router-dom";
import { useStarWars } from "../../store";
type SearchProps = {
  className?: string;
};
const Search: React.FC<SearchProps> = ({ className }) => {
  const [searchText, setSearchText] = useState("");
  const { setSearchQuery } = useStarWars();
  const navigate = useNavigate();

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (searchText.trim()) {
        setSearchQuery(searchText.trim());
        navigate(`/?search=${encodeURIComponent(searchText.trim())}`);
      } else {
        navigate(`/`);
      }
      setSearchText("");
    },
    // eslint-disable-next-line
    [searchText]
  );

  return (
    <form
      className={`flex gap-x-4 border border-gray-400 w-80 rounded-full mb-2 sm:mb-0 ${
        className ?? ""
      }`}
      onSubmit={handleSearch}
      data-testid="search-form"
    >
      <input
        type="search"
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
        value={searchText}
        placeholder="Search characters..."
        className="w-60 ml-4 outline-none p-2"
      />
      <button
        type="submit"
        className="border-l border-gray-400 px-2 flex justify-center items-center cursor-pointer"
      >
        <SearchIcon />
      </button>
    </form>
  );
};

export default Search;
