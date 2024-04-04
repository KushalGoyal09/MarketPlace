const User = require("../models/user");
const {getToken} = require("../services/auth");

const signup = async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400).json({message: "User already exists", token: null, success: false});
        return;
    }
    const user = await User.create({name, email, password});
    if(!user){
        res.status(400).json({message: "User could not be created", token: null, success: false});
        return;
    }
    const token = getToken(user._id);
    res.status(201).json({message: "User created successfully", token: token, success: true});
}

module.exports = signup;