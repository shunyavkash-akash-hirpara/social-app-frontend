import React, { useState } from "react";

type Props = {};

export default function InputComponent({
  id,
  name,
  label,
  type,
  currency,
  placeholder,
  inputStyle,
  formik,
}: {
  id: any;
  name: string;
  label?: string;
  type: string;
  placeholder: string;
  inputStyle?: string;
  currency?: boolean;
  formik: any;
}): React.JSX.Element {
  const [state, setState] = useState();
  const handleChange = (evt: any) => {
    setState(evt.target.value);
  };
  return (
    <div>
      {/* <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label> */}
      <div className="relative mt-2 rounded-md">
        {/* <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <span className="text-gray-500 sm:text-sm">$</span>
        </div> */}
        <input
          type={type}
          name={name}
          id={id}
          className={`bg-white border-solid border-gray border rounded-lg py-3 px-4 my-2 w-full ${
            currency ? "pr-20" : "pr-3"
          } + ${inputStyle}`}
          placeholder={placeholder}
          onChange={formik.handleChange}
          value={formik.values.firstName}
        />
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
