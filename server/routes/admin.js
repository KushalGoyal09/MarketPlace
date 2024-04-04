const express = require('express');
const login = require('../controllers/admin-login');
const adminAuth = require('../middleware/admin-auth');
const addProduct = require('../controllers/addProduct');
const router = express.Router();

router.post('/login', login);
router.post('/addProduct', adminAuth, addProduct)

module.exports = router;