import React from "react";
import * as yup from "yup";
import InputComponent from "../Component/InputComponent";
import useApi from "../hooks/useApi";
import { useSnack } from "../hooks/store/useSnack";
import { useNavigate } from "react-router-dom";
import { FormikProps, useFormik } from "formik";
import { APIS } from "../api/apiList";
import BackIcon from "../Component/icons/BackIcon";

interface MyFormikValues {
  facebook: string;
  twitter: string;
  linkedin: string;
  instagram: string;
  flickr: string;
  github: string;
  skype: string;
  google: string;
}

export default function SocialDetail(): React.JSX.Element {
  const { apiCall, checkAxiosError } = useApi();
  const { setSnack } = useSnack();
  const navigate = useNavigate();
  // schema for yup validation
  const schema = yup.object().shape({
    facebook: yup.string(),
    twitter: yup.string(),
    linkedin: yup.string(),
    instagram: yup.string(),
    flickr: yup.string(),
    github: yup.string(),
    skype: yup.string(),
    google: yup.string(),
  });

  const formik: FormikProps<MyFormikValues> = useFormik<MyFormikValues>({
    validationSchema: schema,
    initialValues: {
      facebook: "",
      twitter: "",
      linkedin: "",
      instagram: "",
      flickr: "",
      github: "",
      skype: "",
      google: "",
    },
    onSubmit: async (values) => {
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
                  Social Network
                </span>
              </div>
            </div>
            <form action="#" className="p-6" onSubmit={formik.handleSubmit}>
              <div className="grid grid-cols-2 gap-y-2 mb-3">
                <InputComponent<MyFormikValues>
                  label="Facebook"
                  name="facebook"
                  type="text"
                  placeholder="Facebook"
                  formik={formik}
                  inputStyle="bg-white my-2"
                />
                <InputComponent<MyFormikValues>
                  label="Twitter"
                  name="twitter"
                  type="text"
                  placeholder="Twitter"
                  formik={formik}
                  inputStyle="bg-white my-2"
                />
                <InputComponent<MyFormikValues>
                  label="Linkedin"
                  name="linkedin"
                  type="text"
                  placeholder="Linkedin"
                  formik={formik}
                  inputStyle="bg-white my-2"
                />
                <InputComponent<MyFormikValues>
                  label="Instagram"
                  name="instagram"
                  type="text"
                  placeholder="Instagram"
                  formik={formik}
                  inputStyle="bg-white my-2"
                />
                <InputComponent<MyFormikValues>
                  label="Flickr"
                  name="flickr"
                  type="text"
                  placeholder="Flickr"
                  formik={formik}
                  inputStyle="bg-white my-2"
                />
                <InputComponent<MyFormikValues>
                  label="Github"
                  name="github"
                  type="text"
                  placeholder="Github"
                  formik={formik}
                  inputStyle="bg-white my-2"
                />
                <InputComponent<MyFormikValues>
                  label="Skype"
                  name="skype"
                  type="text"
                  placeholder="Skype"
                  formik={formik}
                  inputStyle="bg-white my-2"
                />
                <InputComponent<MyFormikValues>
                  label="Google"
                  name="google"
                  type="text"
                  placeholder="Google"
                  formik={formik}
                  inputStyle="bg-white my-2"
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
