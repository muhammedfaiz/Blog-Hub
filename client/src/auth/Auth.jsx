import { useContext } from "react"
import { authContext } from "../context/AuthContext"
import { Navigate, Outlet } from "react-router-dom";

const Auth = () => {
    const {token}=useContext(authContext);
  return token ? (<Outlet/>):(<Navigate to="/login"/>)
}
export default Auth