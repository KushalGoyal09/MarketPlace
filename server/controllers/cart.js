const Product = require("../models/product");
const User = require("../models/user");
const { z } = require('zod');

const getCart = async (req, res) => {
    const userID = req.userID;
    const cart = await User.findById(userID).populate({
        path: 'cart.product',
        select: '-productQuantity'
    });
    res.json({ cart: cart.cart, success: true });
}

const addToCart = async (req, res) => {
    const userID = req.userID;
    const { productID, quantity } = req.body;
    const quantitySchema = z.coerce.number().int().positive();
    const productIDSchema = z.string().nonempty();
    const productIDResult = productIDSchema.safeParse(productID);
    const quantityResult = quantitySchema.safeParse(quantity);
    if (!productIDResult.success || !quantityResult.success) {
        res.status(400).json({ error: 'Invalid input', success: false });
        return;
    }
    const availableQuantity = await Product.findById(productID).select('productQuantity');
    if (availableQuantity.productQuantity < quantity) {
        res.status(400).json({ error: 'Quantity not available', success: false, availableQuantity: availableQuantity.productQuantity });
        return;
    }
    const user = await User.findById(userID).populate('cart.product');
    const userCart = user.cart;
    const productIndex = userCart.findIndex(item => {
        return item.product._id.toString() === productID;
    })
    if (productIndex !== -1) {
        const updatedQuantity = userCart[productIndex].quantity + quantityResult.data;
        if (updatedQuantity > availableQuantity.productQuantity) {
            res.status(400).json({ error: 'Quantity not available', success: false, availableQuantity: availableQuantity.productQuantity });
            return;
        }
        userCart[productIndex].quantity = updatedQuantity;
        await user.save();
        res.json({ success: true, message: 'Cart updated' });
        return;
    }
    const order = {
        product: productID,
        quantity: quantity
    };
    userCart.push(order);
    await user.save();
    res.json({ success: true, message: 'Product added to cart' });
}

const removeFromCart = async (req, res) => {
    const userID = req.userID;
    const productID = req.params.id;
    const productIDSchema = z.string().nonempty();
    const productIDResult = productIDSchema.safeParse(productID);
    if (!productIDResult.success) {
        res.status(400).json({ error: 'Invalid input', success: false });
        return;
    }
    const user = await User.findById(userID)
    const productIndex = user.cart.findIndex(item => item.product.toString() === productID);
    if (productIndex === -1) {
        res.status(404).json({ error: 'Product not found in cart', success: false });
        return;
    }
    user.cart.splice(productIndex, 1);
    await user.save();
    res.json({ success: true, message: `the product with id ${productID} has been removed from the cart` });
}

module.exports = {
    getCart,
    addToCart,
    removeFromCart
};