import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "timeago.js";

const Card = ({ imgUrl, title, views, createdAt, userId, _id }) => {
  const [channelInfo, setChannelInfo] = useState(null);

  useEffect(() => {
    getUserInfo();
  }, [userId]);

  async function getUserInfo() {
    try {
      let response = await axios.get(
        `https://tube-server.vercel.app/api/users/find/${userId}`
      );
      let { data } = response;
      setChannelInfo(data);
    } catch (error) {}
  }

  return (
    <Link to={`/video/${_id}`}>
      <div className="w-[360px] mb-[45px] cursor-pointer">
        <div className="relative">
          <img
            className="h-[202px] w-full object-cover rounded-md"
            src={imgUrl}
          />
          <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-sm text-xs">
            {views} views
          </div>
        </div>
        <div className="flex items-center gap-4 mt-3 text-white">
          <img
            className="h-[36px] w-[36px] rounded-full object-cover"
            src={channelInfo?.img}
          />
          <div>
            <h1 className="text-[16px] font-bold truncate">{title}</h1>
            <h2 className="text-[14px]  truncate">
              {channelInfo?.name}
            </h2>
            <div className="text-[14px] ">
              {format(createdAt)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;