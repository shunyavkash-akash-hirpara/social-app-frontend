import React, { useState } from "react";
import SignInForm from "./SignIn";
import SignUpForm from "./SignUp";
import classNames from "classnames";

type Props = {};

const items = [
  {
    id: 1,
    name: "Wade Cooper",
    avatar:
      "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 2,
    name: "Arlene Mccoy",
    avatar:
      "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 3,
    name: "Devon Webb",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
  },
  {
    id: 4,
    name: "Tom Cook",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 5,
    name: "Tanya Fox",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 6,
    name: "Hellen Schmidt",
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 7,
    name: "Caroline Schultz",
    avatar:
      "https://images.unsplash.com/photo-1568409938619-12e139227838?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 8,
    name: "Mason Heaney",
    avatar:
      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 9,
    name: "Claudie Smitham",
    avatar:
      "https://images.unsplash.com/photo-1584486520270-19eca1efcce5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 10,
    name: "Emil Schaefer",
    avatar:
      "https://images.unsplash.com/photo-1561505457-3bcad021f8ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

export default function Home({}: Props) {
  const [type, setType] = useState<"signIn" | "signUp">("signIn");

  return (
    <>
      {/* <InputComponent
        name="price"
        label="Price"
        type="text"
        placeholder="0.00"
        currency
      /> */}
      {/* <SelectComponent label="assign to" items={items} />
      <div className="text-3xl font-bold underline text-red-600">Home</div> */}
      <div className="grid place-items-center">
        <div
          className={
            "bg-white rounded-2xl shadow-lg relative overflow-hidden w-full max-w-screen-md min-h-screen min-h-[528px] max-w-[820px]"
          }
          id="container"
        >
          <SignUpForm />
          <SignInForm />
          <div
            className={classNames(
              "absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-600 ease-in-out z-50 transform ",
              {
                "-translate-x-full ": type === "signIn",
                "translate-x-0": type === "signUp",
              }
            )}
          >
            <div className="bg-gradient-to-r grid place-items-center from-red-500 to-pink-600 bg-no-repeat bg-cover bg-center text-white relative left-full h-full w-full transform transition duration-600 ease-in-out transform -translate-x-full">
              {type === "signIn" ? (
                <div className="absolute top-0 h-full w-full flex flex-col items-center justify-center px-10 text-center transition-transform duration-600 ease-in-out">
                  <h1 className="font-bold m-0">Welcome Back!</h1>
                  <p className="text-base font-thin leading-5 tracking-wider my-5">
                    To keep connected with us please login with your personal
                    info
                  </p>
                  <button
                    className="bg-transparent border-white rounded-lg border border-solid text-white text-xs font-bold uppercase px-12 py-3 tracking-wider transition-transform duration-80 ease-in active:scale-95 focus:outline-none"
                    id="signIn"
                    onClick={() => setType("signUp")}
                  >
                    Sign In
                  </button>
                </div>
              ) : (
                <div className="absolute top-0 h-full w-full flex flex-col items-center justify-center px-10 text-center transition-transform duration-600 ease-in-out right-0">
                  <h1 className="font-bold m-0">Hello, Friend!</h1>
                  <p className="text-base font-thin leading-5 tracking-wider my-5">
                    Enter your personal details and start journey with us
                  </p>
                  <button
                    className="bg-transparent border-white rounded-lg border border-solid text-white text-xs font-bold uppercase px-12 py-3 tracking-wider transition-transform duration-80 ease-in active:scale-95 focus:outline-none"
                    id="signUp"
                    onClick={() => setType("signIn")}
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
