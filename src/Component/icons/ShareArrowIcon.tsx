import React from "react";

export default function ShareArrowIcon({ className }: { className?: React.SVGAttributes<SVGSVGElement> | string }) {
  return (
    <svg width="800px" height="800px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className={className as string}>
      <g id="SVGRepo_bgCarrier" stroke-width="0" />

      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />

      <g id="SVGRepo_iconCarrier">
        {" "}
        <title>share-arrow</title>{" "}
        <g id="Layer_2" data-name="Layer 2">
          {" "}
          <g id="invisible_box" data-name="invisible box">
            {" "}
            <rect width="48" height="48" fill="none" />{" "}
          </g>{" "}
          <g id="Q3_icons" data-name="Q3 icons">
            {" "}
            <path d="M31.2,14.2,41,24.1l-9.8,9.8V26.8L27,27c-6.8.3-12,1-16.1,2.4,3.6-3.8,9.3-6.8,16.7-7.5l3.6-.3V14.2M28.3,6a1.2,1.2,0,0,0-1.1,1.3V17.9C12,19.4,2.2,29.8,2,40.3c0,.6.2,1,.6,1s.7-.3,1.1-1.1c2.4-5.4,7.8-8.5,23.5-9.2v9.7A1.2,1.2,0,0,0,28.3,42a.9.9,0,0,0,.8-.4L45.6,25.1a1.5,1.5,0,0,0,0-2L29.1,6.4a.9.9,0,0,0-.8-.4Z" />{" "}
          </g>{" "}
        </g>{" "}
      </g>
    </svg>
  );
}
