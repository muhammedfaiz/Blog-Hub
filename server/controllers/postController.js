const { uploadCloudinary, removeFile } = require("../utils/utils");
const Post = require("../models/Post");

const addPost = async(req,res)=>{
    try{
        const {title,description} = req.body;
        const file = req.file;
        const image =await uploadCloudinary(file);
        const post = new Post({
            title,
            description,
            image:image,
            author:req.user,
        });
        await post.save();
        res.status(200).json({message:"Posted successfully"});
    }catch(error){
        console.error(error);
        res.status(500).json({message: 'Server Error'});
    }
}

const getMyPost = async(req,res)=>{
    try{
        const posts = await Post.find({author:req.user}).sort({createdAt:-1});
        res.status(200).json(posts);
    }catch(error){
        console.error(error);
        res.status(500).json({message: 'Server Error'});
    }
}

const deletePost = async(req,res)=>{
    try{
        const post = await Post.findByIdAndDelete(req.params.id);
        if(!post){
            return res.status(404).json({message: 'Post not found'});
        }
        const result =  await removeFile(post.image.public_id);
        if(result){
            res.status(200).json({message:"Post deleted successfully"});
        }
    }catch(error){
        console.error(error);   
        res.status(500).json({message: 'Server Error'});
    }
}

const getPostById = async(req,res)=>{
    try {
        const {id}=req.params;
        const post = await Post.findById(id);
        if(!post){
            return res.status(404).json({message: 'Post not found'});
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({message: 'Server Error'});
    }
}

const updatePost = async(req,res)=>{
    try {
        const {id}=req.params;
        const {title,description}=req.body;
        const data = {title,description};
        const file = req.file;
        if(file){
            const post = await Post.findById(id);
            await removeFile(post.image.public_id);
            const image = await uploadCloudinary(file);
            data.image = image;
        }
        await Post.updateOne({_id:id},{$set:data});
        res.status(200).json("Updated successfully");

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Server Error"});
    }
}

const getBlogDetails = async(req,res)=>{
    try {
        const {id}=req.params;
        const post = await Post.findById(id).populate('author','name');
        if(post){
            return res.status(200).json(post);
        };
    } catch (error) {
        res.status(500).json({message:"Server Error"});
    }
}

const getAllPosts = async(req,res)=>{
    try {
        const posts = await Post.find().sort({createdAt:-1}).populate('author','name');
        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        res.status(400).json({message:"Server Error"});
    }
}

module.exports ={
    addPost,
    getMyPost,
    deletePost,
    getPostById,
    updatePost,
    getBlogDetails,
    getAllPosts
}