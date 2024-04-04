const bcrypt = require('bcrypt');

const adminAuth = async (req, res, next) => {
    const adminToken = req.headers.admintoken;
    if (!adminToken) {
        res.status(401).json({ error: 'No token Provided', success: false });
        return;
    }
    const result = await bcrypt.compare(process.env.ADMIN_PASSWORD, adminToken);
    if (result) {
        next();
    } else {
        res.status(401).json({ error: 'Unauthorized', success: false });
    }
}

module.exports = adminAuth;