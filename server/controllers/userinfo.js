const { throwBadRequestError } = require("../error/custom-Error");
const User = require("../models/user");

const userinfo = async (req, res) => {
    const userID = req.userID;
    const user = await User.findById(userID);
    if (!user) {
        throwBadRequestError("User not found");
        return;
    }
    res.status(200).json({ name: user.name, email: user.email });
}

module.exports = userinfo;