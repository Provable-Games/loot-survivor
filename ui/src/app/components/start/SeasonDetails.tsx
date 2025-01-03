import { TournamentTrophyIcon } from "@/app/components/icons/Icons";
import Lords from "public/icons/lords.svg";

const SeasonTable = () => {
  return (
    <div className="flex flex-col sm:gap-2 items-center w-full">
      <span className="text-2xl sm:text-4xl uppercase text-terminal-yellow">
        Free Entry
      </span>
      <span className="uppercase whitespace-nowrap sm:text-xl">
        For limited time only!
      </span>
      <div className="flex flex-col items-center border border-terminal-green b-5 bg-terminal-black text-terminal-green uppercase w-3/4">
        <div className="bg-terminal-green/75 w-full">
          <h1 className="m-0 p-2 text-lg sm:text-2xl text-terminal-black">
            Season 0 Pool
          </h1>
        </div>
        <div className="flex flex-row w-full justify-between p-2 border-t border-terminal-green">
          <div className="flex flex-row gap-2 items-center">
            <TournamentTrophyIcon className="self-center w-6 h-6 fill-current text-terminal-gold" />
            <p className="sm:text-2xl">
              1<sup className="text-sm">st</sup>
            </p>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <div className="flex flex-row gap-1 items-center">
              <Lords className="self-center w-5 h-5 fill-current" />
              <p className="text-2xl">$50</p>
            </div>
          </div>
        </div>
        <div className="flex flex-row w-full justify-between p-2 border-t border-terminal-green">
          <div className="flex flex-row gap-2 items-center">
            <TournamentTrophyIcon className="self-center w-6 h-6 fill-current text-terminal-silver" />
            <p className="sm:text-2xl">
              2<sup className="text-sm">nd</sup>
            </p>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <div className="flex flex-row gap-1 items-center">
              <Lords className="self-center w-5 h-5 fill-current" />
              <p className="text-2xl">$33</p>
            </div>
          </div>
        </div>
        <div className="flex flex-row w-full justify-between p-2 border-t border-terminal-green">
          <div className="flex flex-row gap-2 items-center">
            <TournamentTrophyIcon className="self-center w-6 h-6 fill-current text-terminal-bronze" />
            <p className="sm:text-2xl">
              3<sup className="text-sm">rd</sup>
            </p>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <div className="flex flex-row gap-1 items-center">
              <Lords className="self-center w-5 h-5 fill-current" />
              <p className="text-2xl">$17</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SeasonDetails = () => {
  return (
    <>
      <div
        className={`flex-col items-center justify-center sm:gap-10 gap-5 w-full sm:w-1/2 no-text-shadow flex`}
      >
        <SeasonTable />
      </div>
      {/* {showPaymentDetails && (
        <div
          className={`flex flex-col items-center justify-center sm:gap-10 gap-5 w-full no-text-shadow`}
        >
          <SeasonTable />
        </div>
      )} */}
    </>
  );
};

export default SeasonDetails;
