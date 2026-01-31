import { useEffect, useState } from "react";

function AnimatedBars() {
  const [heights, setHeights] = useState(
    Array.from({ length: 20 }, () => 1)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setHeights(
        Array.from({ length: 10 }, () =>
          Math.floor(Math.random() * 140) + 1
        )
      );
    }, 800); // slower = smoother

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="border border-gray-300 h-[150px] w-[95%] m-auto mt-8 flex items-end gap-2 rounded-t-lg border-b-0">
      {heights.map((h, i) => (
        <div
          key={i}
          className="w-[10%] bg-sky-500 transition-all duration-700 ease-in-out rounded-t-lg bg-linear-to-b from-sky-500 to-sky-200 hover:bg-linear-to-b hover:from-green-500 hover:to-green-100 cursor-pointer"
          style={{ height: `${h}px` }}
        />
      ))}
    </div>
  );
}

export default AnimatedBars;