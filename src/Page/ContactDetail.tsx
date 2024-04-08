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
  country: string;
  city: string;
  address: string;
  pincode: string;
}

export default function ContactDetail(): React.JSX.Element {
  const { apiCall, checkAxiosError } = useApi();
  const { setSnack } = useSnack();
  const navigate = useNavigate();
  // schema for yup validation
  const schema = yup.object().shape({
    country: yup.string().required(),
    city: yup.string().required(),
    address: yup.string().required(),
    pincode: yup.string().required(),
  });

  const formik: FormikProps<MyFormikValues> = useFormik<MyFormikValues>({
    validationSchema: schema,
    initialValues: {
      country: "",
      city: "",
      address: "",
      pincode: "",
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
                  Contact Information
                </span>
              </div>
            </div>
            <form action="#" className="p-6" onSubmit={formik.handleSubmit}>
              <div className="grid grid-cols-2 gap-y-2">
                <InputComponent<MyFormikValues>
                  label="Country"
                  name="country"
                  type="text"
                  placeholder="Country"
                  formik={formik}
                  inputStyle="bg-white my-2"
                />
                <InputComponent<MyFormikValues>
                  label="City"
                  name="city"
                  type="text"
                  placeholder="City"
                  formik={formik}
                  inputStyle="bg-white my-2"
                />
                <InputComponent<MyFormikValues>
                  label="Address"
                  name="address"
                  type="text"
                  placeholder="Address"
                  formik={formik}
                  inputStyle="bg-white my-2"
                />
                <InputComponent<MyFormikValues>
                  label="Pincode"
                  name="pincode"
                  type="number"
                  placeholder="Pincode"
                  formik={formik}
                  inputStyle="bg-white my-2"
                />
              </div>
              <div className="my-6 mx-12" id="map">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3599.8989232396243!2d72.88692324655115!3d21.2392734730605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04f5ac56bb709%3A0x693eb1d348db1c4f!2sNear%2C%20Lajamni%20Chowk%2C%20Maruti%20Dham%20Society%2C%20Mota%20Varachha%2C%20Surat%2C%20Gujarat%20394101!5e0!3m2!1sen!2sin!4v1711533009432!5m2!1sen!2sin"
                  width="100%"
                  height="250"
                  className="rounded-lg"
                  loading="lazy"
                  // referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
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
