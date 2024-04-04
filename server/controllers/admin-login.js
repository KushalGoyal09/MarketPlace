const {z} = require('zod');
const bcrypt = require('bcrypt');

const login = async (req, res) => {
    const {username, password} = req.body;
    const usernameSchema = z.string().nonempty();
    const passwordSchema = z.string().nonempty();
    const usernameResult = usernameSchema.safeParse(username);
    const passwordResult = passwordSchema.safeParse(password);
    if (!usernameResult.success || !passwordResult.success) {
        res.status(400).json({error: 'Invalid input', success: false});
        return;
    }
    if (usernameResult.data === process.env.ADMIN_USERNAME && passwordResult.data === process.env.ADMIN_PASSWORD) {
        const adminToken = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
        res.json({success: true, adminToken});
    } else {
        res.status(401).json({error: 'Invalid username or password', success: false});
    }
}

module.exports = login;