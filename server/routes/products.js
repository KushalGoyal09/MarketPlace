const express = require('express');
const allProducts = require('../controllers/allProducts');
const router = express.Router();

router.get('/', allProducts);

module.exports = router;