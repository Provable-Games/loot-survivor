import { Button } from "@/app/components/buttons/Button";

interface BeastSwapWarningProps {
  handleConfirmAction: () => void;
}

export const BeastSwapWarning = ({
  handleConfirmAction,
}: BeastSwapWarningProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-terminal-black border border-terminal-green p-4 max-w-md w-full">
        <div className="mb-4">
          <h1 className="text-xl font-bold uppercase">Beast Attack Warning</h1>
        </div>
        <p className="mb-2">
          Swapping an item during a beast battle will result in a beast counter
          attack.
        </p>
        <p className="mb-2 uppercase">
          Swap multiple items together to avoid multiple attacks.
        </p>
        <div className="flex justify-end gap-2">
          <Button onClick={handleConfirmAction}>Confirm</Button>
        </div>
      </div>
    </div>
  );
};
