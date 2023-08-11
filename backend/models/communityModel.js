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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
    },

})

export default mongoose.model("Community",communitySchema)