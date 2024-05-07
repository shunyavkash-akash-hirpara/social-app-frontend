import React from "react";
import { FormikProps, useFormik } from "formik";
import * as yup from "yup";
import InputComponent from "../Component/InputComponent";
import useApi from "../hooks/useApi";
import { useSnack } from "../hooks/store/useSnack";
import { useNavigate } from "react-router-dom";
import { APIS } from "../api/apiList";
import { useAuth } from "../hooks/store/useAuth";
import { socket } from "../socket";
import { useSocket } from "../hooks/store/useSocket";
import FacebookIcon from "../Component/icons/FacebookIcon";
import GoogleIcon from "../Component/icons/GoogleIcon";

interface MyFormikValues {
  email: string;
  password: string;
}

export default function SignIn(): React.JSX.Element {
  const { apiCall, checkAxiosError, isLoading } = useApi();
  const { setSnack } = useSnack();
  const navigate = useNavigate();
  const { login, isLoggedIn } = useAuth();
  const { socketConnection } = useSocket();
  // schema for yup validation
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required().min(6),
  });

  const formik: FormikProps<MyFormikValues> = useFormik<MyFormikValues>({
    validationSchema: schema,
    initialValues: { email: "", password: "" },
    onSubmit: async (values) => {
      try {
        const res = await apiCall({
          url: APIS.AUTHENTICATION.SIGNIN,
          method: "post",
          data: JSON.stringify(values, null, 2),
        });
        if (res.status === 200) {
          const { username, name, email, role, profileImg, mobileNumber, accessToken, _id } = res.data.data;
          login({
            user: { username, name, email, role, mobileNumber, profileImg },
            accessToken: accessToken,
            userId: _id,
            isLoggedIn: true,
          });
          if (isLoggedIn && socketConnection) {
            socket.emit("joinRoom", { user: _id });
          }
          setSnack(res.data.message);
          navigate("/");
        }
        socket.on("disconnect", () => {});
      } catch (error) {
        if (checkAxiosError(error)) {
          const errorMessage = error?.response?.data.message;
          setSnack(errorMessage, "warning");
        }
      }
    },
  });
  return (
    <div className="absolute top-0 h-full transition-all duration-600 ease-in-out left-0 w-1/2 z-2">
      <form onSubmit={formik.handleSubmit} className="bg-white flex items-center justify-center flex-col px-10 h-full text-center">
        <h1 className="font-bold m-0 text-gray-700">Sign in</h1>
        <div className="my-5">
          <a href="#" className="text-gray-700 text-base no-underline my-4 border border-gray-300 rounded-full inline-flex justify-center items-center m-1 h-10 w-10">
            <FacebookIcon className="w-5 h-5 text-gray-800" />
          </a>
          <a href="#" className="text-gray-700 text-base no-underline my-4 border border-gray-300 rounded-full inline-flex justify-center items-center m-1 h-10 w-10">
            <GoogleIcon className="w-5 h-5 text-gray-800" />
          </a>
        </div>
        <span className="text-xs">or use your account</span>
        <InputComponent<MyFormikValues> name="email" type="email" placeholder="Email" formik={formik} inputStyle="bg-white my-2" />
        <InputComponent<MyFormikValues> name="password" type="password" placeholder="Password" formik={formik} inputStyle="bg-white my-2" />
        <a href="#" className="text-gray-700 text-base no-underline my-4">
          Forgot your password?
        </a>
        <div className="flex relative">
          <button
            type="submit"
            disabled={isLoading}
            className={`${
              isLoading && "cursor-not-allowed"
            }flex rounded-lg border border-solid bg-gradient-to-r from-red-500 to-pink-600 bg-no-repeat bg-cover bg-center text-white text-xs font-bold uppercase px-12 py-3 tracking-wider transition-transform duration-80 ease-in active:scale-95 focus:outline-none`}
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}
