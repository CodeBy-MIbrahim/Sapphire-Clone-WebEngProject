import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MensSection = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/api/products?category=mens')
            .then(response => {
                setProducts(response.data);
            })
            .catch(err => {
                setError('Server Offline: Unable to fetch products.');
            });
    }, []);

    return (
        <div className="container-fluid p-0" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            
            {/* 1. HERO BANNER - EXACT REPLICA */}
            <div style={{
                position: 'relative',
                height: '100vh',
                width: '100%',
                backgroundImage: `url('https://cdn.shopify.com/s/files/1/0027/2596/9964/files/Man_slider_23bab185-6aec-4c7d-b461-e205e76fdcc8.webp')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center top'
            }}>
                <div style={{
                    position: 'absolute',
                    bottom: '8%',
                    width: '100%',
                    textAlign: 'center',
                    color: 'white',
                    textShadow: '0px 2px 4px rgba(0,0,0,0.3)'
                }}>
                    <h1 style={{ letterSpacing: '4px', fontWeight: '500', fontSize: '3.2rem', marginBottom: '25px' }}>EID II</h1>
                    <div>
                        <a href="#unstitched" className="text-white text-decoration-none mx-3" style={{ letterSpacing: '1.5px', fontSize: '0.85rem', fontWeight: '500' }}>UNSTITCHED</a>
                        <a href="#stitched" className="text-white text-decoration-none mx-3" style={{ letterSpacing: '1.5px', fontSize: '0.85rem', fontWeight: '500' }}>STITCHED</a>
                    </div>
                </div>
            </div>

            {/* ERROR ALERT */}
            {error && <div className="container mt-4"><div className="alert alert-danger rounded-0">{error}</div></div>}

            {/* 2. NEW IN CATEGORIES - EXACT REPLICA */}
            <div className="container mt-5 pt-5 mb-5">
                <div className="row align-items-center">
                    {/* Left Text Block */}
                    <div className="col-lg-3 col-md-4 mb-5 mb-md-0 pe-md-4">
                        <p className="text-secondary mb-2" style={{ fontSize: '0.75rem', letterSpacing: '1.5px', fontWeight: '600' }}>40+ ITEMS</p>
                        <h2 className="mb-3" style={{ letterSpacing: '3px', fontWeight: '400', fontSize: '2rem' }}>NEW IN</h2>
                        <p className="text-muted mb-4" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                            Upgrade your wardrobe with our latest arrivals. Discover dapper looks for the new season.
                        </p>
                        <a href="#shop" className="text-dark text-decoration-underline pb-1" style={{ fontSize: '0.8rem', letterSpacing: '1px', fontWeight: '600', textUnderlineOffset: '4px' }}>SHOP NOW</a>
                    </div>
                    
                    {/* Right Image Grid */}
                    <div className="col-lg-9 col-md-8">
                        <div className="row g-2 g-md-3">
                            <div className="col-4">
                                <div className="overflow-hidden" style={{ cursor: 'pointer' }}>
                                    <img src="https://cdn.shopify.com/s/files/1/0027/2596/9964/files/outfits_d_ae443473-ce57-4432-8bd3-b2c4c54b7e93.webp?v=1777286040" alt="Outfits" className="w-100" style={{ objectFit: 'cover', transition: 'transform 0.4s ease' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.03)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} />
                                </div>
                                <p className="text-center mt-3 text-dark" style={{ fontSize: '0.75rem', letterSpacing: '1px', fontWeight: '600' }}>OUTFITS</p>
                            </div>
                            <div className="col-4">
                                <div className="overflow-hidden" style={{ cursor: 'pointer' }}>
                                    <img src="https://cdn.shopify.com/s/files/1/0027/2596/9964/files/waistcoats_d.webp?v=1777288896" alt="Waistcoats" className="w-100" style={{ objectFit: 'cover', transition: 'transform 0.4s ease' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.03)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} />
                                </div>
                                <p className="text-center mt-3 text-dark" style={{ fontSize: '0.75rem', letterSpacing: '1px', fontWeight: '600' }}>WAISTCOATS</p>
                            </div>
                            <div className="col-4">
                                <div className="overflow-hidden" style={{ cursor: 'pointer' }}>
                                    <img src="https://cdn.shopify.com/s/files/1/0027/2596/9964/files/unstich_man.webp?v=1775475180" alt="Fabrics" className="w-100" style={{ objectFit: 'cover', transition: 'transform 0.4s ease' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.03)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} />
                                </div>
                                <p className="text-center mt-3 text-dark" style={{ fontSize: '0.75rem', letterSpacing: '1px', fontWeight: '600' }}>UNSTITCHED FABRICS</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. TRENDING PRODUCTS GRID - EXACT REPLICA */}
            <div className="container mb-5 pb-5 mt-5 pt-4">
                {/* Section Header & Filters */}
                <div className="d-flex justify-content-between align-items-end mb-4">
                    <h2 className="mb-0" style={{ letterSpacing: '3px', fontWeight: '400', fontSize: '2rem' }}>TRENDING</h2>
                    <div className="d-none d-md-flex gap-4" style={{ fontSize: '0.8rem', letterSpacing: '1px', fontWeight: '500' }}>
                        <a href="#stitched" className="text-dark text-decoration-underline" style={{ textUnderlineOffset: '6px', textDecorationThickness: '1.5px' }}>STITCHED</a>
                        <a href="#unstitched" className="text-secondary text-decoration-none">UNSTITCHED</a>
                        <a href="#waistcoats" className="text-secondary text-decoration-none">WAISTCOATS</a>
                        <a href="#plain" className="text-secondary text-decoration-none">PLAIN</a>
                    </div>
                </div>

                {/* Dynamic Product Grid mapping from Node.js */}
                <div className="row g-2 g-md-4">
                    {products.map(product => (
                        <div key={product.id} className="col-6 col-md-4 col-lg-3 mb-4">
                            <div className="card border-0 rounded-0 h-100 bg-transparent">
                                
                                <div className="position-relative overflow-hidden" style={{ cursor: 'pointer' }}>
                                    <img src={product.image} className="card-img-top rounded-0 w-100" alt={product.name} style={{ objectFit: 'cover', aspectRatio: '3/4' }} />
                                </div>
                                
                                <div className="card-body px-0 py-3 d-flex flex-column text-center text-md-start">
                                    <p className="text-secondary mb-1" style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Men's Stitched Eid II</p>
                                    <h5 className="card-title text-dark mb-2" style={{ fontSize: '0.85rem', fontWeight: '400', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{product.name}</h5>
                                    <p className="card-text text-dark fw-semibold mb-3" style={{ fontSize: '0.9rem' }}>Rs. {product.price}</p>
                                    
                                    <button className="btn btn-outline-dark mt-auto rounded-0 w-100 mx-auto" style={{ fontSize: '0.75rem', letterSpacing: '1.5px', padding: '10px 0', maxWidth: '200px' }}>
                                        ADD TO BAG
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MensSection;