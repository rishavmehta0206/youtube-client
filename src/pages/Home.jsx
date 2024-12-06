import React, { useEffect, useRef, useState } from "react";
import Card from "../components/Card";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import './styles.css'

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
  const randomYoutubeTags = [
    "UnexpectedVibes",
    "RandomMoments",
    "WhatJustHappened",
    "SliderAdventures",
    "MindBlown",
    "ChaosMode",
    "TrendingNow",
    "TrendingNow",
    "TrendingNow",
    "TrendingNow",
    "TrendingNow",
    "TrendingNow",
    "TrendingNow",
    "TrendingNow",
    "TrendingNow",
    "TrendingNow",
    "TrendingNow",
    "TrendingNow",
    "TrendingNow",
    "TrendingNow",
    "TrendingNow",
    "TrendingNow",
    "TrendingNow",
    "TrendingNow",
  ];
  const scrollRef = useRef();
  useEffect(() => {
    // if (scrollRef.current) {
    //   console.log('Scroll Width:', scrollRef.current.scrollWidth);
    // console.log('Client Width:', scrollRef.current.clientWidth);
    //   scrollRef.current.scrollBy({
    //     left: 3000,
    //     behavior: 'smooth',
    //   });
    // }
  }, []);

  function scrollRight() {
    if (scrollRef.current) {
      console.log("Scroll Width:", scrollRef.current.scrollWidth);
      console.log("Client Width:", scrollRef.current.clientWidth);
      scrollRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  }
  function scrollLeft() {
    if (scrollRef.current) {
      console.log("Scroll Width:", scrollRef.current.scrollWidth);
      console.log("Client Width:", scrollRef.current.clientWidth);
      scrollRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    }
  }

  return (
    <div className="flex flex-col  py-[22px] px-[30px] overflow-x-hidden">
      <div className="w-full overflow-x-hidden mb-4 relative">
        <div className="relative w-full overflow-x-hidden mb-4  flex items-center">
          <button
            className="absolute left-0 px-2 bg-gradient-to-r from-[rgb(30,31,32)] to-transparent h-[70%] w-[70px] flex items-center justify-start text-white z-10"
            onClick={scrollLeft}
          >
            <FaChevronLeft />
          </button>

          <div
            ref={scrollRef}
            className="flex space-x-2 py-2 whitespace-nowrap overflow-x-auto scroll-container"
          >
            {randomYoutubeTags.map((tag, index) => (
              <span
                key={index}
              className="px-3 py-1 bg-[#272727] hover:bg-gray-500 text-white rounded-md text-sm cursor-pointer  transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>

          <button
            className="absolute right-0 px-2 bg-gradient-to-l from-[rgb(30,31,32)] to-transparent h-[70%] w-[70px] flex items-center justify-end text-white z-10"
            onClick={scrollRight}
          >
            <FaChevronRight />
          </button>
        </div>

      </div>
      <div className="flex w-full justify-between flex-wrap">
        {videos?.map((video) => (
          <Card key={video._id} {...video} />
        ))}
      </div>
    </div>
  );
};

export default Home;
