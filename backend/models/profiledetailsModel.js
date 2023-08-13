import mongoose from "mongoose";

const profileSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
    },
    profileImage: {
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
    bannerImage:{
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
    }
})

export default mongoose.model("ProfileDetails", profileSchema);
