import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Footer } from './WomensSection';

const FragrancesSection = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [slideIndex, setSlideIndex] = useState(0);
    const [activeTrendingTab, setActiveTrendingTab] = useState('FOR HIM');

    const slides = [
        {
            image: 'https://cdn.shopify.com/s/files/1/0027/2596/9964/files/Slider_banner_fragarances.webp?v=1766560190',
            title: 'FRAGRANCES',
            subtitle: null,
            links: ['FOR HER', 'FOR HIM'],
        },
        {
            image: 'https://cdn.shopify.com/s/files/1/0027/2596/9964/files/gourmand_slider.webp',
            title: 'GOURMAND COLLECTION',
            subtitle: 'NEW ARRIVALS',
            links: ['SHOP NOW'],
        },
        {
            image: 'https://cdn.shopify.com/s/files/1/0027/2596/9964/files/arc_slider.webp',
            title: 'ARC',
            subtitle: 'MODERN SIGNATURE',
            links: ['SHOP NOW'],
        },
    ];

    useEffect(() => {
        axios.get('http://localhost:5000/api/products?category=fragrances')
            .then(res => setProducts(res.data))
            .catch(() => setError('Server Offline: Unable to fetch products.'));
    }, []);

    const prevSlide = () => setSlideIndex(i => (i - 1 + slides.length) % slides.length);
    const nextSlide = () => setSlideIndex(i => (i + 1) % slides.length);

    return (
        <div className="container-fluid p-0" style={{ fontFamily: "'Montserrat', sans-serif", backgroundColor: '#fff' }}>
            <style>{`
                .slide-btn { position: absolute; top: 50%; transform: translateY(-50%); background: none; border: none; color: white; font-size: 2rem; cursor: pointer; z-index: 10; padding: 10px 20px; }
                .slide-btn:hover { opacity: 0.7; }
                .slide-dots { display: flex; gap: 8px; justify-content: center; position: absolute; bottom: 20px; width: 100%; z-index: 10; }
                .dot { width: 6px; height: 6px; border-radius: 50%; background: rgba(255,255,255,0.5); cursor: pointer; border: none; }
                .dot.active { background: white; }
                
                .category-img-hover { overflow: hidden; cursor: pointer; display: flex; flex-direction: column; }
                .category-img-hover img { transition: transform 0.4s ease; }
                .category-img-hover:hover img { transform: scale(1.04); }
                
                .shop-now-link { color: #000; text-decoration: underline; text-underline-offset: 6px; font-size: 0.85rem; letter-spacing: 1px; font-weight: 400; background: none; border: none; padding: 0; cursor: pointer; }
                .shop-now-link:hover { opacity: 0.7; }
                
                .trending-product-card:hover img { transform: scale(1.05); }
            `}</style>

            {/* 1. Hero Slider with Sliding Effect */}
            <div style={{ position: 'relative', height: '100vh', width: '100%', overflow: 'hidden' }}>
                <div style={{ 
                    display: 'flex', 
                    height: '100%', 
                    width: '100%',
                    transform: `translateX(-${slideIndex * 100}vw)`, 
                    transition: 'transform 0.6s ease-in-out' 
                }}>
                    {slides.map((slide, index) => (
                        <div key={index} style={{ minWidth: '100vw', height: '100%', position: 'relative' }}>
                            <img
                                src={slide.image}
                                alt={`fragrance hero ${index}`}
                                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
                                onError={e => { e.target.style.background = '#1a1a2e'; e.target.style.display = 'none'; }}
                            />
                            <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(30,20,10,0.45)' }} />
                            <div style={{ position: 'absolute', bottom: '12%', width: '100%', textAlign: 'center', color: 'white', zIndex: 2 }}>
                                <h1 style={{ letterSpacing: '6px', fontWeight: '500', fontSize: '2.8rem', marginBottom: '8px' }}>{slide.title}</h1>
                                {slide.subtitle && <h2 style={{ letterSpacing: '3px', fontWeight: '400', fontSize: '1.1rem', marginBottom: '25px' }}>{slide.subtitle}</h2>}
                                <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginTop: slide.subtitle ? '0' : '20px' }}>
                                    {slide.links.map(l => (
                                        <button key={l} style={{ background: 'none', border: 'none', color: 'white', letterSpacing: '2px', fontSize: '0.85rem', fontWeight: '500', padding: 0, cursor: 'pointer' }}>{l}</button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <button className="slide-btn" style={{ left: 20 }} onClick={prevSlide}>&#8249;</button>
                <button className="slide-btn" style={{ right: 20 }} onClick={nextSlide}>&#8250;</button>
                
                <div className="slide-dots">
                    {slides.map((_, i) => (
                        <button key={i} className={`dot ${i === slideIndex ? 'active' : ''}`} onClick={() => setSlideIndex(i)} />
                    ))}
                </div>
            </div>

            {error && <div className="container mt-4"><div className="alert alert-danger rounded-0">{error}</div></div>}

            {/* 2. NEW IN Section */}
            <div style={{ padding: '80px 50px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '50px' }}>
                    <div style={{ width: '280px', flexShrink: 0, paddingTop: '30px' }}>
                        <p style={{ fontSize: '0.8rem', color: '#777', letterSpacing: '1px', marginBottom: '15px', fontWeight: '300' }}>10+ ITEMS</p>
                        <h2 style={{ letterSpacing: '2px', fontWeight: '400', fontSize: '2.4rem', color: '#000', marginBottom: '25px', lineHeight: 1.2 }}>NEW IN</h2>
                        <p style={{ color: '#555', fontSize: '1rem', lineHeight: '1.8', marginBottom: '35px', fontWeight: '300' }}>
                            Discover our new arrivals,<br/>signature selections and scents<br/>we love.
                        </p>
                        <button className="shop-now-link">SHOP NOW</button>
                    </div>
                    
                    <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px' }}>
                        {[
                            { src: 'https://cdn.shopify.com/s/files/1/0027/2596/9964/files/fragrance_finder_d.webp?v=1773311506', label: 'FIND YOUR SCENT' },
                            { src: 'https://cdn.shopify.com/s/files/1/0027/2596/9964/files/new_in_d.webp?v=1773041533', label: 'FOR HER' },
                            { src: 'https://cdn.shopify.com/s/files/1/0027/2596/9964/files/for_him_desktop.webp?v=1778743508', label: 'FOR HIM' },
                        ].map(cat => (
                            <div key={cat.label} className="category-img-hover">
                                <div style={{ overflow: 'hidden', flex: 1 }}>
                                    <img src={cat.src} alt={cat.label} style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block' }} />
                                </div>
                                <p style={{ textAlign: 'center', marginTop: '20px', letterSpacing: '1px', fontSize: '0.85rem', fontWeight: '600', color: '#000' }}>{cat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 3. Two-column banner FOR HER / FOR HIM */}
            <div style={{ display: 'flex', height: '70vh', marginBottom: '60px' }}>
                {[
                    { src: 'https://cdn.shopify.com/s/files/1/0027/2596/9964/files/fragrance_slider.webp', label: 'FOR HER', sub: 'SHOP NOW →' },
                    { src: 'https://cdn.shopify.com/s/files/1/0027/2596/9964/files/arc_slider.webp?v=1778743511', label: 'FOR HIM', sub: 'SHOP NOW →' },
                ].map(item => (
                    <div key={item.label} style={{ flex: 1, position: 'relative', overflow: 'hidden', cursor: 'pointer' }}>
                        <img src={item.src} alt={item.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.25)' }} />
                        <div style={{ position: 'absolute', bottom: '12%', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', color: 'white', whiteSpace: 'nowrap' }}>
                            <h2 style={{ letterSpacing: '5px', fontWeight: '500', fontSize: '1.8rem', marginBottom: '8px' }}>{item.label}</h2>
                            <button style={{ background: 'none', border: 'none', color: 'white', fontSize: '0.8rem', letterSpacing: '2px', padding: 0, cursor: 'pointer' }}>{item.sub}</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* 4. TRENDING Products Section (Static 4-Column Grid with Hover) */}
            <div style={{ padding: '60px 80px 120px', backgroundColor: '#fff' }}>
                
                {/* Header & Tabs */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '70px', marginBottom: '50px' }}>
                    <div>
                        <h2 style={{ letterSpacing: '5px', fontWeight: '600', fontSize: '2.8rem', color: '#000', marginBottom: '15px', lineHeight: 1 }}>
                            TRENDING
                        </h2>
                        <p style={{ fontSize: '0.75rem', color: '#888', letterSpacing: '3px', textTransform: 'uppercase', margin: 0 }}>
                            THIS SEASON'S MUST-HAVE SCENTS.
                        </p>
                    </div>

                    <div style={{ display: 'flex', gap: '35px', paddingTop: '15px' }}>
                        {['FOR HER', 'FOR HIM', 'SUMMER PICKS', 'TRAVEL SIZE'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTrendingTab(tab)}
                                style={{
                                    background: 'none', 
                                    border: 'none', 
                                    fontSize: '0.9rem', 
                                    letterSpacing: '1px',
                                    cursor: 'pointer', 
                                    color: activeTrendingTab === tab ? '#000' : '#444',
                                    borderBottom: activeTrendingTab === tab ? '2px solid #000' : 'none',
                                    paddingBottom: '4px', 
                                    fontWeight: activeTrendingTab === tab ? '600' : '400',
                                    fontFamily: "'Montserrat', sans-serif", 
                                    textTransform: 'uppercase',
                                    transition: 'color 0.3s ease'
                                }}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Static Product Grid (No Carousel) */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px' }}>
                    {products.map(product => (
                        <div key={product.id} className="trending-product-card" style={{ cursor: 'pointer', textAlign: 'left' }}>
                            
                            {/* Product Image with Hover Scale */}
                            <div style={{ overflow: 'hidden', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
                                <img 
                                    src={product.image} 
                                    alt={product.name}
                                    style={{ 
                                        width: '100%', 
                                        aspectRatio: '1/1', 
                                        objectFit: 'contain', 
                                        display: 'block', 
                                        transition: 'transform 0.4s ease' 
                                    }} 
                                />
                            </div>
                            
                            {/* Product Details */}
                            <h5 style={{ fontSize: '0.85rem', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px', color: '#000' }}>
                                {product.name}
                            </h5>
                            
                            <p style={{ fontSize: '0.65rem', color: '#888', letterSpacing: '1px', marginBottom: '10px', textTransform: 'uppercase' }}>
                                {activeTrendingTab === 'FOR HER' ? "WOMEN'S BODY MIST" : "MEN'S PERFUME"}
                            </p>
                            
                            <p style={{ fontSize: '0.85rem', color: '#000', fontWeight: '500', marginBottom: '14px' }}>
                                Rs. {product.price.toLocaleString()}
                            </p>
                            
                            {/* NEW IN Badge */}
                            <span style={{ 
                                fontSize: '0.55rem', 
                                color: '#555', 
                                letterSpacing: '1px', 
                                backgroundColor: '#f4f4f4',
                                padding: '4px 8px',
                                textTransform: 'uppercase'
                            }}>
                                NEW IN
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default FragrancesSection;