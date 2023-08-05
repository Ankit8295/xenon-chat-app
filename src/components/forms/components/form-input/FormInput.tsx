import { UseFormRegister } from "react-hook-form";

type Props = {
  label?: string;
  registerValue: string;
  registerReq?: boolean;
  error?: string;
  register: UseFormRegister<any>;
  placeholder?: string;
  type: "text" | "search" | "email" | "password";
};
export default function FormInput({
  registerValue,
  registerReq = false,
  error,
  register,
  label,
  type,
  placeholder,
}: Props) {
  return (
    <label className="w-full relative">
      {label && <p className="flex justify-between gap-2 w-full">{label}</p>}
      <input
        type={type}
        className="border-b-2 border-primary_light/50  bg-bg_light dark:bg-bg_dark border-b-black/40  text-base outline-none transition-colors duration-300 text-black/80 dark:text-white flex-1 w-full p-1 "
        {...register(registerValue, {
          required: registerReq,
        })}
        placeholder={placeholder}
      />
      {error && (
        <span className="text-red-500 absolute left-0 top-full">
          {error.toString()}
        </span>
      )}
    </label>
  );
}
