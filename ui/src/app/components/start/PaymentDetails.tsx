import { QuestionMarkIcon } from "@/app/components/icons/Icons";
import { Adventurer } from "@/app/types";
import Image from "next/image";
import Eth from "public/icons/eth-3.svg";
import Lords from "public/icons/lords.svg";

export interface PaymentDetailsProps {
  adventurers: Adventurer[];
}

const PaymentTable = ({ adventurers }: { adventurers: Adventurer[] }) => {
  return (
    <div className="flex flex-col w-3/4 sm:w-full gap-2">
      <div className="flex flex-col border border-terminal-green b-5 bg-terminal-black text-terminal-green uppercase w-full">
        <span className="bg-terminal-green/75">
          <h1 className="m-0 p-1 sm:p-2 text-lg sm:text-2xl text-terminal-black">
            Cost $3.50
          </h1>
        </span>
        <div className="flex flex-row w-full justify-between p-2 border-t border-terminal-green">
          <div className="flex flex-row gap-2 items-center">
            <Image
              src={"/icons/1st.png"}
              alt="1st"
              width={15}
              height={15}
              className="w-3 h-5 sm:w-5 sm:h-8"
            />
            <p className="hidden sm:flex sm:text-2xl">
              1<sup className="text-sm">st</sup>
            </p>
            <p className="text-xs sm:text-lg whitespace-nowrap text-left text-ellipsis overflow-hidden">
              {adventurers[0]?.name ?? ""}
            </p>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <div className="flex flex-row gap-1 items-center">
              <Lords className="self-center w-3 h-3 sm:w-5 sm:h-5 fill-current" />
              <p className="sm:text-lg">$0.81</p>
            </div>
          </div>
        </div>
        <div className="flex flex-row w-full justify-between p-2 border-t border-terminal-green">
          <div className="flex flex-row gap-2 items-center">
            <Image
              src={"/icons/2nd.png"}
              alt="1st"
              width={15}
              height={15}
              className="w-3 h-5 sm:w-5 sm:h-8"
            />
            <p className="hidden sm:flex sm:text-2xl">
              2<sup className="text-sm">nd</sup>
            </p>
            <p className="text-xs sm:text-lg whitespace-nowrap text-left text-ellipsis overflow-hidden">
              {adventurers[1]?.name ?? ""}
            </p>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <div className="flex flex-row gap-1 items-center">
              <Lords className="self-center w-3 h-3 sm:w-5 sm:h-5 fill-current" />
              <p className="sm:text-lg">$0.48</p>
            </div>
          </div>
        </div>
        <div className="flex flex-row w-full justify-between p-2 border-t border-terminal-green">
          <div className="flex flex-row gap-2 items-center">
            <Image
              src={"/icons/3rd.png"}
              alt="1st"
              width={15}
              height={15}
              className="w-3 h-5 sm:w-5 sm:h-8"
            />
            <p className="hidden sm:flex sm:text-2xl">
              3<sup className="text-sm">rd</sup>
            </p>
            <p className="text-xs sm:text-lg whitespace-nowrap text-left text-ellipsis overflow-hidden">
              {adventurers[2]?.name ?? ""}
            </p>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <div className="flex flex-row gap-1 items-center">
              <Lords className="self-center w-3 h-3 sm:w-5 sm:h-5 fill-current" />
              <p className="sm:text-lg">$0.30</p>
            </div>
          </div>
        </div>
        <div className="flex flex-row w-full justify-between p-2 border-t border-terminal-green">
          <div className="flex flex-row gap-2 items-center">
            <Image
              src={"/icons/client.svg"}
              alt="client-provider"
              width={25}
              height={15}
              className="w-3 h-5 sm:w-6 sm:h-8"
            />
            <div className="flex flex-row gap-2 items-center">
              <p className="hidden sm:flex text-xs sm:text-base whitespace-nowrap text-left text-ellipsis overflow-hidden">
                Client Provider
              </p>
              <p className="sm:hidden text-xs sm:text-base whitespace-nowrap text-left text-ellipsis overflow-hidden">
                Client
              </p>
            </div>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <div className="flex flex-row gap-1 items-center">
              <Lords className="self-center w-3 h-3 sm:w-5 sm:h-5 fill-current" />
              <p className="sm:text-lg">$0.81</p>
            </div>
          </div>
        </div>
        <div className="flex flex-row w-full justify-between p-2 border-t border-terminal-green">
          <div className="flex flex-row gap-2 items-center">
            <Image
              src={"/icons/creator.svg"}
              alt="creator"
              width={25}
              height={15}
              className="w-3 h-5 sm:w-6 sm:h-8"
            />
            <p className="text-xs sm:text-base text-left text-ellipsis">
              <span className="text-xs sm:text-lg whitespace-nowrap">
                Creator
              </span>{" "}
            </p>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <div className="flex flex-row gap-1 items-center">
              <Lords className="self-center w-3 h-3 sm:w-5 sm:h-5 fill-current" />
              <p className="sm:text-lg">$0.60</p>
            </div>
          </div>
        </div>
        <div className="flex flex-row w-full justify-between p-2 border-t border-terminal-green">
          <div className="flex flex-row gap-2 items-center">
            <QuestionMarkIcon className="w-3 h-3 sm:h-5 sm:w-5" />
            <p className="text-xs sm:text-lg">Randomness</p>
          </div>
          <div className="flex flex-row sm:gap-1 items-center">
            <Eth className="self-center w-4 h-4 sm:w-6 sm:h-6 fill-current" />
            <p className="sm:text-lg">$0.50</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const PaymentDetails = ({ adventurers }: PaymentDetailsProps) => {
  return (
    <>
      <div
        className={`flex-col items-center justify-center sm:gap-10 gap-5 w-full no-text-shadow flex`}
      >
        <PaymentTable adventurers={adventurers} />
      </div>
    </>
  );
};

export default PaymentDetails;
