import {
  BladeIcon,
  BludgeonIcon,
  MagicIcon,
} from "@/app/components/icons/Icons";
import { FormData } from "@/app/types";

export interface WeaponSelectProps {
  setFormData: (data: FormData) => void;
  formData: FormData;
  handleBack: () => void;
  step: number;
  setStep: (step: number) => void;
}

export const WeaponSelect = ({
  setFormData,
  formData,
  handleBack,
  step,
  setStep,
}: WeaponSelectProps) => {
  const weapons = [
    {
      name: "Book",
      description: "Magic Weapon",
      image: "/weapons/book.png",
      icon: <MagicIcon />,
    },
    {
      name: "Wand",
      description: "Magic Weapon",
      image: "/weapons/wand.png",
      icon: <MagicIcon />,
    },
    {
      name: "Short Sword",
      description: "Blade Weapon",
      image: "/weapons/shortsword.png",
      icon: <BladeIcon />,
    },
    {
      name: "Club",
      description: "Bludgeon Weapon",
      image: "/weapons/club.png",
      icon: <BludgeonIcon />,
    },
  ];
  // const handleWeaponSelectionMobile = (weapon: string) => {
  //   setFormData({ ...formData, startingWeapon: weapon });
  //   setStep(step + 1);
  // };
  const handleWeaponSelectionDesktop = (weapon: string) => {
    setFormData({ ...formData, startingWeapon: weapon });
  };

  return (
    <div className="w-full flex flex-col items-center gap-2">
      <p className="uppercase text-2xl m-0 text-terminal-green/75 no-text-shadow">
        Choose Weapon
      </p>
      <div className="flex flex-row gap-2 h-full">
        {weapons.map((weapon) => (
          <div
            key={weapon.name}
            className={`flex flex-col gap-1 items-center justify-center w-20 sm:w-28 hover:cursor-pointer hover:bg-terminal-green hover:text-terminal-black p-1 sm:p-2 ${
              formData.startingWeapon == weapon.name
                ? "bg-terminal-green text-terminal-black"
                : "border border-terminal-green"
            }`}
            onClick={() => handleWeaponSelectionDesktop(weapon.name)}
          >
            <div className="w-4">{weapon.icon}</div>
            <p className="uppercase text-sm sm:text-lg">{weapon.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
