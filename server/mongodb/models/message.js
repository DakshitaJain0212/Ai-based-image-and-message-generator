// const mongoose=require('mongoose');
import mongoose from "mongoose";
const message=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    message:{
type:String,
    },
    createdAt:{
        type:Date,
        default: new Date()
    },
    status:{
        type:String,
        enum:["Active" , "Inactive"],
        default:"Active"
    }

})



// module.exports=mongoose.model("message",messageSchema)

const messageSchema = mongoose.model('message', message);

export default messageSchema;