import { useState, useEffect } from "react";

interface RandomnessLoaderProps {
  loadingSeconds: number | null;
}

const RandomnessLoader = ({ loadingSeconds }: RandomnessLoaderProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (loadingSeconds) {
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + 100 / loadingSeconds / 10;
          return newProgress >= 100 ? 100 : newProgress;
        });
      }, 100);

      return () => clearInterval(interval);
    }
  }, [loadingSeconds]);

  return (
    <div className="h-1/4 flex flex-col items-center justify-center gap-4">
      <div className="w-[600px] h-10 bg-gray-500 overflow-hidden">
        <div
          className="h-full bg-terminal-green transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default RandomnessLoader;
