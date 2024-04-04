const express = require('express');
const router = express.Router();
const cart = require('../controllers/cart');
const auth = require('../middleware/auth');

router.get('/',auth , cart.getCart);
router.post('/',auth ,cart.addToCart);
router.delete('/:id',auth, cart.removeFromCart);

module.exports = router;