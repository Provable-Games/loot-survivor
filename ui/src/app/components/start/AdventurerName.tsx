import { FormData } from "@/app/types";
import { ChangeEvent, useState } from "react";

export interface AdventurerNameProps {
  setFormData: (data: FormData) => void;
  formData: FormData;
}

export const AdventurerName = ({
  setFormData,
  formData,
}: AdventurerNameProps) => {
  const [isMaxLength, setIsMaxLength] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value.slice(0, 31),
    });
    if (value.length >= 31) {
      setIsMaxLength(true);
    } else {
      setIsMaxLength(false);
    }
  };

  return (
    <>
      <div className="relative w-3/4 sm:w-1/3 flex flex-col items-center uppercase flex flex-col sm:gap-2">
        <p className="uppercase text-center text-2xl m-0 text-terminal-green/75 no-text-shadow">
          Name
        </p>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          className="p-1 h-12 w-full text-2xl bg-terminal-black border border-terminal-green animate-pulse transform"
          maxLength={31}
        />
        {isMaxLength && (
          <p className="absolute bottom-[-30px] text-red-500 no-text-shadow">
            MAX LENGTH!
          </p>
        )}
      </div>
    </>
  );
};
