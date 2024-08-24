import { useEffect, useState, ReactNode } from "react";

export interface HintDisplayProps {
  points: ReactNode[];
  displaySeconds: number;
}

export const HintDisplay = ({ points, displaySeconds }: HintDisplayProps) => {
  const [currentPoint, setCurrentPoint] = useState(0);
  const [isSliding, setIsSliding] = useState(false);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setIsSliding(true);

      setTimeout(() => {
        setCurrentPoint((prev) => (prev + 1) % points.length);
        setIsSliding(false);
      }, 500); // Half of the animation duration
    }, displaySeconds * 1000); // Total time for each point (3s display + 1s animation)

    return () => clearInterval(slideInterval);
  }, [points.length, displaySeconds]);

  return (
    <div className="overflow-hidden">
      <div
        className={`${isSliding ? "animate-slide-out" : "animate-slide-in"}`}
      >
        {points[currentPoint]}
      </div>
    </div>
  );
};
