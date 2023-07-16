import { FieldError, UseFormRegister } from "react-hook-form";

type Props = {
  label?: string;
  registerValue: string;
  registerReq?: boolean;
  error?: string;
  register: UseFormRegister<any>;
  type?: string;
  inputType?: "textarea" | "input";
  placeholder?: string;
  row?: number;
  valueAsNum?: boolean;
  note?: string;
  disable?: boolean;
};
export default function FormInput({
  registerValue,
  registerReq = false,
  error,
  register,
  label,
  placeholder,
  type,
  inputType = "input",
  valueAsNum,
  note,
  row,
  disable,
}: Props) {
  if (inputType === "textarea")
    return (
      <label className="w-full">
        {label && (
          <p className="flex justify-between gap-2 w-full">
            <span className="font-medium">
              {label}
              {registerReq && <span className="text-red-500">*</span>}
            </span>
            {note && <i>{note}</i>}
          </p>
        )}
        <textarea
          className="border shadow-md text-base text-black  flex-1 w-full rounded p-2 active:outline-hero focus:outline-hero"
          rows={row}
          style={{ resize: "none" }}
          {...register(registerValue, {
            required: registerReq,
          })}
          placeholder={placeholder}
        />
        {error && <span className="text-red-500">{error.toString()}</span>}
      </label>
    );
  return (
    <label className="w-full">
      {label && (
        <p className="flex justify-between gap-2 w-full">
          <span className="font-medium">
            {label}
            {registerReq && <span className="text-red-500">*</span>}
          </span>
          {note && <i>{note}</i>}
        </p>
      )}
      <input
        className="border border-hero text-base text-black flex-1 w-full rounded p-2 active:outline-hero focus:outline-hero"
        type={type}
        {...register(registerValue, {
          required: registerReq,
          valueAsNumber: valueAsNum,
        })}
        disabled={disable}
        placeholder={placeholder}
        min={0}
      />
      {error && <span className="text-red-500">{error.toString()}</span>}
    </label>
  );
}
