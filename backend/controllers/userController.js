import User from "../db/models/User.js"
import * as userService from "../services/userService.js"

export const getUser = async (req, res) => {
    try{
        const userId = req.params.id
        const user = await userService.getUser(userId);
        res.status(201).json(user);
    } catch(error){
        res.status(400).json({ message: error.message });
    }
  
  
}

export const updateUser = async (req, res) => {
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}


export const deleteUser = async(req, res) => {
    try{
        const userId = req.params.id
        const deleteUser = userService.deleteUser(userId)
        res.status(201).json({message: "User deleted successfully"})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}