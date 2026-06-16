import React, { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';

const Navbar = () => {
    const [showNavbar, setShowNavbar] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }

            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setShowNavbar(false); 
            } else {
                setShowNavbar(true);  
            }
            
            lastScrollY = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []); 

    return (
        <nav 
            className="sapphire-nav-transparent d-flex justify-content-between align-items-start"
            style={{
                position: 'fixed', 
                top: 0,
                left: 0,
                width: '100%',
                zIndex: 1000,
                transition: 'transform 0.4s ease-in-out, padding 0.3s ease',
                transform: showNavbar ? 'translateY(0)' : 'translateY(-100%)', 
                backgroundColor: 'transparent', 
                padding: isScrolled ? '15px 50px' : '40px 50px', 
            }}
        >
            <div className="d-flex align-items-start">
                <i className="bi bi-list text-white me-4" style={{fontSize: '2.2rem', cursor: 'pointer', marginTop: '-5px'}}></i>
                <div>
                    <Link to="/" className="sapphire-logo">SAPPHIRE</Link>
                    <div className="nav-category-links">
                        <NavLink to="/womens">WOMAN</NavLink>
                        <NavLink to="/mens">MAN</NavLink>
                        <NavLink to="/fragrances">FRAGRANCES</NavLink>
                    </div>
                </div>
            </div>

            <div className="icon-group mt-2">
                <i className="bi bi-search" style={{ cursor: 'pointer' }}></i>
                
                {/* Wrapped the Profile Icon in a Link pointing to Admin Login */}
                <Link to="/admin-login" style={{ color: 'inherit', textDecoration: 'none' }}>
                    <i className="bi bi-person" style={{ cursor: 'pointer' }}></i>
                </Link>

                <span className="position-relative" style={{ cursor: 'pointer' }}>
                    <i className="bi bi-bag"></i>
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-white text-dark" style={{fontSize: '0.55rem', padding: '0.25em 0.4em'}}>
                        0
                    </span>
                </span>
            </div>
        </nav>
    );
};

export default Navbar;