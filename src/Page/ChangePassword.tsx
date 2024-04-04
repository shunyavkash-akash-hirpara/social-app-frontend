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
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function ChangePassword(): React.JSX.Element {
  const { accessToken } = useAuth();
  const { apiCall, checkAxiosError } = useApi();
  const { setSnack } = useSnack();
  const navigate = useNavigate();
  // schema for yup validation
  const schema = yup.object().shape({
    currentPassword: yup.string().required(),
    newPassword: yup
      .string()
      .required("Password is required.")
      .trim()
      .min(8)
      .max(20, "Password must be at most 20 letter."),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("newPassword"), ""], "Passwords must match")
      .required(),
  });

  const formik: FormikProps<MyFormikValues> = useFormik<MyFormikValues>({
    validationSchema: schema,
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    onSubmit: async (values) => {
      console.log(values);
      try {
        const res = await apiCall({
          url: APIS.USER.CHANGEPASSWORD,
          method: "patch",
          data: {
            oldPassword: values.currentPassword,
            newPassword: values.newPassword,
          },
        });
        if (res.status === 200) {
          formik.handleReset();
          setSnack(res.data.message);
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

      <main className="fixed w-[848px] top-[80px] left-[280px] right-[344px] mx-[auto] rounded-xl">
        <div className="w-full mx-[auto] overflow-y-auto p-6 pt-0">
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
                  Change Password
                </span>
              </div>
            </div>
            <form action="#" className="p-6" onSubmit={formik.handleSubmit}>
              <div className="mb-3 mx-12">
                <InputComponent<MyFormikValues>
                  label="Current Password"
                  name="currentPassword"
                  type="password"
                  placeholder="Current Password"
                  formik={formik}
                  inputStyle="bg-white my-2 w-full"
                  labelStyle="w-full"
                />
                <InputComponent<MyFormikValues>
                  label="Change Password"
                  name="newPassword"
                  type="password"
                  placeholder="New Password"
                  formik={formik}
                  inputStyle="bg-white my-2 w-full"
                  labelStyle="w-full"
                />
                <InputComponent<MyFormikValues>
                  label="Confirm Change Password"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Change Password"
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
