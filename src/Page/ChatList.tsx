import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "../Component/icons/SearchIcon";
import BackIcon from "../Component/icons/BackIcon";
import InputComponent from "../Component/InputComponent";
import useApi from "../hooks/useApi";
import { useSnack } from "../hooks/store/useSnack";
import { APIS } from "../api/apiList";
import { FormikProps, useFormik } from "formik";

interface peoples {
  id: number;
  name: string;
  avatar: string;
  username: string;
}
[];

interface MyFormikValue {
  message: string;
}

const peoples = [
  {
    id: 1,
    name: "Wade Cooper",
    avatar:
      "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    username: "wadecooper",
  },
  {
    id: 2,
    name: "Arlene Mccoy",
    avatar:
      "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    username: "arlenemccoy",
  },
  {
    id: 3,
    name: "Devon Webb",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
    username: "devonwebb",
  },
  {
    id: 4,
    name: "Tom Cook",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    username: "tomcook",
  },
  {
    id: 5,
    name: "Tanya Fox",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    username: "tanyafox",
  },
  {
    id: 6,
    name: "Hellen Schmidt",
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    username: "hellenschmidt",
  },
  {
    id: 1,
    name: "Wade Cooper",
    avatar:
      "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    username: "wadecooper",
  },
  {
    id: 2,
    name: "Arlene Mccoy",
    avatar:
      "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    username: "arlenemccoy",
  },
  {
    id: 3,
    name: "Devon Webb",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
    username: "devonwebb",
  },
  {
    id: 4,
    name: "Tom Cook",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    username: "tomcook",
  },
  {
    id: 5,
    name: "Tanya Fox",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    username: "tanyafox",
  },
  {
    id: 6,
    name: "Hellen Schmidt",
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    username: "hellenschmidt",
  },
];

export default function ChatList(): React.JSX.Element {
  const [users, setUsers] = useState<peoples[]>([]);
  const [search, setSearch] = useState<string>("");
  const [chatUser, setChatUser] = useState<{
    id: number;
    name: string;
    avatar: string;
    username: string;
  }>();
  const navigate = useNavigate();
  const { apiCall, checkAxiosError } = useApi();
  const { setSnack } = useSnack();
  // schema for yup validation
  const schema = yup.object().shape({
    description: yup.string(),
    photos: yup.string(),
    feeling: yup.string(),
  });

  const formik: FormikProps<MyFormikValue> = useFormik<MyFormikValue>({
    validationSchema: schema,
    initialValues: { message: "" },
    onSubmit: async (values) => {
      try {
        const res = await apiCall({
          url: APIS.AUTHENTICATION.SIGNUP,
          method: "post",
          data: JSON.stringify(values, null, 2),
        });
        if (res.status === 200) {
          console.log(res.data.message);
        }
      } catch (error) {
        if (checkAxiosError(error)) {
          const errorMessage = error?.response?.data.message;
          setSnack(errorMessage, "warning");
        }
      }
    },
  });

  useEffect(() => {
    if (!search) return setUsers(peoples); // Exit early if searchData is falsy
    setUsers(() =>
      peoples.filter((people) =>
        people.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);

  return (
    <>
      <main className="fixed w-[848px] top-[80px] left-[280px] right-[344px] mx-[auto] rounded-xl">
        <div className="w-full p-6 pt-0 flex justify-between">
          <div className="w-[35%] bg-white rounded-xl flex flex-col h-calc-for-chat">
            <div className="w-full h-14 p-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-600 bg-no-repeat bg-cover bg-center">
              <div className="h-full flex items-center justify-start">
                <button
                  className="w-8 mr-3 h-full place-content-center rotate-[180deg]"
                  onClick={() => navigate("/")}
                >
                  <BackIcon />
                </button>
                <span className="text-lg font-bold text-white">Chat</span>
              </div>
            </div>
            <div className="w-[90%] mx-auto my-2 relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <SearchIcon />
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                placeholder="Search"
                required
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="overflow-y-auto feed-scroll rounded-b-xl m-y">
              {users.map((people) => (
                <button
                  className="w-full flex items-center p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 group"
                  onClick={() => setChatUser(people)}
                  key={people.id}
                >
                  <img
                    className="w-12 h-12 rounded-full"
                    src={people.avatar}
                    alt="Rounded avatar"
                  />
                  <div className="flex flex-col text-justify">
                    <span className="ms-3 text-sm text-gray-700 font-bold">
                      {people.username}
                    </span>
                    <span className="ms-3 text-[12px] text-gray-400">
                      {people.name}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
          {chatUser && (
            <div className="relative w-[62%] rounded-xl bg-white">
              <div className="w-full h-14 p-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-600 bg-no-repeat bg-cover bg-center flex items-center justify-between">
                <div className="h-full flex items-center justify-start">
                  <Link to={`/profile/${chatUser.id}`}>
                    <img
                      className="w-10 h-10 rounded-full"
                      src={chatUser.avatar}
                      alt="Rounded avatar"
                    />
                  </Link>
                  <div className="flex flex-col text-justify">
                    <Link
                      to={`/profile/${chatUser.id}`}
                      className="ms-3 text-sm text-white font-bold"
                    >
                      {chatUser.username}
                    </Link>
                    <span className="ms-3 text-sm text-white">online</span>
                  </div>
                </div>
                <div>
                  <button className="w-8 h-8 p-1 rounded-lg">
                    <img
                      className="w-8"
                      src="/public/icons/phone-call-svgrepo-com.svg"
                      alt="read"
                    />
                  </button>
                  <button className="w-8 h-8 p-1 rounded-lg ml-2">
                    <img
                      className="w-8"
                      src="/public/icons/video-call-svgrepo-com.svg"
                      alt="read"
                    />
                  </button>
                </div>
              </div>
              <div className="w-full p-3 h-[auto]">
                <div className="flex flex-col items-start">
                  <p className="text-sm text-gray-700 bg-[#E2EFFF] px-5 py-[10px] rounded-t-2xl rounded-r-2xl max-w-[80%] text-start">
                    Hi, how can I help you?
                  </p>
                  <span className="text-xs text-gray-400 my-2">
                    Mon 10:20am
                  </span>
                </div>
                <div className="flex flex-col items-end">
                  <p className="text-sm text-gray-700 bg-[#fcf1f5] px-5 py-[10px] rounded-t-2xl rounded-l-2xl max-w-[80%] text-start">
                    I want those files for you. I want you to send 1 PDF and 1
                    image file.
                  </p>
                  <span className="text-xs text-gray-400 my-2">Just now</span>
                </div>
              </div>
              <div className="absolute bottom-0 w-full">
                <div className="relative w-full border-t-2 border-gray-100 p-3">
                  <InputComponent
                    name="message"
                    type="text"
                    placeholder="Start typing..."
                    formik={formik}
                    inputStyle="w-full bg-input-primary border-none my-0 text-sm"
                  />
                  <div className="absolute right-5 bottom-[18px] flex">
                    <input type="file" id="chat-media" className="hidden" />
                    <label htmlFor="chat-media" className="mr-2 cursor-pointer">
                      <img
                        width={30}
                        src="/public/icons/photo-svgrepo-com.svg"
                        alt="photo"
                      />
                    </label>
                    <button>
                      <img
                        width={30}
                        src="/public/icons/share-2-svgrepo-com.svg"
                        alt="send icon"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
