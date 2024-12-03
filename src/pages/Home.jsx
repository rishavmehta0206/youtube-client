import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Home = () => {
  const [videos, setVideos] = useState(null);
  const location = useLocation();
  useEffect(() => {
    fetchVideos();
  }, [location.pathname]);
  async function fetchVideos() {
    const endPoint = {
      "/": "random",
      "/explore": "trend",
    };
    try {
      const response = await axios.get(
        `https://tube-server.vercel.app/api/videos/${endPoint[location.pathname]}`
      );
      const data = response.data;
      setVideos(data);
    } catch (error) {}
  }
  return (
    <div className="flex w-full justify-between flex-wrap py-[22px] px-[30px]">
      {videos?.map((video) => (
        <Card key={video._id} {...video} />
      ))}
    </div>
  );
};

export default Home;
