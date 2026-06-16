const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Enables cross-origin requests from your React app
app.use(express.json()); // Parses incoming JSON requests

// In-Memory Database (Fully updated for Men, Women, and Fragrances)
let products = [
    // ---------------- MENS PRODUCTS ----------------
    { 
        id: 1, 
        name: "Woven Textured Kurta", 
        price: 3590, 
        category: "mens",
        image: "https://pk.sapphireonline.pk/dw/image/v2/BKSB_PRD/on/demandware.static/-/Sites-sapphire-master-catalog/default/dw12d7e60e/images/April26/22ndApril26/MST2P26V5120_2.JPG?sw=1000&sh=1200"
    },
    { 
        id: 2, 
        name: "Classic Wash & Wear Suit", 
        price: 5990, 
        category: "mens",
        image: "https://pk.sapphireonline.pk/dw/image/v2/BKSB_PRD/on/demandware.static/-/Sites-sapphire-master-catalog/default/dw1e658958/images/April26/22ndApril26/MST2P26V5150_2.JPG?sw=1000&sh=1200"
    },
    { 
        id: 3, 
        name: "Embroidered Cotton Kurta", 
        price: 4590, 
        category: "mens",
        image: "https://pk.sapphireonline.pk/dw/image/v2/BKSB_PRD/on/demandware.static/-/Sites-sapphire-master-catalog/default/dw08521d4f/images/April26/24thApril26/MST2P26V5160_1.jpg?sw=1000&sh=1200"
    },
    { 
        id: 4, 
        name: "Premium Boski Finish Suit", 
        price: 6990, 
        category: "mens",
        image: "https://pk.sapphireonline.pk/dw/image/v2/BKSB_PRD/on/demandware.static/-/Sites-sapphire-master-catalog/default/dw0da3f59e/images/April26/22ndApril26/MST2P26V5800_2.JPG?sw=1000&sh=1200"
    },

    // ---------------- WOMENS PRODUCTS (Matching Screenshot) ----------------
    { 
        id: 5, 
        name: "2 Piece - Printed Lawn Suit", 
        price: 6590, 
        category: "womens", 
        image: "https://cdn.shopify.com/s/files/1/0027/2596/9964/files/outfits_d_ae443473-ce57-4432-8bd3-b2c4c54b7e93.webp" 
    },
    { 
        id: 6, 
        name: "2 Piece - Printed Lawn Suit", 
        price: 6990, 
        category: "womens", 
        image: "https://cdn.shopify.com/s/files/1/0027/2596/9964/files/waistcoats_d.webp" 
    },
    { 
        id: 7, 
        name: "Embroidered Crosshatch Shirt", 
        price: 5990, 
        category: "womens", 
        image: "https://cdn.shopify.com/s/files/1/0027/2596/9964/files/unstich_man.webp" 
    },
    { 
        id: 8, 
        name: "Embroidered Crosshatch Shirt", 
        price: 5590, 
        category: "womens", 
        image: "https://cdn.shopify.com/s/files/1/0027/2596/9964/files/festive_silk_d_dfd93e4b-739b-45cc-b076-eab04da3ff8d.webp" 
    },

    // ---------------- FRAGRANCES PRODUCTS ----------------
    { 
        id: 9, 
        name: "Oud Absolute (100ml)", 
        price: 3990, 
        category: "fragrances", 
        image: "https://cdn.shopify.com/s/files/1/0027/2596/9964/files/fragrance_slider.webp" 
    },
    { 
        id: 10, 
        name: "Classic Citrus Pour Homme", 
        price: 2500, 
        category: "fragrances", 
        image: "https://cdn.shopify.com/s/files/1/0027/2596/9964/files/fragrance_bottle.webp" 
    }
];

// 1. READ: Get all products (or filter by category via query params)
app.get('/api/products', (req, res) => {
    const category = req.query.category;
    if (category) {
        const filteredProducts = products.filter(p => p.category === category);
        return res.json(filteredProducts);
    }
    res.json(products);
});

// 2. CREATE: Add a new product (from Admin Dashboard)
app.post('/api/products', (req, res) => {
    const newProduct = {
        id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1, // Auto-generate next ID
        name: req.body.name,
        price: parseInt(req.body.price),
        category: req.body.category,
        image: req.body.image || "https://via.placeholder.com/300x400?text=No+Image"
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// 3. UPDATE: Modify an existing product
app.put('/api/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === id);

    if (index !== -1) {
        products[index] = { ...products[index], ...req.body, id: id };
        res.json(products[index]);
    } else {
        res.status(404).json({ message: "Product not found" });
    }
});

// 4. DELETE: Remove a product (from Admin Dashboard)
app.delete('/api/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = products.length;
    products = products.filter(p => p.id !== id);

    if (products.length < initialLength) {
        res.json({ message: "Product deleted successfully" });
    } else {
        res.status(404).json({ message: "Product not found" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Backend Server actively running on http://localhost:${PORT}`); 
});