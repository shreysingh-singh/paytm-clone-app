import React from "react";

export function Inputbox({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  type = "text",
  error,
  disabled = false,
  required = false,
  className = "",
}) {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-slate-700 px-6"
        >
          {label}
          {required ? <span className="text-red-500 ml-1">*</span> : null}
        </label>
      )}

      <div className="px-6">
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`mt-1 block w-full rounded-md border bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm ${error ? "border-red-400" : "border-slate-200"}`}
        />
      </div>

      {error ? <p className="text-sm text-red-600 px-6 mt-1">{error}</p> : null}
    </div>
  );
}
