import React, { useCallback, useEffect, useState } from "react";
import * as yup from "yup";
import { FormikProps, useFormik } from "formik";
import InputEmoji from "react-input-emoji";
import InputComponent from "../Component/InputComponent";
import useApi from "../hooks/useApi";
import { APIS } from "../api/apiList";
import { useSnack } from "../hooks/store/useSnack";
import { useNavigate } from "react-router-dom";
import SingleFeed from "./SingleFeed";
import CloseIcon from "./icons/CloseIcon";
import SearchIcon from "./icons/SearchIcon";
import { useAuth } from "../hooks/store/useAuth";

interface MyFormikValue {
  description: string;
  file: string[] | File[];
  mention: string[];
}
interface mention {
  _id: string;
  profileImg: string;
  username: string;
}

interface posts {
  _id: string;
  user: {
    _id: string;
    username: string;
    profileImg: string;
    city?: string;
    country?: string;
  };
  description?: string;
  mentionedUsers: {
    _id: string;
    username: string;
    name: string;
    profileImg: string;
  }[];
  photos: { _id: string; url: string; type: string }[];
  like: number;
  comment: number;
}
[];

const peoples = [
  {
    id: 1,
    name: "Wade Cooper",
    username: "wadecooper",
    avatar:
      "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    location: "Surat,India",
  },
  {
    id: 2,
    name: "Arlene Mccoy",
    username: "arlenemccoy",
    avatar:
      "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    location: "Mumbai,India",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis amet voluptatem praesentium?",
  },
  {
    id: 3,
    name: "Devon Webb",
    username: "devonwebb",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
    location: "Kolkata,India",
  },
  {
    id: 4,
    name: "Tom Cook",
    username: "tomcook",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    location: "Chennai,India",
  },
  {
    id: 5,
    name: "Tanya Fox",
    username: "tanyafox",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    location: "Delhi,India",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis possimus culpa tempore. Repellat recusandae quisquam deserunt quam voluptates rerum officiis harum necessitatibus corrupti voluptate delectus exercitationem modi eum cupiditate, sint ducimus quasi dignissimos molestiae?",
  },
  {
    id: 6,
    name: "Hellen Schmidt",
    username: "hellenschmidt",
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    location: "Jammu,India",
  },
];

export default function Feed(): React.JSX.Element {
  const [openMention, setOpenMention] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [mention, setMention] = useState<mention[]>([]);
  const [posts, setPosts] = useState<posts[]>([]);
  const { apiCall, checkAxiosError } = useApi();
  const { user } = useAuth();
  const { setSnack } = useSnack();
  const navigate = useNavigate();
  // schema for yup validation
  const schema = yup
    .object()
    .shape({
      description: yup.string(),
      file: yup.array(),
      mention: yup.array(),
    })
    .test(
      "description-photos",
      "Both description and photos are required",
      function (value) {
        const { description, file } = value;
        if (!description && (!file || !file.length)) {
          return this.createError({
            path: "description",
            message: "Description is required",
          });
        }
        return true;
      }
    );

  const formik: FormikProps<MyFormikValue> = useFormik<MyFormikValue>({
    validationSchema: schema,
    initialValues: { description: "", file: [], mention: [] },
    onSubmit: async (values) => {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (value) {
          if (key === "file") {
            value.forEach((element: string | Blob) => {
              formData.append(key, element);
            });
          } else {
            formData.append(key, value);
          }
        }
      });
      try {
        const res = await apiCall({
          url: APIS.POST.POST,
          method: "post",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: formData,
        });
        if (res.status === 201) {
          setSnack(res.data.message);
          setMention([]);
          formik.handleReset();
          navigate("/");
        }
      } catch (error) {
        if (checkAxiosError(error)) {
          const errorMessage = error?.response?.data.message;
          setSnack(errorMessage, "warning");
        }
      }
    },
  });
  function handleOnEnter(text: string) {
    formik.setFieldValue("description", text);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getPosts = useCallback(async () => {
    try {
      const res = await apiCall({
        url: APIS.POST.ALLPOST,
        method: "get",
      });
      if (res.status === 200) {
        console.log(res.data.data);
        setPosts(res.data.data);
        setSnack(res.data.message);
      }
    } catch (error) {
      if (checkAxiosError(error)) {
        const errorMessage = error?.response?.data.message;
        setSnack(errorMessage, "warning");
      }
    }
  }, [apiCall, checkAxiosError, setSnack]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <>
      {/* post create input */}
      <form
        onSubmit={formik.handleSubmit}
        className="w-full bg-white rounded-xl mb-6 p-4"
      >
        <div className="flex items-center pb-3">
          <img
            className="w-10 h-10 rounded-full mr-3 object-cover"
            src={
              user.profileImg ||
              "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg"
            }
            alt="Rounded avatar"
          />
          <InputComponent
            name="description"
            type="text"
            placeholder="What's happening?"
            formik={formik}
            inputStyle="w-[494px] bg-input-primary border-none my-0 text-sm"
          />
        </div>
        {formik.values.file.length > 0 && (
          <div className="relative grid grid-cols-4">
            {formik.values.file?.map((media) => (
              <img
                className="rounded-lg h-32 mx-1 bg-cover w-32 object-contain"
                src={
                  typeof media === "string"
                    ? media // Use the provided URL if it's already a string
                    : URL.createObjectURL(media) // Create a URL for the File object
                }
                alt="photos"
              />
            ))}
            <button
              onClick={() => formik.setFieldValue("file", [])}
              className="p-1 rounded-xl border-2 border-grey text-gray-700 absolute right-2 top-3 bg-[#e5e7ebad]"
            >
              <CloseIcon className="w-6 h-6"></CloseIcon>
            </button>
          </div>
        )}
        {mention.length > 0 && (
          <>
            <h2 className="text-sm font-bold text-gray-600 mb-2">Mention</h2>
            <div className="">
              {mention.map((tag) => (
                <div
                  key={tag._id}
                  className="inline-flex items-center bg-gray-200 rounded-2xl pl-4"
                >
                  <img
                    className="w-8 h-8 rounded-full"
                    src={tag.profileImg}
                    alt="Rounded avatar"
                  />
                  <div className="flex flex-col text-justify pr-2">
                    <span className="ms-3 text-sm text-gray-700 font-bold">
                      {tag.username}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setMention(
                        mention.filter((item) => item._id !== tag._id)
                      );
                      formik.setFieldValue("mention", [
                        formik.values.mention.filter((id) => id !== tag._id),
                      ]);
                    }}
                    className="p-1 rounded-full border-2 border-gray-700 text-gray-700"
                  >
                    <CloseIcon className="w-4 h-4"></CloseIcon>
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="flex items-center justify-between">
          <button className="flex flex-row items-center">
            <img
              width={25}
              src="/public/icons/video-svgrepo-com.svg"
              alt="live video"
            />
            <span className="text-gray-500 ml-1 text-sm">Live video</span>
          </button>
          <label
            htmlFor="post-input-file"
            className="flex flex-row items-center cursor-pointer"
          >
            <input
              type="file"
              id="post-input-file"
              name="photos"
              className="hidden"
              accept=".jpg,.jpeg,.png,.mp4,.mkv"
              multiple
              onChange={(e) => {
                const file = e.currentTarget.files;
                if (file) {
                  const arr = [];
                  for (let i = 0; i < file.length; i++) {
                    const element = new Blob([file[i]], { type: file[i].type });
                    console.log(element);
                    arr.push(element);
                  }
                  formik.setFieldValue("file", arr);
                }
              }}
            />
            <img
              width={25}
              src="/public/icons/photo-svgrepo-com.svg"
              alt="photos"
            />
            <span className="text-gray-500 ml-1 text-sm">Photos</span>
          </label>
          <div className="flex items-center">
            <InputEmoji
              value={formik.values.description}
              onChange={handleOnEnter}
              cleanOnEnter
              keepOpened
            ></InputEmoji>
            <button className="flex flex-row items-center">
              <span className="text-gray-500 ml-1 text-sm">Feeling</span>
              {/* <img
                width={25}
                src="/public/icons/emoji-smile-svgrepo-com.svg"
                alt="photos"
              /> */}
            </button>
          </div>
          <div className="flex items-center">
            <button
              className="flex flex-row items-center"
              onClick={() => setOpenMention(true)}
            >
              <span className="text-gray-500 ml-1 text-[26px]">@</span>
              <span className="text-gray-500 ml-1 text-sm">Mention</span>
            </button>
          </div>
          {/* mention model */}
          {openMention && (
            <div
              className={`modal-popup-story ${
                openMention ? "block" : "hidden"
              }`}
            >
              <div className="w-full h-full relative flex justify-center">
                <div className="h-full absolute top-[100px] w-[580px]">
                  <div className="relative w-full text-base font-bold text-gray-700 bg-white rounded-t-xl p-6 pb-2">
                    <button
                      className="p-1 rounded-xl border-2 border-grey text-gray-400 absolute right-2 top-3"
                      onClick={() => setOpenMention(false)}
                    >
                      <CloseIcon className="w-6 h-6"></CloseIcon>
                    </button>
                    <h2>Mentions</h2>
                  </div>
                  <div className="feed-scroll max-h-[70%] overflow-y-auto bg-white rounded-b-xl p-6 pt-2 border-t-2 border-gray-200">
                    <div className="relative">
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
                    {search &&
                      peoples.map((people) => (
                        <button
                          key={people.id}
                          onClick={() => {
                            setMention([
                              ...mention,
                              {
                                _id: people.id.toString(),
                                username: people.username,
                                profileImg: people.avatar,
                              },
                            ]);
                            formik.setFieldValue("mention", [
                              ...formik.values.mention,
                              people.id.toString(),
                            ]);
                            setSearch("");
                            setOpenMention(false);
                          }}
                          className="w-full flex items-center justify-between p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 group"
                        >
                          <div className="flex items-center">
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
                          </div>
                        </button>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          <button
            type="submit"
            className="rounded-lg border border-solid bg-gradient-to-r from-red-500 to-pink-600 bg-no-repeat bg-cover bg-center text-white text-sm font-bold px-7 py-2 tracking-wider transition-transform duration-80 ease-in active:scale-95 focus:outline-none"
          >
            Post
          </button>
        </div>
      </form>
      {/* feed data */}
      {posts.length > 0 &&
        posts.map((post) => <SingleFeed post={post} key={post._id} />)}
    </>
  );
}
