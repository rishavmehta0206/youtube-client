// Layout.js
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Menu from "../components/Menu";
import Navbar from "../components/Navbar";
import Upload from "../components/Upload";

const Layout = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex bg-[#1e1f20] relative w-full">
      <Menu />
      <div className="w-full">
        <Navbar setOpen={setOpen} />
        <div className=" min-h-screen">
          <Outlet />
        </div>
      </div>
      {open && <Upload setOpen={setOpen} />}
    </div>
  );
};

export default Layout;
