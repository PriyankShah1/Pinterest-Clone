
const plm = require("passport-local-mongoose");
const mongoose = require("mongoose");

// Connecting to the MongoDB database without deprecated options
mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Define the schema for users
const userSchema = new mongoose.Schema({
   username: { type: String, required: true, unique: true },
   name: String,
   email: { type: String, required: true, unique: true },
   password: String, // Password field is managed by Passport-Local Mongoose
   profileImage: String,
   boards: {
     type: Array,
     default: []
   },
   posts:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref:"Post"
    }
   ]
});

// Apply the Passport-Local Mongoose plugin to userSchema
userSchema.plugin(plm);

// Create the UserModel from the schema
const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
