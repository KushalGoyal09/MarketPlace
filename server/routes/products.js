const express = require('express');
const allProducts = require('../controllers/allProducts');
const singleProduct = require('../controllers/singleProduct');
const router = express.Router();

router.get('/', allProducts);
router.get('/:productID', singleProduct);

module.exports = router;