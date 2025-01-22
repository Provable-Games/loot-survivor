import { Button } from "@/app/components/buttons/Button";
import useUIStore from "@/app/hooks/useUIStore";
import { networkConfig } from "@/app/lib/networkConfig";
import DS_ICON from "public/ds-icon.svg";
import LORDS from "public/icons/lords.svg";
import LS_SEAL from "public/ls-seal.svg";

interface DSTournamentOverviewProps {
  lordsCost: bigint;
}

const DarkShuffleOverview = ({ lordsCost }: DSTournamentOverviewProps) => {
  const { network } = useUIStore();

  const tournamentStart = process.env.NEXT_PUBLIC_DS_TOURNAMENT_START_TIME;

  const startDate = new Date(Number(tournamentStart) * 1000);

  console.log(tournamentStart, startDate);

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row gap-5 w-full py-4 uppercase h-[525px]">
        <div className="w-full flex flex-col gap-10">
          <div className="flex flex-col gap-10 w-full h-full items-center">
            <h1 className="text-4xl">Welcome to the Dark Shuffle Tournament</h1>
            <div className="flex flex-row items-center justify-between w-1/3">
              <span className="w-12">
                <LS_SEAL />
              </span>
              <span className="text-8xl">X</span>
              <span className="w-20">
                <DS_ICON />
              </span>
            </div>
          </div>
          <div className="flex flex-row justify-center gap-10">
            <div className="flex flex-col items-center w-1/4">
              <span className="text-4xl uppercase">Prizes</span>
              <div className="flex flex-col gap-2 items-center justify-center border border-terminal-green w-full h-40 p-5">
                <div className="flex flex-col items-center">
                  <span className="text-xl">
                    1<sup className="text-sm">st</sup> - 3
                    <sup className="text-sm">rd</sup>
                  </span>
                  <div className="flex flex-row items-center gap-2">
                    <span className="text-xl uppercase">
                      Premium Prize pool
                    </span>
                    <span className="text-sm">(50%:30%:20%)</span>
                  </div>
                </div>
                <div className="flex flex-col items-center text-terminal-yellow">
                  <span className="text-xl">
                    1<sup className="text-sm">st</sup> - 20
                    <sup className="text-sm">th</sup>
                  </span>
                  <div className="flex flex-row items-center gap-2">
                    <span className="text-xl uppercase">
                      5 Dark Shuffle Games
                    </span>
                    <span className="text-sm">(Each)</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center w-1/2">
              <span className="text-4xl uppercase">Details</span>
              <div className="flex flex-col gap-2 border border-terminal-green w-full h-40 p-5">
                <div className="flex flex-row justify-between text-2xl">
                  <span className="uppercase">Duration:</span>
                  <span>72 Hours</span>
                </div>
                <div className="flex flex-row justify-between text-2xl">
                  <span className="uppercase">Starts:</span>
                  <span>{startDate.toLocaleString()}</span>
                </div>
                <div className="flex flex-row justify-between text-2xl">
                  <span className="uppercase">Entry Fee:</span>
                  <div className="flex flex-row gap-2">
                    <span className="flex flex-row items-center gap-2 fill-current">
                      5
                      <span className="w-5 h-5">
                        <LORDS />
                      </span>
                      <sup className="text-sm">To Enter</sup>
                    </span>
                    +
                    <span className="flex flex-row items-center gap-2 fill-current">
                      {(lordsCost ? lordsCost! / 10n ** 18n : 0).toString()}
                      <span className="w-5 h-5">
                        <LORDS />
                      </span>
                      <sup className="text-sm">Game Cost</sup>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <Button
              className="!w-60 !h-16 !text-2xl animate-pulse"
              onClick={() => {
                window.open(
                  `${networkConfig[network!].tournamentAppUrl}`,
                  "_blank"
                );
              }}
            >
              Register
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DarkShuffleOverview;
