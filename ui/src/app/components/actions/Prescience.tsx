import EncounterTable from "../encounters/EncounterTable";

const Prescience = () => {
  return (
    <div className="flex flex-col gap-2 h-full w-full">
      <h3 className="text-center uppercase">Prescience</h3>
      <div className="flex flex-col gap-5 sm:gap-0 sm:flex-row justify-between w-full text-xs sm:text-base overflow-auto default-scroll">
        <EncounterTable />
      </div>
    </div>
  );
};

export default Prescience;
