import axios from "axios";
import React, { useEffect, useState } from "react";
import { format } from "timeago.js";
const Comment = ({ desc, createdAt, userId }) => {
  const [channel, setChannel] = useState(null);
  async function fetchCommentUser() {
    try {
      let { data } = await axios.get(
        `https://tube-server.vercel.app/api/users/find/${userId}`
      );
      console.log(data)
      setChannel(data);
    } catch (error) {}
  }
  useEffect(() => {
    fetchCommentUser();
  }, [userId]);
  return (
    <div className="flex gap-[10px] my-[30px]">
      <img
        className="min-w-[50px] max-w-[50px] h-[50px] rounded-full"
        src={channel?.img}
        alt=""
      />
      <div className="flex flex-col gap-[10px]">
        <div className="flex items-center gap-3">
          <span>{channel?.name}</span>
          <span>{format(createdAt)}</span>
        </div>
        <p>{desc}</p>
      </div>
    </div>
  );
};

export default Comment;
