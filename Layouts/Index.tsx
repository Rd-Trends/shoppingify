import React, { useState } from "react";

import Nav from "./Nav";
import SideBar from "./Sidebar/Index";

interface props {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: props) => {
  return (
    <div className=" bg-body_bg h-full flex justify-between">
      <Nav />
      <div className="w-[calc(100%-3.5rem)] lg:w-[calc(100%-5rem-20rem)]">
        {children}
      </div>
      <SideBar />
    </div>
  );
};

export default DashboardLayout;
