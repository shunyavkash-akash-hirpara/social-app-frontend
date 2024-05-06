import React from "react";

export default function RightArrowIcon({ className }: { className?: React.SVGAttributes<SVGSVGElement> | string }): React.JSX.Element {
  return (
    <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className as string}>
      <g id="SVGRepo_bgCarrier" stroke-width="0" />

      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />

      <g id="SVGRepo_iconCarrier">
        {" "}
        <path d="M10 7L15 12L10 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />{" "}
      </g>
    </svg>
  );
}
