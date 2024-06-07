import React, { createContext, useContext, useState, ReactNode } from "react";

type Controller = { [key: string]: () => void };

type ControllerContextType = {
  controls: Controller;
  addControl: (key: string, callback: () => void) => void;
};

const ControllerContext = createContext<ControllerContextType>({
  controls: {},
  addControl: () => {},
});

export const ControllerProvider = ({ children }: { children: ReactNode }) => {
  const [controls, setControls] = useState<Controller>({});

  const addControl = (key: string, callback: () => void) => {
    setControls((prevControls) => ({ ...prevControls, [key]: callback }));
  };

  return (
    <ControllerContext.Provider value={{ controls, addControl }}>
      {children}
    </ControllerContext.Provider>
  );
};

export const useController = () => useContext(ControllerContext);
