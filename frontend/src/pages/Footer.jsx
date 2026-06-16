import React from 'react';

const Footer = () => (
    <footer style={{ backgroundColor: '#f8f8f8', fontFamily: "'Montserrat', sans-serif" }}>
        {/* Service Icons Row */}
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

        {/* Main Footer Content */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1.4fr', gap: '40px', padding: '40px 60px', borderTop: '1px solid #e0e0e0' }}>
            <div>
                <h6 style={{ fontSize: '0.75rem', letterSpacing: '2px', fontWeight: '600', marginBottom: '20px' }}>CONTACT US</h6>
                <p style={{ fontSize: '0.75rem', color: '#555', marginBottom: '10px' }}>✉️ wecare@sapphireonline.pk</p>
                <p style={{ fontSize: '0.75rem', color: '#555' }}>📞 +92(0)42 323-882-45<br />+92(0)42 111-738-245</p>
            </div>
            <div>
                <h6 style={{ fontSize: '0.75rem', letterSpacing: '2px', fontWeight: '600', marginBottom: '20px' }}>CUSTOMER CARE</h6>
                {['FAQs', 'EXCHANGE & RETURN POLICY', 'CONTACT US'].map(l => (
                    <p key={l}><a href="#" style={{ fontSize: '0.72rem', color: '#555', textDecoration: 'none', letterSpacing: '1px', display: 'block', marginBottom: '12px' }}>{l}</a></p>
                ))}
            </div>
            <div>
                <h6 style={{ fontSize: '0.75rem', letterSpacing: '2px', fontWeight: '600', marginBottom: '20px' }}>INFORMATION</h6>
                {['ABOUT US', 'PRIVACY POLICY', 'PAYMENTS', 'STORE LOCATOR', 'FABRIC GLOSSARY', 'BLOGS'].map(l => (
                    <p key={l}><a href="#" style={{ fontSize: '0.72rem', color: '#555', textDecoration: 'none', letterSpacing: '1px', display: 'block', marginBottom: '12px' }}>{l}</a></p>
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
