import React, { useEffect, useState } from "react";
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from "react-icons/ai";
import { CiSaveDown1 } from "react-icons/ci";
import { FaShare } from "react-icons/fa";
import Comments from "../components/Comments";
import Card from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { dislike, fetchSuccess, like, views } from "../reducer/videoSlice";
import { format } from "timeago.js";
import { subscription } from "../reducer/userSlice";
import Recommendations from "../components/Recommendations";

const Video = () => {
  const { currentVideo } = useSelector((state) => state.video);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const [channel, setChannel] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [videoId, setVideoId] = useState(location.pathname.split("/").pop());

  useEffect(() => {
    (async () => {
      await axios.put(`https://tube-server.vercel.app/api/videos/view/${videoId}`);
      dispatch(views());
    })();
  }, [videoId]);

  useEffect(() => {
    // let videoId = location.pathname.split("/").pop();
    (async () => {
      try {
        let { data: videoData } = await axios.get(
          `https://tube-server.vercel.app/api/videos/find/${videoId}`
        );
        let { data: channelData } = await axios.get(
          `https://tube-server.vercel.app/api/users/find/${videoData.userId}`
        );
        let { data: loggedInUser } = await axios.get(
          `https://tube-server.vercel.app/api/users/find/${currentUser?._id}`
        );
        setChannel(channelData);
        dispatch(fetchSuccess(videoData));
        setLoggedInUser(loggedInUser);
      } catch (error) {}
    })();
  }, [location, dispatch, videoId]);

  async function handleLike() {
    try {
      await axios.put(
        `https://tube-server.vercel.app/api/users/like/${currentVideo?._id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser.token}`,
          },
          withCredentials: true,
        }
      );
      dispatch(like(currentUser?._id));
    } catch (error) {
      console.error("Like request failed", error);
    }
  }

  async function handleDislike() {
    try {
      await axios.put(
        `https://tube-server.vercel.app/api/users/dislike/${currentVideo?._id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser.token}`,
          },
          withCredentials: true,
        }
      );
      dispatch(dislike(currentUser?._id));
    } catch (error) {}
  }

  console.log(currentUser, currentUser?.subscribedUsers, channel?._id);
  const handleSub = async () => {
    loggedInUser.subscribedUsers.includes(channel?._id)
      ? await axios.put(
          `https://tube-server.vercel.app/api/users/unsub/${channel?._id}`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${currentUser?.token}`,
            },
            withCredentials: true,
          }
        )
      : await axios.put(
          `https://tube-server.vercel.app/api/users/sub/${channel?._id}`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${currentUser?.token}`,
            },
            withCredentials: true,
          }
        );
    let { data } = await axios.get(
      `https://tube-server.vercel.app/api/users/find/${currentUser?._id}`
    );
    // console.log('user',user)
    dispatch(subscription(channel?._id));
  };
  console.log(currentVideo)

  return (
    <div className="flex gap-[24px] py-[22px] px-[30px] text-white">
      <div
        style={{
          flex: "5",
        }}
      >
        <div className="">
          {/* <iframe
            width="100%"
            height="720"
            src="https://www.youtube.com/embed/eocEm1rs_CY"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe> */}
          <video
            className="max-h-[720px] w-full object-cover"
            controls
            src={currentVideo?.videoUrl}
          ></video>
        </div>
        <h1 className=" text-[18px] font-bold mt-[20px] mb-[10px]">
          {currentVideo?.title}
        </h1>
        <div className="flex items-center justify-between">
          <span className="">
            {currentVideo?.views} views . {format(currentVideo?.createdAt)}
          </span>
          <div className="flex gap-[20px]">
            <div
              onClick={handleLike}
              className="flex items-center gap-1 cursor-pointer"
            >
              {currentVideo?.likes.includes(currentUser?._id) ? (
                <AiFillLike size={20} />
              ) : (
                <AiOutlineLike size={20} />
              )}
              {currentVideo?.likes?.length}
            </div>
            <div
              onClick={handleDislike}
              className="flex items-center gap-1 cursor-pointer"
            >
              {currentVideo?.dislikes.includes(currentUser?._id) ? (
                <AiFillDislike size={20} />
              ) : (
                <AiOutlineDislike size={20} />
              )}
              {currentVideo?.dislikes?.length}
            </div>
            <div className="flex items-center gap-1 cursor-pointer">
              <FaShare size={20} />
              Share
            </div>
            {/* <div className="flex items-center gap-1 cursor-pointer">
              <CiSaveDown1  size={20}/>
              Save
            </div> */}
          </div>
        </div>
        <div style={{
          borderBottom:'0.1px solid lightgray'
        }} className=" my-[10px] " />
        <div className="flex justify-between items-start">
          <div className="flex gap-3 items-start">
            <img
              className="min-w-[50px] max-w-[50px] h-[50px] rounded-full object-cover"
              src={channel?.img}
              alt=""
            />
            <div className="flex gap-[7px] flex-col">
              <div className="flex  flex-col">
                <span className="font-semibold">{channel?.name}</span>
                <span className="font-semibold">
                  {channel?.subscribers} subscribers
                </span>
              </div>
              <p>{currentVideo?.desc}</p>
            </div>
          </div>
          <div
            onClick={handleSub}
            className="text-white flex items-center justify-center bg-red-500 w-max cursor-pointer rounded-sm py-2 px-4 font-semibold uppercase"
          >
            {currentUser?.subscribedUsers?.includes(channel?._id)
              ? "SUBSCRIBED"
              : "SUBSCRIBE"}
          </div>
        </div>
        <div style={{
          borderBottom:'0.1px solid lightgray'
        }} className=" my-[30px]" />
        <Comments videoId={currentVideo?._id} />
      </div>
      <div
        className="top-0 sticky"
        style={{
          flex: "2",
          position: "sticky",
          top: "0",
        }}
      >
        <Recommendations tags={currentVideo?.tags} />
        {/* <Card type="video" />
        <Card type="video" />
        <Card type="video" />
        <Card type="video" />
        <Card type="video" />
        <Card type="video" />
        <Card type="video" />
        <Card type="video" />
        <Card type="video" />
        <Card type="video" />
        <Card type="video" />
        <Card type="video" />
        <Card type="video" />
        <Card type="video" />
        <Card type="video" />
        <Card type="video" />
        <Card type="video" /> */}
      </div>
    </div>
  );
};

export default Video;
