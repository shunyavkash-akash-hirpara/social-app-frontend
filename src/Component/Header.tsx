import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSearch } from "../hooks/store/useSearch";
import { useAuth } from "../hooks/store/useAuth";
import SearchIcon from "./icons/SearchIcon";

export default function Header({
  accessToken,
}: {
  accessToken: string;
}): React.JSX.Element {
  const navigate = useNavigate();
  const { userId, user } = useAuth();
  const { searchData, setSearchData } = useSearch();

  useEffect(() => {
    if (!accessToken) {
      navigate("/auth");
    }
  }, [accessToken, navigate]);

  return (
    <>
      <nav className="bg-white border-gray-200 fixed top-0 w-full">
        <div className="flex flex-wrap items-center mx-10 p-2">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8 w-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap">
              SocialApp
            </span>
          </a>

          <form className="w-[25%] mr-auto ml-36">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <SearchIcon />
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search Mockups, Logos..."
                value={searchData}
                required
                onClick={() => navigate("/search")}
                onChange={(e) => setSearchData(e.target.value || "")}
              />
            </div>
          </form>

          <div className="md:w-auto flex items-center" id="navbar-default">
            <label className="mr-2 text-sm text-gray-700 font-bold">
              {user.username}
            </label>
            <Link to={`/profile/${userId}`}>
              <img
                className="w-10 h-10 rounded-full object-cover"
                src={user.profileImg}
                alt="Rounded avatar"
              />
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
