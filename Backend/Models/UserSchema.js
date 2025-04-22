import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  token: String,
  profilePicture :{
    type: String,
    default: "/images/default-profile.jpg"
  }
  
});

const User = mongoose.model("User", userSchema);

export default User;
