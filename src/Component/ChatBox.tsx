import React, { Dispatch, SetStateAction } from "react";
import * as yup from "yup";
import InputComponent from "./InputComponent";
import useApi from "../hooks/useApi";
import { useSnack } from "../hooks/store/useSnack";
import { FormikProps, useFormik } from "formik";
import { APIS } from "../api/apiList";

interface MyFormikValue {
  message: string;
}

export default function ChatBox({
  setOpenChat,
  chatUser,
}: {
  setOpenChat: Dispatch<SetStateAction<boolean>>;
  chatUser: { profileImg: string; username: string };
}): React.JSX.Element {
  const { apiCall, checkAxiosError } = useApi();
  const { setSnack } = useSnack();
  // schema for yup validation
  const schema = yup.object().shape({
    description: yup.string(),
    photos: yup.string(),
    feeling: yup.string(),
  });

  const formik: FormikProps<MyFormikValue> = useFormik<MyFormikValue>({
    validationSchema: schema,
    initialValues: { message: "" },
    onSubmit: async (values) => {
      try {
        const res = await apiCall({
          url: APIS.AUTHENTICATION.SIGNUP,
          method: "post",
          data: JSON.stringify(values, null, 2),
        });
        if (res.status === 200) {
          console.log(res.data.message);
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
    <div className="w-[320px] bg-white p-0 shadow-lg rounded-xl">
      <div className="w-full border-b-2 border-gray-100 flex items-center p-3 text-gray-900">
        <img
          className="w-10 h-10 rounded-full"
          src={chatUser.profileImg}
          alt="Rounded avatar"
        />
        <div className="flex flex-col text-justify">
          <h3 className="ms-3 text-sm text-gray-700">{chatUser.username}</h3>
          <h4 className="ms-3 text-[13px] text-gray-400">
            <span className="inline-block bg-green-500 p-1 mr-1 rounded-full"></span>
            Available
          </h4>
        </div>
        <button className="block ml-[auto]" onClick={() => setOpenChat(false)}>
          <img
            width={20}
            src="/public/icons/close-svgrepo-com.svg"
            alt="chat-icon"
          />
        </button>
      </div>
      <div className="w-full p-3 h-[auto]">
        <div className="flex flex-col items-start">
          <p className="text-sm text-gray-700 bg-[#E2EFFF] px-5 py-[10px] rounded-t-2xl rounded-r-2xl max-w-48 text-start">
            Hi, how can I help you?
          </p>
          <span className="text-xs text-gray-400 my-2">Mon 10:20am</span>
        </div>
        <div className="flex flex-col items-end">
          <p className="text-sm text-gray-700 bg-[#fcf1f5] px-5 py-[10px] rounded-t-2xl rounded-l-2xl max-w-48 text-start">
            I want those files for you. I want you to send 1 PDF and 1 image
            file.
          </p>
          <span className="text-xs text-gray-400 my-2">Just now</span>
        </div>
      </div>
      <div className="relative w-full border-t-2 border-gray-100 p-3">
        <InputComponent
          name="message"
          type="text"
          placeholder="Start typing..."
          formik={formik}
          inputStyle="w-[296px] bg-input-primary border-none my-0 text-sm"
        />
        <img
          className="absolute right-5 bottom-5"
          width={30}
          src="/public/icons/share-2-svgrepo-com.svg"
          alt="send icon"
        />
      </div>
    </div>
  );
}
