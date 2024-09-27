import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBlogDetails } from "../service/postService"; 
import { FaUserCircle, FaCalendarAlt } from "react-icons/fa";
import ContentRenderer from "../components/ContentRenderer";

const Blog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetchBlogDetails(id); 
        setBlog(response);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-gray-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!blog) {
    return <div className="text-center mt-20 text-xl">Blog not found</div>;
  }

  const postDate = new Date(blog.createdAt);
  const formattedDate = `${String(postDate.getDate()).padStart(2, '0')}-${String(postDate.getMonth() + 1).padStart(2, '0')}-${postDate.getFullYear()}`;
  const formattedTime = postDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }); // e.g., '10:30 AM'

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      {/* Blog Header Section */}
      <header className="mb-12 max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 leading-tight text-center">
          {blog.title}
        </h1>
        
        <div className="flex justify-center items-center mt-4 space-x-4 text-gray-600">
          <div className="flex items-center">
            <FaUserCircle className="mr-1 text-primary text-lg" />
            <span className="text-sm">{blog.author.name}</span>
          </div>
          <div className="flex items-center">
            <FaCalendarAlt className="mr-1 text-primary text-lg" />
            <span className="text-sm">{formattedDate} at {formattedTime}</span>
          </div>
        </div>
      </header>
      
      {blog.image && (
        <div className="max-w-4xl mx-auto mb-12">
          <img
            src={blog.image.url}
            alt={blog.title}
            className="w-full h-[500px] object-cover rounded-lg shadow-lg"
          />
        </div>
      )}

      <main className="max-w-4xl mx-auto">
        <section className="bg-white px-8 py-10 rounded-lg shadow-md">
         <ContentRenderer content={blog.description}/>
        </section>
      </main>
    </div>
  );
};

export default Blog;
