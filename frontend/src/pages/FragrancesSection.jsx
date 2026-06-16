import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FragrancesSection = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/api/products?category=fragrances')
            .then(response => setProducts(response.data))
            .catch(err => setError('Server Offline: Unable to fetch products.'));
    }, []);

    return (
        <div className="container-fluid p-0" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            <div style={{
                position: 'relative', height: '60vh', width: '100%', backgroundColor: '#111',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <h1 style={{ letterSpacing: '8px', fontWeight: '300', fontSize: '3.5rem' }}>BEAUTY & FRAGRANCE</h1>
                    <p className="mt-3" style={{ letterSpacing: '2px', fontSize: '0.9rem', fontWeight: '300' }}>DISCOVER YOUR SIGNATURE SCENT</p>
                </div>
            </div>

            {error && <div className="container mt-4"><div className="alert alert-danger rounded-0">{error}</div></div>}

            <div className="container mb-5 pb-5 mt-5 pt-4">
                <div className="row g-4 justify-content-center">
                    {products.map(product => (
                        <div key={product.id} className="col-8 col-md-6 col-lg-4 mb-4">
                            <div className="card border-0 rounded-0 h-100 bg-transparent align-items-center">
                                <div className="position-relative overflow-hidden w-75" style={{ cursor: 'pointer' }}>
                                    <img src={product.image} className="card-img-top rounded-0 w-100" alt={product.name} style={{ objectFit: 'cover', aspectRatio: '1/1' }} />
                                </div>
                                <div className="card-body px-0 py-4 d-flex flex-column text-center w-100">
                                    <h5 className="card-title text-dark mb-2" style={{ fontSize: '1rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>{product.name}</h5>
                                    <p className="card-text text-dark fw-normal mb-3" style={{ fontSize: '0.95rem' }}>Rs. {product.price}</p>
                                    <button className="btn btn-dark mt-auto rounded-0 w-100 mx-auto" style={{ fontSize: '0.8rem', letterSpacing: '2px', padding: '12px 0', maxWidth: '250px' }}>
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

export default FragrancesSection;