import React from "react";
import * as yup from "yup";
import { useAuth } from "../hooks/store/useAuth";
import Header from "../Component/Header";
import Sidebar from "../Component/Sidebar";
import RecentChat from "../Component/RecentChat";
import InputComponent from "../Component/InputComponent";
import useApi from "../hooks/useApi";
import { useSnack } from "../hooks/store/useSnack";
import { useNavigate } from "react-router-dom";
import { FormikProps, useFormik } from "formik";
import { APIS } from "../api/apiList";
import BackIcon from "../Component/icons/BackIcon";

interface MyFormikValues {
  name: string;
  username: string;
  email: string;
  dob: string;
  bio: string;
  profile_img: File | string;
}

export default function AccountDetail(): React.JSX.Element {
  const { accessToken } = useAuth();
  const { apiCall, checkAxiosError } = useApi();
  const { setSnack } = useSnack();
  const navigate = useNavigate();
  // schema for yup validation
  const schema = yup.object().shape({
    name: yup.string().required(),
    username: yup.string().required(),
    dob: yup.string(),
    email: yup.string().email().required(),
    profile_img: yup.string(),
  });

  const formik: FormikProps<MyFormikValues> = useFormik<MyFormikValues>({
    validationSchema: schema,
    initialValues: {
      name: "",
      username: "",
      dob: "",
      email: "",
      bio: "",
      profile_img: "",
    },
    onSubmit: async (values) => {
      console.log(values);
      try {
        const res = await apiCall({
          url: APIS.AUTHENTICATION.SIGNIN,
          method: "post",
          data: JSON.stringify(values, null, 2),
        });
        if (res.status === 200) {
          setSnack(res.data.message);
          navigate("/account-information");
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
      <Header accessToken={accessToken} />
      <Sidebar />

      <main className="fixed w-[848px] top-[80px] left-[280px] right-[344px] mx-[auto] rounded-xl flex h-calc-screen-minus-nav">
        <div className="feed-scroll w-full mx-[auto] overflow-y-auto p-6 pt-0">
          <div className="bg-white rounded-xl">
            <div className="w-full h-14 p-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-600 bg-no-repeat bg-cover bg-center">
              <div className="h-full flex items-center justify-start">
                <button
                  className="w-8 mr-3 h-full place-content-center rotate-[180deg]"
                  onClick={() => navigate("/setting")}
                >
                  <BackIcon />
                </button>
                <span className="text-lg font-bold text-white">
                  Account Details
                </span>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center mt-4">
              <img
                className="rounded-lg h-40 m-3 bg-cover"
                src={
                  formik.values.profile_img
                    ? typeof formik.values.profile_img === "string"
                      ? formik.values.profile_img // Use the provided URL if it's already a string
                      : URL.createObjectURL(formik.values.profile_img) // Create a URL for the File object
                    : "https://uko-react.vercel.app/static/avatar/001-man.svg"
                }
                alt="profile"
              />
              <h3 className="text-lg font-bold text-gray-700">Wade Cooper</h3>
            </div>
            <form action="#" className="p-6" onSubmit={formik.handleSubmit}>
              <div className="grid grid-cols-2 gap-y-2">
                <InputComponent<MyFormikValues>
                  label="Name"
                  name="name"
                  type="text"
                  placeholder="Name"
                  formik={formik}
                  inputStyle="bg-white my-2"
                />
                <InputComponent<MyFormikValues>
                  label="Username"
                  name="username"
                  type="text"
                  placeholder="Username"
                  formik={formik}
                  inputStyle="bg-white my-2"
                />
                <InputComponent<MyFormikValues>
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  formik={formik}
                  inputStyle="bg-white my-2"
                />
                <InputComponent<MyFormikValues>
                  label="Date of Birth"
                  name="dob"
                  type="date"
                  placeholder="Date of Birth"
                  formik={formik}
                  inputStyle="bg-white my-2"
                />
              </div>
              <div className="my-6 mx-12">
                <input
                  type="file"
                  id="profile-upload"
                  name="profile_img"
                  className="hidden"
                  onChange={(e) => {
                    const file =
                      e.currentTarget.files && e.currentTarget.files[0];
                    if (file) {
                      formik.setFieldValue("profile_img", file);
                    }
                  }}
                />
                <label
                  htmlFor="profile-upload"
                  className="h-40 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer"
                >
                  <img
                    className="w-10 h-10 mb-3"
                    src="/public/icons/cloud-down-svgrepo-com.svg"
                    alt="upload"
                  />
                  <span className="text-gray-600 font-bold text-sm">
                    Upload your profile image
                  </span>
                </label>
              </div>
              <div className="mx-12 mb-6 place-content-start">
                <InputComponent<MyFormikValues>
                  label="Description"
                  name="bio"
                  type="text"
                  placeholder="Description"
                  formik={formik}
                  inputStyle="bg-white my-2 w-full"
                  labelStyle="w-full"
                />
              </div>
              <button
                type="submit"
                className="flex rounded-lg border border-solid bg-gradient-to-r from-red-500 to-pink-600 bg-no-repeat bg-cover bg-center text-white text-xs font-bold uppercase mx-12 px-12 py-3 tracking-wider transition-transform duration-80 ease-in active:scale-95 focus:outline-none"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </main>
      <RecentChat />
    </>
  );
}
