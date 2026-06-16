import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Footer } from './WomensSection';

const MensSection = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('STITCHED');
    const [slideIndex, setSlideIndex] = useState(0);

    const slides = [
        {
            image: 'https://cdn.shopify.com/s/files/1/0027/2596/9964/files/Man_slider_23bab185-6aec-4c7d-b461-e205e76fdcc8.webp',
            title: "SUMMER '26",
            subtitle: 'NEW ARRIVALS',
            links: ['UNSTITCHED', 'STITCHED'],
        },
        {
            image: 'https://cdn.shopify.com/s/files/1/0027/2596/9964/files/man_web_5d029b01-a401-4b13-927f-f1cdb6f62a69.webp?v=1780911829',
            title: "SUMMER '26",
            subtitle: 'NEW ARRIVALS',
            links: ['UNSTITCHED', 'STITCHED'],
        }
    ];

    useEffect(() => {
        axios.get('http://localhost:5000/api/products?category=mens')
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
                .m-tab-link { background: none; border: none; font-size: 0.78rem; letter-spacing: 2px; padding-bottom: 4px; cursor: pointer; color: #888; font-family: 'Montserrat', sans-serif; font-weight: 500; }
                .m-tab-link.active { color: #000; border-bottom: 2px solid #000; }
                .category-img-hover { overflow: hidden; cursor: pointer; }
                .category-img-hover img { transition: transform 0.4s ease; }
                .category-img-hover:hover img { transform: scale(1.04); }
                .split-banner { position: relative; flex: 1; overflow: hidden; cursor: pointer; }
                .split-banner img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
                .split-banner:hover img { transform: scale(1.03); }
                .split-banner-label { position: absolute; bottom: 12%; left: 50%; transform: translateX(-50%); text-align: center; color: white; text-shadow: 0 2px 6px rgba(0,0,0,0.3); white-space: nowrap; }
            `}</style>

            {/* Hero Slider with Sliding Effect */}
            <div style={{ position: 'relative', height: '100vh', width: '100%', overflow: 'hidden' }}>
                
                {/* The "Track" that holds all slides and shifts left/right */}
                <div style={{ 
                    display: 'flex', 
                    height: '100%', 
                    width: '100%',
                    transform: `translateX(-${slideIndex * 100}vw)`, // Moves the track horizontally
                    transition: 'transform 0.6s ease-in-out' // The smooth animation
                }}>
                    {slides.map((slide, index) => (
                        <div key={index} style={{ minWidth: '100vw', height: '100%', position: 'relative' }}>
                            <img
                                src={slide.image}
                                alt={`hero-${index}`}
                                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
                            />
                            {/* Text overlay moves with the slide */}
                            <div style={{ position: 'absolute', bottom: '10%', width: '100%', textAlign: 'center', color: 'white', textShadow: '0 2px 6px rgba(0,0,0,0.2)' }}>
                                <h1 style={{ letterSpacing: '4px', fontWeight: '500', fontSize: '2.5rem', marginBottom: '6px' }}>{slide.title}</h1>
                                <h2 style={{ letterSpacing: '3px', fontWeight: '400', fontSize: '1.1rem', marginBottom: '25px' }}>{slide.subtitle}</h2>
                                <div style={{ display: 'flex', justifyContent: 'center', gap: '40px' }}>
                                    {slide.links.map(l => (
                                        <a key={l} href="#shop" style={{ color: 'white', textDecoration: 'none', letterSpacing: '2px', fontSize: '0.82rem', fontWeight: '500' }}>{l}</a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Slider Controls */}
                <button className="slide-btn" style={{ left: 20 }} onClick={prevSlide}>&#8249;</button>
                <button className="slide-btn" style={{ right: 20 }} onClick={nextSlide}>&#8250;</button>
            </div>

            {error && <div className="container mt-4"><div className="alert alert-danger rounded-0">{error}</div></div>}

            {/* NEW IN Section */}
            <div style={{ padding: '70px 60px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '40px' }}>
                    <div style={{ width: '260px', flexShrink: 0, paddingTop: '20px' }}>
                        <p style={{ fontSize: '0.7rem', color: '#888', letterSpacing: '2px', marginBottom: '12px' }}>40+ ITEMS</p>
                        <h2 style={{ letterSpacing: '4px', fontWeight: '400', fontSize: '2.8rem', marginBottom: '20px', lineHeight: 1.1 }}>NEW IN</h2>
                        <p style={{ color: '#555', fontSize: '0.85rem', lineHeight: '1.9', marginBottom: '30px', fontWeight: '300' }}>
                            Upgrade your wardrobe with our latest arrivals. Discover dapper looks for the new season.
                        </p>
                        <a href="#shop" style={{ color: '#000', textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '2px', borderBottom: '1px solid #000', paddingBottom: '2px', fontWeight: '500' }}>SHOP NOW</a>
                    </div>
                    <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                        {[
                            { src: 'https://cdn.shopify.com/s/files/1/0027/2596/9964/files/man_outfits_d.webp?v=1780912930', label: 'OUTFITS' },
                            { src: 'https://cdn.shopify.com/s/files/1/0027/2596/9964/files/new_in_kurtas_web.webp?v=1780912167', label: 'KURTAS' },
                            { src: 'https://cdn.shopify.com/s/files/1/0027/2596/9964/files/unstich_man.webp?v=1775475180', label: 'UNSTITCHED FABRICS' },
                        ].map(cat => (
                            <div key={cat.label} className="category-img-hover">
                                <img src={cat.src} alt={cat.label} style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', display: 'block' }} />
                                <p style={{ textAlign: 'center', marginTop: '14px', letterSpacing: '2px', fontSize: '0.75rem', fontWeight: '600', color: '#000' }}>{cat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Split Banner: PLAIN / EMBROIDERED */}
            <div style={{ display: 'flex', height: '80vh', marginBottom: '60px' }}>
                <div className="split-banner">
                    <img src="https://cdn.shopify.com/s/files/1/0027/2596/9964/files/upd_plain_tile_web.webp?v=1780913748" alt="Plain" />
                    <div className="split-banner-label">
                        <h2 style={{ letterSpacing: '5px', fontWeight: '500', fontSize: '2rem', marginBottom: '8px' }}>PLAIN</h2>
                        <a href="#plain" style={{ color: 'white', textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '2px', fontWeight: '500' }}>SHOP THE TREND →</a>
                    </div>
                </div>
                <div className="split-banner">
                    <img src="https://cdn.shopify.com/s/files/1/0027/2596/9964/files/textured_tile_web.webp?v=1780912455" alt="Embroidered" />
                    <div className="split-banner-label">
                        <h2 style={{ letterSpacing: '5px', fontWeight: '500', fontSize: '2rem', marginBottom: '8px' }}>EMBROIDERED</h2>
                        <a href="#embroidered" style={{ color: 'white', textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '2px', fontWeight: '500' }}>SHOP THE TREND →</a>
                    </div>
                </div>
            </div>

            {/* TRENDING Section */}
            <div style={{ padding: '20px 60px 70px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid #ddd', paddingBottom: '16px', marginBottom: '28px' }}>
                    <div>
                        <h2 style={{ letterSpacing: '5px', fontWeight: '500', fontSize: '2rem', marginBottom: '6px' }}>TRENDING</h2>
                        <p style={{ fontSize: '0.68rem', color: '#999', letterSpacing: '3px' }}>DISCOVER THE BEST-SELLING STYLES</p>
                    </div>
                    <div style={{ display: 'flex', gap: '28px' }}>
                        {['STITCHED', 'PLAIN', 'EMBROIDERED'].map(tab => (
                            <button key={tab} className={`m-tab-link ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px' }}>
                    {products.map(product => (
                        <div key={product.id} style={{ paddingBottom: '20px' }}>
                            <img src={product.image} alt={product.name} style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', display: 'block', backgroundColor: '#f5f5f5', cursor: 'pointer' }} />
                            <div style={{ paddingTop: '12px' }}>
                                <p style={{ fontSize: '0.78rem', fontWeight: '500', letterSpacing: '0.5px', marginBottom: '4px', textTransform: 'uppercase' }}>{product.name}</p>
                                <p style={{ fontSize: '0.65rem', color: '#999', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '5px' }}>MEN'S STITCHED SUMMER '26 - NEW ARRIVALS</p>
                                <p style={{ fontSize: '0.82rem', fontWeight: '500', marginBottom: '6px' }}>Rs.{product.price.toLocaleString()}</p>
                                <span style={{ fontSize: '0.6rem', border: '1px solid #ccc', padding: '2px 6px', letterSpacing: '1px', color: '#555' }}>NEW IN</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            <Footer />
        </div>
    );
};

export default MensSection;