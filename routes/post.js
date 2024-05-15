

const mongoose = require("mongoose");


// Define the schema for users
const postSchema = new mongoose.Schema({
   user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
   },
   title: String,
   description: String,
   image: String
});


// Create the UserModel from the schema
const PostModel = mongoose.model("Post", postSchema);

module.exports = PostModel;
