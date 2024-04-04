const jwt = require('jsonwebtoken');

const getToken = (userID) => {
    return jwt.sign({userID}, process.env.JWT_SECRET);
};

const verifyToken = (token) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.userID;
}

module.exports = {getToken, verifyToken};