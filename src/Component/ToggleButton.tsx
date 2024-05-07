import React, { useCallback, useState } from "react";
import useApi from "../hooks/useApi";
import { useSnack } from "../hooks/store/useSnack";
import { APIS } from "../api/apiList";

export default function ToggleButton({ className, label, value, name }: { className?: React.SVGAttributes<SVGSVGElement> | string; label: string; value: boolean; name: string }): React.JSX.Element {
  const [check, setCheck] = useState<boolean>(value);
  const { apiCall, checkAxiosError } = useApi();
  const { setSnack } = useSnack();

  const handleUserNotification = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      try {
        const res = await apiCall({
          url: APIS.SETTING.PATCH,
          method: "patch",
          data: { [name]: e.target.checked },
        });
        if (res.status === 200) {
          setSnack(res.data.message);
        }
      } catch (error) {
        if (checkAxiosError(error)) {
          const errorMessage = error?.response?.data.message;
          setSnack(errorMessage, "warning");
        }
      }
    },
    [apiCall, checkAxiosError, name, setSnack]
  );

  return (
    <label className="inline-flex items-center cursor-pointer">
      <span
        className={`text-base font-medium text-gray-700 w-[70px] text-left 
      ${className as string}`}
      >
        {label}
      </span>
      <input
        type="checkbox"
        name={name}
        checked={check}
        onChange={(e) => {
          setCheck(e.target.checked);
          handleUserNotification(e);
        }}
        className="sr-only peer"
      />
      <div className="ms-3 relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
    </label>
  );
}
