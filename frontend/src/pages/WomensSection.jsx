import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WomensSection = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('RTW');
    const [slideIndex, setSlideIndex] = useState(0);

    const slides = [
        {
            image: 'https://cdn.shopify.com/s/files/1/0027/2596/9964/files/web_banner_ad9836a5-b4f0-4e60-b107-9fe31c15f228.webp',
            title: 'THE MONOCHROME EDIT',
            subtitle: 'UNSTITCHED',
            cta: 'SHOP NOW',
        },
        {
            image: 'https://cdn.shopify.com/s/files/1/0027/2596/9964/files/West_web_8646a0b8-bd6d-4a55-9540-6ba0a9521058.webp',
            title: 'WEST NEW ARRIVALS',
            subtitle: "SUMMER '26",
            cta: 'SHOP NOW',
        },
        {
            image: 'https://cdn.shopify.com/s/files/1/0027/2596/9964/files/RTW_web_de283232-1bdd-48cd-9ea4-db9153d4cd24.webp?v=1780911246',
            title: "SUMMER '26",
            subtitle: 'READY TO WEAR',
            cta: 'SHOP NOW',
        },
    ];

    useEffect(() => {
        axios.get('http://localhost:5000/api/products?category=womens')
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
                .product-img-wrapper { position: relative; overflow: hidden; cursor: pointer; }
                .hover-overlay { position: absolute; bottom: 0; left: 0; width: 100%; background: rgba(255,255,255,0.95); transform: translateY(100%); transition: transform 0.3s ease; padding: 15px 0; display: flex; flex-direction: column; align-items: center; }
                .product-img-wrapper:hover .hover-overlay { transform: translateY(0); }
                .size-list { display: flex; gap: 15px; margin-bottom: 10px; font-size: 0.7rem; color: #555; letter-spacing: 1px; }
                .size-list span:hover { color: #000; font-weight: 600; cursor: pointer; }
                .tab-link { background: none; border: none; font-size: 0.78rem; letter-spacing: 2px; padding-bottom: 4px; cursor: pointer; color: #888; font-family: 'Montserrat', sans-serif; font-weight: 500; }
                .tab-link.active { color: #000; border-bottom: 2px solid #000; }
                .shop-now-link { color: #000; text-decoration: none; font-size: 0.8rem; letter-spacing: 2px; border-bottom: 1px solid #000; padding-bottom: 2px; font-weight: 500; }
                .category-img-hover { overflow: hidden; cursor: pointer; }
                .category-img-hover img { transition: transform 0.4s ease; }
                .category-img-hover:hover img { transform: scale(1.04); }
                .new-in-badge { font-size: 0.7rem; color: #888; letter-spacing: 2px; margin-bottom: 12px; }
                .instagram-grid img { width: 100%; aspect-ratio: 1/1; object-fit: cover; }
                .footer-icon-section { border-top: 1px solid #e0e0e0; padding: 40px 60px; display: flex; justify-content: space-around; align-items: center; background: #fafafa; }
                .footer-icon-item { display: flex; flex-direction: column; align-items: center; gap: 12px; cursor: pointer; }
                .footer-icon-item img { width: 48px; height: 48px; object-fit: contain; }
                .footer-icon-item span { font-size: 0.7rem; letter-spacing: 2px; color: #333; font-weight: 500; }
            `}</style>

            {/* Hero Slider with Sliding Effect */}
            <div style={{ position: 'relative', height: '100vh', width: '100%', overflow: 'hidden' }}>
                
                {/* The "Track" that holds all slides and shifts left/right */}
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
                                alt={`hero-${index}`}
                                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
                                onError={e => { e.target.src = 'https://cdn.shopify.com/s/files/1/0027/2596/9964/files/WOMAN_Main_Banner_Desktop_7.jpg'; }}
                            />
                            {/* Text overlay moves with the slide */}
                            <div style={{ position: 'absolute', bottom: '10%', width: '100%', textAlign: 'center', color: 'white', textShadow: '0 2px 6px rgba(0,0,0,0.25)' }}>
                                <h1 style={{ letterSpacing: '4px', fontWeight: '500', fontSize: '2.5rem', marginBottom: '8px' }}>{slide.title}</h1>
                                <h2 style={{ letterSpacing: '3px', fontWeight: '400', fontSize: '1.1rem', marginBottom: '25px' }}>{slide.subtitle}</h2>
                                <a href="#shop" style={{ color: 'white', textDecoration: 'none', borderBottom: '1px solid white', paddingBottom: '3px', letterSpacing: '2px', fontSize: '0.85rem', fontWeight: '500' }}>{slide.cta}</a>
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
                        <p className="new-in-badge">200+ ITEMS</p>
                        <h2 style={{ letterSpacing: '4px', fontWeight: '400', fontSize: '2.8rem', marginBottom: '20px', lineHeight: 1.1 }}>NEW IN</h2>
                        <p style={{ color: '#555', fontSize: '0.85rem', lineHeight: '1.9', marginBottom: '30px', fontWeight: '300' }}>
                            Refresh your wardrobe with this week's new arrivals. Discover the latest trends, collection highlights, and key pieces for the season.
                        </p>
                        <a href="#shop" className="shop-now-link">SHOP NOW</a>
                    </div>
                    <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                        {[
                            { src: 'https://cdn.shopify.com/s/files/1/0027/2596/9964/files/Andaaz_new_in_tile_web.webp?v=1781171326', label: 'ANDAAZ' },
                            { src: 'https://cdn.shopify.com/s/files/1/0027/2596/9964/files/smart_casual_web.webp?v=1781171327', label: 'SMART CASUAL' },
                            { src: 'https://cdn.shopify.com/s/files/1/0027/2596/9964/files/dresses_web_5dca98d0-8697-41e4-bfd7-5deb658347e8.webp?v=1781171326', label: 'DRESSES' },
                        ].map(cat => (
                            <div key={cat.label} className="category-img-hover">
                                <img src={cat.src} alt={cat.label} style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', display: 'block' }} />
                                <p style={{ textAlign: 'center', marginTop: '14px', letterSpacing: '2px', fontSize: '0.75rem', fontWeight: '600', color: '#000' }}>{cat.label}</p>
                            </div>
                        ))}
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
                        {['RTW', 'UNSTITCHED'].map(tab => (
                            <button key={tab} className={`tab-link ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
                                {tab === 'RTW' ? 'READY TO WEAR' : 'UNSTITCHED'}
                            </button>
                        ))}
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px' }}>
                    {products.map(product => (
                        <div key={product.id} style={{ paddingBottom: '20px' }}>
                            <div className="product-img-wrapper">
                                <img src={product.image} alt={product.name} style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', display: 'block', backgroundColor: '#f5f5f5' }} />
                                <div className="hover-overlay">
                                    <div className="size-list"><span>XS</span><span>S</span><span>M</span><span>L</span><span>XL</span></div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <span style={{ fontSize: '0.72rem', fontWeight: '600', letterSpacing: '1px' }}>ADD TO BAG</span>
                                        <i className="bi bi-heart" style={{ cursor: 'pointer' }}></i>
                                    </div>
                                </div>
                            </div>
                            <div style={{ paddingTop: '12px' }}>
                                <p style={{ fontSize: '0.78rem', fontWeight: '500', letterSpacing: '0.5px', marginBottom: '4px' }}>{product.name}</p>
                                <p style={{ fontSize: '0.65rem', color: '#999', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '5px' }}>RTW SUMMER '26 - NEW ARRIVALS</p>
                                <p style={{ fontSize: '0.82rem', fontWeight: '500', marginBottom: '6px' }}>Rs.{product.price.toLocaleString()}</p>
                                <span style={{ fontSize: '0.6rem', border: '1px solid #ccc', padding: '2px 6px', letterSpacing: '1px', color: '#555' }}>NEW IN</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Instagram / Inspiration Section */}
            <div style={{ padding: '40px 0 80px' }}>
                <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                    <h2 style={{ letterSpacing: '5px', fontWeight: '600', fontSize: '2.2rem', color: '#000', marginBottom: '15px' }}>
                        WORLD OF INSPIRATION
                    </h2>
                    <p style={{ fontSize: '0.85rem', color: '#555', letterSpacing: '2px', textTransform: 'uppercase' }}>
                        CLICK TO SHOP THE LOOKS YOU LOVE!
                    </p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '0 60px' }}>
                    <div style={{ maxWidth: '200px' }}>
                        <p style={{ fontSize: '0.75rem', color: '#777', lineHeight: 1.8, marginBottom: '8px' }}>
                            Can never go wrong with black for Eid ✨ in @sapphirepakistan RTW collection.
                        </p>
                        <p style={{ fontSize: '0.8rem', fontWeight: '500' }}>@sajalaly</p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2px', flex: 1, marginLeft: '30px' }}>
                        {[
                            { src: 'https://cdn.shopify.com/s/files/1/0027/2596/9964/files/Sajal.webp?v=1777973352', handle: '@sajalaly' },
                            { src: 'https://cdn.shopify.com/s/files/1/0027/2596/9964/files/Dananeer_77882cd6-d231-41b9-be80-8ad219794f7c.webp?v=1777973352', handle: '@dananeerr' },
                            { src: 'https://cdn.shopify.com/s/files/1/0027/2596/9964/files/Rida.webp?v=1777973352', handle: '@ridableh' },
                            {src: 'https://cdn.shopify.com/s/files/1/0027/2596/9964/files/aden.webp?v=1777451907', handle: '@adenrehan' },
                        ].map((item, i) => (
                            <div key={i} style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer', aspectRatio: '1/1' }}>
                                <img src={item.src} alt={item.handle} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                                    onError={e => { e.target.src = 'https://cdn.shopify.com/s/files/1/0027/2596/9964/files/dresses_d.webp'; }} />
                                <div style={{ position: 'absolute', bottom: '8px', left: '10px', color: 'white', fontSize: '0.7rem', fontWeight: '500', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>{item.handle}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            
            {/* Footer */}
            <Footer />
        </div>
    );
};

const Footer = () => (
    <footer style={{ backgroundColor: '#f8f8f8', fontFamily: "'Montserrat', sans-serif" }}>
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '40px 60px', borderTop: '1px solid #e8e8e8' }}>
            {[
                { icon: '🚚', label: 'ORDER TRACKING' },
                { icon: '🔄', label: 'EXCHANGES & RETURNS' },
                { icon: '🏪', label: 'OUR STORES' },
            ].map(item => (
                <div key={item.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                    <span style={{ fontSize: '2rem' }}>{item.icon}</span>
                    <span style={{ fontSize: '0.65rem', letterSpacing: '2px', color: '#444', fontWeight: '500' }}>{item.label}</span>
                </div>
            ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1.4fr', gap: '40px', padding: '40px 60px', borderTop: '1px solid #e0e0e0' }}>
            <div>
                <h6 style={{ fontSize: '0.75rem', letterSpacing: '2px', fontWeight: '600', marginBottom: '20px' }}>CONTACT US</h6>
                <p style={{ fontSize: '0.75rem', color: '#555', marginBottom: '10px' }}>✉️ wecare@sapphireonline.pk</p>
                <p style={{ fontSize: '0.75rem', color: '#555' }}>📞 +92(0)42 323-882-45<br />+92(0)42 111-738-245</p>
            </div>
            <div>
                <h6 style={{ fontSize: '0.75rem', letterSpacing: '2px', fontWeight: '600', marginBottom: '20px' }}>CUSTOMER CARE</h6>
                {['FAQs', 'EXCHANGE & RETURN POLICY', 'CONTACT US'].map(l => (
                    <p key={l} style={{ margin: 0 }}>
                        <button style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontSize: '0.72rem', color: '#555', textDecoration: 'none', letterSpacing: '1px', display: 'block', marginBottom: '12px', textAlign: 'left' }}>{l}</button>
                    </p>
                ))}
            </div>
            <div>
                <h6 style={{ fontSize: '0.75rem', letterSpacing: '2px', fontWeight: '600', marginBottom: '20px' }}>INFORMATION</h6>
                {['ABOUT US', 'PRIVACY POLICY', 'PAYMENTS', 'STORE LOCATOR', 'FABRIC GLOSSARY', 'BLOGS'].map(l => (
                    <p key={l} style={{ margin: 0 }}>
                        <button style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontSize: '0.72rem', color: '#555', textDecoration: 'none', letterSpacing: '1px', display: 'block', marginBottom: '12px', textAlign: 'left' }}>{l}</button>
                    </p>
                ))}
            </div>
            <div>
                <h6 style={{ fontSize: '0.75rem', letterSpacing: '2px', fontWeight: '600', marginBottom: '8px' }}>NEWSLETTER SIGNUP</h6>
                <p style={{ fontSize: '0.7rem', color: '#777', letterSpacing: '1px', marginBottom: '16px' }}>SUBSCRIBE TO OUR NEWSLETTER FOR EXCLUSIVE UPDATES</p>
                <div style={{ display: 'flex', marginBottom: '24px' }}>
                    <input type="email" placeholder="Your email address *" style={{ flex: 1, border: '1px solid #ccc', padding: '10px 14px', fontSize: '0.75rem', outline: 'none', fontFamily: 'Montserrat, sans-serif' }} />
                    <button style={{ backgroundColor: '#222', color: 'white', border: 'none', padding: '10px 16px', fontSize: '0.7rem', letterSpacing: '1px', cursor: 'pointer', fontFamily: 'Montserrat, sans-serif', fontWeight: '500' }}>SUBSCRIBE</button>
                </div>
                <div style={{ display: 'flex', gap: '18px', fontSize: '1.2rem' }}>
                    {['bi-facebook', 'bi-instagram', 'bi-youtube', 'bi-tiktok'].map(icon => (
                        <i key={icon} className={`bi ${icon}`} style={{ cursor: 'pointer', color: '#222' }}></i>
                    ))}
                </div>
            </div>
        </div>

        <div style={{ borderTop: '1px solid #e0e0e0', padding: '16px 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.7rem', color: '#777', letterSpacing: '1px' }}>© COPYRIGHT 2026 SAPPHIRE</span>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/200px-Mastercard-logo.svg.png" alt="Mastercard" style={{ height: '24px' }} />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/200px-Visa_Inc._logo.svg.png" alt="Visa" style={{ height: '20px' }} />
            </div>
        </div>
    </footer>
);

export { Footer };
export default WomensSection;