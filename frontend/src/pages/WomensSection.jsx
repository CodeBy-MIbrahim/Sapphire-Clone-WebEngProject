import React from 'react';

const WomensSection = () => {
    return (
        <div className="container-fluid p-0">
            {/* Women's Hero Banner - Creates the "Dark" background for the Navbar */}
            <div style={{
                position: 'relative',
                height: '100vh',
                width: '100%',
                backgroundImage: `url('https://cdn.shopify.com/s/files/1/0027/2596/9964/files/festive_silk_d_dfd93e4b-739b-45cc-b076-eab04da3ff8d.webp?v=1778754039')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center top'
            }}>
                <div style={{
                    position: 'absolute',
                    bottom: '10%',
                    width: '100%',
                    textAlignment: 'center',
                    color: 'white',
                    textAlign: 'center'
                }}>
                    <h1 style={{ letterSpacing: '6px', fontWeight: '500', fontSize: '3rem' }}>WOMAN</h1>
                    <div className="mt-3">
                        <a href="#ready-to-wear" className="text-white text-decoration-none mx-3" style={{ letterSpacing: '2px', fontSize: '0.8rem' }}>READY TO WEAR</a>
                        <a href="#unstitched" className="text-white text-decoration-none mx-3" style={{ letterSpacing: '2px', fontSize: '0.8rem' }}>UNSTITCHED</a>
                    </div>
                </div>
            </div>

            {/* Ayesha can add her dynamic product grids below this line */}
            <div className="container mt-5 text-center">
                <p className="text-muted">Ayesha: Add the Women's Trending grid here using Axios.</p>
            </div>
        </div>
    );
};

export default WomensSection;