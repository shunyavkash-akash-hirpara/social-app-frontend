import React from "react";
import Header from "../Component/Header";
import Sidebar from "../Component/Sidebar";
import RecentChat from "../Component/RecentChat";
import { useAuth } from "../hooks/store/useAuth";

export default function Setting(): React.JSX.Element {
  const { accessToken } = useAuth();
  return (
    <>
      <Header accessToken={accessToken} />
      <Sidebar />
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
                <a
                  href="account-information.html"
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
                </a>
              </li>
              <li className="d-block border-b-2 border-[#F6F5F7] me-0">
                <a
                  href="contact-information.html"
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
                </a>
              </li>
              <li className="d-block border-b-2 border-[#F6F5F7] me-0">
                <a href="social.html" className="pt-2 pb-2 flex items-center">
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
                </a>
              </li>
              <li className="d-block me-0">
                <a href="password.html" className="pt-2 pb-2 flex items-center">
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
                </a>
              </li>
            </ul>

            <div className="text-sm font-bold text-left text-gray-400 mb-2">
              Other
            </div>
            <ul className="list-inline">
              <li className="d-block border-b-2 border-[#F6F5F7] me-0">
                <a
                  href="default-notification.html"
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
                </a>
              </li>
              <li className="d-block border-b-2 border-[#F6F5F7] me-0">
                <a href="help-box.html" className="pt-2 pb-2 flex items-center">
                  <div className="bg-blue-500 w-10 h-10 rounded-full flex items-center justify-center mr-2">
                    <img
                      className="w-7 rounded-full"
                      src="/public/icons/help-circle-svgrepo-com.svg"
                      alt="home"
                    />
                  </div>
                  <h4 className="font-bold text-base text-gray-600 mb-0 mt-0">
                    Help
                  </h4>
                  <img
                    className="w-7 ms-[auto]"
                    src="/public/icons/right-arrow-svgrepo-com(1).svg"
                    alt="right arrow"
                  />
                </a>
              </li>
              <li className="d-block me-0">
                <a href="#" className="pt-2 pb-2 flex items-center">
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
                </a>
              </li>
            </ul>
          </div>
        </div>
      </main>
      <RecentChat />
    </>
  );
}
