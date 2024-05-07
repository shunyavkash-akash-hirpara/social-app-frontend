import React from "react";

export default function Loader({
  className,
}: {
  className?: React.SVGAttributes<SVGSVGElement> | string;
}): React.JSX.Element {
  return (
    <div className="flex justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        width="200"
        height="200"
        className={
          ("shape-rendering-auto block " + className) as string
        }
      >
        <g>
          <circle
            cx="50"
            cy="50"
            r="32"
            strokeWidth="8"
            stroke="currentColor"
            strokeDasharray="50.26548245743669 50.26548245743669"
            fill="none"
            strokeLinecap="round"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              repeatCount="indefinite"
              dur="1s"
              keyTimes="0;1"
              values="0 50 50;360 50 50"
            ></animateTransform>
          </circle>
          <g></g>
        </g>
      </svg>
    </div>
  );
}
