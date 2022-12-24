import mongoose from "mongoose";
 
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true 
    },
    age:{
        type:Number
    },
    gender:{
        type:String
    },
    dob:{
        type:Date
    },
    mobile:{
        type:Number
    }

})

export default mongoose.model("User",userSchema);