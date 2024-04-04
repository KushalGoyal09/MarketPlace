const express = require('express');
const router = express.Router();
const userinfo = require('../controllers/userinfo');
const auth = require('../middleware/auth');

router.get('/', auth, userinfo);

module.exports = router;