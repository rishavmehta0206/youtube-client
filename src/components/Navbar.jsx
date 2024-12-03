import React, { useState } from "react";
import { FaBell, FaSearch } from "react-icons/fa";
import { IoPersonCircleOutline, IoVideocam } from "react-icons/io5";
import { MdVideoCameraFront } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Upload from "./Upload";

const Navbar = ({setOpen}) => {
  const { currentUser } = useSelector((state) => state.user);
  const [q,setQ] = useState('');
  const navigate = useNavigate();
  console.log(currentUser);
  return (
    <div className="sticky top-0  text-white px-6 bg-[#1e1f20] z-[999]">
      <div className="relative">
        <div className="flex items-center py-4 px-2  justify-end relative">
          <div className=" text-white absolute left-0 right-0 m-auto flex px-6 py-3 items-center border rounded-3xl border-gray-400  w-[40%]">
            <input
            value={q}
              type="text"
              className="w-full outline-none bg-transparent"
              placeholder="Search"
              onChange={(e) => setQ(e.target.value)}
            />
            <FaSearch onClick={()=>navigate(`/search?q=${q}`)}  className=" cursor-pointer" />
          </div>
          {currentUser ? (
            <div className="flex items-center gap-[20px] font-semibold">
              <MdVideoCameraFront className=" cursor-pointer" size={30} onClick={() => setOpen(true)} />
              {/* {currentUser?.name} */}
              <FaBell size={22}/>
              <img src={currentUser?.img} className="min-w-[36px] cursor-pointer max-w-[36px] h-[36px] object-fill rounded-full bg-gray-500" />
            </div>
          ) : (
            <Link
              to="/signin"
              className="flex cursor-pointer items-center gap-[10px] rounded-md py-1 px-4 w-fit border border-blue-500 text-blue-500"
            >
              <IoPersonCircleOutline />
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
