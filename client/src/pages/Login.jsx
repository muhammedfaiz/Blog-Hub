import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { loginService } from "../service/userService";
import { useNavigate } from "react-router-dom";
import { authContext } from "../context/AuthContext";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const {setToken}=useContext(authContext);

  const validate = () => {
    let errors = {};
    if (!data.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Email is invalid";
    }

    if (!data.password) {
      errors.password = "Password is required";
    } else if (data.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        if (validate()) {
            const result = await loginService(data);
            if(result.status == 200){
              toast.success(result.data.message,{theme:"colored"});
              setToken(result.data.token);
              navigate("/");
            }
          }
    } catch (error) {
        toast.error(error.message,{theme:"colored"});
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-primary mb-6 text-center">Login to Blog Hub</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-textSecondary mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`w-full px-4 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded focus:outline-none focus:ring-2 focus:ring-primary`}
              placeholder="Enter your email"
              onChange={handleChange}
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
          </div>

          <div className="mb-4">
            <label className="block text-textSecondary mb-1" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className={`w-full px-4 py-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded focus:outline-none focus:ring-2 focus:ring-primary`}
              placeholder="Enter your password"
              onChange={handleChange}
            />
            {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
          </div>

          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded hover:bg-primaryHover transition duration-300"
            >
              Login
            </button>
          </div>

          <div className="text-center mt-4">
            <span className="text-sm text-textSecondary">
              Don&apos;t have an account?{" "}
              <a href="/signup" className="text-primary hover:underline">
                Sign up
              </a>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
