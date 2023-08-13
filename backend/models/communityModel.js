import mongoose from "mongoose";

const communitySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 30,  
    },
    description:{  
        type: String,
    },
    communityImage: {
        public_id: {
          type: String,
          required: true,
          default:'avatars/wc4sd6eehqz05poidgnz'
        },
        url: {
          type: String,
          required: true,
          default:'https://res.cloudinary.com/dzhbqwghe/image/upload/v1691814967/avatars/wc4sd6eehqz05poidgnz.jpg'
        },
      },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
    },


})

export default mongoose.model("Community",communitySchema)