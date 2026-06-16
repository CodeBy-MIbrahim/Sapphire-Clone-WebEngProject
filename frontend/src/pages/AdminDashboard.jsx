import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    
    // Modal & Form State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ id: '', name: '', category: '', price: '', image: '' });
    
    const navigate = useNavigate();

    // 1. READ: Fetch all products
    const fetchProducts = () => {
        axios.get('http://localhost:5000/api/products')
            .then(res => setProducts(res.data))
            .catch(err => console.error("Failed to fetch products:", err));
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // 2. DELETE: Remove a product
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            axios.delete(`http://localhost:5000/api/products/${id}`)
                .then(() => {
                    // Refresh the list after deleting
                    fetchProducts(); 
                })
                .catch(err => console.error("Error deleting product:", err));
        }
    };

    // Open Modal for ADD
    const openAddModal = () => {
        setIsEditing(false);
        setFormData({ id: '', name: '', category: 'mens', price: '', image: '' }); // Default empty form
        setIsModalOpen(true);
    };

    // Open Modal for EDIT
    const openEditModal = (product) => {
        setIsEditing(true);
        setFormData(product); // Fill form with existing product data
        setIsModalOpen(true);
    };

    // Handle Input Changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // 3. CREATE & UPDATE: Submit the form
    const handleSubmit = (e) => {
        e.preventDefault();

        // Convert price string to a number just in case
        const productData = { ...formData, price: Number(formData.price) };

        if (isEditing) {
            // Update Existing Product (PUT)
            axios.put(`http://localhost:5000/api/products/${formData.id}`, productData)
                .then(() => {
                    fetchProducts();
                    setIsModalOpen(false);
                })
                .catch(err => console.error("Error updating product:", err));
        } else {
            // Add New Product (POST)
            // Generate a simple ID based on timestamp if backend doesn't auto-assign
            const newProduct = { ...productData, id: Date.now() }; 
            
            axios.post('http://localhost:5000/api/products', newProduct)
                .then(() => {
                    fetchProducts();
                    setIsModalOpen(false);
                })
                .catch(err => console.error("Error adding product:", err));
        }
    };

    const handleLogout = () => {
        navigate('/admin-login');
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Montserrat', sans-serif", backgroundColor: '#f4f4f4', position: 'relative' }}>
            
            {/* Sidebar Navigation */}
            <div style={{ width: '260px', backgroundColor: '#111', color: '#fff', padding: '30px 20px', display: 'flex', flexDirection: 'column' }}>
                
                {/* Back to Store Button */}
                <button 
                    onClick={() => navigate('/mens')}
                    style={{ background: 'none', border: 'none', color: '#aaa', cursor: 'pointer', textAlign: 'left', marginBottom: '40px', fontSize: '0.8rem', letterSpacing: '1px', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                    <span style={{ fontSize: '1.2rem', lineHeight: 0.8 }}>&#8249;</span> BACK TO STORE
                </button>

                <h2 style={{ fontSize: '1.2rem', letterSpacing: '3px', marginBottom: '50px', textAlign: 'center' }}>SAPPHIRE<br/><span style={{ fontSize: '0.7rem', color: '#888' }}>ADMIN PANEL</span></h2>
                
                <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <button style={{ background: '#333', color: '#fff', border: 'none', padding: '12px 15px', textAlign: 'left', cursor: 'pointer', borderRadius: '4px', letterSpacing: '1px', fontSize: '0.85rem' }}>📦 All Products</button>
                    <button style={{ background: 'none', color: '#888', border: 'none', padding: '12px 15px', textAlign: 'left', cursor: 'pointer', letterSpacing: '1px', fontSize: '0.85rem' }}>📊 Orders</button>
                    <button style={{ background: 'none', color: '#888', border: 'none', padding: '12px 15px', textAlign: 'left', cursor: 'pointer', letterSpacing: '1px', fontSize: '0.85rem' }}>👥 Customers</button>
                </nav>
                
                <button onClick={handleLogout} style={{ backgroundColor: 'transparent', border: '1px solid #555', color: '#fff', padding: '12px', cursor: 'pointer', marginTop: 'auto', letterSpacing: '2px', fontSize: '0.8rem', transition: 'background 0.3s' }}>
                    LOGOUT
                </button>
            </div>

            {/* Main Dashboard Content */}
            <div style={{ flex: 1, padding: '40px 50px' }}>
                
                {/* Top Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                    <div>
                        <h1 style={{ fontWeight: '500', fontSize: '2rem', letterSpacing: '1px', marginBottom: '5px' }}>Product Management</h1>
                        <p style={{ color: '#777', fontSize: '0.85rem' }}>Manage your store inventory, prices, and categories.</p>
                    </div>
                    <button onClick={openAddModal} style={{ backgroundColor: '#000', color: '#fff', border: 'none', padding: '12px 24px', cursor: 'pointer', fontWeight: '500', letterSpacing: '1px', fontSize: '0.8rem' }}>
                        + ADD NEW PRODUCT
                    </button>
                </div>

                {/* Data Table */}
                <div style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid #eaeaea' }}>
                                <th style={{ padding: '15px 10px', color: '#888', fontSize: '0.75rem', letterSpacing: '1px' }}>IMAGE</th>
                                <th style={{ padding: '15px 10px', color: '#888', fontSize: '0.75rem', letterSpacing: '1px' }}>PRODUCT NAME</th>
                                <th style={{ padding: '15px 10px', color: '#888', fontSize: '0.75rem', letterSpacing: '1px' }}>CATEGORY</th>
                                <th style={{ padding: '15px 10px', color: '#888', fontSize: '0.75rem', letterSpacing: '1px' }}>PRICE</th>
                                <th style={{ padding: '15px 10px', color: '#888', fontSize: '0.75rem', letterSpacing: '1px' }}>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product.id} style={{ borderBottom: '1px solid #f5f5f5' }}>
                                    <td style={{ padding: '15px 10px' }}>
                                        <img src={product.image} alt={product.name} style={{ width: '45px', height: '45px', objectFit: 'cover', borderRadius: '4px', backgroundColor: '#f9f9f9' }} />
                                    </td>
                                    <td style={{ padding: '15px 10px', fontSize: '0.9rem', fontWeight: '500', color: '#222' }}>{product.name}</td>
                                    <td style={{ padding: '15px 10px', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#666' }}>{product.category}</td>
                                    <td style={{ padding: '15px 10px', fontSize: '0.9rem', color: '#222' }}>Rs. {product.price.toLocaleString()}</td>
                                    <td style={{ padding: '15px 10px' }}>
                                        {/* Edit Button */}
                                        <button onClick={() => openEditModal(product)} style={{ background: 'none', border: 'none', color: '#0056b3', cursor: 'pointer', marginRight: '15px', fontSize: '0.85rem', fontWeight: '500' }}>Edit</button>
                                        
                                        {/* Delete Button */}
                                        <button onClick={() => handleDelete(product.id)} style={{ background: 'none', border: 'none', color: '#dc3545', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '500' }}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                            {products.length === 0 && (
                                <tr>
                                    <td colSpan="5" style={{ padding: '30px', textAlign: 'center', color: '#888', fontSize: '0.9rem' }}>
                                        No products found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal Overlay for Adding / Editing */}
            {isModalOpen && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
                    <div style={{ backgroundColor: '#fff', padding: '40px', width: '100%', maxWidth: '500px', borderRadius: '8px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '20px', fontWeight: '500' }}>{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
                        
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.75rem', color: '#555', marginBottom: '5px' }}>Product Name</label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} required style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', outline: 'none' }} />
                            </div>
                            
                            <div style={{ display: 'flex', gap: '15px' }}>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#555', marginBottom: '5px' }}>Category</label>
                                    <select name="category" value={formData.category} onChange={handleChange} required style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', outline: 'none' }}>
                                        <option value="mens">Men's</option>
                                        <option value="womens">Women's</option>
                                        <option value="fragrances">Fragrances</option>
                                    </select>
                                </div>
                                <div style={{ flex: 1 }}>
                                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#555', marginBottom: '5px' }}>Price (Rs.)</label>
                                    <input type="number" name="price" value={formData.price} onChange={handleChange} required min="0" style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', outline: 'none' }} />
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', fontSize: '0.75rem', color: '#555', marginBottom: '5px' }}>Image URL</label>
                                <input type="text" name="image" value={formData.image} onChange={handleChange} required placeholder="https://..." style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', outline: 'none' }} />
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px', marginTop: '20px' }}>
                                <button type="button" onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: '1px solid #ccc', padding: '10px 20px', cursor: 'pointer', borderRadius: '4px', fontWeight: '500' }}>Cancel</button>
                                <button type="submit" style={{ backgroundColor: '#000', color: '#fff', border: 'none', padding: '10px 20px', cursor: 'pointer', borderRadius: '4px', fontWeight: '500' }}>{isEditing ? 'Save Changes' : 'Add Product'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;