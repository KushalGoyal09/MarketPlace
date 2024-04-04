import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";

const SERVER_BASE_URL = "http://localhost:3000";

function Home() {
    const [products, setProducts] = useState([]);
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [sortBy, setSortBy] = useState("productName");
    const [sortOrder, setSortOrder] = useState("asc");
    const [searchTerm, setSearchTerm] = useState("");

    const fetchProducts = useCallback(async () => {
        try {
            const params = {
                minPrice,
                maxPrice,
                category,
                brand,
                sortBy,
                sortOrder,
                name: searchTerm
            };
            const { data } = await axios.get(`${SERVER_BASE_URL}/products`, { params });
            setProducts(data.products);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }, [minPrice, maxPrice, category, brand, sortBy, sortOrder, searchTerm]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return (
        <>
            <Navbar />
            <div className="flex items-center space-x-4 m-6">
                <input
                    type="number"
                    placeholder="Min Price"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Max Price"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Brand"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                />
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="productName">Name</option>
                    <option value="productPrice">Price</option>
                </select>
                <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                </select>
                <input
                    type="text"
                    placeholder="Search by Name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="grid grid-cols-4 gap-4 m-6">
                {products.map((product) => (
                    <ProductCard
                        key={product._id}
                        productID={product._id}
                        image={product.productImage}
                        name={product.productName}
                        price={product.productPrice}
                        category={product.productCategory}
                        brand={product.productBrand}
                    />
                ))}
            </div>
        </>
    );
}

export default Home;
