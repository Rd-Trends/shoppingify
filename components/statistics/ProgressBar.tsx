import React from "react";

interface props {
  name: string;
  quantity: number;
  totalQuantity: number;
  color: "yellow" | "cyan";
}

const ProgressBar = ({ name, quantity, totalQuantity, color }: props) => {
  const percentage = (quantity / totalQuantity) * 100;
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm md:text-base font-medium">{name}</p>
        <p className=" text-lg font-medium">{percentage.toFixed(0)}%</p>
      </div>
      <div className="w-full h-[6px] rounded-full bg-[#E0E0E0]">
        <div
          className={`h-full rounded-full ${
            color === "yellow" ? "bg-yellow" : "bg-cyan"
          }`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
