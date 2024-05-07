import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "../hooks/store/useAuth";
import Header from "../Component/Header";
import Sidebar from "../Component/Sidebar";
import RecentChat from "../Component/RecentChat";
import { Link } from "react-router-dom";
import { useSearch } from "../hooks/store/useSearch";
import { APIS } from "../api/apiList";
import useApi from "../hooks/useApi";
import { useSnack } from "../hooks/store/useSnack";

interface user {
  _id: number;
  name: string;
  username: string;
  profileImg: string;
}
[];

// const peoples = [
//   {
//     id: 1,
//     name: "Wade Cooper",
//     avatar:
//       "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     username: "wadecooper",
//   },
//   {
//     id: 2,
//     name: "Arlene Mccoy",
//     avatar:
//       "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     username: "arlenemccoy",
//   },
//   {
//     id: 3,
//     name: "Devon Webb",
//     avatar:
//       "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
//     username: "devonwebb",
//   },
//   {
//     id: 4,
//     name: "Tom Cook",
//     avatar:
//       "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     username: "tomcook",
//   },
//   {
//     id: 5,
//     name: "Tanya Fox",
//     avatar:
//       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     username: "tanyafox",
//   },
//   {
//     id: 6,
//     name: "Hellen Schmidt",
//     avatar:
//       "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//     username: "hellenschmidt",
//   },
// ];

export default function SearchPage(): React.JSX.Element {
  const [users, setUsers] = useState<user[]>([]);
  const { accessToken } = useAuth();
  const { searchData } = useSearch();
  const { apiCall, checkAxiosError } = useApi();
  const { setSnack } = useSnack();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const searchUser = useCallback(
    async (searchData: string) => {
      try {
        const res = await apiCall({
          url: APIS.USER.SEARCHUSER,
          method: "post",
          data: { username: searchData.toLowerCase() },
        });
        if (res.status === 200) {
          setUsers(res.data.data);
          setSnack(res.data.message);
        }
      } catch (error) {
        if (checkAxiosError(error)) {
          const errorMessage = error?.response?.data.message;
          setSnack(errorMessage, "warning");
        }
      }
    },
    [apiCall, checkAxiosError, setSnack]
  );

  useEffect(() => {
    if (!searchData) return setUsers([]); // Exit early if searchData is falsy
    searchUser(searchData);
  }, [searchData, searchUser]);

  return (
    <>
      <Header accessToken={accessToken} />
      <Sidebar />

      <main className="fixed w-[848px] top-[80px] left-[280px] right-[344px] mx-[auto] rounded-xl flex h-calc-screen-minus-nav">
        <div className="feed-scroll w-full mx-[auto] overflow-y-auto p-6 pt-0">
          {users.length > 0 && (
            <>
              <div className="bg-white rounded-xl p-6">
                <div className="font-medium">
                  <div className="text-gray-700 font-bold text-left">
                    Search results
                  </div>
                  {users.map((people) => (
                    <Link
                      to={`/profile/${people._id}`}
                      className="flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 group"
                    >
                      <img
                        className="w-12 h-12 rounded-full object-cover"
                        src={people.profileImg}
                        alt="Rounded avatar"
                      />
                      <div className="flex flex-col text-justify">
                        <span className="ms-3 text-sm text-gray-700 font-bold">
                          {people.username}
                        </span>
                        <span className="ms-3 text-[12px] text-gray-400">
                          {people.name}
                        </span>
                        <span className="ms-3 text-[12px] text-gray-400">
                          Following
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      <RecentChat />
    </>
  );
}
