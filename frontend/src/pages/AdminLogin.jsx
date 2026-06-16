import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        
        // Check for our specific admin credentials
        if (email === 'admin@gmail.com' && password === 'Admin123') {
            setError('');
            navigate('/admin'); // Success! Send to dashboard
        } else {
            setError('Invalid email or password. Please try again.');
        }
    };

    return (
        <div style={{ height: '100vh', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8f8f8', fontFamily: "'Montserrat', sans-serif" }}>
            
            {/* NEW: Back Button */}
            <button 
                onClick={() => navigate('/mens')}
                style={{ 
                    position: 'absolute', 
                    top: '40px', 
                    left: '50px', 
                    background: 'none', 
                    border: 'none', 
                    fontSize: '0.85rem', 
                    letterSpacing: '2px', 
                    cursor: 'pointer', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px', 
                    fontWeight: '500',
                    color: '#000'
                }}
            >
                <span style={{ fontSize: '1.5rem', lineHeight: 0.8 }}>&#8249;</span> BACK TO MAIN
            </button>

            <div style={{ width: '100%', maxWidth: '400px', backgroundColor: '#fff', padding: '50px 40px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <h2 style={{ letterSpacing: '4px', fontWeight: '500', fontSize: '1.8rem', marginBottom: '10px' }}>LOGIN</h2>
                    <p style={{ fontSize: '0.8rem', color: '#777', letterSpacing: '1px' }}>ADMINISTRATOR ACCESS</p>
                </div>

                <form onSubmit={handleLogin}>
                    <div style={{ marginBottom: '20px' }}>
                        <input 
                            type="email" 
                            placeholder="Email Address" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{ width: '100%', padding: '12px 15px', border: '1px solid #ccc', fontSize: '0.85rem', outline: 'none', fontFamily: "'Montserrat', sans-serif" }}
                        />
                    </div>
                    
                    <div style={{ marginBottom: '10px' }}>
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{ width: '100%', padding: '12px 15px', border: '1px solid #ccc', fontSize: '0.85rem', outline: 'none', fontFamily: "'Montserrat', sans-serif" }}
                        />
                    </div>

                    {error && (
                        <div style={{ color: '#d9534f', fontSize: '0.75rem', marginBottom: '20px', textAlign: 'center' }}>
                            {error}
                        </div>
                    )}

                    <button 
                        type="submit" 
                        style={{ width: '100%', backgroundColor: '#000', color: '#fff', border: 'none', padding: '15px 0', fontSize: '0.85rem', letterSpacing: '2px', fontWeight: '500', cursor: 'pointer', marginTop: '20px', transition: 'background-color 0.3s' }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#333'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#000'}
                    >
                        SIGN IN
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;