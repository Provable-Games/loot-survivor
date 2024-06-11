import React, { createContext, useContext, useState, ReactNode } from "react";

type Control = {
  callback: () => void;
  condition: boolean;
};

type Controller = { [key: string]: Control };

type ControllerContextType = {
  controls: Controller;
  addControl: (key: string, callback: () => void, condition: boolean) => void;
};

const ControllerContext = createContext<ControllerContextType>({
  controls: {},
  addControl: () => {},
});

export const ControllerProvider = ({ children }: { children: ReactNode }) => {
  const [controls, setControls] = useState<Controller>({});

  const addControl = (
    key: string,
    callback: () => void,
    condition: boolean
  ) => {
    setControls((prevControls) => ({
      ...prevControls,
      [key]: { callback, condition },
    }));
  };

  return (
    <ControllerContext.Provider value={{ controls, addControl }}>
      {children}
    </ControllerContext.Provider>
  );
};

export const useController = () => useContext(ControllerContext);
