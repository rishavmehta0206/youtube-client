import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../reducer/userSlice";
import { useNavigate } from "react-router-dom";
import { baseUrlCall } from "../utils/api";

const SignIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [img, setImg] = useState(null);
  const navigate = useNavigate();
  const [formType, setFormType] = useState("login");

  const uploadFile = async (file, urlType) => {
    if (file) {
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
        setImg(data.secure_url);
      } catch (error) {
        setImageLoader(false);
        setVideoLoader(false);
        console.error("Error uploading to Cloudinary:", error);
      }
    }
  };

  async function userLogin() {
    dispatch(loginStart());
    try {
      const { data } = await baseUrlCall.post(
        "/auth/signin",
        { email, password }
      );
      console.log(data);
      localStorage.setItem("user", JSON.stringify(data));
      dispatch(loginSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(loginFailure());
    }
  }

  useEffect(() => {
    image && uploadFile(image, "imgUrl");
  }, [image]);

  async function userRegister() {
    // dispatch(loginStart());
    try {
      await axios.post(
        "https://tube-server.vercel.app/api/auth/signup",
        { name, email, password, img }
      );
      //   console.log(data);
      //   localStorage.setItem("user", JSON.stringify(data));
      //   dispatch(loginSuccess(data));
      setFormType("login");
    } catch (error) {
      //   dispatch(loginFailure());
    }
  }

  return (
    <div className={`flex items-center justify-center h-screen bg-black`}>
      <div className="rounded-md  text-white p-2 bg-[#1e1f20] ">
        {formType === "login" ? (
          <div className="flex w-[900px] h-[420px] p-4 relative">
            <div className="flex-1">
              <div className="text-4xl mb-7 font-semibold">YourTube</div>
              <p className="text-4xl mb-4">Create A YourTube Account</p>
              <span>Enter email and password.</span>
            </div>
            <div className="flex-1 flex flex-col justify-center gap-4 ">
              <div className="flex flex-col gap-4 w-full relative mt-[-65px]">
                <input
                  onChange={(e) => setName(e.target.value)}
                  className="border w-full bg-transparent outline-none p-2 rounded-sm"
                  type="text"
                  placeholder="Enter username"
                />
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  className="border w-full bg-transparent outline-none p-2 rounded-sm"
                  type="text"
                  placeholder="Enter email"
                />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  className="border w-full bg-transparent outline-none p-2 rounded-sm"
                  type="text"
                  placeholder="Enter password"
                />
                <input
                  type="file"
                  accept="image/*"
                  className="border w-full border-soft text-text rounded-sm p-2.5 bg-transparent"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
              <p className="text-blue-400 font-thin">
                Already have an account?{" "}
                <span
                  onClick={() => setFormType("register")}
                  className=" font-bold cursor-pointer"
                >
                  Sign In
                </span>
              </p>
              <button
                onClick={userRegister}
                className="bg-blue-600 rounded-3xl  bottom-[20px] right-[20px] absolute w-fit  text-md text-white px-3 py-2  cursor-pointer"
              >
                Sign Up
              </button>
            </div>
          </div>
        ) : (
          <div className="flex w-[900px] h-[320px] p-4 relative">
            <div className="flex-1">
              <div className="text-4xl mb-7 font-semibold">YourTube</div>
              <p className="text-4xl mb-4">SignIn To Your YourTube Account</p>
              <span>Enter email and password.</span>
            </div>
            <div className="flex-1 flex flex-col justify-center gap-4 ">
              <div className="flex flex-col gap-4 w-full relative mt-[-65px]">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  className="border w-full bg-transparent outline-none p-2 rounded-sm"
                  type="text"
                  placeholder="Enter email"
                />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  className="border w-full bg-transparent outline-none p-2 rounded-sm"
                  type="text"
                  placeholder="Enter password"
                />
              </div>
              <p className="text-blue-400 font-thin">
                Dont have an account?{" "}
                <span
                  onClick={() => setFormType("login")}
                  className=" font-bold cursor-pointer"
                >
                  Sign Up
                </span>
              </p>
              <button
                onClick={userLogin}
                className="bg-blue-600 rounded-3xl  bottom-[20px] right-[20px] absolute w-fit  text-md text-white px-3 py-2  cursor-pointer"
              >
                Sign In
              </button>
            </div>
          </div>
        )}
        {/* <div className="flex flex-col items-center">
          <h1 className="font-bold text-4xl">SignIn</h1>
          <span className="text-xl font-semibold">To continue to YourTube</span>
          <div className="flex flex-col w-full p-4 gap-4">
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 outline-none p-2 rounded-sm"
              type="text"
              placeholder="Enter email"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 outline-none p-2 rounded-sm"
              type="text"
              placeholder="Enter password"
            />
            <button
              onClick={userLogin}
              className="bg-blue-600 w-fit mx-auto text-lg text-white px-3 py-2 rounded-sm cursor-pointer"
            >
              Sign In
            </button>
          </div>
        </div> */}
        {/* <div className="flex flex-col items-center">
          <h1 className="font-bold text-4xl">Or</h1>
          <div className="flex flex-col w-full p-4 gap-4">
            <input
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 outline-none p-2 rounded-sm"
              type="text"
              placeholder="Enter username"
            />
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 outline-none p-2 rounded-sm"
              type="text"
              placeholder="Enter email"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 outline-none p-2 rounded-sm"
              type="text"
              placeholder="Enter password"
            />
            <button className="bg-blue-600 w-fit mx-auto text-lg text-white px-3 py-2 rounded-sm cursor-pointer">
              Sign Up
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default SignIn;
