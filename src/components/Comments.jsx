import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import axios from "axios";
import { useSelector } from "react-redux";

const Comments = ({ videoId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [desc, setDesc] = useState("");
  const [allowComment, setAllowComment] = useState(false);
  async function fetchComments() {
    try {
      const { data } = await axios.get(
        `https://tube-server.vercel.app/api/comments/${videoId}`
      );
      setComments(data);
    } catch (error) {}
  }

  useEffect(() => {
    fetchComments();
  }, [videoId]);

  async function addNewComment() {
    try {
      let body = {
        userId: currentUser?._id,
        videoId,
        desc,
      };
      let addedComment = await axios.post(
        "https://tube-server.vercel.app/api/comments",
        body,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser?.token}`,
          },
          withCredentials: true,
        }
      );
      fetchComments();
    } catch (error) {}
  }

  return (
    <div className="">
      <div className="flex gap-[10px] items-start ">
        <img
          className="max-w-[50px] min-w-[50px] h-[50px] rounded-full"
          src="https://images.pexels.com/photos/28996347/pexels-photo-28996347/free-photo-of-vibrant-dahlia-flowers-in-glass-vases.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
        <div className="w-full">
          <input
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            onClick={() => setAllowComment(true)}
            className="outline-none border-b-[0.1px] w-full  border-b-white p-2 bg-transparent"
            type="text"
            placeholder="Add a comment..."
          />
          {allowComment && (
            <div className=" flex justify-end gap-4 mt-3">
              <button
                onClick={() => setAllowComment(false)}
                className="text-white hover:bg-gray-400 rounded-3xl p-2 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={addNewComment}
                className=" text-white bg-blue-500 rounded-3xl p-2 cursor-pointer"
              >
                Comment
              </button>
            </div>
          )}
        </div>
      </div>
      {comments?.map((comment) => (
        <Comment {...comment} />
      ))}
      {/* <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment /> */}
    </div>
  );
};

export default Comments;
