import React from 'react';
const SERVER_BASE_URL = "http://localhost:3000";

const ProductCard = ({ image, productID, name, price, category, brand }) => {
    return (
        <div
            className="max-w-md mx-auto bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 cursor-pointer"
            onClick={() => window.location.href = `/product/${productID}`}
        >
            <img src={`${SERVER_BASE_URL}/productImages/${image}`} alt={name} className="w-full h-64 object-cover" />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 text-gray-800">{name}</div>
                <p className="text-gray-700 text-lg mb-2">Price: ${price}</p>
                <p className="text-gray-700 text-lg mb-2">Category: {category}</p>
                <p className="text-gray-700 text-lg mb-2">Brand: {brand}</p>
            </div>
        </div>
    );
};

export default ProductCard;
