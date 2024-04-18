import React from "react";

export default function MicOnIcon({
  className,
}: {
  className?: React.SVGAttributes<SVGSVGElement> | string;
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
      <path
        d="M12 17V21M12 21H9M12 21H15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="10"
        y="3"
        width="4"
        height="10"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.7378 12.7542C17.3674 13.9659 16.6228 15.0293 15.6109 15.7918C14.599 16.5544 13.3716 16.977 12.1047 16.9991C10.8378 17.0212 9.59647 16.6417 8.55854 15.9149C7.52061 15.1881 6.73941 14.1515 6.32689 12.9534"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
