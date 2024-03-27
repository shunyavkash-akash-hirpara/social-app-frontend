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
                  <svg
                    className="w-6 h-6 p-1"
                    fill="#ffffff"
                    height="800px"
                    width="800px"
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 31.143 31.143"
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0" />

                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />

                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <g>
                        {" "}
                        <g id="c100_arrow">
                          {" "}
                          <path d="M0,15.571c0.001,1.702,1.383,3.081,3.085,3.083l17.528-0.002l-4.738,4.739c-1.283,1.284-1.349,3.301-0.145,4.507 c1.205,1.201,3.222,1.138,4.507-0.146l9.896-9.898c1.287-1.283,1.352-3.301,0.146-4.506c-0.033-0.029-0.068-0.051-0.1-0.08 c-0.041-0.043-0.07-0.094-0.113-0.139l-9.764-9.762c-1.268-1.266-3.27-1.316-4.474-0.111c-1.205,1.205-1.153,3.208,0.111,4.476 l4.755,4.754H3.085C1.381,12.485,0,13.865,0,15.571z" />{" "}
                        </g>{" "}
                        <g id="Capa_1_46_"> </g>{" "}
                      </g>{" "}
                    </g>
                  </svg>
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
