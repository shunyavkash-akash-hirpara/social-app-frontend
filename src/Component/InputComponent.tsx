import { FormikProps } from "formik";
import React from "react";

export default function InputComponent<MyFormikValues>({
  label,
  name,
  type,
  currency,
  placeholder,
  inputStyle,
  labelStyle,
  formik,
}: {
  name: keyof MyFormikValues;
  label?: string;
  type: React.HTMLInputTypeAttribute;
  placeholder: string;
  inputStyle?: string;
  labelStyle?: string;
  currency?: boolean;
  formik: FormikProps<MyFormikValues>;
}): React.JSX.Element {
  return (
    <div>
      {label && (
        <label
          className={
            `inline-flex text-sm font-bold leading-6 px-4 w-[280px] text-gray-500 ` +
            labelStyle
          }
        >
          {label}
        </label>
      )}
      <div className="relative rounded-md">
        {/* <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <span className="text-gray-500 sm:text-sm">$</span>
        </div> */}
        <input
          type={type}
          name={name as string}
          className={
            `border-solid border-gray border text-gray-700 rounded-xl py-3 px-4 w-[280px] ${
              currency ? "pr-20" : "pr-3 "
            }` + inputStyle
          }
          placeholder={placeholder}
          onChange={formik.handleChange}
          value={formik.values[name] as string}
        />
        {formik.touched[name] && Boolean(formik.errors[name]) && (
          <div className="text-red-500">
            {(formik.touched[name] && formik.errors[name]) as string}
          </div>
        )}
        {/* {type === "date" && (
          <button className="absolute top-4 right-14 flex items-center w-8 h-8">
            <img
              className="w-7"
              src="/public/icons/calander-interface-icon-svgrepo-com.svg"
              alt="calander"
            />
          </button>
        )} */}
        {/* {currency && (
          <div className="absolute inset-y-0 right-0 flex items-center">
            <label htmlFor="currency" className="sr-only">
              Currency
            </label>
            <select
              id="currency"
              name="currency"
              className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            >
              <option>USD</option>
              <option>CAD</option>
              <option>EUR</option>
            </select>
          </div>
        )} */}
      </div>
    </div>
  );
}
