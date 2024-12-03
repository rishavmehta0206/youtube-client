import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Card from "../components/Card";


const Search = () => {
  const [videos, setVideos] = useState([]);
  const query = useLocation().search;

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`https://tube-server.vercel.app/api/videos/search${query}`);
      setVideos(res.data);
    };
    fetchVideos();
  }, [query]);

  return <div className="flex justify-between flex-wrap py-[22px] px-[96px]">
    {videos.map(video=>(
      <Card key={video._id} {...video}/>
    ))}
  </div>;
};

export default Search;