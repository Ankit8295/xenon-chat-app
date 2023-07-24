import { FieldError, UseFormRegister } from "react-hook-form";

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
    <label className="w-full">
      {label && <p className="flex justify-between gap-2 w-full">{label}</p>}
      <input
        type={type}
        className="border border-hero text-base text-black flex-1 w-full rounded p-2 active:outline-hero focus:outline-hero"
        {...register(registerValue, {
          required: registerReq,
        })}
        placeholder={placeholder}
      />
      {error && <span className="text-red-500">{error.toString()}</span>}
    </label>
  );
}
