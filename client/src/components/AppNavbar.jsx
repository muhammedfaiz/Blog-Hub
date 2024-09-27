import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../context/AuthContext';

const AppNavbar = () => {
  const { token, setToken } = useContext(authContext); // Access setToken to handle logout
  const navigate = useNavigate();

  // Handle Logout Function
  const handleLogout = () => {
    setToken(null); // Clear token from context
    localStorage.removeItem('token'); // Clear token from local storage if saved
    navigate('/login'); // Redirect to login page
  };

  return (
    <nav className="bg-surface shadow-md py-4 px-6">
      <div className="container mx-auto flex items-center justify-between">
        {/* Brand / Logo Section */}
        <div className="text-2xl font-bold text-primary">
          <Link to="/">Blog Hub</Link>
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-8">
          <li>
            <Link to="/" className="text-textSecondary hover:text-primary transition duration-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/my-blogs" className="text-textSecondary hover:text-primary transition duration-300">
              My Blogs
            </Link>
          </li>
          <li>
            <Link to="/post" className="text-textSecondary hover:text-primary transition duration-300">
              Create
            </Link>
          </li>
        </ul>

        {/* Login/Logout Button */}
        <div className="hidden md:flex items-center">
          {token ? (
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primaryHover transition duration-300"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            id="mobile-menu-button"
            className="text-textSecondary hover:text-primary focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden mt-4" id="mobile-menu">
        <ul className="flex flex-col space-y-4">
          <li>
            <Link to="/" className="text-textSecondary hover:text-primary transition duration-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/blogs" className="text-textSecondary hover:text-primary transition duration-300">
              Blogs
            </Link>
          </li>
          <li>
            <Link to="/post" className="text-textSecondary hover:text-primary transition duration-300">
              Create
            </Link>
          </li>
          <li>
            {token ? (
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300 w-full text-center"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primaryHover transition duration-300 block text-center"
              >
                Login
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default AppNavbar;
