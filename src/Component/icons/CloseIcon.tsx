import React from "react";

export default function CloseIcon({
  className,
}: {
  className?: React.SVGAttributes<SVGSVGElement> | string;
}): React.JSX.Element {
  return (
    <svg
      viewBox="-0.5 0 25 25"
      fill="none"
      className={className as string}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0" />

      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M3 21.32L21 3.32001"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />{" "}
        <path
          d="M3 3.32001L21 21.32"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />{" "}
      </g>
    </svg>
  );
}
