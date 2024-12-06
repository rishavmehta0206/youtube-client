import React from "react";
import { CiSettings } from "react-icons/ci";
import {
  FaCompass,
  FaFlag,
  FaHistory,
  FaNewspaper,
  FaSun,
} from "react-icons/fa";
import { IoIosHelpCircle } from "react-icons/io";
import { IoHome, IoPersonCircleOutline } from "react-icons/io5";
import {
  MdLibraryAdd,
  MdLibraryMusic,
  MdOutlineLiveTv,
  MdOutlineSportsBasketball,
  MdSubscriptions,
} from "react-icons/md";
import { SiYoutubegaming } from "react-icons/si";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <div className="h-screen w-1/6 sticky top-0 overflow-y-auto  text-white ">
      <div className=" py-[18px] px-[16px]">
        <div className="flex font-bold text-2xl mb-6">Youtube</div>
        <Link to='/' className="flex items-center gap-[20px] cursor-pointer py-[7.5px]">
          <IoHome size={20} /> Home
        </Link>
        <Link to="/explore" className="flex items-center gap-[20px] cursor-pointer py-[7.5px]">
          <FaCompass size={20} /> Explore
        </Link>
        <div className="flex items-center gap-[20px] cursor-pointer py-[7.5px]">
          <MdSubscriptions size={20} /> Subscriptions
        </div>
        <div className=" my-[15px] border-b-[0.5px] border-b-gray-200" />
        <div className="flex items-center gap-[20px] cursor-pointer py-[7.5px]">
          <MdLibraryAdd size={20} /> Library
        </div>
        <div className="flex items-center gap-[20px] cursor-pointer py-[7.5px]">
          <FaHistory /> History
        </div>
        <div className=" my-[15px] border-b-[0.5px] border-b-gray-200" />
        <div className="">
            <p className="text-md ">Sign in to like videos,comment and subscribe.</p>
            <div className="flex cursor-pointer items-center gap-[10px] rounded-md py-2 px-4 w-fit border border-blue-500 text-blue-500">
                <IoPersonCircleOutline size={20} />
                Sign In
            </div>
        </div>
        <div className=" my-[15px] border-b-[0.5px] border-b-gray-200" />

        <h1 className="text-sm text-gray-500 font-semibold mb-4">BEST OF YOUTUBE</h1>
        <div className="flex items-center gap-[20px] cursor-pointer py-[7.5px]">
          <MdLibraryMusic size={20} /> Music
        </div>
        <div className="flex items-center gap-[20px] cursor-pointer py-[7.5px]">
          <MdOutlineSportsBasketball size={20} /> Sports
        </div>
        <div className="flex items-center gap-[20px] cursor-pointer py-[7.5px]">
          <SiYoutubegaming size={20}/> Gaming
        </div>
        <div className="flex items-center gap-[20px] cursor-pointer py-[7.5px]">
          <FaNewspaper size={20} /> News
        </div>
        <div className="flex items-center gap-[20px] cursor-pointer py-[7.5px]">
          <MdOutlineLiveTv size={20} /> News
        </div>
        <div className=" my-[15px] border-b-[0.5px] border-b-gray-200" />

        <div className="flex items-center gap-[20px] cursor-pointer py-[7.5px]">
          <CiSettings size={20} /> Settings
        </div>
        <div className="flex items-center gap-[20px] cursor-pointer py-[7.5px]">
          <FaFlag size={20} /> Reports
        </div>
        <div className="flex items-center gap-[20px] cursor-pointer py-[7.5px]">
          <IoIosHelpCircle size={20} /> Help
        </div>
        <div className="flex items-center gap-[20px] cursor-pointer py-[7.5px]">
          <FaSun size={20}/> Light Mode
        </div>
      </div>
    </div>
  );
};

export default Menu;
