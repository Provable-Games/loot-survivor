import {
  DiscordIcon,
  LedgerIcon,
  LogoutIcon,
  SoundOffIcon,
  SoundOnIcon,
} from "@/app/components/icons/Icons";
import Menu from "@/app/components/menu/ButtonMenu";
import useAdventurerStore from "@/app/hooks/useAdventurerStore";
import { useQueriesStore } from "@/app/hooks/useQueryStore";
import useUIStore from "@/app/hooks/useUIStore";
import { ButtonData, NullAdventurer } from "@/app/types";
import { useDisconnect } from "@starknet-react/core";

export default function Settings() {
  const { disconnect } = useDisconnect();
  const resetData = useQueriesStore((state) => state.resetData);
  const setAdventurer = useAdventurerStore((state) => state.setAdventurer);
  const isMuted = useUIStore((state) => state.isMuted);
  const setIsMuted = useUIStore((state) => state.setIsMuted);
  const displayHistory = useUIStore((state) => state.displayHistory);
  const setDisplayHistory = useUIStore((state) => state.setDisplayHistory);
  const setDisconnected = useUIStore((state) => state.setDisconnected);
  const setNetwork = useUIStore((state) => state.setNetwork);
  const handleOffboarded = useUIStore((state) => state.handleOffboarded);

  const buttonsData: ButtonData[] = [
    {
      id: 1,
      label: "Play For Real",
      action: () => setDisconnected(false),
      disabled: true,
    },
    {
      id: 2,
      label: "Ledger",
      icon: <LedgerIcon />,
      action: () => setDisplayHistory(!displayHistory),
    },
    {
      id: 3,
      label: isMuted ? "Unmute" : "Mute",
      icon: isMuted ? (
        <SoundOffIcon className="fill-current" />
      ) : (
        <SoundOnIcon className="fill-current" />
      ),
      action: () => setIsMuted(!isMuted),
    },
    {
      id: 4,
      label: "Discord",
      icon: <DiscordIcon className="fill-current" />,
      action: () => window.open("https://discord.gg/realmsworld", "_blank"),
    },
    {
      id: 5,
      label: "Log Out",
      icon: <LogoutIcon className="fill-current" />,
      action: () => {
        disconnect();
        resetData();
        setAdventurer(NullAdventurer);
        setNetwork(undefined);
        handleOffboarded();
      },
    },
  ];

  return (
    <div className="flex flex-row  flex-wrap">
      <div className="flex flex-col sm:w-1/3 m-auto my-4 w-full px-8">
        <Menu
          buttonsData={buttonsData}
          onSelected={(value) => null}
          onEnterAction={true}
          className="flex-col"
        />
      </div>
    </div>
  );
}
