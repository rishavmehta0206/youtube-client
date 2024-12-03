import React, { useEffect, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Cloudinary as CloudinaryCore } from "cloudinary-core";
// import { Cloudinary } from "cloudinary-react";
import { useSelector } from "react-redux";
import { MdFileUpload } from "react-icons/md";
import { ImCross } from "react-icons/im";
import Loader from "./Loader";

const Upload = ({ setOpen }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [img, setImg] = useState(undefined);
  const [video, setVideo] = useState(undefined);
  const [imgPerc, setImgPerc] = useState(0);
  const [videoPerc, setVideoPerc] = useState(0);
  const [inputs, setInputs] = useState({});
  const [tags, setTags] = useState([]);
  const [videoLoader, setVideoLoader] = useState(false);
  const [imageLoader, setImageLoader] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleTags = (e) => {
    setTags(e.target.value.split(",").map((tag) => tag.trim()));
  };

  const uploadFile = async (file, urlType) => {
    if (file) {
      if (urlType === "videoUrl") {
        setVideoLoader(true);
      } else {
        setImageLoader(true);
      }
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "videosharing");
        formData.append("cloud_name", "deklig5em");

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/deklig5em/${
            urlType === "videoUrl" ? "video" : "image"
          }/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();
        setInputs((prev) => {
          return { ...prev, [urlType]: data.secure_url };
        });
        setVideoLoader(false);
        setImageLoader(false);
      } catch (error) {
        setImageLoader(false);
        setVideoLoader(false);
        console.error("Error uploading to Cloudinary:", error);
      }
    }
  };

  useEffect(() => {
    video && uploadFile(video, "videoUrl");
  }, [video]);

  useEffect(() => {
    img && uploadFile(img, "imgUrl");
  }, [img]);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (imageLoader || videoLoader) {
      return;
    }
    try {
      const res = await axios.post(
        "https://tube-server.vercel.app/api/videos",
        { ...inputs,tags, userId: currentUser?._id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser?.token}`,
          },
          withCredentials: true,
        }
      );
      setOpen(false);
      if (res.status === 200) {
        navigate(`/video/${res.data._id}`);
      }
    } catch (error) {
      console.error("Error uploading video:", error);
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-80 z-[999]"></div>
      <div className="w-fit z-[1000] h-[600px] fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-[#1e1f20] p-4 text-white shadow-2xl  border-none  rounded-3xl flex items-center justify-center">
        <div className="w-[700px] h-[600px] bg-bgLighter text-text p-5 flex flex-col gap-5 relative">
          <div
            className="absolute top-3.5 right-2.5 cursor-pointer"
            onClick={() => setOpen(false)}
          >
            <ImCross size={13} className="text-white font-semibold" />
          </div>
          <h1 className="text-center font-light text-2xl ">
            Upload a New Video
          </h1>

          <label className="text-sm flex justify-between">
            Video:{" "}
            <div className="gap-3">
              {videoLoader && (
                <div className=" flex items-center">
                  Uploading Video... <Loader />
                </div>
              )}
            </div>
          </label>

          <input
            type="file"
            accept="video/*"
            className="border border-soft text-text rounded-sm p-2.5 bg-transparent z-[999]"
            onChange={(e) => setVideo(e.target.files[0])}
          />

          <input
            type="text"
            placeholder="Title"
            name="title"
            className="border border-soft text-text rounded-sm p-2.5 bg-transparent"
            onChange={handleChange}
          />

          <textarea
            placeholder="Description"
            name="desc"
            rows={8}
            className="border border-soft text-text rounded-sm p-2.5 bg-transparent"
            onChange={handleChange}
          />

          <input
            type="text"
            placeholder="Separate the tags with commas."
            className="border border-soft text-text rounded-sm p-2.5 bg-transparent"
            onChange={handleTags}
          />

          <label className="text-sm flex justify-between">
            Image:{" "}
            <div className="gap-3">
              {imageLoader && (
                <div className=" flex items-center">
                  Uploading Image... <Loader />
                </div>
              )}
            </div>
          </label>

          <input
            type="file"
            accept="image/*"
            className="border border-soft text-text rounded-sm p-2.5 bg-transparent"
            onChange={(e) => setImg(e.target.files[0])}
          />

          <button
            disabled={imageLoader || videoLoader}
            onClick={handleUpload}
            className="rounded-sm border-none p-2.5 flex gap-3 text-xl justify-center items-center font-medium cursor-pointer bg-soft text-textSoft"
          >
            <MdFileUpload size={20} /> Upload
          </button>
        </div>
      </div>
    </>
  );
};

export default Upload;
