import React from "react";

interface props {
  [x: string]: any;
}

const CheckBox = ({ ...attributes }: props) => {
  return (
    <label className="block mr-[24px] relative select-none">
      <input type="checkbox" className="checkbox" {...attributes} />
      <span className="checkmark"></span>
    </label>
  );
};

export default CheckBox;
