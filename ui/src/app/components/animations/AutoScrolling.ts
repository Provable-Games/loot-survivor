import { useEffect, useRef } from "react";

const AutoScrolling = () => {
  const animationFrameRef = useRef<number | null>(null);
  const scrollableRef = useRef<HTMLDivElement | null>(null);

  function startScrolling() {
    const el = scrollableRef.current;
    if (!el) return; // Guard clause
    const endPos = el.scrollWidth - el.offsetWidth; // Calculate the width of the overflow

    // Use this to control the speed of the scroll
    const duration = 4000; // In milliseconds

    const start = performance.now();
    const initialScrollLeft = el.scrollLeft;

    requestAnimationFrame(function step(now) {
      const elapsed = now - start;
      let rawProgress = elapsed / duration;

      let progress;
      if (rawProgress <= 0.5) {
        // For the first half, we scale rawProgress from [0, 0.5] to [0, 1]
        progress = rawProgress * 2;
      } else {
        // For the second half, we scale rawProgress from [0.5, 1] to [1, 0]
        progress = 2 - rawProgress * 2;
      }

      el.scrollLeft = initialScrollLeft + progress * endPos;

      if (rawProgress < 1) {
        animationFrameRef.current = requestAnimationFrame(step);
      } else {
        // Restart the animation once it's done
        startScrolling();
      }
    });
  }

  useEffect(() => {
    startScrolling();

    // Cleanup animation frame on unmount
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []); // Empty dependency array means this effect runs once when component mounts

  return scrollableRef;
};

export default AutoScrolling;
