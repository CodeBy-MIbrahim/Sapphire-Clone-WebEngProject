import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="sapphire-nav-transparent d-flex justify-content-between align-items-start">
            
            {/* Left Side: Hamburger Menu + Logo + Dynamic Links */}
            <div className="d-flex align-items-start">
                <i className="bi bi-list text-white me-4" style={{fontSize: '2.2rem', cursor: 'pointer', marginTop: '-5px'}}></i>
                <div>
                    <Link to="/" className="sapphire-logo">SAPPHIRE</Link>
                    <div className="nav-category-links">
                        {/* NavLink automatically handles the 'active' class based on the URL */}
                        <NavLink to="/womens">WOMAN</NavLink>
                        <NavLink to="/mens">MAN</NavLink>
                        <NavLink to="/fragrances">FRAGRANCES</NavLink>
                    </div>
                </div>
            </div>

            {/* Right Side: Icons */}
            <div className="icon-group mt-2">
                <i className="bi bi-search"></i>
                <i className="bi bi-person"></i>
                <span className="position-relative">
                    <i className="bi bi-bag"></i>
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark" style={{fontSize: '0.55rem', padding: '0.25em 0.4em'}}>
                        0
                    </span>
                </span>
            </div>
        </nav>
    );
};

export default Navbar;