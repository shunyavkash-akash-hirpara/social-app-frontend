import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import InputComponent from "../Component/InputComponent";

type Props = {};

interface MyFormValues {
  email: string;
  password: string;
}

export default function SignIn({}: Props) {
  // schema for yup validation
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required().min(6),
  });

  // method to trigger validation and return the error message
  const validateFormData = async (formData: any) => {
    console.log(formData);
    const errors = await schema.validate(formData);

    if (errors) {
      console.log(errors);
      return errors;
    } else {
      return undefined;
    }
  };

  const formik = useFormik({
    validationSchema: schema,
    initialValues: { email: "", password: "" },
    onSubmit: (values) => {
      validateFormData(values);
      alert(JSON.stringify(values, null, 2));
      console.log(values);
    },
  });
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
        <a href="#" className="text-gray-700 text-base no-underline my-4">
          Forgot your password?
        </a>
        <div className="flex relative">
          <button
            type="submit"
            className="flex rounded-lg border border-solid bg-gradient-to-r from-red-500 to-pink-600 bg-no-repeat bg-cover bg-center text-white text-xs font-bold uppercase px-12 py-3 tracking-wider transition-transform duration-80 ease-in active:scale-95 focus:outline-none"
          >
            Sign In
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
