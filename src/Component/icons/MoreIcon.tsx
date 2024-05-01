import React from "react";

export default function MoreIcon({
  className,
  radius,
}: {
  className?: React.SVGAttributes<SVGSVGElement> | string;
  radius: number;
}): React.JSX.Element {
  return (
    <svg
      width="800px"
      height="800px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className as string}
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0" />

      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      <g id="SVGRepo_iconCarrier">
        <circle
          cx="18"
          cy="12"
          r={radius}
          transform="rotate(90 18 12)"
          fill="currentColor"
        />
        <circle
          cx="12"
          cy="12"
          r={radius}
          transform="rotate(90 12 12)"
          fill="currentColor"
        />
        <circle
          cx="6"
          cy="12"
          r={radius}
          transform="rotate(90 6 12)"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}
