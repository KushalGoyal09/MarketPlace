const Product = require("../models/product");
const z = require('zod');

const allProducts = async (req, res) => {
    const { minPrice, maxPrice, category, brand, name, sortBy, sortOrder } = req.query;
    const minPriceSchema = z.coerce.number().nonnegative().default(0);
    const maxPriceSchema = z.coerce.number().nonnegative();
    const categorySchema = z.string().default('');
    const brandSchema = z.coerce.string().default('');
    const nameSchema = z.coerce.string().default('');
    const sortBySchema = z.enum(['productPrice', 'productName']).default('productName');
    const sortOrderSchema = z.enum(['asc', 'desc']).default('asc');
    const minPriceResult = minPriceSchema.parse(minPrice);
    const maxPriceResult = maxPriceSchema.parse(maxPrice);
    const categoryResult = categorySchema.parse(category);
    const brandResult = brandSchema.parse(brand);
    const nameResult = nameSchema.parse(name);
    const sortByResult = sortBySchema.parse(sortBy);
    const sortOrderResult = sortOrderSchema.parse(sortOrder);
    const query = {};
    if (minPriceResult !== 0 || maxPriceResult) {
        query.productPrice = {
            $gte: minPriceResult,
            $lte: maxPriceResult
        };
    }
    if (categoryResult !== '') {
        query.productCategory = {
            $regex: categoryResult,
            $options: 'i'
        };
    }
    if (brandResult !== '') {
        query.productBrand = {
            $regex: brandResult,
            $options: 'i'
        };
    }
    if (nameResult !== '') {
        query.productName = {
            $regex: nameResult,
            $options: 'i'
        };
    }
    const sort = {};
    sort[sortByResult] = sortOrderResult === 'asc' ? 1 : -1;
    const products = await Product.find(query).sort(sort).select('-productDescription -productQuantity')
    res.json({ products, numberofProducts: products.length, success: true });
}

module.exports = allProducts;