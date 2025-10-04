import React from "react";

export const InputType = ({
  labelText,
  labelFor,
  inputType,
  name,
  value,
  onChange,
}) => {
  // decide autocomplete based on input type
  let autoCompleteValue = "off";

  if (inputType === "password") {
    autoCompleteValue =
      name === "password" ? "current-password" : "new-password";
  } else if (inputType === "email") {
    autoCompleteValue = "email";
  }

  return (
    <div className="mb-4">
      <label
        htmlFor={labelFor}
        className="block text-sm font-medium text-gray-700"
      >
        {labelText}
      </label>
      <input
        id={labelFor}
        type={inputType}
        name={name}
        value={value}
        onChange={onChange}
        autoComplete={autoCompleteValue}
        className="appearance-none block w-full px-3 py-2 border border-gray-300 
          rounded-md shadow-sm placeholder-gray-400 focus:outline-none 
          focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>
  );
};
