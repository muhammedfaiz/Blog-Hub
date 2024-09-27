import { useContext, useState } from "react";
import { signupService } from "../service/userService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authContext } from "../context/AuthContext";

const Signup = () => {
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const {setToken}=useContext(authContext);
  const handleChange = (e) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const validate = () => {
    let errors = {};
    if (!data.name) {
      errors.name = "Name is required";
    }
    if (!data.email) {
      errors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
      errors.email = "Email is not valid";
    }
    if (!data.password) {
      errors.password = "Password is required";
    } else if (data.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }
    if (!data.confirmPassword) {
      errors.confirmPassword = "Confirm Password is required";
    } else if (data.password !== data.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        if (validate()) {
            const result = await signupService(data);
            if(result.status==200){
                toast.success(result.data.message,{theme:"colored"});
                setToken(result.data.token);
              navigate("/");
            }
          }
    }catch(error){
        toast.error(error.message,{theme:"colored"});
    }
   
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-primary mb-6 text-center">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-textSecondary mb-1" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              className={`w-full px-4 py-2 border rounded focus:outline-none ${
                errors.name ? "border-red-500" : "border-gray-300"
              } focus:ring-2 ${
                errors.name ? "focus:ring-red-500" : "focus:ring-primary"
              }`}
              placeholder="Enter your name"
              onChange={handleChange}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-textSecondary mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className={`w-full px-4 py-2 border rounded focus:outline-none ${
                errors.email ? "border-red-500" : "border-gray-300"
              } focus:ring-2 ${
                errors.email ? "focus:ring-red-500" : "focus:ring-primary"
              }`}
              placeholder="Enter your email"
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-textSecondary mb-1" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className={`w-full px-4 py-2 border rounded focus:outline-none ${
                errors.password ? "border-red-500" : "border-gray-300"
              } focus:ring-2 ${
                errors.password ? "focus:ring-red-500" : "focus:ring-primary"
              }`}
              placeholder="Enter your password"
              onChange={handleChange}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-textSecondary mb-1"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className={`w-full px-4 py-2 border rounded focus:outline-none ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              } focus:ring-2 ${
                errors.confirmPassword
                  ? "focus:ring-red-500"
                  : "focus:ring-primary"
              }`}
              placeholder="Confirm your password"
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded hover:bg-primaryHover transition duration-300"
            >
              Sign Up
            </button>
          </div>

          <div className="text-center mt-4">
            <span className="text-sm text-textSecondary">
              Already have an account?{" "}
              <a href="/login" className="text-primary hover:underline">
                Login
              </a>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
