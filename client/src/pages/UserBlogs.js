import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";

const UserBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getUserBlogs = async () => {
    try {
      const id = localStorage.getItem("userId");
      const { data } = await axios.get(`/api/v1/blog/user-blog/${id}`);
      if (data?.success) {
        setBlogs(data.userBlog.blogs);
      } else {
        setError("Failed to fetch user blogs");
      }
    } catch (error) {
      setError("An error occurred while fetching user blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserBlogs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => (
          <BlogCard
            key={blog?._id} // Ensure each child in a list has a unique `key` prop
            id={blog?._id}
            isUser={true}
            title={blog?.title}
            description={blog?.description}
            image={blog?.image}
            username={blog?.user.username}
            time={blog?.createdAt}
          />
        ))
      ) : (
        <h1>You haven't created a blog</h1>
      )}
    </div>
  );
};

export default UserBlogs;
