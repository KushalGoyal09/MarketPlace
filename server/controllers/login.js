const User = require("../models/user");
const {getToken} = require("../services/auth");

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({email, password});
    if(!user){
        res.status(400).json({message: "Invalid email or password", token: null});
        return;
    }
    const token = getToken(user._id);
    res.status(200).json({message: "User logged in successfully", token: token});
};

module.exports = login;