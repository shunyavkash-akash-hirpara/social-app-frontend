import React, { useState } from "react";
import { useFormik } from "formik";
import InputComponent from "../Component/InputComponent";

type Props = {};

interface MyFormValues {
  email: string;
  password: string;
}

export default function SignIn({}: Props) {
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      console.log(values);
    },
  });
  // const handleOnSubmit = (evt: any) => {
  //   evt.preventDefault();

  //   const { email, password } = state;
  //   alert(`You are login with email: ${email} and password: ${password}`);

  //   for (const key in state) {
  //     setState({
  //       ...state,
  //       [key]: "",
  //     });
  //   }
  // };
  return (
    <div className="absolute top-0 h-full transition-all duration-600 ease-in-out absolute left-0 w-1/2 z-2">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white flex items-center justify-center flex-col px-10 h-full text-center"
      >
        <h1 className="font-bold m-0">Sign in</h1>
        <div className="my-5">
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
        <span className="text-xs">or use your account</span>
        <InputComponent
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          formik={formik}
        />
        <InputComponent
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          formik={formik}
        />
        {/* <input
          className="bg-gray-200 border-0 py-3 px-4 my-2 w-full"
          type="email"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <input
          className="bg-gray-200 border-0 py-3 px-4 my-2 w-full"
          type="password"
          name="password"
          placeholder="Password"
          value={state.password}
          onChange={handleChange}
        /> */}
        <a href="#" className="text-gray-700 text-base no-underline my-4">
          Forgot your password?
        </a>
        <button
          type="submit"
          className="rounded-lg border border-solid bg-gradient-to-r from-red-500 to-pink-600 bg-no-repeat bg-cover bg-center text-white text-xs font-bold uppercase px-12 py-3 tracking-wider transition-transform duration-80 ease-in active:scale-95 focus:outline-none"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
