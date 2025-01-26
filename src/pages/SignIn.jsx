import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../reducer/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [img, setImg] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [formType, setFormType] = useState("login");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const uploadFile = async (file) => {
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "videosharing");
        formData.append("cloud_name", "deklig5em");

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/deklig5em/image/upload`,
          { method: "POST", body: formData }
        );

        const data = await response.json();
        setImg(data.secure_url);
      } catch (error) {
        setErrorMessage("Error uploading image");
      }
    }
  };

  async function userLogin() {
    dispatch(loginStart());
    setLoading(true);
    setErrorMessage("");
    try {
      const { data } = await axios.post(
        "https://tube-server.vercel.app/api/auth/signin",
        { email, password }
      );
      localStorage.setItem("user", JSON.stringify(data));
      dispatch(loginSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(loginFailure());
      setErrorMessage(error.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  }

  async function userRegister() {
    setLoading(true);
    setErrorMessage("");
    if (!name || !email || !password) {
      setErrorMessage("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      if (image) await uploadFile(image);
      await axios.post(
        "https://tube-server.vercel.app/api/auth/signup",
        { name, email, password, img }
      );
      setFormType("login");
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
      setName("");
      setEmail("");
      setPassword("");
      setImage(null);
    }
  }

  useEffect(() => {
    if (image) uploadFile(image);
  }, [image]);

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="rounded-md text-white p-4 bg-[#1e1f20]">
        {formType === "login" ? (
          <div className="flex w-[900px] h-[320px] p-4 relative">
            <div className="flex-1">
              <div className="text-4xl mb-7 font-semibold">YourTube</div>
              <p className="text-4xl mb-4">Sign In to YourTube</p>
            </div>
            <div className="flex-1 flex flex-col gap-4">
              <input
                type="text"
                placeholder="Email"
                className="border bg-transparent p-2 rounded-sm"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="border bg-transparent p-2 rounded-sm"
                onChange={(e) => setPassword(e.target.value)}
              />
              {errorMessage && (
                <p className="text-red-500 text-sm">{errorMessage}</p>
              )}
              <button
                onClick={userLogin}
                className="bg-blue-600 rounded-3xl px-4 py-2"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Sign In"}
              </button>
              <p>
                Don't have an account?{" "}
                <span
                  className="text-blue-400 cursor-pointer"
                  onClick={() => setFormType("register")}
                >
                  Sign Up
                </span>
              </p>
            </div>
          </div>
        ) : (
          <div className="flex w-[900px] h-[420px] p-4 relative">
            <div className="flex-1">
              <div className="text-4xl mb-7 font-semibold">YourTube</div>
              <p className="text-4xl mb-4">Create a YourTube Account</p>
            </div>
            <div className="flex-1 flex flex-col gap-4">
              <input
                type="text"
                placeholder="Username"
                className="border bg-transparent p-2 rounded-sm"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Email"
                className="border bg-transparent p-2 rounded-sm"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="border bg-transparent p-2 rounded-sm"
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="file"
                accept="image/*"
                className="border bg-transparent p-2 rounded-sm"
                onChange={(e) => setImage(e.target.files[0])}
              />
              {errorMessage && (
                <p className="text-red-500 text-sm">{errorMessage}</p>
              )}
              <button
                onClick={userRegister}
                className="bg-blue-600 rounded-3xl px-4 py-2"
                disabled={loading}
              >
                {loading ? "Signing up..." : "Sign Up"}
              </button>
              <p>
                Already have an account?{" "}
                <span
                  className="text-blue-400 cursor-pointer"
                  onClick={() => setFormType("login")}
                >
                  Sign In
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignIn;
