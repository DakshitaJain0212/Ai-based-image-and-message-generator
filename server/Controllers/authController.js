import * as dotenv from "dotenv";
import userSchema from "../mongodb/models/user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const register=async(req,res)=>{
    try{
        const checkemail= await userSchema.findOne({email:req.body.email});
        console.log(checkemail);
        if(checkemail!=null){
            return res.status(409).json({
                success:false,
                message:"Email already exist try by another email",
                data:[]
            })
        }

            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
            console.log(req.body.password);
            const user = new userSchema(req.body);
            const userSave = await user.save();
            const userInsertId = userSave._id;
        
            const userInfo = await userSchema.findOne(
              { _id: userInsertId },
              "password role name  email "
            );
            console.log("user Details ===>>", userInfo);
        
            const token = jwt.sign({ id: userInfo._id }, process.env.JWT_TOKEN_KEY, {
              expiresIn:"3d",
            });
        
            let tempObj = {
              _id: userInfo._id,
              email: userInfo.email,
             
              name: userInfo.name,
              token: token,
            };
            return res.status(200).json({
                success:true,
                message:"registration_successfully",
                data:tempObj

            })
        
        
        }catch(err){
          return res.status(461).json({
            success:false,
            message:err.message,
            data:[]
          })
        }
}


const login=async(req,res)=>{
    try{

        const userDetails = await userSchema.findOne(
      { email: req.body.email },
      "password  name  email "
    );
        if (
            userDetails &&
            (await bcrypt.compare(req.body.password, userDetails.password))
          ) {
            const token = jwt.sign(
              { id: userDetails._id },
              process.env.JWT_TOKEN_KEY,
              {
                expiresIn: '3d',
              }
            );
      
          
            let tempObj = {
              _id: userDetails._id,
              email: userDetails.email,
             
              name: userDetails.name,
              token: token,
            };
      
            return res.status(200).json({
                success:true,
                message:"login successfully",
                data:tempObj

            }
            );
        
        }else{
            return res.status(404).json({
                success:false,
                message:"Email not found user don't exist",
                data:[]
            })
        }}catch(err){
          return res.status(461).json({
            success:false,
            message:err.message,
            data:[]
          })
        }}

const authController={
    register:register,
    login:login
}
export default authController;