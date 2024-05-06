import React from "react";

export default function CloudDownIcon({ className }: { className?: React.SVGAttributes<SVGSVGElement> | string }): React.JSX.Element {
  return (
    <svg width="800px" height="800px" viewBox="0 0 17 17" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className={className as string}>
      <g id="SVGRepo_bgCarrier" strokeWidth="0" />

      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />

      <g id="SVGRepo_iconCarrier">
        <path
          d="M17 6.75c0 2.343-1.906 4.25-4.25 4.25h-2.757v-1h2.757c1.792 0 3.25-1.458 3.25-3.25s-1.458-3.25-3.25-3.25c-0.532 0-1.057 0.141-1.56 0.417l-0.354 0.195-0.265-0.306c-0.719-0.829-1.748-1.306-2.821-1.306-1.661 0-3.099 1.080-3.576 2.688l-0.126 0.422-0.435-0.072c-0.119-0.019-0.238-0.038-0.363-0.038-1.24 0-2.25 1.009-2.25 2.25s1.010 2.25 2.25 2.25h3.699v1h-3.699c-1.792 0-3.25-1.458-3.25-3.25 0-1.826 1.511-3.335 3.353-3.248 0.713-1.812 2.431-3.002 4.397-3.002 1.234 0 2.42 0.494 3.309 1.367 0.546-0.244 1.113-0.367 1.691-0.367 2.344 0 4.25 1.907 4.25 4.25zM9 13.73v-7.73h-1v7.73l-1.646-1.646-0.707 0.707 2.853 2.853 2.854-2.854-0.707-0.707-1.647 1.647z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}
