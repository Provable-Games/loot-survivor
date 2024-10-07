import { Adventurer } from "@/app/types";
import Image from "next/image";
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
          </div>
          <div className="flex flex-row gap-2 items-center">
            <span className="flex flex-row gap-1 items-center">
              <Lords className="self-center w-5 h-5 fill-current" />
            </span>
            <p className="text-lg">$3.00</p>
          </div>
        </div>
        <div className="flex flex-row w-full justify-between p-2 border-t border-terminal-green">
          <div className="flex flex-row gap-2 items-center">
            <p className="sm:text-2xl">Randomness</p>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <Eth className="self-center w-6 h-6 fill-current" />
            <p className="text-lg">$0.50</p>
          </div>
        </div>
        <div className="flex flex-row w-full justify-between p-2 border-t border-terminal-green bg-terminal-green/75 text-terminal-black">
          <p className="sm:text-2xl">Total</p>
          <p className="sm:text-2xl">$3.50</p>
        </div>
      </div>
      <div className="flex flex-col border border-terminal-green b-5 bg-terminal-black text-terminal-green uppercase w-full">
        <h1 className="m-0 p-2 text-2xl">Payouts</h1>
        <div className="flex flex-row w-full justify-between p-2 border-t border-terminal-green">
          <div className="flex flex-row gap-2 items-center">
            <Image src={"/icons/1st.png"} alt="1st" width={20} height={20} />
            <p className="sm:text-2xl">
              1<sup className="text-sm">st</sup>
            </p>
            <p className="text-lg whitespace-nowrap text-left text-ellipsis overflow-hidden">
              {adventurers[0]?.name ?? ""}
            </p>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <div className="flex flex-row gap-1 items-center">
              <Lords className="self-center w-5 h-5 fill-current" />
              <p>$0.81</p>
            </div>
          </div>
        </div>
        <div className="flex flex-row w-full justify-between p-2 border-t border-terminal-green">
          <div className="flex flex-row gap-2 items-center">
            <Image src={"/icons/2nd.png"} alt="1st" width={20} height={20} />
            <p className="sm:text-2xl">
              2<sup className="text-sm">nd</sup>
            </p>
            <p className="text-lg whitespace-nowrap text-left text-ellipsis overflow-hidden">
              {adventurers[1]?.name ?? ""}
            </p>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <div className="flex flex-row gap-1 items-center">
              <Lords className="self-center w-5 h-5 fill-current" />
              <p>$0.48</p>
            </div>
          </div>
        </div>
        <div className="flex flex-row w-full justify-between p-2 border-t border-terminal-green">
          <div className="flex flex-row gap-2 items-center">
            <Image src={"/icons/3rd.png"} alt="1st" width={20} height={20} />
            <p className="sm:text-2xl">
              3<sup className="text-sm">rd</sup>
            </p>
            <p className="text-lg whitespace-nowrap text-left text-ellipsis overflow-hidden">
              {adventurers[2]?.name ?? ""}
            </p>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <div className="flex flex-row gap-1 items-center">
              <Lords className="self-center w-5 h-5 fill-current" />
              <p>$0.30</p>
            </div>
          </div>
        </div>
        <div className="flex flex-row w-full justify-between p-2 border-t border-terminal-green">
          <div className="flex flex-row gap-2 items-center">
            <Image
              src={"/icons/client.svg"}
              alt="client-provider"
              width={30}
              height={20}
            />
            <div className="flex flex-row gap-2 items-center">
              <p className="text-lg whitespace-nowrap text-left text-ellipsis overflow-hidden">
                Client Provider{" "}
              </p>
            </div>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <div className="flex flex-row gap-1 items-center">
              <Lords className="self-center w-5 h-5 fill-current" />
              <p>$0.81</p>
            </div>
          </div>
        </div>
        <div className="flex flex-row w-full justify-between p-2 border-t border-terminal-green">
          <div className="flex flex-row gap-2 items-center">
            <Image
              src={"/icons/creator.svg"}
              alt="creator"
              width={30}
              height={20}
            />
            <p className="text-lg w-40 sm:w-48 text-left text-ellipsis">
              <span className="whitespace-nowrap">Creator</span>{" "}
            </p>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <div className="flex flex-row gap-1 items-center">
              <Lords className="self-center w-5 h-5 fill-current" />
              <p>$0.60</p>
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
        className={`flex-col items-center justify-center sm:gap-10 gap-5 w-full no-text-shadow hidden sm:flex`}
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
