const products = require('./product.json');
require('dotenv').config();
const Product = require('../../models/product');
const mongoose = require('mongoose');

const connect = async (uri) => {
    await mongoose.connect(uri);
};

connect(process.env.MONGO_URI);

const populate = async () => {
    try {
        await Product.deleteMany({});
        await Product.insertMany(products);
        console.log('Products successfully stored in the database!');
        process.exit();
    } catch (err) {
        console.error('Error storing products:', err);
    }
};

populate();