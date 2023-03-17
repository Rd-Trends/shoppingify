import React from "react";

const Tooltip = ({ text }: { text: string }) => {
  return <span className="tooltip visible">{text}</span>;
};

export default Tooltip;
