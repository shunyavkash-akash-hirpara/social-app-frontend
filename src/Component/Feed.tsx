import React from "react";
import * as yup from "yup";
import { FormikProps, useFormik } from "formik";
import InputEmoji from "react-input-emoji";
import InputComponent from "../Component/InputComponent";
import useApi from "../hooks/useApi";
import { APIS } from "../api/apiList";
import { useSnack } from "../hooks/store/useSnack";
import { useNavigate } from "react-router-dom";
import SingleFeed from "./SingleFeed";

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
  function handleOnEnter(text: string) {
    formik.setFieldValue("description", text);
  }

  return (
    <>
      {/* post create input */}
      <div className="w-full bg-white rounded-xl mb-6 p-4">
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
          <label
            htmlFor="post-input-file"
            className="flex flex-row items-center cursor-pointer"
          >
            <input type="file" id="post-input-file" className="hidden" />
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
          <button className="rounded-lg border border-solid bg-gradient-to-r from-red-500 to-pink-600 bg-no-repeat bg-cover bg-center text-white text-sm font-bold px-7 py-2 tracking-wider transition-transform duration-80 ease-in active:scale-95 focus:outline-none">
            Post
          </button>
        </div>
      </div>
      {/* feed data */}
      {peoples.map((item) => (
        <SingleFeed item={item} peoples={peoples} key={item.id} />
      ))}
    </>
  );
}
