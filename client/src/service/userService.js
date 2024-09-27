import axios from 'axios';


const axiosInstance = new axios.create({
    baseURL:'http://localhost:8000/api/user',
});

export const signupService = async(data)=>{
    try{
        const response = await axiosInstance.post('/signup', data);
        localStorage.setItem("token",response.data.token);
        return response;
    }catch(error){
        throw new Error(error.response.data.message);
    }
}

export const loginService = async(data)=>{
    try{
        const response = await axiosInstance.post('/login', data);
        localStorage.setItem("token",response.data.token);
        return response;
    }catch(error){
        throw new Error(error.response.data.message);
    }
}

