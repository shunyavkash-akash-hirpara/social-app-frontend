import React, {
  LegacyRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
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
import PictureIcon from "./icons/PictureIcon";
import VideoIcon from "./icons/VideoIcon";

interface FileType {
  element: Blob;
  type: "image" | "video";
}

interface MyFormikValue {
  description: string;
  file: FileType[];
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
  isLike: boolean;
}
[];
interface user {
  _id: number;
  name: string;
  username: string;
  profileImg: string;
}
[];

export default function Feed(): React.JSX.Element {
  const [openMention, setOpenMention] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [mention, setMention] = useState<mention[]>([]);
  const [posts, setPosts] = useState<posts[]>([]);
  const [users, setUsers] = useState<user[]>([]);
  const [currPage, setCurrPage] = useState<number>(0);
  const [nextPage, setNextPage] = useState<boolean>(false);
  const [mute, setMute] = useState<boolean>(true);
  const { apiCall, checkAxiosError } = useApi();
  const { user } = useAuth();
  const { setSnack } = useSnack();
  const navigate = useNavigate();
  const listInnerRef: LegacyRef<HTMLDivElement> = useRef(null);
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
        const { file } = value;
        if (!file || !file.length) {
          return this.createError({
            path: "description",
            message: "Photos is required",
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
            value.forEach((element: { element: Blob; type: string }) => {
              formData.append(key, element.element);
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
    if (nextPage || currPage === 0) {
      try {
        const res = await apiCall({
          url: APIS.POST.ALLPOST,
          method: "get",
          params: { limit: 20, page: currPage },
        });
        if (res.status === 200) {
          if (currPage === 0) {
            setPosts(res.data.data.post);
          } else {
            setPosts((prevPosts) => [...prevPosts, ...res.data.data.post]);
          }
          setNextPage(res.data.data.hasNextPage);
          setSnack(res.data.message);
        }
      } catch (error) {
        if (checkAxiosError(error)) {
          const errorMessage = error?.response?.data.message;
          setSnack(errorMessage, "warning");
        }
      }
    }
  }, [apiCall, checkAxiosError, currPage, nextPage, setSnack]);

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight === scrollHeight && nextPage) {
        setCurrPage(currPage + 1);
      }
    }
  };

  useEffect(() => {
    getPosts();
  }, [getPosts]);

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
    if (!search) return setUsers([]); // Exit early if search is falsy
    searchUser(search);
  }, [search, searchUser]);

  return (
    <>
      <div
        onScroll={onScroll}
        ref={listInnerRef}
        id="feedScroll"
        className="feed-scroll w-[580px] mr-6 overflow-y-auto"
      >
        {/* post create input */}
        <form
          onSubmit={formik.handleSubmit}
          className="w-full bg-white rounded-xl mb-6 p-4"
        >
          <div className="flex items-center pb-3 relative">
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
            <div className="absolute right-1">
              <InputEmoji
                value={formik.values.description}
                onChange={handleOnEnter}
                cleanOnEnter
                keepOpened
              ></InputEmoji>
            </div>
          </div>
          {formik.values.file.length > 0 && (
            <div className="relative grid grid-cols-4">
              {formik.values.file?.map((media, index) => (
                <>
                  {media?.type === "video" ? (
                    <video
                      className="rounded-lg h-32 mx-1 bg-cover w-32 object-contain"
                      src={URL.createObjectURL(media.element)}
                      key={index}
                    ></video>
                  ) : (
                    <img
                      className="rounded-lg h-32 mx-1 bg-cover w-32 object-contain"
                      src={
                        URL.createObjectURL(media.element) // Create a URL for the File object
                      }
                      alt="photos"
                      key={index}
                    />
                  )}
                </>
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
              <VideoIcon className="w-[30px] h-full text-[#80838a]" />
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
                      const element = new Blob([file[i]], {
                        type: file[i].type,
                      });
                      arr.push({ element, type: file[i].type.split("/")[0] });
                    }
                    formik.setFieldValue("file", arr);
                  }
                }}
              />
              <PictureIcon className="text-[#80838a] w-[30px] h-full" />
              <span className="text-gray-500 ml-1 text-sm">Photos</span>
            </label>
            {/* <div className="flex items-center">
            <InputEmoji
              value={formik.values.description}
              onChange={handleOnEnter}
              cleanOnEnter
              keepOpened
            ></InputEmoji>
            <button className="flex flex-row items-center">
              <span className="text-gray-500 ml-1 text-sm">Feeling</span>
            </button>
          </div> */}
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
                        users.map((people) => (
                          <button
                            key={people._id}
                            onClick={() => {
                              setMention([
                                ...mention,
                                {
                                  _id: people._id.toString(),
                                  username: people.username,
                                  profileImg: people.profileImg,
                                },
                              ]);
                              formik.setFieldValue("mention", [
                                ...formik.values.mention,
                                people._id.toString(),
                              ]);
                              setSearch("");
                              setOpenMention(false);
                            }}
                            className="w-full flex items-center justify-between p-2 text-gray-900 transition duration-75 rounded-lg hover:bg-gray-100 group"
                          >
                            <div className="flex items-center">
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
        <div>
          {posts.length > 0 &&
            posts.map((post) => (
              <SingleFeed
                post={post}
                key={post._id}
                activeFeed={1}
                setMute={setMute}
                mute={mute}
              />
            ))}
        </div>
      </div>
    </>
  );
}
