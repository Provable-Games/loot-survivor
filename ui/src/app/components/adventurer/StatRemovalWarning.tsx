import { Button } from "@/app/components/buttons/Button";

interface StatRemovalWarningProps {
  statWarning: "charisma" | "vitality";
  handleConfirmAction: () => void;
}

export const StatRemovalWarning = ({
  statWarning,
  handleConfirmAction,
}: StatRemovalWarningProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-terminal-black border border-terminal-green p-4 max-w-md w-full">
        <div className="mb-4">
          <h1 className="text-xl font-bold uppercase">
            {statWarning} Removal Warning
          </h1>
        </div>
        {statWarning === "vitality" ? (
          <>
            <p className="mb-2">
              Removing vitality will reduce your max health by 15hp per point
              removed.
            </p>
            <p className="mb-2 uppercase">
              If your current health is larger than the new calculated max
              health, it will be lost and cannot be recovered.
            </p>
          </>
        ) : (
          <p className="mb-2">
            Removing charisma will increase market prices by 1 gold per point
            removed.
          </p>
        )}
        <div className="flex justify-end gap-2">
          <Button onClick={handleConfirmAction}>Confirm</Button>
        </div>
      </div>
    </div>
  );
};
