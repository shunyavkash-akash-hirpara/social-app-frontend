import React from "react";
import { Link } from "react-router-dom";

const peoples = [
  {
    id: 1,
    name: "Wade Cooper",
    avatar:
      "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    location: "Surat,India",
  },
  {
    id: 2,
    name: "Arlene Mccoy",
    avatar:
      "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    location: "Mumbai,India",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis amet voluptatem praesentium?",
  },
  {
    id: 3,
    name: "Devon Webb",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
    location: "Kolkata,India",
  },
];

export default function SuggestedUser(): React.JSX.Element {
  return (
    <div className="mb-6">
      <div className="bg-white rounded-t-xl p-4 pb-3">
        <div className="flex items-center justify-between">
          <label className="text-sm text-gray-600 font-bold">
            Friend Request
          </label>
          <a href="#" className="text-sm text-blue-600">
            See all
          </a>
        </div>
      </div>
      <div className="bg-white border-t-2 border-gray-100 p-4 pt-3 rounded-b-xl">
        {peoples.map((people, index) => (
          <div
            className={`${
              index !== 0 && "mt-3 pt-3 border-t-2"
            } border-gray-100`}
            key={index}
          >
            <div className="flex">
              <Link to={`/profile/${people.id}`}>
                <img
                  className="w-11 h-11 rounded-full"
                  src={people.avatar}
                  alt="Rounded avatar"
                />
              </Link>
              <div className="flex flex-col text-justify mt-1">
                <Link
                  to={`/profile/${people.id}`}
                  className="ms-3 text-sm text-gray-600"
                >
                  {people.name}
                </Link>
                <div className="flex items-center justify-between ml-2 mt-1">
                  <div className="flex -space-x-3 rtl:space-x-reverse">
                    {peoples.slice(0, 3).map((people) => (
                      <img
                        className="w-7 h-7 border-2 border-white rounded-full"
                        src={people.avatar}
                        alt=""
                        key={people.id}
                      />
                    ))}
                  </div>
                  <span className="text-gray-400 text-xs mr-6 cursor-pointer">
                    13 Mutuals
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center mt-4">
              <button className="rounded-lg border border-solid bg-gradient-to-r from-red-500 to-pink-600 bg-no-repeat bg-cover bg-center text-white text-sm font-bold px-7 py-2 mr-3 tracking-wider transition-transform duration-80 ease-in active:scale-95 focus:outline-none">
                Confirm
              </button>
              <button className="rounded-lg border-2 border-gray-300 border-solid text-sm text-gray-400 font-bold px-7 py-2 tracking-wider transition-transform duration-80 ease-in active:scale-95 focus:outline-none">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
