import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center w-full h-full max-h-screen">
      <div className="loader-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
