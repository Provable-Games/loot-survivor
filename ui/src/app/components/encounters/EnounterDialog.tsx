import useUIStore from "@/app/hooks/useUIStore";
import Draggable from "react-draggable";
import { MdClose } from "react-icons/md";
import EncounterTable from "./EncounterTable";

const EncounterDialog = () => {
  const showEncounterTable = useUIStore((state) => state.showEncounterTable);

  return (
    <Draggable>
      <div className="flex flex-col gap-5 sm:gap-0 sm:flex-row justify-between w-full bg-terminal-black max-h-[300px] border border-terminal-green text-xs sm:text-base sm:overflow-y-scroll default-scroll">
        <MdClose
          className="w-10 h-10 absolute top-0 right-0 z-10 border-y border-l border-bottom border-terminal-green bg-terminal-black cursor-pointer"
          onClick={() => showEncounterTable(false)}
        />
        <EncounterTable />
      </div>
    </Draggable>
  );
};

export default EncounterDialog;
