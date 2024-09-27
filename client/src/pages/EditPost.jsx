import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getPostById, updatePost } from "../service/postService";

const EditPost = () => {
  const { id } = useParams(); // Get post ID from URL parameters
  const navigate = useNavigate();

  const [post, setPost] = useState({
    title: "",
    description: "",
    image: null,
  });
  
  const [error, setError] = useState({
    title: "",
    description: "",
    image: "",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const result = await getPostById(id);
          setPost({
            title: result.title,
            description: result.description,
          });
          setImagePreview(result.image.url);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching post:", error);
        toast.error("Error fetching post data", { theme: "dark" });
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => ({ ...prev, [name]: value }));
    setError((prev) => ({ ...prev, [name]: "" })); 
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validImageTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
      if (!validImageTypes.includes(file.type)) {
        setError((prev) => ({ ...prev, image: "Only JPG, JPEG, PNG, or WEBP images are allowed." }));
        setPost((prev) => ({ ...prev, image: null }));
      } else {
        setError((prev) => ({ ...prev, image: "" })); 
        setPost((prev) => ({ ...prev, image: file }));
        setImagePreview(URL.createObjectURL(file));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let formIsValid = true;
    let newErrors = { title: "", description: "", image: "" };

    if (!post.title.trim()) {
      newErrors.title = "Title is required.";
      formIsValid = false;
    }

    if (!post.description.trim()) {
      newErrors.description = "Description is required.";
      formIsValid = false;
    }

    if (!formIsValid) {
      setError(newErrors);
      return;
    }

    const formData = new FormData();
    formData.append("title", post.title);
    formData.append("description", post.description);
    if ( post.image) {
      formData.append("image", post.image);
    }
    
    try {
      setLoading(true);
      const result = await updatePost(id, formData);
      if (result.status === 200) {
        toast.success(result.data, { theme: "dark" });
        navigate("/my-blogs"); 
      }
    } catch (error) {
      toast.error(error, { theme: "dark" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Edit Post</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Image
            </label>
            <input
              type="file"
              accept="image/*"
              name="image"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primaryHover"
            />
            {error.image && (
              <p className="text-red-500 text-sm mt-2">{error.image}</p>
            )}
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Post Preview"
                className="mt-4 w-full h-48 object-cover rounded-md"
              />
            )}
          </div>

          {/* Title Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={post.title}
              onChange={handleChange}
              placeholder="Enter your post title"
              className={`w-full px-4 py-2 border ${error.title ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:ring-2 focus:ring-primary`}
            />
            {error.title && (
              <p className="text-red-500 text-sm mt-2">{error.title}</p>
            )}
          </div>

          {/* Description Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={post.description}
              onChange={handleChange}
              placeholder="Write your post description here"
              className={`w-full px-4 py-2 border ${error.description ? "border-red-500" : "border-gray-300"} rounded focus:outline-none focus:ring-2 focus:ring-primary`}
              rows="4"
            ></textarea>
            {error.description && (
              <p className="text-red-500 text-sm mt-2">{error.description}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded hover:bg-primaryHover transition duration-300"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Post"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
