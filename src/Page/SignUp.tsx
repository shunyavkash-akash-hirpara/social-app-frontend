import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { FormikProps, useFormik } from "formik";
import InputComponent from "../Component/InputComponent";
import useApi from "../hooks/useApi";
import { APIS } from "../api/apiList";
import { useSnack } from "../hooks/store/useSnack";
import { useNavigate } from "react-router-dom";

interface MyFormikValue {
  name: string;
  username: string;
  email: string;
  password: string;
}

export default function SignUp(): React.JSX.Element {
  const [serverError, setServerError] = useState<boolean>(false);
  const [serverErrorMessage, setserverErrorMessage] = useState<string>("");
  const { apiCall, checkAxiosError } = useApi();
  const { setSnack } = useSnack();
  const navigate = useNavigate();
  // schema for yup validation
  const schema = yup.object().shape({
    name: yup.string().required(),
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required().min(6),
  });

  const formik: FormikProps<MyFormikValue> = useFormik<MyFormikValue>({
    validationSchema: schema,
    initialValues: { name: "", username: "", email: "", password: "" },
    onSubmit: async (values) => {
      try {
        const res = await apiCall({
          url: APIS.AUTHENTICATION.SIGNUP,
          method: "post",
          data: JSON.stringify(values, null, 2),
        });
        if (res.status === 201) {
          // const { username, name, email, role, accessToken, _id } =
          //   res.data.data;
          // login({
          //   user: { username, name, email, role },
          //   accessToken: accessToken,
          //   userId: _id,
          // });
          setSnack(res.data.message);
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

  // username change per debounce call
  useEffect(() => {
    if (!formik.values.username) {
      return;
    }
    const getData = setTimeout(async () => {
      try {
        const result = await apiCall({
          url: APIS.USER.CHECKUSERNAME,
          method: "get",
          params: { username: formik.values.username },
        });
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
  }, [apiCall, formik.values.username]);
  return (
    <div className="absolute top-0 h-full transition-all duration-600 ease-in-out left-0 w-1/2 transform translate-x-full opacity-100 z-5 animate-show">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white flex items-center justify-center flex-col px-10 h-full text-center"
      >
        <h1 className="font-bold m-0">Create Account</h1>
        <div className="social-container my-5">
          <a
            href="#"
            className="text-gray-700 text-base no-underline my-4 border border-gray-300 rounded-full inline-flex justify-center items-center m-1 h-10 w-10"
          >
            <img
              height={20}
              width={20}
              src="/public/icons/facebook-svgrepo-com.svg"
            />
          </a>
          <a
            href="#"
            className="text-gray-700 text-base no-underline my-4 border border-gray-300 rounded-full inline-flex justify-center items-center m-1 h-10 w-10"
          >
            <img
              height={20}
              width={20}
              src="/public/icons/google-svgrepo-com.svg"
            />
          </a>
        </div>
        <span className="text-xs">or use your email for registration</span>
        <InputComponent<MyFormikValue>
          name="name"
          type="text"
          placeholder="Name"
          formik={formik}
          inputStyle="bg-white my-2"
        />
        <InputComponent<MyFormikValue>
          name="username"
          type="text"
          placeholder="username"
          formik={formik}
          inputStyle="bg-white my-2"
          serverError={serverError}
          serverErrorMessage={serverErrorMessage}
        />
        <InputComponent<MyFormikValue>
          name="email"
          type="email"
          placeholder="Email"
          formik={formik}
          inputStyle="bg-white my-2"
        />
        <InputComponent<MyFormikValue>
          name="password"
          type="password"
          placeholder="Password"
          formik={formik}
          inputStyle="bg-white my-2"
        />
        <div className="flex relative mt-2">
          <button
            type="submit"
            className="rounded-lg border border-solid bg-gradient-to-r from-red-500 to-pink-600 bg-no-repeat bg-cover bg-center text-white text-xs font-bold uppercase px-12 py-3 tracking-wider transition-transform duration-80 ease-in active:scale-95 focus:outline-none"
          >
            Sign Up
          </button>
          {/* <a href="#" className="flex p-2 absolute left-[115%]">
            skip
            <img
              height={30}
              width={30}
              src="/public/icons/right-arrow-svgrepo-com.svg"
              className="px-2"
            />
          </a> */}
        </div>
      </form>
    </div>
  );
}
