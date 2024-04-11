import React, { useCallback, useEffect, useState } from "react";
import * as yup from "yup";
import { useAuth } from "../hooks/store/useAuth";
import InputComponent from "../Component/InputComponent";
import useApi from "../hooks/useApi";
import { useSnack } from "../hooks/store/useSnack";
import { useNavigate } from "react-router-dom";
import { FormikProps, useFormik } from "formik";
import { APIS } from "../api/apiList";
import BackIcon from "../Component/icons/BackIcon";
import dayjs from "dayjs";

interface MyFormikValues {
  name: string;
  username: string;
  email: string;
  dob: string;
  bio: string;
  profileImg: File | string;
}

interface user {
  _id: string;
  username: string;
  name: string;
  profileImg: string;
  bio: string;
  email: string;
  dob: string;
}

export default function AccountDetail(): React.JSX.Element {
  const [user, setUser] = useState<user>({
    _id: "",
    username: "",
    name: "",
    profileImg: "",
    bio: "",
    email: "",
    dob: "",
  });
  const [serverError, setServerError] = useState<boolean>(false);
  const [serverErrorMessage, setserverErrorMessage] = useState<string>("");
  const { userId, setUserDatail } = useAuth();
  const { apiCall, checkAxiosError } = useApi();
  const { setSnack } = useSnack();
  const navigate = useNavigate();
  // schema for yup validation
  const schema = yup.object().shape({
    name: yup.string().required(),
    username: yup.string().required(),
    dob: yup.string(),
    email: yup.string().email().required(),
    profileImg: yup.string(),
  });

  const formik: FormikProps<MyFormikValues> = useFormik<MyFormikValues>({
    validationSchema: schema,
    initialValues: {
      name: user.name,
      username: user.username,
      dob: dayjs(user.dob || new Date()).format("YYYY-MM-DD"),
      email: user.email,
      bio: user.bio,
      profileImg: user.profileImg,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      if (serverError) return;
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (value) {
          formData.append(key, value);
        }
      });
      try {
        const res = await apiCall({
          url: APIS.USER.PATCH(userId),
          method: "patch",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: formData,
        });
        if (res.status === 200) {
          setUserDatail(res.data.data.username, res.data.data.profileImg);
          setSnack(res.data.message);
          // navigate("/account-information");
        }
      } catch (error) {
        if (checkAxiosError(error)) {
          const errorMessage = error?.response?.data.message;
          setSnack(errorMessage, "warning");
        }
      }
    },
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getProfileDetail = useCallback(async () => {
    try {
      const res = await apiCall({
        url: APIS.USER.GET(userId),
        method: "get",
      });
      if (res.status === 200) {
        setUser(res.data.data);
        setSnack(res.data.message);
      }
    } catch (error) {
      if (checkAxiosError(error)) {
        const errorMessage = error?.response?.data.message;
        setSnack(errorMessage, "warning");
      }
    }
  }, [apiCall, checkAxiosError, setSnack, userId]);

  useEffect(() => {
    if (!userId) return;
    getProfileDetail();
  }, [getProfileDetail, userId]);

  // username change per debounce call
  useEffect(() => {
    if (!formik.values.username || formik.values.username === user.username) {
      return;
    }
    const getData = setTimeout(async () => {
      try {
        const result = await apiCall({
          url: APIS.USER.CHECKUSERNAME,
          method: "get",
          params: { username: formik.values.username },
        });
        console.log(result.data);
        if (result.data.data.username) return setServerError(false);
        else {
          setServerError(true);
          return setserverErrorMessage("This username is not available.");
        }
      } catch (error) {
        setServerError(false);
        return setserverErrorMessage("");
      }
    }, 2000);

    return () => clearTimeout(getData);
  }, [apiCall, formik.values.username, user.username]);

  return (
    <>
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
                  typeof formik.values.profileImg === "string"
                    ? formik.values.profileImg // Use the provided URL if it's already a string
                    : URL.createObjectURL(formik.values.profileImg) // Create a URL for the File object
                }
                alt="profile"
              />
              <h3 className="text-lg font-bold text-gray-600">{user.name}</h3>
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
                  serverError={serverError}
                  serverErrorMessage={serverErrorMessage}
                />
                <InputComponent<MyFormikValues>
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  formik={formik}
                  inputStyle="bg-white my-2"
                  disabled={true}
                />
                <InputComponent<MyFormikValues>
                  label="Date of Birth"
                  name="dob"
                  type="date"
                  placeholder="Date of Birth"
                  formik={formik}
                  inputStyle="bg-white color-black my-2"
                />
              </div>
              <div className="my-6 mx-12">
                <input
                  type="file"
                  id="profile-upload"
                  name="profileImg"
                  className="hidden"
                  accept=".jpg,.jpeg,.png"
                  onChange={(e) => {
                    const file =
                      e.currentTarget.files && e.currentTarget.files[0];
                    if (file) {
                      formik.setFieldValue("profileImg", file);
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
    </>
  );
}
