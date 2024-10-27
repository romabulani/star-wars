import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Search from "./Search";
import { useStarWars } from "../../store";

const Header = () => {
  const { setSearchQuery, currentPage, getCharacterDetails } = useStarWars();
  const {search} = useLocation();
  useEffect(() => {
    if (search.length > 0) {
      const searchQuery = decodeURIComponent(search.split("=")[1])
      setSearchQuery(decodeURIComponent(search.split("=")[1]));
      getCharacterDetails(currentPage, searchQuery)
    } else {
      getCharacterDetails(currentPage, "")
    }
    // eslint-disable-next-line
  }, [search, currentPage]);

  return (
    <>
      <div className="flex px-2 py-1 sm:p-3 sm:border-b border-gray-500 sm:mb-2 justify-between items-center">
        <Link to="/" className="mr-4 mb-2">
          <header className="font-serif text-2xl">Star Wars</header>
        </Link>
        <div className="hidden sm:block" data-testid="desktop-search">
          <Search />
        </div>
        <Link to="/favorites" className="text-xl mb-2">
          Favorites
        </Link>
      </div>
      <div className="block sm:hidden border-b border-gray-500 mx-auto" data-testid="mobile-search">
        <Search />
      </div>
    </>
  );
};

export default Header;
