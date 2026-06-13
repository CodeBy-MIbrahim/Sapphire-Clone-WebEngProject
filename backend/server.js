const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Enables cross-origin requests from your React app [cite: 27, 32]
app.use(express.json()); // Parses incoming JSON requests [cite: 19]

// In-Memory Database (Updated with official image links)
let products = [
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
    }
];

// 1. READ: Get all products (or filter by category)
app.get('/api/products', (req, res) => {
    const category = req.query.category;
    if (category) {
        const filteredProducts = products.filter(p => p.category === category);
        return res.json(filteredProducts);
    }
    res.json(products);
});

// 2. CREATE: Add a new product
app.post('/api/products', (req, res) => {
    const newProduct = {
        id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1, // Generate a simple ID
        name: req.body.name,
        price: req.body.price,
        category: req.body.category
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

// 4. DELETE: Remove a product
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
    console.log(`Server running on http://localhost:${PORT}`); // [cite: 23]
});