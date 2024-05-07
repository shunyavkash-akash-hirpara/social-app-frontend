import classNames from "classnames";
import React, { useEffect, useState } from "react";

export default function Progress({
  // duration = 10000,
  part = 100,
  fill = false,
  active = false,
}: {
  // progress: number;
  // duration: number;
  part?: number;
  fill?: boolean;
  active?: boolean;
}) {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const interVal = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          return prev + 1;
        }
        return prev;
      });
    }, part);

    if (active) {
      setProgress(0);
    }
    return () => {
      clearInterval(interVal);
    };
  }, [part, active]);
  return (
    <div className="bg-red-500 flex-1" data-active={active}>
      <div
        className={classNames("py-3 bg-green-500 h-full", {
          "transition-all duration-500": active,
        })}
        style={{ width: fill ? "100%" : active ? progress + "%" : "0%" }}
      ></div>
    </div>
  );
}
