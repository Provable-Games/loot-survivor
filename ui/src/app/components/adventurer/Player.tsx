import { BeastSwapWarning } from "@/app/components/adventurer/BeastSwapWarning";
import Info from "@/app/components/adventurer/Info";
import useAdventurerStore from "@/app/hooks/useAdventurerStore";
import useUIStore from "@/app/hooks/useUIStore";
import { useEffect, useState } from "react";
import { Contract } from "starknet";

interface PlayerProps {
  gameContract: Contract;
}

export default function Player({ gameContract }: PlayerProps) {
  const adventurer = useAdventurerStore((state) => state.adventurer);
  const equipItems = useUIStore((state) => state.equipItems);
  const hasBeast = useAdventurerStore((state) => state.computed.hasBeast);

  const [beastSwapWarning, setBeastSwapWarning] = useState<boolean>(false);

  useEffect(() => {
    if (equipItems.length > 0 && hasBeast) {
      setBeastSwapWarning(true);
    }
  }, [equipItems]);

  return (
    <>
      {beastSwapWarning && (
        <BeastSwapWarning
          handleConfirmAction={() => {
            setBeastSwapWarning(false);
          }}
        />
      )}
      {adventurer?.id ? (
        <Info adventurer={adventurer} gameContract={gameContract} />
      ) : (
        <div className="flex items-center justify-center">
          <p>Please select an adventurer!</p>
        </div>
      )}
    </>
  );
}
