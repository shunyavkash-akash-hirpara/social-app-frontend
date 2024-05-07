import React from "react";

export default function PlusIcon({ className }: { className?: React.SVGAttributes<SVGSVGElement> | string }): React.JSX.Element {
  return (
    <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className as string}>
      <g id="SVGRepo_bgCarrier" stroke-width="0" />

      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />

      <g id="SVGRepo_iconCarrier">
        {" "}
        <path d="M4 12H20M12 4V20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />{" "}
      </g>
    </svg>
  );
}
