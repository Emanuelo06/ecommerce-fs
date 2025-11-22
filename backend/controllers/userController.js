import * as userService from "../services/userService.js"

export const getUser = async (req, res) => {
    try{
        const userId = req.params.id;
        const currentUserId = req.user.id;
        const isAdmin = req.user.role === "admin";
        
        // Users can only access their own profile unless they're admin
        if (!isAdmin && userId !== currentUserId) {
            return res.status(403).json({ message: "Access denied. You can only view your own profile." });
        }
        
        const user = await userService.getUser(userId);
        res.status(200).json(user);
    } catch(error){
        const statusCode = error.message.includes("not found") ? 404 : 400;
        res.status(statusCode).json({ message: error.message });
    }
}

export const getUsers = async (req,res) => {
  try{
    const users = await userService.getUsers();
    res.status(200).json(users);
  } catch(error){
    res.status(400).json({ message: error.message });
  }
}

export const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const currentUserId = req.user.id;
    const isAdmin = req.user.role === "admin";
    
    // Users can only update their own profile unless they're admin
    if (!isAdmin && userId !== currentUserId) {
      return res.status(403).json({ message: "Access denied. You can only update your own profile." });
    }
    
    const updatedUser = await userService.updateUser(userId, req.body);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}


export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const currentUserId = req.user.id;
    const isAdmin = req.user.role === "admin";
    
    // Users can only delete their own account unless they're admin
    if (!isAdmin && userId !== currentUserId) {
      return res.status(403).json({ message: "Access denied. You can only delete your own account." });
    }
    
    await userService.deleteUser(userId);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) { 
    res.status(400).json({ message: error.message });
  }
}

export const queryUsers = async (req, res) => {
  try {
    const users = await userService.queryUsers(req.query);
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};