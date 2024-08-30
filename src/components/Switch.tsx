import { InputHTMLAttributes } from "react";

interface SwitchProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Switch: React.FC<SwitchProps> = ({ onChange, checked }) => {
  return (
    <>
      <label className="inline-flex items-center cursor-pointer">
        <input
          checked={checked}
          onChange={onChange}
          type="checkbox"
          value=""
          className="sr-only peer"
        />
        <div className="relative w-10 h-6 bg-neutral-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-neutral-800 after:content-[''] after:absolute after:top-1 after:start-1 after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-neutral-800"></div>
      </label>
    </>
  );
};
