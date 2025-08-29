const { post } = require("../app");
const { acceptFPCodeSchema, createPostSchema } = require("../middlewares/joiValidator");

exports.getPosts = async (req,res) =>{
    const {page} = req.query;
    const postsPerPage = 10;
    try {
        let pageNum = 0;
        if(page <=1){
            pageNum = 0
        } else {
            pageNum = page - 1
        }
        const result = await post.find().sort({createAt: -1}).skip(pageNum * postsPerPage).limit(postsPerPage).populate({
            path: 'userId',
            select: 'email'
        })
        res.status(200).json({success: true, message:'posts', data:result})

    } catch (error) {
        console.log(error)
    }
}
exports.singlePost = async (req,res) =>{
    const {_id} = req.query;
   
    try {
     
        const result = await post.findOne({_id})
        res.status(200).json({success: true, message:'single post', data:result})

    } catch (error) {
        console.log(error)
    }
}

exports.createPosts = async (req,res)=>{
    const {title, description}= req.body;
    const {userId} = req.user;
    try {
        const {error, value}=createPostSchema.validate({
            title,
            description,
            userId
        })
        const result = Post.create({
            title,
            description,
            userId
        })
        res.status(201).json({success:true, message:'created', data:result})
    } catch (error) {
        console.log(error)
    }
}

exports.updatePost = async (req,res)=>{
    const {_id} = req.query;
    const {title, description}= req.body;
    const {userId} = req.user;
    try {
        const {error, value}=createPostSchema.validate({
            title,
            description,
            userId
        })
        if(error){
            return res  
                .status(401)
                .json({success:false, message: error.details[0].message})
        }
        const existingPost = await Post.findOne({_id})
        if(!existingPost){
            return res.status(404).json({success:false, message:'post unavailable'})
        }
        if(existingPost.userId.toString() === userId){
            return res 
                .status(404)
                .json({success:false, message:'unauthorized'})
        }
        existingPost.title = title;
        existingPost.description = description,

       
        const result = await existingPost.save()

        res.status(200).json({success:true, message:'updated', data:result})
    } catch (error) {
        console.log(error)
    }
}
exports.deletePost = async (req,res)=>{
    const {_id} = req.query;
   
    const {userId} = req.user;
    try {
        const {error, value}=createPostSchema.validate({
            title,
            description,
            userId
        })
        if(error){
            return res  
                .status(401)
                .json({success:false, message: error.details[0].message})
        }
        const existingPost = await Post.findOne({_id})
        if(!existingPost){
            return res.status(404).json({success:false, message:'post all ready unavailable'})
        }
        if(existingPost.userId.toString() === userId){
            return res 
                .status(404)
                .json({success:false, message:'unauthorized'})
        }
        

       
        await Post.deleteOne({_id})

        res.status(200).json({success:true, message:'deleted'})
    } catch (error) {
        console.log(error)
    }
}