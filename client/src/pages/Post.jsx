import { useState } from "react";
import { AddPost } from "../service/postService";
import { toast } from "react-toastify";

const Post = () => {
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
  const [isLoading, setIsLoading] = useState(false);

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
        setError((prev) => ({
          ...prev,
          image: "Only JPG, JPEG, PNG, or WEBP images are allowed.",
        }));
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
    setIsLoading(true); // Start loading state

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

    if (!post.image) {
      newErrors.image = "Please upload a valid image.";
      formIsValid = false;
    }

    if (!formIsValid) {
      setError(newErrors);
      setIsLoading(false); 
      return;
    }

    const formData = new FormData();
    formData.append("title", post.title);
    formData.append("description", post.description);
    formData.append("image", post.image);

    try {
      const result = await AddPost(formData);
      if (result.status === 200) {
        toast.success(result.data.message, { theme: "dark" });
        setPost({ title: "", description: "", image: null });
        setImagePreview(null);
        setError({ title: "", description: "", image: "" });
      }
    } catch (error) {
      toast.error(error.message, { theme: "dark" });
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Create a New Post</h2>

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
              disabled={isLoading} 
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
              disabled={isLoading} // Disable when loading
            />
            {error.title && (
              <p className="text-red-500 text-sm mt-2">{error.title}</p>
            )}
          </div>

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
              disabled={isLoading} 
            ></textarea>
            {error.description && (
              <p className="text-red-500 text-sm mt-2">{error.description}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded hover:bg-primaryHover transition duration-300"
            disabled={isLoading} 
          >
            {isLoading ? "Creating..." : "Create Post"} 
          </button>
        </form>
      </div>
    </div>
  );
};

export default Post;
