import axios from 'axios';


const axiosInstance = axios.create({
    baseURL:'http://localhost:8000/api/post'
});

axiosInstance.interceptors.request.use((config)=>{
    const token = localStorage.getItem('token');
    if(token){
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
},
(error)=>{
    return Promise.reject(error);
}
);

axiosInstance.interceptors.response.use(
    (response)=>{
        return response;
    },
    (error)=>{
        if(error.response.status === 401){
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const AddPost = async(data)=>{
    try {
       
        const response = await axiosInstance.post('/', data,{headers:{'Content-Type': 'multipart/form-data'}});
        return response;
    } catch (error) {
        throw error.response.data.message;
    }
}

export const GetMyPosts = async()=>{
    try {
        const response = await axiosInstance.get('/');
        return response.data;
    } catch (error) {
        throw error.response.data.message;
    }
}

export const DeletePost = async(id)=>{
    try {
        const response = await axiosInstance.delete(`/${id}`);
        return response;
    } catch (error) {
        throw error.response.data.message;
    }
}

export const getPostById = async(id)=>{
    try {
        const response = await axiosInstance.get(`/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data.message;
    }
}

export const updatePost = async(id,data)=>{
    try{
        const response = await axiosInstance.put(`/${id}`, data,{headers:{'Content-Type':'multipart/form-data'}});
        return response;
    }catch (error) {
        throw error.response.data.message;
    }
}


export const fetchBlogDetails = async(id)=>{
    try {
        const response = await axiosInstance.get(`/blog/${id}`);
        return response.data;
    } catch (error) {
        throw error.response.data.message;
    }
}


export const fetchRecentPosts = async()=>{
    try {
        const response = await axiosInstance.get('/blogs');
        console.log(response)
        return response.data;
    } catch (error) {
        throw error.response.data.message;
    }
}