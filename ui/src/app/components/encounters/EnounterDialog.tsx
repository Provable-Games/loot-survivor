import useUIStore from "@/app/hooks/useUIStore";
import useWindowSize from "@/app/hooks/useWindowSize";
import { useMemo } from "react";
import Draggable from "react-draggable";
import { MdClose } from "react-icons/md";
import EncounterTable from "./EncounterTable";

const EncounterDialog = () => {
  const showEncounterTable = useUIStore((state) => state.showEncounterTable);
  const { width } = useWindowSize();

  const position = useMemo(() => {
    if (width > 1024) {
      // Large screens
      return { x: width - 850, y: -500 };
    } else if (width > 768) {
      // Medium screens
      return { x: width - 620, y: -500 };
    } else {
      // Small screens
      return { x: 0, y: -500 };
    }
  }, [width]);

  return (
    <div className="absolute">
      <Draggable defaultPosition={position}>
        <div className="relative">
          <MdClose
            className="w-10 h-10 absolute top-0 left-[-40px] z-10 border-y border-l border-bottom border-terminal-green bg-terminal-black cursor-pointer"
            onClick={() => showEncounterTable(false)}
          />
          <div className="flex flex-col gap-5 sm:gap-0 sm:flex-row justify-between w-[625px] bg-terminal-black max-h-[350px] border border-terminal-green text-xs sm:text-base overflow-y-scroll default-scroll cursor-pointer hover:shadow-lg">
            <EncounterTable />
          </div>
        </div>
      </Draggable>
    </div>
  );
};

export default EncounterDialog;
