import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface BtnProps {
  tag?: React.ElementType;
  className?: string;
  id: string;
  label: string;
  showLabel: boolean;
  [x: string]: any;
}

const Input = React.forwardRef(
  (
    {
      children,
      tag,
      label,
      className = "",
      id,
      showLabel = true,
      ...restProps
    }: BtnProps,
    ref
  ) => {
    let Tag = tag ? tag : "input";

    return (
      <div className=" w-full">
        {showLabel ? (
          <label
            htmlFor={id}
            className="block text-font-color text-sm font-medium mb-1"
          >
            {label}
          </label>
        ) : null}
        <Tag
          {...restProps}
          className={` border border-[#BDBDBD] rounded-md py-2 px-4 text-font-color bg-transparent w-full placeholder:text-[#BDBDBD] outline-none ${
            className ? className : ""
          }`}
          ref={ref}
          id={id}
        ></Tag>
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
