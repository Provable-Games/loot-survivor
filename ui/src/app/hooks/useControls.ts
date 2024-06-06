import { useEffect, useCallback } from "react";
import { useController } from "@/app/context/ControllerContext";

const useControls = () => {
  const { controls } = useController();

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const { key } = event;
      if (controls[key]) {
        event.preventDefault();
        controls[key]();
      }
    },
    [controls]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return null;
};

export default useControls;
