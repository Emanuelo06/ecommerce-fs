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


export const queryUsers = async (query) => {
  const page = Math.max(1, Number(query.page) || 1);
  const maxLimit = 100;
  const defaultLimit = 10;
  const limit = Math.min(maxLimit, Math.max(1, Number(query.limit) || defaultLimit));
  const skip = (page - 1) * limit;

  const filters = {};
  if(query.search){
    filters.$or = [
      { username: { $regex: query.search, $options: "i" } },
      { address: { $regex: query.search, $options: "i" } },
      { phoneNumber: { $regex: query.search, $options: "i" } },
    ];
  }

  let sort = {};
  switch(query.sort){
    case "newest":
      sort.createdAt = -1;
      break;
    case "oldest":
      sort.createdAt = 1;
      break;
    case "a-z":
      sort.username = 1;
      break;
    case "z-a":
      sort.username = -1;
      break;
    default:
      sort.createdAt = -1;
  }

  const users = await User.find(filters)
    .select("-password")
    .sort(sort)
    .skip(skip)
    .limit(limit);

  const total = await User.countDocuments(filters);

  return {
    users,
    page,
    totalPages: Math.ceil(total / limit),
    total,
    limit, 
    results: users.length
  }
}