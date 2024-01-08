import profile from '../models/profileModel.js';
import User from "../models/authModel.js"
import cloudinary from 'cloudinary'; 
import fs from 'fs/promises'; 

export const Profile = async(req, res) => {
    try {
      const user = await User.findById(req.user._id); 
        const profiledata = await profile.findOne({ user });
        res.status(201).json({
          profiledata,
          user
        }
        )
    } catch (error) {
        res.status(500).json(error)
    }
}


export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id); 
    const updateProfile = await profileDetails.findOne({ user });

    if (!updateProfile) {
      return res.status(404).send('Profile not found');
    }

    if (req.file) {
      const myCloud = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "unityzen/profileImage",
        width: 150,
        crop: "scale",
      });

      updateProfile.profileImage.public_id = myCloud.public_id || updateProfile.profileImage.public_id;
      updateProfile.profileImage.url = myCloud.secure_url || updateProfile.profileImage.secure_url;

      await fs.unlink(req.file.path);
    }



    await updateProfile.save();

    return res.status(200).send({ user: updateProfile });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server Error: ' + error.message);
  }
};
