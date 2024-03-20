import { useState } from "react";
import SignInForm from "./SignIn";
import SignUpForm from "./SignUp";
import classNames from "classnames";

export default function Auth() {
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
            "bg-white rounded-2xl shadow-lg relative overflow-hidden w-full max-w-screen-md min-h-[528px]"
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
            <div className="bg-gradient-to-r grid place-items-center from-red-500 to-pink-600 bg-no-repeat bg-cover bg-center text-white relative left-full h-full w-full transform transition duration-600 ease-in-out -translate-x-full">
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
