

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: { type: String, unique: true }, // Add userId field
    name: String,
    email: String,
    password: String,
    role: {
        type: String,
        default: "visitor"
    }
});

const loginModel = mongoose.model("customers",userSchema);
module.exports=loginModel