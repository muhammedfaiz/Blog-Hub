import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DeletePost, GetMyPosts } from "../service/postService";
import { FaEdit, FaTrash } from "react-icons/fa";
import ConfirmationModal from "../components/ConfirmationModal";
import { toast } from "react-toastify";

const MyBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  const [change,setChange]=useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const result = await GetMyPosts();
        setBlogs(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [change]);

  const handleDelete = (id) => {
    setIsModalOpen(true);
    setSelectedBlogId(id);
  };

  const confirmDelete = async () => {
    const result = await DeletePost(selectedBlogId);
    if (result.status == 200) {
      setIsModalOpen(false);
      setChange(!change);
      toast.success(result.data.message,{theme:"dark"});
    }
  };

  const cancelDelete = () => {
    setIsModalOpen(false); 
    setSelectedBlogId(null); 
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-gray-500 border-t-transparent rounded-full"></div>
    </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-6">My Blogs</h1>

        {blogs.length === 0 ? (
          <p className="text-center text-gray-500">
            You have not created any blogs yet.
          </p>
        ) : (
          <div className="space-y-4">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="flex items-center bg-white rounded-lg shadow-sm p-4 hover:bg-gray-100 transition duration-300"
              >
                <div className="w-1/4 flex justify-center">
                  <img
                    src={blog.image.url}
                    alt={blog.title}
                    className="object-cover rounded-md w-full h-36"
                  />
                </div>
                {/* Blog Content */}
                <div className="w-3/4 ml-4">
                  <h2 className="text-xl font-bold text-gray-800">
                    <Link
                      to={`/blog/${blog._id}`}
                      className="hover:text-blue-600"
                    >
                      {blog.title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 text-sm mb-2 w-3/4">
                    {blog.description.substring(0, 150)}...
                  </p>
                  <div className="text-sm text-gray-500">
                    <span>
                      Published on:{" "}
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                {/* Edit and Delete Icons */}
                <div className="ml-4 flex flex-col items-center justify-center space-y-2">
                  <button
                    onClick={() => navigate("/edit-post/" + blog._id)}
                    className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300"
                    title="Edit"
                  >
                    <FaEdit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-300"
                    title="Delete"
                  >
                    <FaTrash size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        title="Confirm Deletion"
        message="Are you sure you want to delete this blog post?"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
};

export default MyBlog;
