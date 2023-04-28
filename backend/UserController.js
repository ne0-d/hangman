import UserModel from "./UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) =>{
    const { username} = req.body;
    if (!username) {
      return res.status(400).json({ message: "All fields are required" });
    }
  
    try {
        const usernameCheck = await UserModel.find({username: username}) 
      
        if(usernameCheck.length != 0){
            const user = await UserModel.findOne({ username:username });
            const token = jwt.sign(
                {
                  username: username, 
                },
                process.env.JWT_KEY,
                { expiresIn: "20h" }
              );
            // const userData = {username:user.username, userScore:user.userScore, userId: user._id};
            return res.status(200).json({ user, token }); 
        }else{
            const newUser = new UserModel({username});
            const user = await newUser.save();
            const token = jwt.sign(
                {
                  username: username
                },
                process.env.JWT_KEY,
                { expiresIn: "20h" }
            );
            // const userData = {username:user.username, tasks:user.tasks, name:user.name, userId: user._id};
            return res.status(200).json({ user, token });
        }

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}

export const updateScore = async (req, res) =>{
    const { username, score} = req.body;
    if (!username) {
      return res.status(400).json({ message: "All fields are required" });
    }
  
    try {
        const user = UserModel.findOne({username:username})
        if(user){
          try {
              await user.updateOne({
                  $set: { userScore:score},
              });
              res.status(200).json({userScore: score});
              
          } catch (error) {
              res.status(500).json({ message: error.message });
          }
      }
      else{
          return res.status(403).json({ message: "Invalid Request, user does not exist!" });
  
      }

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}
export const getAllData = async (req, res) =>{
    try {
        const users = await UserModel.find();
        res.status(200).json({users:users});
        

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
}
