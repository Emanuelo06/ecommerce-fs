import User from "../db/models/User.js"
import mongoose  from "mongoose"

export const getUser = async (userId) => {
  const user = await User.findById(userId).select("-password")
  if (!user) throw new Error("User not found")
  return user
}
export const getUsers = async () => {
  const users = await User.find().select("-password");
  if (users.length === 0) throw new Error("No users found");
  return users;
}

export const updateUser = async (userId, updateData) => {
  const allowedFields = ["username", "address", "phoneNumber"];
  const filteredData = {};

  for (const field of allowedFields) {
    if (updateData[field] !== undefined) {
      filteredData[field] = updateData[field];
    }
  }


  if (Object.keys(filteredData).length === 0) {
    throw new Error("No valid fields to update");
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $set: filteredData },
    { new: true, runValidators: true, select: "-password" } // exclude password
  );

  if (!updatedUser) throw new Error("User not found");

  return updatedUser;
};

export const deleteUser = async (userId)=> {
     if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid user ID");
  }
   const deletedUser = await User.findByIdAndDelete(userId).select("-password");

  if (!deletedUser) {
    throw new Error("User not found");
  }

  return deletedUser;
};
