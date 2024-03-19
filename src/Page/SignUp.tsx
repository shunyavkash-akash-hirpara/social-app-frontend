import React, { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import InputComponent from "../Component/InputComponent";

type Props = {};

export default function SignUp({}: Props) {
  // schema for yup validation
  const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required().min(6),
  });

  const formik = useFormik({
    validationSchema: schema,
    initialValues: { name: "", email: "", password: "" },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      console.log(values);
    },
  });
  return (
    <div className="absolute top-0 h-full transition-all duration-600 ease-in-out absolute left-0 w-1/2 opacity-0 transform translate-x-full opacity-100 z-5 animate-show">
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
        <InputComponent
          name="name"
          type="text"
          placeholder="Name"
          formik={formik}
        />
        <InputComponent
          name="email"
          type="email"
          placeholder="Email"
          formik={formik}
        />
        <InputComponent
          name="password"
          type="password"
          placeholder="Password"
          formik={formik}
        />
        <div className="flex relative mt-2">
          <button className="rounded-lg border border-solid bg-gradient-to-r from-red-500 to-pink-600 bg-no-repeat bg-cover bg-center text-white text-xs font-bold uppercase px-12 py-3 tracking-wider transition-transform duration-80 ease-in active:scale-95 focus:outline-none">
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
