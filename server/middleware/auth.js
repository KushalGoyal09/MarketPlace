const { throwUnauthorizedError, throwBadRequestError } = require("../error/custom-Error");
const User = require("../models/user");
const { verifyToken } = require("../services/auth");

const auth = async (req, res, next) => {
    const token = req.headers.authorization;
    if(!token){
        throwBadRequestError("No token provided");
        return;
    }
    const userID = verifyToken(token);
    if(!userID){
        throwUnauthorizedError("Invalid token");
        return;
    }
    const user = await User.findById(userID);
    if(!user){
        throwUnauthorizedError("Invalid token");
        return;
    }
    req.userID = userID;
    next();
}

module.exports = auth;