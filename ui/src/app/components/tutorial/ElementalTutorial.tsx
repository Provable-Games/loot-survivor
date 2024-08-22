import { efficacyData } from "@/app/lib/constants";
import {
  MetalIcon,
  HideIcon,
  ClothIcon,
  BladeIcon,
  MagicIcon,
  BludgeonIcon,
} from "@/app/components/icons/Icons";

export const ElementalTutorial = () => {
  const renderElementStrength = (elementalStrength: string) => {
    return (
      <td
        className={`px-4 py-3 border border-terminal-green text-lg ${
          elementalStrength === "Strong"
            ? "text-terminal-green"
            : elementalStrength === "Fair"
            ? "text-terminal-yellow"
            : "text-red-500"
        }`}
      >
        {elementalStrength}
      </td>
    );
  };

  return (
    <div className="flex flex-col gap-2 uppercase items-center text-center h-full w-full">
      <h3 className="mt-0 uppercase text-terminal-yellow">Element Boosts</h3>
      <div className="flex flex-col gap-5 w-full sm:w-1/2">
        <table className="uppercase whitespace-nowrap border border-terminal-green text-sm">
          <thead>
            <tr className="text-l tracking-wide text-center border-b border-terminal-green ">
              <th className="px-4 py-3 border border-terminal-green sm:text-2xl">
                Weapon/Armor
              </th>
              <th className="border border-terminal-green sm:text-xl py-2">
                <span className="inline-flex items-center justify-center gap-2">
                  <MetalIcon className="w-6 h-6" />/ Metal
                </span>
              </th>
              <th className="border border-terminal-green sm:text-xl py-2">
                <span className="inline-flex items-center justify-center gap-2">
                  <HideIcon className="w-6 h-6" />/ Hide
                </span>
              </th>
              <th className="border border-terminal-green sm:text-xl py-2">
                <span className="inline-flex items-center justify-center gap-2">
                  <ClothIcon className="w-6 h-6" />/ Cloth
                </span>
              </th>
            </tr>
          </thead>
          <tbody className="border-terminal-green">
            {efficacyData.map((row, i) => (
              <tr key={i} className="text-terminal-green text-center">
                <>
                  <td className="px-4 py-3 border border-terminal-green sm:text-xl">
                    {row.weapon === "Blade" ? (
                      <span className="inline-flex items-center justify-center gap-2">
                        <BladeIcon className="w-6 h-6" />/ Blade
                      </span>
                    ) : row.weapon === "Bludgeon" ? (
                      <span className="inline-flex items-center justify-center gap-2">
                        <BludgeonIcon className="w-6 h-6" />/ Bludgeon
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center gap-2">
                        <MagicIcon className="w-6 h-6" />/ Magic
                      </span>
                    )}
                  </td>
                  {renderElementStrength(row.metal)}
                  {renderElementStrength(row.hide)}
                  {renderElementStrength(row.cloth)}
                </>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div></div>
    </div>
  );
};
