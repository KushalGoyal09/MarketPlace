const Product = require("../models/product");
const { z } = require('zod');

const addProduct = async (req, res) => {
    const { productName, productDescription, productPrice, productQuantity, productCategory, productBrand } = req.body;
    const productNameSchema = z.string().nonempty();
    const productDescriptionSchema = z.string().default('');
    const productPriceSchema = z.coerce.number().int().positive();
    const productQuantitySchema = z.coerce.number().int().positive();
    const productCategorySchema = z.string().nonempty();
    const productBrandSchema = z.string().nonempty();
    const productNameResult = productNameSchema.safeParse(productName);
    const productDescriptionResult = productDescriptionSchema.safeParse(productDescription);
    const productPriceResult = productPriceSchema.safeParse(productPrice);
    const productQuantityResult = productQuantitySchema.safeParse(productQuantity);
    const productCategoryResult = productCategorySchema.safeParse(productCategory);
    const productBrandResult = productBrandSchema.safeParse(productBrand);
    if (!productNameResult.success || !productDescriptionResult.success || !productPriceResult.success || !productQuantityResult.success || !productCategoryResult.success || !productBrandResult.success) {
        res.status(400).json({ error: 'Invalid input', success: false });
        return;
    }
    const newProduct = await Product.create({ productName: productNameResult.data, productDescription: productDescriptionResult.data, productPrice: productPriceResult.data, productQuantity: productQuantityResult.data, productCategory: productCategoryResult.data, productBrand: productBrandResult.data });
    res.json({ success: true, newProduct });
}

module.exports = addProduct;