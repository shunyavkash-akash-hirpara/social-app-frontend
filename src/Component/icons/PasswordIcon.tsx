import React from "react";

export default function PasswordIcon({ className }: { className?: React.SVGAttributes<SVGSVGElement> | string }): React.JSX.Element {
  return (
    <svg width="800px" height="800px" viewBox="0 0 24 24" fill="#033799" xmlns="http://www.w3.org/2000/svg" className={className as string}>
      <g id="SVGRepo_bgCarrier" stroke-width="0" />

      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />

      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4H14C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12Z"
          stroke="currentColor"
          stroke-width="1.5"
        />{" "}
        <path d="M12.0002 10V14M10.2678 11L13.7319 13M13.7317 11L10.2676 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />{" "}
        <path d="M6.73266 10V14M5.00023 11L8.46434 13M8.4641 11L5 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />{" "}
        <path d="M17.2681 10V14M15.5356 11L18.9997 13M18.9995 11L15.5354 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />{" "}
      </g>
    </svg>
  );
}
