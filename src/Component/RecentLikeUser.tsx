import React from "react";

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

export default function RecentLikeUser(): React.JSX.Element {
  return (
    <div className="mb-6">
      <div className="bg-white rounded-t-xl p-4 pb-3">
        <div className="flex items-center justify-between">
          <label className="text-sm text-gray-600 font-bold">
            You might like
          </label>
          <a href="#" className="text-sm text-blue-600">
            See all
          </a>
        </div>
      </div>
      <div className="bg-white border-t-2 border-gray-100 p-4 pt-3 rounded-b-xl">
        <div className="flex">
          <img
            className="w-11 h-11 rounded-full"
            src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="Rounded avatar"
          />
          <div className="flex flex-col text-justify mt-1">
            <span className="ms-3 text-sm text-gray-600">Arlene Mccoy</span>
            <div className="flex items-center justify-between ml-2 mt-1">
              <div className="flex -space-x-3 rtl:space-x-reverse">
                {peoples.slice(0, 3).map((people) => (
                  <img
                    className="w-7 h-7 border-2 border-white rounded-full"
                    src={people.avatar}
                    alt=""
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
            Follow
          </button>
          <button className="rounded-lg border-2 border-gray-300 border-solid text-sm text-gray-400 font-bold px-7 py-2 tracking-wider transition-transform duration-80 ease-in active:scale-95 focus:outline-none">
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
}
