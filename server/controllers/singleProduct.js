const { throwNotFoundError } = require("../error/custom-Error");
const Product = require("../models/product");

const singleProduct = async (req, res) => {
    const { productID } = req.params;
    const product = await Product.findById(productID).select("-productQuantity");
    if (!product) {
        throwNotFoundError('Product not found');
    }
    res.json({ product, success: true });
}

module.exports = singleProduct; 