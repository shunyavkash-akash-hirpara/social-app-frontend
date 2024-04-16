import React from "react";
import { useAuth } from "../hooks/store/useAuth";
import { Link } from "react-router-dom";
import { socket } from "../socket";

export default function Setting(): React.JSX.Element {
  const { logout } = useAuth();

  return (
    <>
      <main className="fixed w-[900px] top-[80px] left-[280px] right-[344px] mx-[auto] flex">
        <div className="w-[800px] mx-[auto] mb-6 overflow-y-auto p-10 bg-white rounded-xl">
          <div className="">
            <h4 className="w-full text-left mb-5 text-2xl font-bold text-gray-700">
              Settings
            </h4>
            <div className="text-sm font-bold text-left text-gray-400 mb-2">
              Genaral
            </div>
            <ul className="mb-4">
              <li className="d-block border-b-2 border-[#F6F5F7] me-0">
                <Link
                  to="/account-information"
                  className="pt-2 pb-2 flex items-center"
                >
                  <div className="bg-blue-500 w-10 h-10 rounded-full flex items-center justify-center mr-2">
                    <img
                      className="w-7 rounded-full"
                      src="/public/icons/home-svgrepo-com.svg"
                      alt="home"
                    />
                  </div>
                  <h4 className="font-bold text-base text-gray-600 mb-0 mt-0">
                    Acount Information
                  </h4>
                  <img
                    className="w-7 ms-[auto]"
                    src="/public/icons/right-arrow-svgrepo-com(1).svg"
                    alt="right arrow"
                  />
                </Link>
              </li>
              <li className="d-block border-b-2 border-[#F6F5F7] me-0">
                <Link
                  to="/contact-information"
                  className="pt-2 pb-2 flex items-center"
                >
                  <div className="bg-[#F29F4A] w-10 h-10 rounded-full flex items-center justify-center mr-2">
                    <img
                      className="w-7 rounded-full"
                      src="/public/icons/location-pin-alt-1-svgrepo-com.svg"
                      alt="home"
                    />
                  </div>
                  <h4 className="font-bold text-base text-gray-600 mb-0 mt-0">
                    Saved Address
                  </h4>
                  <img
                    className="w-7 ms-[auto]"
                    src="/public/icons/right-arrow-svgrepo-com(1).svg"
                    alt="right arrow"
                  />
                </Link>
              </li>
              <li className="d-block border-b-2 border-[#F6F5F7] me-0">
                <Link to="/social" className="pt-2 pb-2 flex items-center">
                  <div className="bg-[#E65026] w-10 h-10 rounded-full flex items-center justify-center mr-2">
                    <img
                      className="w-7 rounded-full"
                      src="/public/icons/twitter-svgrepo-com.svg"
                      alt="home"
                    />
                  </div>
                  <h4 className="font-bold text-base text-gray-600 mb-0 mt-0">
                    Social Acount
                  </h4>
                  <img
                    className="w-7 ms-[auto]"
                    src="/public/icons/right-arrow-svgrepo-com(1).svg"
                    alt="right arrow"
                  />
                </Link>
              </li>
              <li className="d-block me-0">
                <Link
                  to="/change-password"
                  className="pt-2 pb-2 flex items-center"
                >
                  <div className="bg-[#033799] w-10 h-10 rounded-full flex items-center justify-center mr-2">
                    <img
                      className="w-7 rounded-full"
                      src="/public/icons/password-svgrepo-com.svg"
                      alt="home"
                    />
                  </div>
                  <h4 className="font-bold text-base text-gray-600 mb-0 mt-0">
                    Password
                  </h4>
                  <img
                    className="w-7 ms-[auto]"
                    src="/public/icons/right-arrow-svgrepo-com(1).svg"
                    alt="right arrow"
                  />
                </Link>
              </li>
            </ul>

            <div className="text-sm font-bold text-left text-gray-400 mb-2">
              Other
            </div>
            <ul className="list-inline">
              <li className="d-block border-b-2 border-[#F6F5F7] me-0">
                <Link
                  to="/notification"
                  className="pt-2 pb-2 flex items-center"
                >
                  <div className="bg-[#F29F4A] w-10 h-10 rounded-full flex items-center justify-center mr-2">
                    <img
                      className="w-7 rounded-full"
                      src="/public/icons/notification-svgrepo-com.svg"
                      alt="home"
                    />
                  </div>
                  <h4 className="font-bold text-base text-gray-600 mb-0 mt-0">
                    Notification
                  </h4>
                  <img
                    className="w-7 ms-[auto]"
                    src="/public/icons/right-arrow-svgrepo-com(1).svg"
                    alt="right arrow"
                  />
                </Link>
              </li>
              <li className="d-block border-b-2 border-[#F6F5F7] me-0">
                <Link
                  to="/delete-my-account"
                  className="pt-2 pb-2 flex items-center"
                >
                  <div className="bg-blue-500 w-10 h-10 rounded-full flex items-center justify-center mr-2">
                    <img
                      className="w-7 rounded-full"
                      src="/public/icons/delete-profile-svgrepo-com.svg"
                      alt="home"
                    />
                  </div>
                  <h4 className="font-bold text-base text-gray-600 mb-0 mt-0">
                    Delete My Account
                  </h4>
                  <img
                    className="w-7 ms-[auto]"
                    src="/public/icons/right-arrow-svgrepo-com(1).svg"
                    alt="right arrow"
                  />
                </Link>
              </li>
              <li className="d-block me-0">
                <button
                  className="pt-2 pb-2 flex items-center w-full"
                  onClick={() => {
                    logout();
                    socket.disconnect();
                  }}
                >
                  <div className="bg-[#E65026] w-10 h-10 rounded-full flex items-center justify-center mr-2">
                    <img
                      className="w-7 rounded-full"
                      src="/public/icons/lock-svgrepo-com.svg"
                      alt="home"
                    />
                  </div>
                  <h4 className="font-bold text-base text-gray-600 mb-0 mt-0">
                    Logout
                  </h4>
                  <img
                    className="w-7 ms-[auto]"
                    src="/public/icons/right-arrow-svgrepo-com(1).svg"
                    alt="right arrow"
                  />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}
