const {Schema, model} = require('mongoose');

const productSchema = new Schema({
    productName: {
        type: String,
        required: true
    },
    productDescription: {
        type: String,
    },
    productPrice: {
        type: Number,
        required: true
    },
    productQuantity: {
        type: Number,
        required: true
    },
    productCategory: {
        type: String,
        required: true
    },
    productImage: {
        type: String,
        default: 'default.jpeg'
    },
    productBrand: {
        type: String,
        required: true
    }
});

const Product = model('Product', productSchema);

module.exports = Product;