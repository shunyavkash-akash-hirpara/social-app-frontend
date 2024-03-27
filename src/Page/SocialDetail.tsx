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
  const { accessToken } = useAuth();
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

      <main className="fixed w-[848px] top-[80px] left-[280px] right-[344px] mx-[auto] rounded-xl">
        <div className="w-full mx-[auto] overflow-y-auto p-6 pt-0">
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
      <RecentChat />
    </>
  );
}
