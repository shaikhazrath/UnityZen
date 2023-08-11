import User from "../models/authModel.js"
import bcrypt from 'bcrypt'


export const Profile = (req, res) => {
    try {
        const user = req.user
        res.status(201).json(
            user
        )
    } catch (error) {
        res.status(500).json(error)
    }
}

export const Register = async (req, res) => {
    try {
        const { email, username, password } = req.body
        const newUser = new User({
            email,
            password,
            username
        })
        await newUser.save()
        const token = newUser.generateToken()
        res.status(201).json({
            user: newUser,
            token,
            message: 'user registerd successfully'
        })
    } catch (error) {
      if (error.code === 11000 && error.keyValue && error.keyPattern) {
        const { username } = error.keyValue;
        const key = Object.keys(error.keyPattern)[0];
        const errorMessage = `The ${key} '${username}' is already taken.`;
        res.status(500).json({ message: 'An error occurred during registration', errorMessage });
        
      } else {
        res.status(500).json({ message: 'An error occurred during registration', error });

      }
    } 
}


export const Login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json("User not found");
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json("Invalid credentials");
      }
  
      const token = user.generateToken();
      res.status(200).json({
        user,
        token,
        message: "User login successful"
      });
    } catch (error) {
      console.log(error);
      res.status(500).json("Server Error");
    }
  };