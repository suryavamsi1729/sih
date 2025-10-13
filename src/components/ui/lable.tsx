import React from "react";

export type LabelProps = {
  htmlFor?: string;
  lable: string;
  required?: boolean;
  className?: string;
};

const Label: React.FC<LabelProps> = ({ htmlFor, lable, required = false, className = "" }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`block text-xl font-semibold text-white ${className}`}
    >
      {lable}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
  );
};

export default Label;
