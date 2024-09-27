import {BrowserRouter as Router,Routes,Route, useLocation} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import AppNavbar from './components/AppNavbar';
import Signup from './pages/Signup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Auth from './auth/Auth';
import Post from './pages/Post';
import MyBlog from './pages/MyBlog';
import EditPost from './pages/EditPost';
import Blog from './pages/Blog';
import Footer from './components/Footer';


const AppContent = () => {
  const location = useLocation();
  return (
    <>
    {location.pathname != '/login' && location.pathname != '/signup' && (<AppNavbar/>)}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route element={<Auth/>}>
        <Route path="/" element={<Home />} />
        <Route path='/post' element={<Post/>}/>
        <Route path='/my-blogs' element={<MyBlog/>}/>
        <Route path='/edit-post/:id' element={<EditPost/>}/>
        <Route path='/blog/:id' element={<Blog/>}/>
        </Route>
      </Routes>
      <Footer/>
    </>
  )
}

const App = () => {
  return (
    <Router>
      <AppContent />
      <ToastContainer/>
    </Router>
  );
}
export default App