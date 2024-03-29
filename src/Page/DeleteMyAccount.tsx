import React, { useState } from "react";
import { useAuth } from "../hooks/store/useAuth";
import Header from "../Component/Header";
import Sidebar from "../Component/Sidebar";
import RecentChat from "../Component/RecentChat";
import { useNavigate } from "react-router-dom";
import BackIcon from "../Component/icons/BackIcon";

const reasons = [
  { id: 1, text: "Privacy Concerns" },
  { id: 2, text: "Time Management" },
  { id: 3, text: "Negative Impact on Mental Health" },
  { id: 4, text: "Cyberbullying and Harassment" },
  { id: 5, text: "Disagreement with Platform Policies or Practices" },
  { id: 6, text: "Desire for Privacy or Anonymity" },
  { id: 7, text: "Platform Fatigue" },
  { id: 8, text: "Change in Personal Circumstances" },
];

export default function DeleteMyAccount(): React.JSX.Element {
  const [selectReason, setSelectReason] = useState({ id: 0, text: "" });
  const { accessToken } = useAuth();
  const navigate = useNavigate();

  const handleDeleteAccount = () => {
    console.log("delete account:", selectReason);
  };

  return (
    <>
      <Header accessToken={accessToken} />
      <Sidebar />

      <main className="fixed w-[848px] top-[80px] left-[280px] right-[344px] mx-[auto] rounded-xl flex h-calc-screen-minus-nav">
        <div className="feed-scroll w-full mx-[auto] overflow-y-auto p-6 pt-0">
          <div className="bg-white rounded-xl">
            <div className="w-full h-14 p-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-600 bg-no-repeat bg-cover bg-center">
              <div className="h-full flex items-center justify-between">
                <div className="flex flex-row items-center">
                  <button
                    className="w-8 mr-3 h-full place-content-center rotate-[180deg]"
                    onClick={() => navigate("/setting")}
                  >
                    <BackIcon />
                  </button>
                  <span className="text-lg font-bold text-white">
                    Account Delete
                  </span>
                </div>
              </div>
            </div>
            <div className="p-6 flex flex-col items-start">
              <h3 className="text-gray-700 font-bold mb-2">
                Tell us why you are delete your account
              </h3>
              {reasons.map((reason: { id: number; text: string }) => (
                <div className="flex items-center ml-4 mb-2">
                  <input
                    checked={selectReason === reason}
                    id={`checked-checkbox-${reason.id}`}
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                    onClick={() => setSelectReason(reason)}
                  />
                  <label
                    htmlFor={`checked-checkbox-${reason.id}`}
                    className="ms-2 text-sm font-medium text-gray-700"
                  >
                    {reason.text}
                  </label>
                </div>
              ))}
              <button
                type="submit"
                onClick={() => handleDeleteAccount()}
                className="flex rounded-lg border border-solid bg-gradient-to-r from-red-500 to-pink-600 bg-no-repeat bg-cover bg-center text-white text-xs font-bold uppercase mt-4 px-12 py-3 tracking-wider transition-transform duration-80 ease-in active:scale-95 focus:outline-none"
              >
                Delete My Account
              </button>
            </div>
          </div>
        </div>
      </main>
      <RecentChat />
    </>
  );
}
