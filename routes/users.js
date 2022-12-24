import  express from "express";
import Users from '../models/users.js'
import mongoose from "mongoose";
const router = express.Router();
router.post('/signup', async (req,res)=>{
    const{name,email,password} = req.body;
    try{
        const userExists = await Users.findOne({email});
        if(userExists){
            return res.status(400).json({message:"User already exists!! Please Login"});
        }
        const result = await Users.create({name:name,email:email,password:password});
        return res.status(200).json({result});
    }
    catch(e){
        console.log(e);
        return res.status(500).json({message:"Something Went Wrong!!"});
        
    }
})

router.post('/signin',async (req,res)=>{
    const{email,password} = req.body;
    try{
        const existingUser = await Users.findOne({email});
        if(!existingUser){
            return res.status(404).json({ message: "User Doesn't exist Please signup!!!" });
        }
        if(existingUser.password!==password){
            return res.status(400).json({message:"Password Not Correct!!"});
        }
        return res.status(200).json({result:existingUser});
    }
    catch(e){
        console.log(e);
        return res.status(500).json({message:"Something Went Wrong!!"})
    }
})

router.patch('/profile/:id',async (req,res)=>{
    const{id:_id} = req.params;
    const user = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("No Post with this id");
    }
    else{
        try{
            const updateProfile = await Users.findByIdAndUpdate(_id,user,{new:true});
            return res.status(201).json(updateProfile);
        }
        catch(e){
            console.log(e)
            return res.status(400).json({message:"Some error Occurs!!"})
        }
    }
})
export default router
