import axios from "axios";

export const baseUrlCall = axios.create({
    baseURL: "https://tube-server.vercel.app/api/api",
  });