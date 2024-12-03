import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { format } from "timeago.js";

const Recommendations = ({ tags }) => {
  console.log(tags);
  const { currentUser } = useSelector((state) => state.video);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(
        `https://tube-server.vercel.app/api/videos/tags?tags=${tags.join(",")}`
      );
      setVideos(res.data);
    };
    fetchVideos();
  }, [tags]);
  console.log(videos);
  return (
    <div className="flex flex-col gap-6 h-[140px] p-1">
      {videos?.map((video) => (
        <Recommendation video={video} />
      ))}
    </div>
  );
};

export default Recommendations;

function Recommendation({ video }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        let { data } = await axios.get(
          `https://tube-server.vercel.app/api/users/find/${video?.userId}`
        );
        setUser(data);
      } catch (error) {}
    })();
  }, [video?.userId]);

  return (
    <div key={video?._id} className="flex items-start gap-3">
      <img
        className="h-[120px] min-w-[160px] rounded-md object-cover"
        src={video?.imgUrl}
        alt="Video thumbnail"
      />
      <div className="flex flex-col justify-start h-full">
        <p>{video?.desc}</p>
        <span className="mt-[10px]">{user?.name}</span>
        <div className=" flex gap-3 text-gray-500 text-sm">
          <span>{video?.views} views</span>
          <span>{format(video?.createdAt)}</span>
        </div>
      </div>
    </div>
  );
}
