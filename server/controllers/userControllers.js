const User = require("../model/userModel");
const brcypt = require("bcrypt"); // To encrypt the password

// Get user input for register // Create a user with name, email, hashedpassword in the database
module.exports.register = async (req, res, next) => {
    try{
    const {username, email, password} = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck){
        return res.json({ msg: "Use a different name Bruh.", status: false });
    }
    const emailCheck = await User.findOne({ email });
    if (emailCheck){
        return res.json({ msg: "Use a different email Bruh.", status: false });
    }
    const hashPassword = await brcypt.hash(password, 10);
    const user = await User.create({
        email,
        username,
        password: hashPassword,
    });
    delete user.password; // Don't store or need string pw anymore
    return res.json({ status: true , user});
    } catch(ex){
        next(ex)
    };
};

module.exports.login = async (req, res, next) => {
    try{
    const {username, password} = req.body;
    const user = await User.findOne({ username });
    if (!user){
        return res.json({ msg: "Wrong username Bruh.", status: false });
    }
    const isPasswordValid = await brcypt.compare(password, user.password);
    if (!isPasswordValid){
        return res.json({ msg: "Wrong password Bruh.", status: false });
    }
    delete user.password;
    return res.json({ status: true , user});
    } catch(ex){
        next(ex)
    };
};

module.exports.setAvatar = async (req, res, next) => {
    try{
        const userId = req.params.id;
        const avatarImg = req.body.image;
        const userData = await User.findByIdAndUpdate(userId, {
            isAvatarSet: true,
            avatarImg,
        });
        return res.json({
            isSet: userData.isAvatarSet,
            image: userData.avatarImg,
        });
    } catch(ex){
        next(ex);
    }
};

module.exports.getAllUsers = async (req, res, next) => {
    try{
        const users = await User.find({_id:{$ne:req.params.id}}).select([
            "email", "username", "avatarImg", "_id",
        ]);
        return res.json(users);
    } catch(ex){
        next(ex);
    }
};