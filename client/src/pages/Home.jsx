import { useEffect, useState } from "react";
import { FaUserCircle, FaCalendarAlt } from "react-icons/fa";
import { fetchRecentPosts } from "../service/postService";
import { Link } from "react-router-dom";

const Home = () => {
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const result = await fetchRecentPosts();
        setRecentPosts(result);
      } catch (err) {
        console.log(err);
        setError("Failed to load posts");
      } finally {
        setLoading(false); 
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to Blog Hub</h1>
          <p className="text-lg mb-6">
            Dive into the world of insightful articles and stay updated with the
            latest trends in technology and web development.
          </p>
          <Link
            to="/post"
            className="bg-white text-indigo-600 font-semibold py-2 px-6 rounded-full inline-flex items-center transition-transform transform hover:scale-105"
          >
            Create Now
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto mt-12 px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Latest Posts</h2>

        {loading ? (
          <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-gray-500 border-t-transparent rounded-full"></div>
        </div>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : recentPosts.length > 0 ? (
          <div className="space-y-12">
            {recentPosts.map((post) => (
              <article
                key={post._id}
                className="flex flex-col md:flex-row items-center gap-8 p-6 border-b border-gray-200 transition-transform transform hover:scale-105"
              >
                <img
                  src={post.image.url}
                  alt={post.title}
                  className="w-48 h-48 object-cover rounded-lg shadow-md"
                />

                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-800">
                    {post.title}
                  </h3>
                  <div className="flex items-center text-gray-600 mt-2">
                    <FaUserCircle className="mr-1" />
                    <span className="text-sm">{post.author.name}</span>
                    <span className="mx-2">|</span>
                    <FaCalendarAlt className="mr-1" />
                    <span className="text-sm">
                      {new Date(post.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <p className="mt-4 text-gray-700 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <Link
                    to={`/blog/${post._id}`}
                    className="inline-block mt-4 text-indigo-600 hover:underline"
                  >
                    Read More
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No posts available</p>
        )}
      </section>
    </div>
  );
};

export default Home;