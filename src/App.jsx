import React from "react";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Video from "./pages/Video";
import Layout from "./pages/Layout";
import SignIn from "./pages/SignIn";
import Search from "./pages/Search";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/explore" element={<Home />} />
          <Route path="/video/:id" element={<Video />} />
        </Route>
      </Route>
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  );
};

export default App;
