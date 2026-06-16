import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WomensSection = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/api/products?category=womens')
            .then(response => setProducts(response.data))
            .catch(err => setError('Server Offline: Unable to fetch products.'));
    }, []);

    return (
        <div className="container-fluid p-0" style={{ backgroundColor: '#ffffff', fontFamily: "'Montserrat', sans-serif" }}>
            
            {/* INLINE STYLES FOR EXACT SAPPHIRE CLONE HOVER EFFECTS */}
            <style>{`
                .product-img-wrapper {
                    position: relative;
                    overflow: hidden;
                    cursor: pointer;
                }
                .hover-overlay {
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    background: rgba(255, 255, 255, 0.95);
                    transform: translateY(100%);
                    transition: transform 0.3s ease-in-out;
                    padding: 15px 0;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }
                .product-img-wrapper:hover .hover-overlay {
                    transform: translateY(0);
                }
                .size-list {
                    display: flex;
                    gap: 15px;
                    margin-bottom: 12px;
                    font-size: 0.75rem;
                    color: #555;
                    letter-spacing: 1px;
                }
                .size-list span:hover {
                    color: #000;
                    font-weight: 600;
                }
                .add-to-bag-text {
                    font-size: 0.75rem;
                    font-weight: 600;
                    letter-spacing: 1px;
                    color: #000;
                }
                .trending-tab {
                    color: #666;
                    text-decoration: none;
                    font-size: 0.8rem;
                    letter-spacing: 1.5px;
                    margin-left: 25px;
                    padding-bottom: 5px;
                    text-transform: uppercase;
                    font-weight: 400;
                }
                .trending-tab.active {
                    color: #000;
                    font-weight: 600;
                    border-bottom: 2px solid #000;
                }
                .shop-now-link {
                    color: #000;
                    text-decoration: none;
                    font-weight: 500;
                    font-size: 0.8rem;
                    letter-spacing: 1.5px;
                    border-bottom: 1px solid #000;
                    padding-bottom: 2px;
                }
            `}</style>

            {/* 1. HERO BANNER - THE MONOCHROME EDIT */}
            <div style={{
                position: 'relative',
                height: '100vh',
                width: '100%',
                // Using a high-quality Shopify CDN link that matches the screenshot vibe
                backgroundImage: `url('https://cdn.shopify.com/s/files/1/0027/2596/9964/files/WOMAN_Main_Banner_Desktop_7.jpg')`, 
                backgroundSize: 'cover',
                backgroundPosition: 'center top'
            }}>
                <div style={{
                    position: 'absolute',
                    bottom: '10%',
                    width: '100%',
                    textAlign: 'center',
                    color: 'white'
                }}>
                    <h1 style={{ letterSpacing: '4px', fontWeight: '500', fontSize: '2.5rem', marginBottom: '8px' }}>THE MONOCHROME EDIT</h1>
                    <h2 style={{ letterSpacing: '3px', fontWeight: '400', fontSize: '1.2rem', marginBottom: '25px' }}>UNSTITCHED</h2>
                    <a href="#shop" style={{ color: 'white', textDecoration: 'none', borderBottom: '1px solid white', paddingBottom: '3px', letterSpacing: '2px', fontSize: '0.85rem', fontWeight: '500' }}>
                        SHOP NOW
                    </a>
                </div>
            </div>

            {error && <div className="container mt-4"><div className="alert alert-danger rounded-0">{error}</div></div>}

            {/* 2. NEW IN CATEGORIES */}
            <div className="container-fluid mt-5 pt-5 mb-5 px-5">
                <div className="row align-items-center">
                    {/* Left Description Box */}
                    <div className="col-lg-3 col-md-12 mb-5 pe-md-5 text-start">
                        <p style={{ color: '#777', fontSize: '0.75rem', letterSpacing: '1px', marginBottom: '15px' }}>200+ ITEMS</p>
                        <h2 className="mb-4" style={{ letterSpacing: '4px', fontWeight: '400', color: '#000', fontSize: '2.5rem' }}>NEW IN</h2>
                        <p style={{ color: '#555', fontSize: '0.9rem', lineHeight: '1.8', marginBottom: '35px', fontWeight: '300' }}>
                            Refresh your wardrobe with this week's new arrivals. Discover the latest trends, collection highlights, and key pieces for the season.
                        </p>
                        <a href="#shop" className="shop-now-link">SHOP NOW</a>
                    </div>
                    
                    {/* Right Images */}
                    <div className="col-lg-9 col-md-12">
                        <div className="row g-0">
                            <div className="col-4 pe-2">
                                <img src="https://cdn.shopify.com/s/files/1/0027/2596/9964/files/dresses_d.webp" alt="Dresses" className="w-100" style={{ objectFit: 'cover', aspectRatio: '3/4' }} />
                                <p className="text-center mt-3" style={{ color: '#000', fontWeight: '600', letterSpacing: '2px', fontSize: '0.8rem' }}>DRESSES</p>
                            </div>
                            <div className="col-4 px-1">
                                <img src="https://cdn.shopify.com/s/files/1/0027/2596/9964/files/modest_wear_d.webp" alt="Modest Wear" className="w-100" style={{ objectFit: 'cover', aspectRatio: '3/4' }} />
                                <p className="text-center mt-3" style={{ color: '#000', fontWeight: '600', letterSpacing: '2px', fontSize: '0.8rem' }}>MODEST WEAR</p>
                            </div>
                            <div className="col-4 ps-2">
                                <img src="https://cdn.shopify.com/s/files/1/0027/2596/9964/files/sukoon_d_1.webp" alt="Sukoon" className="w-100" style={{ objectFit: 'cover', aspectRatio: '3/4' }} />
                                <p className="text-center mt-3" style={{ color: '#000', fontWeight: '600', letterSpacing: '2px', fontSize: '0.8rem' }}>SUKOON</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. TRENDING PRODUCTS GRID */}
            <div className="container-fluid mb-5 pb-5 mt-5 pt-4 px-5">
                {/* Header Row */}
                <div className="d-flex justify-content-between align-items-end mb-4 border-bottom pb-3">
                    <div className="text-start">
                        <h2 className="mb-2" style={{ letterSpacing: '5px', fontWeight: '500', color: '#000', fontSize: '2.2rem' }}>TRENDING</h2>
                        <p className="mb-0" style={{ fontSize: '0.7rem', color: '#777', letterSpacing: '3px', textTransform: 'uppercase' }}>DISCOVER THE BEST-SELLING STYLES</p>
                    </div>
                    <div className="d-none d-md-flex align-items-center">
                        <a href="#ready-to-wear" className="trending-tab active">READY TO WEAR</a>
                        <a href="#unstitched" className="trending-tab">UNSTITCHED</a>
                        <a href="#west" className="trending-tab">WEST</a>
                        <a href="#combo" className="trending-tab">COMBO PICKS</a>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="row g-1">
                    {products.map(product => (
                        <div key={product.id} className="col-6 col-md-4 col-lg-3 mb-5">
                            <div className="card border-0 rounded-0 h-100 bg-transparent px-2">
                                
                                {/* Image with Hover Overlay */}
                                <div className="product-img-wrapper">
                                    <img src={product.image} className="card-img-top rounded-0 w-100" alt={product.name} style={{ objectFit: 'cover', aspectRatio: '3/4', backgroundColor: '#f4f4f4' }} />
                                    
                                    {/* The overlay that slides up on hover */}
                                    <div className="hover-overlay">
                                        <div className="size-list">
                                            <span>XS</span>
                                            <span>S</span>
                                            <span>M</span>
                                            <span>L</span>
                                            <span>XL</span>
                                        </div>
                                        <div className="d-flex align-items-center gap-2">
                                            <span className="add-to-bag-text">ADD TO BAG</span>
                                            <i className="bi bi-heart" style={{ cursor: 'pointer', fontSize: '1rem' }}></i>
                                        </div>
                                    </div>
                                </div>

                                {/* Product Details */}
                                <div className="card-body px-0 py-3 text-start">
                                    <h5 className="card-title mb-1 text-truncate" style={{ fontSize: '0.8rem', fontWeight: '500', color: '#000', letterSpacing: '1px' }}>{product.name}</h5>
                                    <p className="mb-2" style={{ fontSize: '0.65rem', color: '#888', letterSpacing: '0.5px', textTransform: 'uppercase' }}>RTW SUMMER '26 - NEW ARRIVALS</p>
                                    <p className="card-text mb-2" style={{ fontSize: '0.85rem', color: '#000', fontWeight: '500' }}>Rs.{product.price.toLocaleString()}</p>
                                    
                                    <div style={{ display: 'inline-block', backgroundColor: '#f5f5f5', padding: '3px 8px', fontSize: '0.6rem', letterSpacing: '1px', color: '#333' }}>
                                        NEW IN
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WomensSection;