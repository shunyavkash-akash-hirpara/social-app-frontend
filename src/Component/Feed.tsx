import React from "react";
import * as yup from "yup";
import { FormikProps, useFormik } from "formik";
import InputComponent from "../Component/InputComponent";
import useApi from "../hooks/useApi";
import { APIS } from "../api/apiList";
import { useSnack } from "../hooks/store/useSnack";
import { useNavigate } from "react-router-dom";

interface MyFormikValue {
  description: string;
  photos: string[];
  feeling: string;
}

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
  {
    id: 4,
    name: "Tom Cook",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    location: "Chennai,India",
  },
  {
    id: 5,
    name: "Tanya Fox",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    location: "Delhi,India",
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis possimus culpa tempore. Repellat recusandae quisquam deserunt quam voluptates rerum officiis harum necessitatibus corrupti voluptate delectus exercitationem modi eum cupiditate, sint ducimus quasi dignissimos molestiae?",
  },
  {
    id: 6,
    name: "Hellen Schmidt",
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    location: "Jammu,India",
  },
];

export default function Feed(): React.JSX.Element {
  const { apiCall, checkAxiosError } = useApi();
  const { setSnack } = useSnack();
  const navigate = useNavigate();
  // schema for yup validation
  const schema = yup.object().shape({
    description: yup.string(),
    photos: yup.string(),
    feeling: yup.string(),
  });

  const formik: FormikProps<MyFormikValue> = useFormik<MyFormikValue>({
    validationSchema: schema,
    initialValues: { description: "", photos: [], feeling: "" },
    onSubmit: async (values) => {
      try {
        const res = await apiCall({
          url: APIS.AUTHENTICATION.SIGNUP,
          method: "post",
          data: JSON.stringify(values, null, 2),
        });
        if (res.status === 200) {
          setSnack(res.data.message);
          navigate("/feed");
        }
      } catch (error) {
        if (checkAxiosError(error)) {
          const errorMessage = error?.response?.data.message;
          setSnack(errorMessage, "warning");
        }
      }
    },
  });
  return (
    <>
      {/* post create input */}
      <div className="w-full bg-white rounded-xl mb-5 p-4">
        <div className="flex items-center pb-3">
          <img
            className="w-10 h-10 rounded-full mr-3"
            src="https://plm-staging.s3.amazonaws.com/profiles/65264e33d2ac619310e6687a?v=27"
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
        <div className="flex items-center justify-between">
          <button className="flex flex-row items-center">
            <img
              width={25}
              src="/public/icons/video-svgrepo-com.svg"
              alt="live video"
            />
            <span className="text-gray-500 ml-1 text-sm">Live video</span>
          </button>
          <button className="flex flex-row items-center">
            <img
              width={25}
              src="/public/icons/photo-svgrepo-com.svg"
              alt="photos"
            />
            <span className="text-gray-500 ml-1 text-sm">Photos</span>
          </button>
          <button className="flex flex-row items-center">
            <img
              width={25}
              src="/public/icons/emoji-smile-svgrepo-com.svg"
              alt="feeling"
            />
            <span className="text-gray-500 ml-1 text-sm">Feeling</span>
          </button>
          <button className="rounded-lg border border-solid bg-gradient-to-r from-red-500 to-pink-600 bg-no-repeat bg-cover bg-center text-white text-sm font-bold px-7 py-2 tracking-wider transition-transform duration-80 ease-in active:scale-95 focus:outline-none">
            Post
          </button>
        </div>
      </div>
      {/* feed data */}
      {peoples.map((item) => (
        <div className="w-full bg-white rounded-xl mb-5 p-4">
          <div className="flex items-center">
            <img
              className="w-10 h-10 rounded-full"
              src={item.avatar}
              alt="Rounded avatar"
            />
            <div className="flex flex-col text-justify">
              <span className="ms-3 text-sm text-gray-600 font-bold">
                {item.name}
              </span>
              <span className="ms-3 text-sm text-gray-400">
                {item.location}
              </span>
            </div>
          </div>
          {item.description && (
            <div className="mt-2 w-full">
              <p className="text-start text-sm text-gray-700">
                {item.description}
              </p>
            </div>
          )}

          <img
            className="my-3 mx-[auto] rounded-xl h-[409px] object-cover"
            src={item.avatar}
            alt="photo"
          />

          <div className="flex items-center justify-between">
            <div className="flex -space-x-3 rtl:space-x-reverse">
              {peoples.slice(0, 3).map((people) => (
                <img
                  className="w-8 h-8 border-2 border-white rounded-full"
                  src={people.avatar}
                  alt=""
                />
              ))}

              <a
                className="flex items-center justify-center w-8 h-8 text-xs font-medium text-white bg-pink-700 border-2 border-white rounded-full hover:bg-pink-600"
                href="#"
              >
                +{peoples.length - 3}
              </a>
            </div>
            <div>
              <span className="text-gray-500 text-sm mr-6 cursor-pointer">
                13 Comments
              </span>
              <span className="text-gray-500 ml-1 text-sm cursor-pointer">
                340 Likes
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between border-t-2 border-gray-200 mt-3 pt-3">
            <button className="flex flex-row items-center">
              <img
                width={25}
                src="/public/icons/heart-alt-svgrepo-com.svg"
                alt="like"
              />
              <span className="text-gray-500 ml-1 text-sm">Like</span>
            </button>
            <button className="flex flex-row items-center">
              <img
                width={25}
                src="/public/icons/comment-1-svgrepo-com.svg"
                alt="comment"
              />
              <span className="text-gray-500 ml-1 text-sm">Comments</span>
            </button>
            <button className="flex flex-row items-center">
              <img
                width={25}
                src="/public/icons/share-arrow-svgrepo-com.svg"
                alt="share"
              />
              <span className="text-gray-500 ml-1 text-sm">Share</span>
            </button>
          </div>
          <div className="flex items-center justify-between border-t-2 border-gray-200 mt-3 pt-3">
            <img
              className="w-11 h-11 rounded-full"
              src="https://plm-staging.s3.amazonaws.com/profiles/65264e33d2ac619310e6687a?v=27"
              alt="Rounded avatar"
            />
            <InputComponent
              name="description"
              type="text"
              placeholder="Write a comment..."
              formik={formik}
              inputStyle="w-[432px] bg-input-primary border-none my-0 text-sm"
            />
            <div className="bg-[#f48bb34c] py-1 pl-1 pr-2 rounded-xl">
              <img
                className="transform rotate-[30deg]"
                width={35}
                src="/public/icons/share-1-svgrepo-com.svg"
                alt="enter"
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
