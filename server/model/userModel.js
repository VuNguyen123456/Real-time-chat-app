const mongoose = require("mongoose");
const { type } = require("os");
// Schema to pass into mongoDB
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        max: 50,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        min: 8,
        max: 50,
        unique: true,
    },
    isAvatarSet:{
        type: Boolean,
        default: false,
    },
    avatarImg: {
        type: String,
        default: "",
    }
});

module.exports = mongoose.model("Users", userSchema)