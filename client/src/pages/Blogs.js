import React, { useState, useEffect } from 'react';
import axios from "axios";
import BlogCard from '../components/BlogCard';

const Blogs = () => {
  const [blogs, setBlogs] = useState(null); // Initialize as null to handle loading state
  const [error, setError] = useState(null);

  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get("/api/v1/blog/all-blog");
      if (data?.success) {
        setBlogs(data.blogs);
      } else {
        setError("Failed to fetch blogs");
      }
    } catch (error) {
      setError("An error occurred while fetching blogs");
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  if (blogs === null) {
    return <div>Loading...</div>; // Loading state
  }

  if (error) {
    return <div>{error}</div>; // Error state
  }

  return (
    <div>
      {blogs && blogs.length > 0 ? (
        blogs.map(blog => (
          <BlogCard
            key={blog?._id} // Ensure each BlogCard has a unique key prop
            id={blog?._id}
            isUser={localStorage.getItem("userId") === blog?.user?._id}
            title={blog?.title}
            description={blog?.description}
            image={blog?.image}
            username={blog?.user?.username}
            time={blog?.createdAt}
          />
        ))
      ) : (
        <h1>No blogs available</h1>
      )}
    </div>
  );
}

export default Blogs;
