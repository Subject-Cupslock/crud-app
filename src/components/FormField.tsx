import React from "react";
import {
  FieldValues,
  Path,
  UseFormRegister,
  FieldError,
} from "react-hook-form";

type FormFieldProps<TFormValues extends FieldValues> = {
  name: Path<TFormValues>;
  label: string;
  register: UseFormRegister<TFormValues>;
  type?: "text" | "number" | "date" | "textarea" | "select";
  options?: { value: string; label: string }[];
  error?: FieldError;
};

export function FormField<TFormValues extends FieldValues>({
  name,
  label,
  register,
  type = "text",
  options,
  error,
}: FormFieldProps<TFormValues>) {
  return (
    <div className="mb-4">
      <label className="block mb-1 text-sm font-medium text-gray-700">
        {label}
      </label>

      {type === "textarea" ? (
        <textarea
          {...register(name)}
          className="w-full p-2 border resize-none"
        ></textarea>
      ) : type === "select" && options ? (
        <select {...register(name)} className="w-full p-2 border ">
          {options.map((opt) => (
            <option value={opt.value} key={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input type={type} {...register(name)} className="w-full p-2 border " />
      )}

      {error && <p className="mt-1 text-xs text-red-500">{error.message}</p>}
    </div>
  );
}
