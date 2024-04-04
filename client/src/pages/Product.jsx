import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

const SERVER_BASE_URL = "http://localhost:3000";

const ProductDetailPage = () => {
  const { productID } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`${SERVER_BASE_URL}/products/${productID}`);
        setProduct(data.product);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productID]);

  const handleAddToCart = () => {
    console.log('Product added to cart:', product);
  };

  return (
    <>
      <Navbar />
      <div className="h-screen flex justify-center items-center bg-gray-100">
        {product ? (
          <div className="max-w-4xl w-full bg-white rounded-xl shadow-md overflow-hidden md:max-w-4xl md:flex">
            <div className="md:flex-shrink-0">
              <img className="h-auto w-full object-contain md:w-96" src={`${SERVER_BASE_URL}/productImages/${product.productImage}`} alt={product.productName} />
            </div>
            <div className="p-8 md:w-2/3">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{product.productCategory}</div>
              <h1 className="block mt-1 text-xl leading-tight font-medium text-black hover:underline">{product.productName}</h1>
              <p className="mt-2 text-gray-500">{product.productDescription}</p>
              <div className="mt-3 flex items-center justify-between">
                <div className="text-xl">
                  <p className="text-gray-900">${product.productPrice}</p>
                </div>
              </div>
              <button onClick={handleAddToCart} className="px-3 py-1 bg-indigo-500 text-white font-semibold rounded hover:bg-indigo-600 focus:outline-none focus:shadow-outline mt-5 hover:scale-105 transition duration-500 ease-in-out">Add to Cart</button>
              <div className='mt-5'>
                <p className="text-gray-500"> Build By </p>
                <p className="text-red-700">{product.productBrand}</p>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default ProductDetailPage;
