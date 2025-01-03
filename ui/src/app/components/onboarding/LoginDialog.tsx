import { Button } from "@/app/components/buttons/Button";
import { CloseIcon } from "@/app/components/icons/Icons";
import useUIStore from "@/app/hooks/useUIStore";
import { useConnect, useDisconnect } from "@starknet-react/core";

export default function LoginDialog() {
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const setShowLoginDialog = useUIStore((state) => state.setShowLoginDialog);

  return (
    <>
      <div className="absolute inset-0 w-full h-full bg-black/50" />
      <div
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-terminal-black border border-terminal-green py-5 flex flex-col gap-2 w-full sm:w-1/4 p-5`}
      >
        <div className="flex relative text-4xl h-16 w-full font-bold uppercase items-center justify-center">
          <p className="text-center">Select Wallet</p>
          <span
            className="absolute top-2 right-2 w-10 h-10 text-terminal-green cursor-pointer"
            onClick={() => setShowLoginDialog(false)}
          >
            <CloseIcon />
          </span>
        </div>
        {connectors.map((connector, index) => (
          <Button
            size={"lg"}
            onClick={() => {
              disconnect();
              connect({ connector });
              setShowLoginDialog(false);
            }}
            key={index}
          >
            {`Login With ${connector.id}`}
          </Button>
        ))}
      </div>
    </>
  );
}
