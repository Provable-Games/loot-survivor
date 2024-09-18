import { Button } from "@/app/components/buttons/Button";
import { payouts } from "@/app/lib/constants";
import { Adventurer } from "@/app/types";
import Eth from "public/icons/eth-3.svg";
import Lords from "public/icons/lords.svg";

export interface PaymentDetailsProps {
  adventurers: Adventurer[];
  showPaymentDetails: boolean;
}

const PaymentTable = ({ adventurers }: { adventurers: Adventurer[] }) => {
  return (
    <>
      <div className="flex flex-col border border-terminal-green b-5 bg-terminal-black uppercase w-full">
        <h1 className="m-0 p-2 text-lg sm:text-2xl">Game Prices</h1>
        <div className="flex flex-row w-full justify-between p-2 border-t border-terminal-green">
          <div className="flex flex-row gap-2 items-center">
            <p className="sm:text-2xl">Base Fee</p>
            <p className="text-xs sm:text-base text-terminal-green/50">
              Paid Now
            </p>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <Button size={"xxs"} className="bg-terminal-green/75 h-full">
              Update Price
            </Button>
            <span className="flex flex-row gap-1 items-center">
              <Lords className="self-center sm:w-5 sm:h-5  h-3 w-3 fill-current" />
              <p className="sm:text-xl">59</p>
            </span>
            <p className="text-lg">(~ $3.00)</p>
          </div>
        </div>
        <div className="flex flex-row w-full justify-between p-2 border-t border-terminal-green">
          <div className="flex flex-row gap-2 items-center">
            <p className="sm:text-2xl">Randomness</p>
            <p className="text-xs sm:text-base text-terminal-green/50">
              Paid Now
            </p>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <Eth className="self-center sm:w-6 sm:h-6  h-4 w-4 fill-current" />
            <p className="text-lg">$0.50</p>
          </div>
        </div>
        <div className="flex flex-row w-full justify-between p-2 border-t border-terminal-green">
          <div className="flex flex-row gap-2 items-center">
            <p className="sm:text-2xl">Gas</p>
            <p className="text-xs sm:text-base text-terminal-green/50">
              Paid Later
            </p>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <p className="text-sm sm:text-lg text-terminal-green/50">
              Estimated
            </p>
            <Eth className="self-center sm:w-6 sm:h-6  h-4 w-4 fill-current" />
            <p className="text-sm sm:text-lg">$0.10</p>
          </div>
        </div>
        <div className="flex flex-row w-full justify-between p-2 border-t border-terminal-green bg-terminal-green/75 text-terminal-black">
          <p className="sm:text-2xl">Total</p>
          <p className="sm:text-2xl">~ $3.60</p>
        </div>
      </div>
      <div className="flex flex-col border border-terminal-green b-5 bg-terminal-black text-terminal-green uppercase w-full">
        <h1 className="m-0 p-2 text-2xl">Payouts</h1>
        <div className="flex flex-row w-full justify-between p-2 border-t border-terminal-green">
          <div className="flex flex-row gap-2 items-center">
            <p className="sm:text-2xl">
              1<sup className="text-sm">st</sup>
            </p>
            <p className="text-lg whitespace-nowrap text-left text-ellipsis overflow-hidden w-40">
              {adventurers[0]?.name ?? ""}
            </p>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <p className="text-terminal-green/50">{payouts.first * 100}%</p>
            <div className="flex flex-row gap-1 items-center">
              <Lords className="self-center sm:w-4 sm:h-4  h-3 w-3 fill-current" />
              <p>~ $0.81</p>
            </div>
          </div>
        </div>
        <div className="flex flex-row w-full justify-between p-2 border-t border-terminal-green">
          <div className="flex flex-row gap-2 items-center">
            <p className="sm:text-2xl">
              2<sup className="text-sm">nd</sup>
            </p>
            <p className="text-lg whitespace-nowrap text-left text-ellipsis overflow-hidden  w-40">
              {adventurers[1]?.name ?? ""}
            </p>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <p className="text-terminal-green/50">{payouts.second * 100}%</p>
            <div className="flex flex-row gap-1 items-center">
              <Lords className="self-center sm:w-4 sm:h-4  h-3 w-3 fill-current" />
              <p>~ $0.48</p>
            </div>
          </div>
        </div>
        <div className="flex flex-row w-full justify-between p-2 border-t border-terminal-green">
          <div className="flex flex-row gap-2 items-center">
            <p className="sm:text-2xl">
              3<sup className="text-sm">rd</sup>
            </p>
            <p className="text-lg whitespace-nowrap text-left text-ellipsis overflow-hidden w-40">
              {adventurers[2]?.name ?? ""}
            </p>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <p className="text-terminal-green/50">{payouts.third * 100}%</p>
            <div className="flex flex-row gap-1 items-center">
              <Lords className="self-center sm:w-4 sm:h-4  h-3 w-3 fill-current" />
              <p>~ $0.30</p>
            </div>
          </div>
        </div>
        <div className="flex flex-row w-full justify-between p-2 border-t border-terminal-green">
          <div className="flex flex-row gap-2 items-center">
            <p className="text-lg w-48 sm:w-60 whitespace-nowrap text-left text-ellipsis overflow-hidden">
              Client Provider{" "}
              <sub className="hidden sm:flex text-xs">
                PG + Biblio + BT + Await
              </sub>
            </p>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <p className="text-terminal-green/50">
              {payouts.clientProvider * 100}%
            </p>
            <div className="flex flex-row gap-1 items-center">
              <Lords className="self-center sm:w-4 sm:h-4  h-3 w-3 fill-current" />
              <p>~ $0.81</p>
            </div>
          </div>
        </div>
        <div className="flex flex-row w-full justify-between p-2 border-t border-terminal-green">
          <div className="flex flex-row gap-2 items-center">
            <p className="sm:text-2xl w-40 sm:w-48 text-left text-ellipsis">
              <span className="whitespace-nowrap">Creator</span>{" "}
              <sub className="hidden sm:flex text-xs">
                Provable Games, Biblio
              </sub>
            </p>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <p className="text-terminal-green/50">{payouts.creator * 100}%</p>
            <div className="flex flex-row gap-1 items-center">
              <Lords className="self-center sm:w-4 sm:h-4  h-3 w-3 fill-current" />
              <p>~ $0.60</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const PaymentDetails = ({
  adventurers,
  showPaymentDetails,
}: PaymentDetailsProps) => {
  return (
    <>
      <div
        className={`flex-col items-center justify-center sm:gap-10 gap-5 w-1/4 no-text-shadow hidden sm:flex`}
      >
        <PaymentTable adventurers={adventurers} />
      </div>
      {showPaymentDetails && (
        <div
          className={`flex flex-col items-center justify-center sm:gap-10 gap-5 w-full no-text-shadow`}
        >
          <PaymentTable adventurers={adventurers} />
        </div>
      )}
    </>
  );
};

export default PaymentDetails;
