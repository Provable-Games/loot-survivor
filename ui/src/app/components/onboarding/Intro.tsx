import { Button } from "@/app/components/buttons/Button";
import Profile from "public/icons/profile.svg";
import QuestionMark from "public/icons/question-mark.svg";
import useUIStore from "@/app/hooks/useUIStore";
import { Connector } from "@starknet-react/core";
import { Account } from "starknet";

interface IntroProps {
  create: (
    connector: Connector,
    lordsAmount: number
  ) => Promise<Account | undefined>;
}

const Intro = ({ create }: IntroProps) => {
  const { setLoginScreen, setScreen, handleOnboarded } = useUIStore();
  return (
    <div className="flex flex-row mt-20 gap-10 justify-center items-center">
      <div className="flex flex-col items-center justify-between sm:border sm:border-terminal-green p-5 text-center gap-10 z-1 h-[500px] sm:h-[425px] 2xl:h-[500px] w-1/3">
        <h4 className="m-0 uppercase text-3xl">Login</h4>
        <Profile className="sm:hidden 2xl:block fill-current h-32" />
        <p className="text-xl">
          Dive into the full immersion of Loot Survivor by logging in now! Join
          the Mainnet for a chance to win real funds and exciting prizes.
        </p>
        <div className="flex flex-col gap-2">
          <Button size={"lg"} onClick={() => setLoginScreen(true)}>
            Login to Tesnet
          </Button>
          <Button size={"lg"} onClick={() => setLoginScreen(true)}>
            Login to Mainnet
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between sm:border sm:border-terminal-green p-5 text-center gap-10 z-1 h-[500px] sm:h-[425px] 2xl:h-[500px] w-1/3">
        <h4 className="m-0 uppercase text-3xl">Play As Guest</h4>
        <QuestionMark className="sm:hidden 2xl:block fill-current h-32" />
        <p className="text-xl">
          Looking for a hassle-free gaming experience? Play as a Guest, enjoying
          quick gameplay without any real funds or prizes involved.
        </p>
        <div className="flex flex-col gap-5">
          <Button
            size={"lg"}
            onClick={() => {
              setScreen("start");
              handleOnboarded();
            }}
          >
            Continue as Guest
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Intro;
